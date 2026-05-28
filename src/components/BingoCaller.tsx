import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBingo } from "@/hooks/useBingo";
import { BINGO_COLUMNS } from "@/utils/bingoUtils";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Calculator,
} from "lucide-react";

export default function BingoCaller() {
  const bingo = useBingo();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-black text-white p-2 rounded-lg">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Bingo de Multiplicación
              </h1>
              <p className="text-sm text-gray-500">Guíame Homeschool</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-base px-3 py-1">
              {bingo.calledCount} / {bingo.totalCount}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={bingo.resetGame}
              disabled={bingo.calledNumbers.length === 0}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reiniciar
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel Principal - Llamada Actual */}
        <div className="lg:col-span-2 space-y-6">
          {/* Display de llamada actual */}
          <Card className="border-2 border-black">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-gray-500 text-sm uppercase tracking-wide">
                {bingo.gameStarted ? "Tabla de Multiplicar" : "Presiona el botón para comenzar"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {bingo.currentCall ? (
                <div className="text-center space-y-4">
                  {/* Letra y número grande */}
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-7xl font-black text-black">
                      {bingo.getCallDisplay(bingo.currentCall).split("-")[0]}
                    </span>
                    <span className="text-7xl font-black text-gray-400">-</span>
                    <span className="text-7xl font-black text-black">
                      {bingo.getCallDisplay(bingo.currentCall).split("-")[1]}
                    </span>
                  </div>

                  {/* La multiplicación */}
                  <div className="bg-gray-100 rounded-xl p-6 inline-block">
                    <p className="text-5xl font-bold text-gray-800">
                      {bingo.currentCall.fact.a}
                      <span className="text-gray-400 mx-3">x</span>
                      {bingo.currentCall.fact.b}
                      <span className="text-gray-400 mx-3">=</span>
                      <span className="text-black">?</span>
                    </p>
                  </div>

                  {/* Respuesta (oculta inicialmente o mostrada) */}
                  <p className="text-lg text-gray-400">
                    Producto: {bingo.currentCall.number}
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">
                    Listo para comenzar el juego
                  </p>
                </div>
              )}

              {/* Botón principal */}
              <div className="flex justify-center pt-2">
                <Button
                  size="lg"
                  onClick={bingo.callNextNumber}
                  disabled={bingo.isAnimating || bingo.remainingCount === 0}
                  className="text-lg px-8 py-6 h-auto bg-black hover:bg-gray-800 text-white"
                >
                  {bingo.isAnimating ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⚪</span>
                      Generando...
                    </span>
                  ) : bingo.gameStarted ? (
                    <span className="flex items-center gap-2">
                      <Play className="w-5 h-5" />
                      Siguiente Tabla
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Play className="w-5 h-5" />
                      Comenzar Juego
                    </span>
                  )}
                </Button>
              </div>

              {bingo.remainingCount === 0 && bingo.gameStarted && (
                <p className="text-center text-amber-600 font-semibold">
                  ¡Todas las tablas han sido llamadas!
                </p>
              )}
            </CardContent>
          </Card>

          {/* Historial de llamadas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wide text-gray-500">
                Historial de Llamadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {bingo.calledNumbers.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {[...bingo.calledNumbers].reverse().map((call, idx) => (
                    <div
                      key={call.timestamp}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold ${
                        idx === 0
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <span>{bingo.getCallDisplay(call)}</span>
                      <span className="text-xs opacity-70">
                        ({call.fact.a}x{call.fact.b})
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">
                  Aún no hay llamadas
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral - Tablero de seguimiento */}
        <div className="space-y-4">
          <Card className="border-2 border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase tracking-wide text-gray-500 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Tablero de Seguimiento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {BINGO_COLUMNS.map((col) => (
                <div key={col.letter}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-black text-black w-6">
                      {col.letter}
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {col.numbers.map((num) => {
                      const isCalled = bingo.calledSet.has(num);
                      return (
                        <div
                          key={num}
                          className={`text-center py-1.5 rounded text-sm font-semibold transition-all ${
                            isCalled
                              ? "bg-black text-white"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {num}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Estadísticas */}
          <Card>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-2xl font-black text-black">
                    {bingo.calledCount}
                  </p>
                  <p className="text-xs text-gray-500 uppercase">Llamadas</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-2xl font-black text-black">
                    {bingo.remainingCount}
                  </p>
                  <p className="text-xs text-gray-500 uppercase">Pendientes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
