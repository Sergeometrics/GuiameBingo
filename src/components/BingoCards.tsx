import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateBingoCards } from "@/utils/bingoUtils";
import type { BingoCard } from "@/utils/bingoUtils";
import { Printer, RefreshCw, Grid3X3 } from "lucide-react";

const INITIAL_CARDS = generateBingoCards(20);

const COLUMN_HEADERS = [
  { letter: "B", color: "bg-gray-900" },
  { letter: "I", color: "bg-gray-700" },
  { letter: "N", color: "bg-gray-500" },
  { letter: "G", color: "bg-gray-700" },
  { letter: "O", color: "bg-gray-900" },
];

function BingoCardComponent({ card }: { card: BingoCard }) {
  return (
    <div className="bingo-card-page bg-white">
      {/* Header del cartón */}
      <div className="text-center mb-2">
        <h2 className="text-lg font-bold text-gray-900 tracking-wide">
          Guíame Homeschool
        </h2>
        <div className="flex items-center justify-center gap-2 mt-0.5">
          <span className="text-xs text-gray-500 font-medium">
            Bingo de Multiplicación
          </span>
          <Badge variant="outline" className="text-xs px-1.5 py-0">
            #{card.id}
          </Badge>
        </div>
      </div>

      {/* Tabla del cartón */}
      <div className="border-2 border-black">
        {/* Column headers */}
        <div className="grid grid-cols-5 border-b-2 border-black">
          {COLUMN_HEADERS.map((col) => (
            <div
              key={col.letter}
              className={`${col.color} text-white text-center py-1.5`}
            >
              <span className="text-xl font-black">{col.letter}</span>
            </div>
          ))}
        </div>

        {/* Grid */}
        {card.grid.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="grid grid-cols-5 border-b border-gray-300 last:border-b-0"
          >
            {row.map((cell, colIdx) => (
              <div
                key={colIdx}
                className={`
                  aspect-square flex items-center justify-center
                  border-r border-gray-300 last:border-r-0
                  ${rowIdx === 2 && colIdx === 2 ? "bg-gray-100" : "bg-white"}
                `}
              >
                {cell === "FREE" ? (
                  <span className="text-xs font-bold text-gray-500 uppercase">
                    Free
                  </span>
                ) : (
                  <span className="text-lg font-bold text-gray-900">
                    {cell}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-1.5">
        <p className="text-xs text-gray-400">
          Marca el resultado de cada multiplicación
        </p>
      </div>
    </div>
  );
}

export default function BingoCards() {
  const [cards, setCards] = useState<BingoCard[]>(INITIAL_CARDS);
  const [regeneratedCount, setRegeneratedCount] = useState(0);

  const regenerateCards = () => {
    setCards(generateBingoCards(20));
    setRegeneratedCount((prev) => prev + 1);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - oculto al imprimir */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10 print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-black text-white p-2 rounded-lg">
              <Grid3X3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Cartones de Bingo
              </h1>
              <p className="text-sm text-gray-500">
                20 cartones para imprimir
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={regenerateCards}
              className="print:hidden"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Regenerar
            </Button>
            <Button
              size="sm"
              onClick={handlePrint}
              className="bg-black hover:bg-gray-800 text-white print:hidden"
            >
              <Printer className="w-4 h-4 mr-1" />
              Imprimir Cartones
            </Button>
          </div>
        </div>
      </div>

      {/* Instrucciones - oculto al imprimir */}
      <div className="max-w-7xl mx-auto px-4 py-4 print:hidden">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          <p className="font-semibold mb-1">Consejos para imprimir:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>
              Configura la impresión en escala "Ajustar a página" para mejor
              resultado
            </li>
            <li>Activa "Imprimir fondos" si los números no se ven bien</li>
            <li>
              Papel tamaño carta (8.5 x 11 pulgadas) recomendado - 2 cartones
              por página
            </li>
            <li>Diseñado para impresión en blanco y negro</li>
          </ul>
        </div>
      </div>

      {/* Grid de cartones */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bingo-cards-grid">
          {cards.map((card) => (
            <BingoCardComponent key={`${regeneratedCount}-${card.id}`} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
