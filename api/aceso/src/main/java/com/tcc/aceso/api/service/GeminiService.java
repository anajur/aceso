package com.tcc.aceso.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tcc.aceso.api.domain.Evolucao;
import com.tcc.aceso.api.domain.RespostaIa;
import com.tcc.aceso.api.repository.EvolucaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class GeminiService {
    @Value("${gemini.api.key}")
    private String apiKey;
    private final WebClient webClient;

    public GeminiService(
            EvolucaoRepository evolucaoRepository,
            WebClient.Builder builder,
            @Value("${gemini.api.key}") String apiKey
    ) {
        this.evolucaoRepository = evolucaoRepository;
        this.apiKey = apiKey;
        this.webClient = builder.build();
    }
    private final EvolucaoRepository evolucaoRepository;

    private String montarHistorico(List<Evolucao> evolucoes) {

        StringBuilder sb = new StringBuilder();
        sb.append("Histórico do paciente:\n\n");

        for (Evolucao e : evolucoes) {

            sb.append("Data: ")
                    .append(e.getDataHora())
                    .append("\n");

            sb.append("Humores: ")
                    .append(e.getHumores())
                    .append("\n");

            sb.append("Comportamento: ")
                    .append(e.getComportamentos())
                    .append("\n");

            sb.append("Consciencia: ")
                    .append(e.getNivelConsciencia())
                    .append("\n");

            sb.append("Socialização: ")
                    .append(e.getSocializacao())
                    .append("\n");

            sb.append("Sono: ")
                    .append(e.getSono())
                    .append("\n");

            sb.append("Comentário: ")
                    .append(e.getComentario())
                    .append("\n");
            sb.append("Aceitação Alimentar: ")
                    .append(e.getAceitacaoAlimentar())
                    .append("\n");
            sb.append("---------------------------------\n");
        }
        return sb.toString();

    }

    private String montarPrompt(String historico) {
        return """
                Você é um assistente de apoio ao acompanhamento de pacientes psiquiátricos.
                   Analise as informações fornecidas.
                
                   Não faça diagnóstico.
                   Não invente informações.
                   Seja objetivo.
                    Retorne:
                Resumo: máximo 20 palavras.
                Sugestão: máximo 15 palavras.
                Risco: BAIXO, MEDIO ou ALTO
                """ + historico;
    }

    public RespostaIa gerarAnalise(Long idPaciente) throws JsonProcessingException {

        List<Evolucao> evolucoes =
                evolucaoRepository.findTop2ByPacienteIdOrderByDataHoraDesc(idPaciente);
        String historico = montarHistorico(evolucoes);
        String prompt = montarPrompt(historico);
        System.out.println("Chamando Gemini para paciente: " + idPaciente);

        String resposta =
                webClient.post()
                        .uri("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=" + apiKey)

                        .contentType(MediaType.APPLICATION_JSON)

                        .bodyValue(Map.of(
                                "contents",
                                List.of(
                                        Map.of(
                                                "parts",
                                                List.of(
                                                        Map.of("text", prompt)
                                                )
                                        )
                                ),
                                "generationConfig",
                                Map.of(
                                        "responseMimeType", "application/json",
                                        "responseSchema",
                                        Map.of(
                                                "type", "OBJECT",
                                                "properties", Map.of(
                                                        "resumo", Map.of(
                                                                "type", "STRING"
                                                        ),
                                                        "risco", Map.of(
                                                                "type", "STRING",
                                                                "enum", List.of("BAIXO", "MEDIO", "ALTO")
                                                        ),
                                                        "sugestao", Map.of(
                                                                "type", "STRING"
                                                        )
                                                ),
                                                "required", List.of(
                                                        "resumo",
                                                        "risco",
                                                        "sugestao"
                                                )
                                        )
                                )
                        ))

                        .retrieve()
                        .onStatus(
                                status -> status.value() == 429,
                                response -> response.bodyToMono(String.class)
                                        .map(body -> new RuntimeException(
                                                "Limite do Gemini atingido: " + body
                                        ))
                        )
                        .bodyToMono(String.class)

                        .block();
        ObjectMapper mapper = new ObjectMapper();

        JsonNode root = mapper.readTree(resposta);

        String texto = root
                .path("candidates")
                .get(0)
                .path("content")
                .path("parts")
                .get(0)
                .path("text")
                .asText();

        RespostaIa respostaIa =
                mapper.readValue(texto, RespostaIa.class);

        return respostaIa;
    }

}
