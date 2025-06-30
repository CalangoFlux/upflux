import Image from "next/image"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center relative overflow-hidden">
      {/* Background Hexagonal Pattern */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute inset-0 bg-hexagon-pattern"></div>
      </div>

      {/* Loading Animation */}
      <div className="flex flex-col items-center space-y-8">
        {/* Logo Animado */}
        <div className="relative">
          <div className="w-20 h-20 animate-spin">
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-teal-400"></div>
          </div>
          <div className="absolute inset-2 flex items-center justify-center">
            <Image src="/images/AIdeaFlux_icon.png" alt="AideaFlux" width={48} height={48} className="animate-pulse" />
          </div>
        </div>

        {/* Texto */}
        <div className="text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            AideaFlux
          </h2>
          <p className="text-gray-400 animate-pulse">Carregando...</p>
        </div>

        {/* Dots Animation */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  )
}
