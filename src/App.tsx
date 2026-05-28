import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BingoCaller from "@/components/BingoCaller";
import BingoCards from "@/components/BingoCards";
import { Calculator, Grid3X3, School } from "lucide-react";
import "./App.css";

type AppMode = "caller" | "cards";

function App() {
  const [mode, setMode] = useState<AppMode>("caller");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-black text-white shadow-lg print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <School className="w-6 h-6" />
            <div>
              <h1 className="text-lg font-bold">Guíame Homeschool</h1>
              <p className="text-xs text-gray-400">Bingo de Multiplicación</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
            <Button
              variant={mode === "caller" ? "default" : "ghost"}
              size="sm"
              onClick={() => setMode("caller")}
              className={`flex items-center gap-2 ${
                mode === "caller"
                  ? "bg-white text-black hover:bg-gray-200"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">Panel del Maestro</span>
              <span className="sm:hidden">Llamar</span>
            </Button>
            <Button
              variant={mode === "cards" ? "default" : "ghost"}
              size="sm"
              onClick={() => setMode("cards")}
              className={`flex items-center gap-2 ${
                mode === "cards"
                  ? "bg-white text-black hover:bg-gray-200"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              <span className="hidden sm:inline">Cartones</span>
              <span className="sm:hidden">Cartas</span>
              <Badge
                variant="secondary"
                className="ml-1 text-xs bg-gray-600 text-gray-200"
              >
                20
              </Badge>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="print:p-0">
        {mode === "caller" ? <BingoCaller /> : <BingoCards />}
      </div>

      {/* Footer - solo visible en modo caller */}
      {mode === "caller" && (
        <div className="bg-white border-t py-4 print:hidden">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-400">
            <p>
              Guíame Homeschool — Bingo de Multiplicación
            </p>
            <p className="text-xs mt-1">
              Los productos generados son aleatorios y no se repiten durante cada juego.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
