"use client"

import { useState, useEffect } from "react"
import {
  Menu,
  X,
  ArrowRight,
  ImageIcon,
  Briefcase,
  Zap,
  Type,
  Play,
  Code,
  Palette,
  Volume2,
  Settings,
  ExternalLink,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function UpFluxHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

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
        // Sempre mostrar no topo
        setIsHeaderVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Esconder quando scrolling para baixo
        setIsHeaderVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Mostrar quando scrolling para cima
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

  // Categorias com cores vibrantes
  const aiCategories = [
    {
      id: 1,
      name: "AI Image Tools",
      slug: "imagens",
      icon: <ImageIcon className="w-8 h-8" />,
      count: 10,
      description: "Ferramentas de IA para criar e editar imagens.",
      tools: ["DALL-E 3", "Midjourney", "Stable Diffusion"],
      color: "from-orange-500 via-red-500 to-pink-500",
      glowColor: "orange",
    },
    {
      id: 2,
      name: "AI Business Tools",
      slug: "negocios",
      icon: <Briefcase className="w-8 h-8" />,
      count: 9,
      description: "Ferramentas de IA para otimizar processos de negócios.",
      tools: ["Jasper", "Copy.ai", "Notion AI"],
      color: "from-purple-500 via-violet-500 to-indigo-500",
      glowColor: "purple",
    },
    {
      id: 3,
      name: "AI Productivity Tools",
      slug: "generalistas",
      icon: <Zap className="w-8 h-8" />,
      count: 10,
      description: "Ferramentas de IA para aumentar a produtividade pessoal.",
      tools: ["GPT-4o", "Claude", "Gemini"],
      color: "from-emerald-500 via-teal-500 to-cyan-500",
      glowColor: "emerald",
    },
    {
      id: 4,
      name: "AI Text Generators",
      slug: "educacao",
      icon: <Type className="w-8 h-8" />,
      count: 10,
      description: "Ferramentas de IA para gerar texto automaticamente.",
      tools: ["ChatGPT", "Writesonic", "QuillBot"],
      color: "from-blue-500 via-indigo-500 to-purple-500",
      glowColor: "blue",
    },
    {
      id: 5,
      name: "AI Video Tools",
      slug: "multimodais",
      icon: <Play className="w-8 h-8" />,
      count: 10,
      description: "Ferramentas de IA para criar e editar vídeos.",
      tools: ["RunwayML", "Synthesia", "Descript"],
      color: "from-red-500 via-orange-500 to-yellow-500",
      glowColor: "red",
    },
    {
      id: 6,
      name: "AI Code Tools",
      slug: "programacao",
      icon: <Code className="w-8 h-8" />,
      count: 10,
      description: "Ferramentas de IA para auxiliar na programação.",
      tools: ["GitHub Copilot", "Tabnine", "Codeium"],
      color: "from-slate-500 via-gray-500 to-zinc-500",
      glowColor: "slate",
    },
    {
      id: 7,
      name: "AI Art Generators",
      slug: "imagens",
      icon: <Palette className="w-8 h-8" />,
      count: 10,
      description: "Ferramentas de IA para gerar arte digital.",
      tools: ["NightCafe", "StarryAI", "Leonardo"],
      color: "from-pink-500 via-rose-500 to-red-500",
      glowColor: "pink",
    },
    {
      id: 8,
      name: "Audio Generator",
      slug: "multimodais",
      icon: <Volume2 className="w-8 h-8" />,
      count: 8,
      description: "Ferramentas de IA para gerar e editar áudio.",
      tools: ["Murf AI", "ElevenLabs", "Resemble"],
      color: "from-teal-500 via-emerald-500 to-green-500",
      glowColor: "teal",
    },
    {
      id: 9,
      name: "Misc AI Tools",
      slug: "codigo-aberto",
      icon: <Settings className="w-8 h-8" />,
      count: 10,
      description: "Outras ferramentas de IA diversas.",
      tools: ["Hugging Face", "Replicate", "Cohere"],
      color: "from-amber-500 via-yellow-500 to-lime-500",
      glowColor: "amber",
    },
    {
      id: 10,
      name: "AI Translation Tools",
      slug: "idiomas",
      icon: <Type className="w-8 h-8" />,
      count: 10,
      description: "Ferramentas de IA para tradução e idiomas.",
      tools: ["DeepL", "Google Translate", "Papago"],
      color: "from-indigo-500 via-blue-500 to-cyan-500",
      glowColor: "indigo",
    },
  ]

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
          <div
            className={`flex items-center justify-between transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50 group-hover:shadow-cyan-400/70 transition-all duration-300 group-hover:scale-110">
                  <span className="text-black font-bold text-xl">U</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  UpFlux
                </span>
                <p className="text-xs text-cyan-400/80">AI Platform</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {["Home", "AI Tools Directory", "AI Courses", "Blog", "Contact Us"].map((item, index) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`relative group transition-all duration-300 ${
                    item === "Home" ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
              >
                Login
              </Button>
              <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-semibold px-6 py-2 rounded-full shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-105 transition-all duration-300">
                Sign Up
              </Button>
            </div>

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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-black/40 backdrop-blur-xl">
            <nav className="flex flex-col p-6 space-y-4">
              {["Home", "AI Tools Directory", "AI Courses", "Blog", "Contact Us"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`transition-colors duration-300 ${
                    item === "Home" ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
                  }`}
                >
                  {item}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 justify-start"
                >
                  Login
                </Button>
                <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-semibold">
                  Sign Up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Galaxy Banner */}
      <section className="relative h-80 overflow-hidden">
        {/* Galaxy Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Estrelas da galáxia */}
          <div className="galaxy-container">
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className="star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 20}s`,
                  animationDuration: `${20 + Math.random() * 40}s`,
                }}
              />
            ))}
          </div>

          {/* Nebulosa central */}
          <div className="nebula-center">
            <div className="nebula-core"></div>
            <div className="nebula-ring-1"></div>
            <div className="nebula-ring-2"></div>
            <div className="nebula-ring-3"></div>
          </div>
        </div>

        {/* Gradient overlay para suavizar */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black"></div>
      </section>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-16">
        {/* Hero Section */}
        <section
          className={`text-center mb-20 transition-all duration-1500 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
        >
          <h1 className="text-6xl lg:text-8xl font-bold mb-8 leading-tight">
            Descubra as Melhores
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-x">
              Ferramentas de IA
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Explore mais de <span className="text-cyan-400 font-semibold">95+ ferramentas</span> de inteligência
            artificial organizadas em <span className="text-teal-400 font-semibold">10 categorias</span> especializadas
          </p>

          {/* Search Bar */}
          <div className="relative w-full max-w-3xl mb-12 mx-auto group">
            <Input
              type="text"
              placeholder="Pesquise por ferramentas, categorias ou funcionalidades..."
              className="w-full h-16 pl-8 pr-16 bg-white/5 backdrop-blur-md border-2 border-white/20 text-white placeholder-gray-400 rounded-2xl text-lg focus:border-cyan-400/60 focus:ring-cyan-400/30 shadow-lg shadow-black/20 group-hover:border-white/30 transition-all duration-300"
            />
            <Button
              size="icon"
              className="absolute right-3 top-3 h-10 w-10 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-105 transition-all duration-300"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Categories Section */}
        <section className="max-w-7xl mx-auto">
          <div
            className={`flex items-center justify-between mb-16 transition-all duration-1000 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
          >
            <div>
              <h2 className="text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  AI
                </span>{" "}
                Categories
              </h2>
              <p className="text-xl text-gray-400">Categorias especializadas para cada necessidade</p>
            </div>
            <Link
              href="/categorias"
              className="hidden md:flex items-center text-cyan-400 hover:text-cyan-300 transition-all duration-300 group text-lg font-medium"
            >
              Ver Todas as Categorias
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiCategories.map((category, index) => (
              <Link key={category.id} href={`/categoria/${category.slug}`}>
                <Card
                  className={`group h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/60 transition-all duration-700 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 hover:bg-white/10 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
                  style={{
                    animationDelay: `${700 + index * 100}ms`,
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  <CardContent className="p-8 text-center h-full flex flex-col relative overflow-hidden">
                    {/* Glow effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-lg`}
                    ></div>

                    <div
                      className={`relative w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${category.color} rounded-3xl flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 group-hover:rotate-12`}
                    >
                      <div className="text-white group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      {/* Icon glow */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                      ></div>
                    </div>

                    <h3 className="font-bold text-xl mb-3 text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {category.name}
                    </h3>

                    <p className="text-sm text-gray-400 group-hover:text-gray-300 mb-6 flex-grow transition-colors duration-300 leading-relaxed">
                      {category.description}
                    </p>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {category.tools.slice(0, 3).map((tool) => (
                          <span
                            key={tool}
                            className="text-xs bg-white/10 text-gray-300 group-hover:bg-cyan-400/20 group-hover:text-cyan-200 px-3 py-1.5 rounded-full border border-white/20 group-hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      <div className="relative overflow-hidden rounded-xl">
                        <div className="w-full h-12 bg-gradient-to-r from-white/10 to-white/5 group-hover:from-cyan-500 group-hover:to-teal-500 text-gray-300 group-hover:text-black border border-white/20 group-hover:border-transparent transition-all duration-500 flex items-center justify-center text-sm font-medium backdrop-blur-sm">
                          <span className="mr-2">Explorar Categoria</span>
                          <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                        {/* Button glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section
          className={`mt-32 py-20 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl border border-white/10 backdrop-blur-xl transition-all duration-1000 delay-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              UpFlux em Números
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { number: "95+", label: "Ferramentas de IA", color: "text-cyan-400" },
                { number: "10", label: "Categorias Especializadas", color: "text-teal-400" },
                { number: "100%", label: "Gratuito e Atualizado", color: "text-emerald-400" },
              ].map((stat, index) => (
                <div key={index} className="space-y-3 group">
                  <div
                    className={`text-6xl font-bold ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className={`text-center mt-32 py-20 transition-all duration-1000 delay-1200 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
        >
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Pronto para Explorar o Futuro da IA?
          </h2>
          <p className="text-xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Descubra as ferramentas que estão transformando o mundo e encontre a solução perfeita para suas necessidades
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/categorias">
              <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black px-10 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-105 transition-all duration-300">
                Explorar Todas as Categorias
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/ferramentas">
              <Button
                variant="outline"
                className="border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 px-10 py-4 rounded-2xl text-lg font-bold bg-transparent hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                Ver Todas as Ferramentas
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
