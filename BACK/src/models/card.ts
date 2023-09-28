export type Card = {
  id: string;
  titulo: string;
  conteudo: string;
  lista: string;
};


export function validateCard(card: Card): boolean {
  if (
    typeof card.titulo !== 'string' ||
    typeof card.conteudo !== 'string' ||
    typeof card.lista !== 'string'
  ) {
    return false;
  }

  if (card.titulo.length === 0 &&
    card.conteudo.length === 0 &&
    card.lista.length === 0) {
    return false
  }

  return true;
}
