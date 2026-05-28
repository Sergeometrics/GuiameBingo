// Números válidos del bingo de multiplicación (productos del 1-10 excepto 1 y 100)
export const BINGO_NUMBERS: number[] = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 25, 27, 28,
  30, 32, 35, 36, 40, 42, 45, 48, 49, 50, 54, 56, 60, 63, 64, 70, 72, 80, 81, 90,
];

// Definición de las columnas B-I-N-G-O con sus rangos
export interface BingoColumn {
  letter: string;
  numbers: number[];
}

export const BINGO_COLUMNS: BingoColumn[] = [
  { letter: "B", numbers: [2, 3, 4, 5, 6, 7, 8, 9] },
  { letter: "I", numbers: [10, 12, 14, 15, 16, 18, 20, 21] },
  { letter: "N", numbers: [24, 25, 27, 28, 30, 32, 35, 36] },
  { letter: "G", numbers: [40, 42, 45, 48, 49, 50, 54, 56] },
  { letter: "O", numbers: [60, 63, 64, 70, 72, 80, 81, 90] },
];

// Todos los productos posibles de tablas de multiplicar del 1-10
export interface MultiplicationFact {
  a: number;
  b: number;
  product: number;
}

export function getAllMultiplicationFacts(): MultiplicationFact[] {
  const facts: MultiplicationFact[] = [];
  for (let a = 1; a <= 10; a++) {
    for (let b = 1; b <= 10; b++) {
      facts.push({ a, b, product: a * b });
    }
  }
  return facts;
}

// Obtener todos los facts cuyo producto esté en BINGO_NUMBERS
export function getValidMultiplicationFacts(): MultiplicationFact[] {
  const allFacts = getAllMultiplicationFacts();
  return allFacts.filter((fact) => BINGO_NUMBERS.includes(fact.product));
}

// Agrupar facts por producto
export function getFactsByProduct(): Map<number, MultiplicationFact[]> {
  const validFacts = getValidMultiplicationFacts();
  const map = new Map<number, MultiplicationFact[]>();
  for (const fact of validFacts) {
    if (!map.has(fact.product)) {
      map.set(fact.product, []);
    }
    map.get(fact.product)!.push(fact);
  }
  return map;
}

// Generar un cartón de bingo aleatorio
export interface BingoCard {
  id: number;
  grid: (number | "FREE")[][]; // 5x5 grid
}

export function generateBingoCard(id: number): BingoCard {
  const grid: (number | "FREE")[][] = [];

  for (let row = 0; row < 5; row++) {
    const cardRow: (number | "FREE")[] = [];
    for (let col = 0; col < 5; col++) {
      if (row === 2 && col === 2) {
        cardRow.push("FREE");
      } else {
        const columnNumbers = [...BINGO_COLUMNS[col].numbers];
        // Seleccionar 5 números únicos de esta columna para el cartón
        // Usamos una selección aleatoria sin reemplazo
        const shuffled = columnNumbers.sort(() => Math.random() - 0.5);
        cardRow.push(shuffled[row]);
      }
    }
    grid.push(cardRow);
  }

  return { id, grid };
}

// Generar múltiples cartones
export function generateBingoCards(count: number): BingoCard[] {
  const cards: BingoCard[] = [];
  for (let i = 1; i <= count; i++) {
    cards.push(generateBingoCard(i));
  }
  return cards;
}

// Encontrar qué columna corresponde a un número
export function getColumnForNumber(num: number): string {
  for (const col of BINGO_COLUMNS) {
    if (col.numbers.includes(num)) return col.letter;
  }
  return "";
}

// Obtener un fact aleatorio para un producto dado
export function getRandomFactForProduct(
  product: number,
  factsMap: Map<number, MultiplicationFact[]>
): MultiplicationFact {
  const facts = factsMap.get(product) || [{ a: 1, b: product, product }];
  return facts[Math.floor(Math.random() * facts.length)];
}
