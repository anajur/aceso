package com.tcc.aceso.api.service.analise;

import com.tcc.aceso.api.enums.*;
import com.tcc.aceso.api.service.AlertaService;
import com.tcc.aceso.api.utils.AnaliseUtils;

import java.util.List;

public class RegrasAnalise {
    public static final List<RegraAnalise> REGRAS = List.of(

            new RegraAnalise(
                    e -> AnaliseUtils.possuiComportamentoNasUltimas2(
                            e,
                            Comportamento.AGRESSIVO
                    ),
                    MensagensAlerta.AGRESSIVO
            ),
            new RegraAnalise(
                    e -> AnaliseUtils.possuiHumorNasUltimas2(
                            e,
                            Humor.TRISTE
                    )
                            &&
                            AnaliseUtils.possuiSocializacaoNasUltimas2(
                                    e,
                                    Socializacao.ISOLADO
                            ),

                 MensagensAlerta.TRISTE_ISOLADO

            ),
            new RegraAnalise(

                    e -> AnaliseUtils.possuiSonoNasUltimas2(
                            e,
                            Sono.INTERROMPIDO
                    ),

                    MensagensAlerta.SONO_INTERROMPIDO
            ),
            new RegraAnalise(

                    e -> AnaliseUtils.possuiHumorNasUltimas2(
                            e,
                            Humor.ANSIOSO
                    )
                            &&
                            AnaliseUtils.possuiSonoNasUltimas2(
                                    e,
                                    Sono.INSONIA
                            ),
MensagensAlerta.ANSIEDADE_INSONIA
            ),
            new RegraAnalise(

                    e -> AnaliseUtils.possuiHumorNasUltimas2(
                            e,
                            Humor.IRRITADO
                    )
                            &&
                            AnaliseUtils.possuiSonoNasUltimas2(
                                    e,
                                    Sono.INSONIA
                            ),

                   MensagensAlerta.IRRITABILIDADE_INSONIA
            ),
            new RegraAnalise(

                    e -> AnaliseUtils.possuiComportamentoNasUltimas2(
                            e,
                            Comportamento.AGITADO
                    )
                            &&
                            AnaliseUtils.possuiSonoNasUltimas2(
                                    e,
                                    Sono.INSONIA
                            ),

                    MensagensAlerta.AGITACAO_INSONIA
            ),
            new RegraAnalise(

                    e -> AnaliseUtils.possuiHumorNasUltimas2(
                            e,
                            Humor.TRISTE
                    )
                            &&
                            AnaliseUtils.possuiSonoNasUltimas2(
                                    e,
                                    Sono.INSONIA
                            ),

                    MensagensAlerta.TRISTEZA_INSONIA
            ),
            new RegraAnalise(

                    e -> AnaliseUtils.possuiAceitacaoAlimentarNasUltimas2(
                            e,
                            AceitacaoAlimentar.RECUSOU
                    ),
MensagensAlerta.RECUSA_ALIMENTAR
            ),
            new RegraAnalise(

                    e -> AnaliseUtils.possuiHumorNasUltimas2(
                            e,
                            Humor.TRISTE
                    )
                            &&
                            AnaliseUtils.possuiSocializacaoNasUltimas2(
                                    e,
                                    Socializacao.ISOLADO
                            ),

                   MensagensAlerta.TRISTE_ISOLADO
            ),
            new RegraAnalise(

                    e -> AnaliseUtils.possuiComportamentoNasUltimas2(
                            e,
                            Comportamento.AGRESSIVO
                    )
                            &&
                            AnaliseUtils.possuiSocializacaoNasUltimas2(
                                    e,
                                    Socializacao.ISOLADO
                            ),

                    MensagensAlerta.AGRESSIVO_ISOLADO
            ),
            new RegraAnalise(

                    e -> AnaliseUtils.possuiComportamentoNasUltimas2(
                            e,
                            Comportamento.AGITADO
                    )
                            &&
                            AnaliseUtils.possuiSocializacaoNasUltimas2(
                                    e,
                                    Socializacao.ISOLADO
                            ),
MensagensAlerta.AGITADO_ISOLADO
            ),
            new RegraAnalise(

                    e -> AnaliseUtils.possuiAceitacaoAlimentarNasUltimas2(
                            e,
                            AceitacaoAlimentar.RECUSOU
                    )
                            &&
                            AnaliseUtils.possuiSocializacaoNasUltimas2(
                                    e,
                                    Socializacao.ISOLADO
                            ),

                    MensagensAlerta.RECUSA_ALIMENTAR_ISOLADO
            ),
            new RegraAnalise(

                    e -> AnaliseUtils.possuiHumorNasUltimas2(
                            e,
                            Humor.ANSIOSO
                    )
                            &&
                            AnaliseUtils.possuiSocializacaoNasUltimas2(
                                    e,
                                    Socializacao.ISOLADO
                            ),

                   MensagensAlerta.ANSIOSO_ISOLADO
            ),
            new RegraAnalise(

                    e -> AnaliseUtils.possuiHumorNasUltimas2(
                            e,
                            Humor.IRRITADO
                    )
                            &&
                            AnaliseUtils.possuiComportamentoNasUltimas2(
                                    e,
                                    Comportamento.AGITADO
                            ),

                   MensagensAlerta.IRRITADO_AGITADO
            ),
            new RegraAnalise(

                    e -> AnaliseUtils.possuiHumores(
                            e.get(0),
                            Humor.TRISTE,
                            Humor.ANSIOSO
                    ),

                    MensagensAlerta.TRISTE_ANSIOSO
            ),
            new RegraAnalise(

                    e -> AnaliseUtils.possuiHumorNasUltimas2(
                            e,
                            Humor.ANSIOSO
                    )
                            &&
                            AnaliseUtils.possuiComportamentoNasUltimas2(
                                    e,
                                    Comportamento.AGITADO
                            ),

                   MensagensAlerta.ANSIOSO_AGITADO
            ),
            new RegraAnalise(

                    e -> AnaliseUtils.possuiHumorNasUltimas2(
                            e,
                            Humor.IRRITADO
                    )
                            &&
                            AnaliseUtils.possuiComportamentoNasUltimas2(
                                    e,
                                    Comportamento.AGRESSIVO
                            ),

                   MensagensAlerta.IRRITADO_AGRESSIVO
            ),
            new RegraAnalise(

                    e -> AnaliseUtils.possuiHumorNasUltimas2(
                            e,
                            Humor.TRISTE
                    )
                            &&
                            AnaliseUtils.possuiAceitacaoAlimentarNasUltimas2(
                                    e,
                                    AceitacaoAlimentar.RECUSOU
                            ),

                    MensagensAlerta.TRISTE_RECUSA_ALIMENTAR
            ),
            new RegraAnalise(
                    e -> AnaliseUtils.possuiSonoNasUltimas2(
            e,
            Sono.INSONIA
            ),
              MensagensAlerta.INSONIA
            )

    );
}
