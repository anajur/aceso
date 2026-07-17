export enum Humor {
  FELIZ = "FELIZ",
  NEUTRO = "NEUTRO",
  TRISTE = "TRISTE",
  ANSIOSO = "ANSIOSO",
  IRRITADO = "IRRITADO",
}

export const humorLabels: Record<Humor, string> = {
  [Humor.FELIZ]: "😊 Feliz",
  [Humor.NEUTRO]: "😐 Neutro",
  [Humor.TRISTE]: "😢 Triste",
  [Humor.ANSIOSO]: "😰 Ansioso",
  [Humor.IRRITADO]: "😠 Irritado",
};