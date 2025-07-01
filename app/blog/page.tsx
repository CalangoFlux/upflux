"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Footer from "@/components/footer"
import Image from "next/image"

export default function Blog() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Mouse tracking para efeito de luz
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Header retrátil baseado no scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 10) {
        setIsHeaderVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Animação de entrada
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Hexagonal Pattern */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute inset-0 bg-hexagon-pattern"></div>
      </div>

      {/* Cursor Light Effect */}
      <div
        className="fixed w-96 h-96 pointer-events-none transition-all duration-300 ease-out z-10"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: `radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(20,184,166,0.1) 30%, rgba(6,182,212,0.05) 60%, transparent 100%)`,
          filter: "blur(40px)",
        }}
      />

      {/* Header Retrátil */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl transition-all duration-500 ease-in-out ${
          isHeaderVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/images/AIdeaFlux_icon.png"
                  alt="AideaFlux"
                  width={40}
                  height={40}
                  className="group-hover:scale-110 transition-all duration-300"
                />
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  AideaFlux
                </span>
                <p className="text-xs text-cyan-400/80">Plataforma de IA</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group">
                Início
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/diretorio-de-ia"
                className="text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group"
              >
                Diretório de IA
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/cursos-de-ia"
                className="text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group"
              >
                Cursos de IA
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/blog" className="text-cyan-400 transition-all duration-300 relative group">
                Blog
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400"></span>
              </Link>
              <Link
                href="/contato"
                className="text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group"
              >
                Contato
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            {/* Back Button + Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Voltar</span>
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:bg-white/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-black/40 backdrop-blur-xl">
            <nav className="flex flex-col p-6 space-y-4">
              <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                Início
              </Link>
              <Link
                href="/diretorio-de-ia"
                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              >
                Diretório de IA
              </Link>
              <Link href="/cursos-de-ia" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                Cursos de IA
              </Link>
              <Link href="/blog" className="text-cyan-400 transition-colors duration-300">
                Blog
              </Link>
              <Link href="/contato" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                Contato
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div
          className={`text-center transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
        >
          {/* Logo Animado Grande */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              {/* Anel externo girando */}
              <div className="w-40 h-40 animate-spin" style={{ animationDuration: "10s" }}>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-teal-400 border-b-emerald-400 border-l-cyan-300"></div>
              </div>
              {/* Anel médio girando no sentido contrário */}
              <div
                className="absolute inset-4 w-32 h-32 animate-spin"
                style={{ animationDuration: "7s", animationDirection: "reverse" }}
              >
                <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-teal-400 border-r-emerald-400 border-b-cyan-400"></div>
              </div>
              {/* Logo no centro com pulse */}
              <div className="absolute inset-8 flex items-center justify-center">
                <Image
                  src="/images/AIdeaFlux_icon.png"
                  alt="AideaFlux"
                  width={120}
                  height={120}
                  className="animate-pulse"
                />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-teal-400/20 to-emerald-400/20 blur-xl animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>

          <div className="space-y-6 max-w-2xl mx-auto">
            <p className="text-3xl lg:text-4xl text-gray-300 font-light animate-pulse">Em Breve</p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Estamos preparando artigos, tutoriais e insights sobre o mundo da inteligência artificial para manter você
              sempre atualizado.
            </p>

            {/* Dots animados */}
            <div className="flex justify-center space-x-3 mt-8">
              <div className="w-4 h-4 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div
                className="w-4 h-4 bg-teal-400 rounded-full animate-bounce"
                style={{ animationDelay: "200ms" }}
              ></div>
              <div
                className="w-4 h-4 bg-emerald-400 rounded-full animate-bounce"
                style={{ animationDelay: "400ms" }}
              ></div>
            </div>
          </div>

          <div className="mt-12">
            <Link href="/">
              <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-semibold px-8 py-3 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-105 transition-all duration-300">
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
