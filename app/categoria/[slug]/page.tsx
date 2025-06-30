"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ExternalLink, Star, Users, Clock, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Footer from "@/components/footer"

// Dados completos das categorias
const categoryData = {
  generalistas: {
    name: "AI Productivity Tools",
    description: "Ferramentas de IA generalistas para aumentar sua produtividade e automatizar tarefas do dia a dia.",
    tools: [
      {
        name: "GPT-4o",
        company: "OpenAI",
        description: "Multimodal, rápido, com alta performance em tarefas gerais.",
        link: "https://chat.openai.com",
        features: ["Multimodal", "Rápido", "Alta Performance"],
        pricing: "Freemium",
        rating: 4.8,
        users: "100M+",
      },
      {
        name: "Gemini 1.5",
        company: "Google",
        description: "Foco em raciocínio, contexto longo e integrado com produtos Google.",
        link: "https://gemini.google.com",
        features: ["Contexto Longo", "Raciocínio", "Integração Google"],
        pricing: "Gratuito",
        rating: 4.7,
        users: "50M+",
      },
      {
        name: "Claude 3 Opus",
        company: "Anthropic",
        description: "Destaca-se em segurança e compreensão contextual.",
        link: "https://claude.ai",
        features: ["Segurança", "Contexto", "Ética"],
        pricing: "Freemium",
        rating: 4.6,
        users: "10M+",
      },
      {
        name: "Qwen",
        company: "Alibaba",
        description: "Modelo multimodal open source, forte performance em benchmarks chineses.",
        link: "https://huggingface.co/Qwen",
        features: ["Open Source", "Multimodal", "Chinês"],
        pricing: "Gratuito",
        rating: 4.5,
        users: "5M+",
      },
      {
        name: "ERNIE 4.0",
        company: "Baidu",
        description: "Compreensão profunda e raciocínio, capacidades multimodais.",
        link: "https://wenxin.baidu.com/",
        features: ["Raciocínio", "Multimodal", "Chinês"],
        pricing: "Freemium",
        rating: 4.4,
        users: "20M+",
      },
      {
        name: "YaLM 100B",
        company: "Yandex",
        description: "Modelo de 100 bilhões de parâmetros para múltiplas tarefas gerais.",
        link: "https://yandex.com/company/research/technologies/yalm",
        features: ["100B Parâmetros", "Russo", "Multilíngue"],
        pricing: "Gratuito",
        rating: 4.3,
        users: "2M+",
      },
      {
        name: "Luminous",
        company: "Aleph Alpha",
        description: "Modelo europeu focado em transparência e explicabilidade.",
        link: "https://www.aleph-alpha.com/luminous",
        features: ["Transparência", "Europeu", "Explicável"],
        pricing: "Pago",
        rating: 4.2,
        users: "500K+",
      },
      {
        name: "GigaChat",
        company: "Sber",
        description: "LLM conversacional para chat, busca e integração empresarial.",
        link: "https://gigachat.sber.ru/",
        features: ["Conversacional", "Empresarial", "Russo"],
        pricing: "Freemium",
        rating: 4.1,
        users: "3M+",
      },
      {
        name: "Cohere Command R",
        company: "Cohere",
        description: "LLM canadense para uso empresarial e geral, forte suporte multilíngue.",
        link: "https://cohere.com/products/command",
        features: ["Empresarial", "Multilíngue", "Canadense"],
        pricing: "Pago",
        rating: 4.4,
        users: "1M+",
      },
      {
        name: "Jais",
        company: "Technology Innovation Institute",
        description: "LLM principal dos Emirados Árabes, otimizado para árabe/inglês.",
        link: "https://jais.tii.ae/",
        features: ["Árabe", "Inglês", "Oriente Médio"],
        pricing: "Gratuito",
        rating: 4.0,
        users: "800K+",
      },
    ],
  },
  programacao: {
    name: "AI Code Tools",
    description: "Ferramentas especializadas em programação, desenvolvimento e análise de código.",
    tools: [
      {
        name: "GitHub Copilot",
        company: "OpenAI + GitHub",
        description: "Assistente de programação integrado ao VS Code.",
        link: "https://github.com/features/copilot",
        features: ["VS Code", "Múltiplas Linguagens", "Autocompletar"],
        pricing: "Pago",
        rating: 4.7,
        users: "1M+",
      },
      {
        name: "Code Llama",
        company: "Meta",
        description: "Focado em geração e explicação de código.",
        link: "https://code.meta.com/llama",
        features: ["Geração", "Explicação", "Open Source"],
        pricing: "Gratuito",
        rating: 4.5,
        users: "500K+",
      },
      {
        name: "PanGu-Coder",
        company: "Huawei",
        description: "Modelo para geração e explicação de código.",
        link: "https://huggingface.co/huawei-noah/CodePangu",
        features: ["Geração", "Explicação", "Chinês"],
        pricing: "Gratuito",
        rating: 4.3,
        users: "300K+",
      },
      {
        name: "CodeGeeX2",
        company: "Tsinghua University",
        description: "Multilíngue, open source, suporta mais de 20 linguagens de programação.",
        link: "https://huggingface.co/THUDM/codegeex2-6b",
        features: ["20+ Linguagens", "Open Source", "Multilíngue"],
        pricing: "Gratuito",
        rating: 4.4,
        users: "400K+",
      },
      {
        name: "SberCode",
        company: "Sber",
        description: "Automação e geração de código para o mercado russo.",
        link: "https://ai.sber.ru/projects/sbercode",
        features: ["Automação", "Russo", "Empresarial"],
        pricing: "Pago",
        rating: 4.1,
        users: "200K+",
      },
      {
        name: "AlphaCode",
        company: "DeepMind",
        description: "Modelo para resolução de problemas de programação competitiva.",
        link: "https://deepmind.com/research/highlighted-research/alphacode",
        features: ["Competitivo", "Resolução", "DeepMind"],
        pricing: "Pesquisa",
        rating: 4.6,
        users: "100K+",
      },
      {
        name: "StarCoderBase",
        company: "BigCode",
        description: "LLM de código open-source, forte em bases de código multilíngues.",
        link: "https://huggingface.co/bigcode/starcoderbase",
        features: ["Open Source", "Multilíngue", "BigCode"],
        pricing: "Gratuito",
        rating: 4.5,
        users: "600K+",
      },
      {
        name: "CodeParrot",
        company: "Hugging Face",
        description: "Open source, treinado em grandes volumes de código do GitHub.",
        link: "https://huggingface.co/codeparrot",
        features: ["GitHub", "Open Source", "Hugging Face"],
        pricing: "Gratuito",
        rating: 4.2,
        users: "250K+",
      },
      {
        name: "Jais Code",
        company: "Technology Innovation Institute",
        description: "Modelo de geração de código dos Emirados, otimizado para árabe e inglês.",
        link: "https://jais.tii.ae/",
        features: ["Árabe", "Inglês", "Geração"],
        pricing: "Gratuito",
        rating: 4.0,
        users: "150K+",
      },
      {
        name: "Falcon Code",
        company: "Technology Innovation Institute",
        description: "LLM de código open-source dos Emirados, forte em Python e JavaScript.",
        link: "https://huggingface.co/tiiuae/falcon-40b-instruct",
        features: ["Python", "JavaScript", "Open Source"],
        pricing: "Gratuito",
        rating: 4.3,
        users: "350K+",
      },
    ],
  },
  negocios: {
    name: "AI Business Tools",
    description: "Ferramentas de IA para otimizar processos de negócios.",
    tools: [
      {
        name: "Microsoft Copilot",
        company: "Microsoft",
        description: "Integrado ao Office 365 para automação e insights.",
        link: "https://copilot.microsoft.com/",
        features: ["Office 365", "Automação", "Insights"],
        pricing: "Pago",
        rating: 4.6,
        users: "50M+",
      },
      {
        name: "Jasper AI",
        company: "Jasper",
        description: "Geração de conteúdo para marketing e negócios.",
        link: "https://jasper.ai",
        features: ["Marketing", "Conteúdo", "Negócios"],
        pricing: "Pago",
        rating: 4.4,
        users: "1M+",
      },
    ],
  },
  educacao: {
    name: "AI Education Tools",
    description: "Ferramentas de IA para educação e aprendizado.",
    tools: [
      {
        name: "Khanmigo",
        company: "Khan Academy",
        description: "Tutor virtual para estudantes.",
        link: "https://khanacademy.org/khan-labs",
        features: ["Tutor", "Estudantes", "Khan Academy"],
        pricing: "Freemium",
        rating: 4.6,
        users: "5M+",
      },
      {
        name: "Socratic",
        company: "Google",
        description: "Ajuda com dúvidas escolares via IA.",
        link: "https://socratic.org/",
        features: ["Escolar", "Dúvidas", "Google"],
        pricing: "Gratuito",
        rating: 4.4,
        users: "10M+",
      },
    ],
  },
  multimodais: {
    name: "AI Multimodal Tools",
    description: "Ferramentas que processam múltiplos tipos de mídia.",
    tools: [
      {
        name: "GPT-4o",
        company: "OpenAI",
        description: "Suporte a texto, imagem e voz.",
        link: "https://chat.openai.com",
        features: ["Texto", "Imagem", "Voz"],
        pricing: "Freemium",
        rating: 4.8,
        users: "100M+",
      },
      {
        name: "Gemini 1.5 Pro",
        company: "Google",
        description: "Multimodal, com integração nativa a imagens e vídeos.",
        link: "https://gemini.google.com",
        features: ["Imagens", "Vídeos", "Integração"],
        pricing: "Freemium",
        rating: 4.7,
        users: "50M+",
      },
    ],
  },
  idiomas: {
    name: "AI Translation Tools",
    description: "Ferramentas especializadas em tradução e idiomas.",
    tools: [
      {
        name: "DeepL",
        company: "DeepL",
        description: "Tradutor automático com alta precisão.",
        link: "https://deepl.com",
        features: ["Alta Precisão", "Múltiplos Idiomas", "Contexto"],
        pricing: "Freemium",
        rating: 4.8,
        users: "1B+",
      },
      {
        name: "Google Translate",
        company: "Google",
        description: "Tradutor universal com IA.",
        link: "https://translate.google.com",
        features: ["Universal", "100+ Idiomas", "Gratuito"],
        pricing: "Gratuito",
        rating: 4.5,
        users: "500M+",
      },
    ],
  },
  "codigo-aberto": {
    name: "Open Source AI Tools",
    description: "Projetos de código aberto para adaptação e uso próprio.",
    tools: [
      {
        name: "Llama 3",
        company: "Meta",
        description: "Código aberto, fácil de customizar.",
        link: "https://llama.meta.com",
        features: ["Open Source", "Customizável", "Meta"],
        pricing: "Gratuito",
        rating: 4.6,
        users: "5M+",
      },
      {
        name: "Mistral 7B",
        company: "Mistral AI",
        description: "Modelos compactos e eficientes.",
        link: "https://mistral.ai",
        features: ["Compacto", "Eficiente", "Europeu"],
        pricing: "Gratuito",
        rating: 4.4,
        users: "2M+",
      },
    ],
  },
  imagens: {
    name: "AI Image Tools",
    description: "Ferramentas de IA para criar e editar imagens.",
    tools: [
      {
        name: "DALL-E 3",
        company: "OpenAI",
        description: "Geração de imagens de alta qualidade a partir de texto.",
        link: "https://openai.com/dall-e-3",
        features: ["Texto para Imagem", "Alta Qualidade", "OpenAI"],
        pricing: "Pago",
        rating: 4.8,
        users: "10M+",
      },
      {
        name: "Midjourney",
        company: "Midjourney",
        description: "Arte digital e imagens criativas com IA.",
        link: "https://midjourney.com",
        features: ["Arte Digital", "Criativo", "Comunidade"],
        pricing: "Pago",
        rating: 4.7,
        users: "5M+",
      },
    ],
  },
}

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
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

  const category = categoryData[params.slug as keyof typeof categoryData]

  if (!category) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background Hexagonal Pattern */}
        <div className="fixed inset-0 opacity-[0.04] pointer-events-none">
          <div className="absolute inset-0 bg-hexagon-pattern"></div>
        </div>

        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Categoria não encontrada
            </h1>
            <p className="text-gray-400 mb-8">A categoria "{params.slug}" não existe.</p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-semibold px-6 py-3 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-105 transition-all duration-300">
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

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
              <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/categorias" className="text-cyan-400 transition-all duration-300 relative group">
                Categorias
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400"></span>
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
                Home
              </Link>
              <Link href="/categorias" className="text-cyan-400 transition-colors duration-300">
                Categorias
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="relative z-10 pt-24 px-6 py-12">
        {/* Category Header */}
        <section
          className={`mb-16 transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
        >
          <div className="max-w-7xl mx-auto text-center mb-8">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                {category.name}
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {category.description}
            </p>
            <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                <span>{category.tools.length} ferramentas disponíveis</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.tools.map((tool, index) => (
              <Card
                key={tool.name}
                className={`group h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/60 transition-all duration-700 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 hover:bg-white/10 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
                style={{
                  animationDelay: `${300 + index * 100}ms`,
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                        {tool.name}
                      </CardTitle>
                      <p className="text-sm text-teal-400 font-medium">{tool.company}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-lg">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-semibold">{tool.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-300 text-sm leading-relaxed">{tool.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {tool.features.map((feature) => (
                      <Badge
                        key={feature}
                        variant="secondary"
                        className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/30 transition-colors duration-300 text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Users className="h-4 w-4 text-teal-400" />
                      <span>{tool.users}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-emerald-400" />
                      <span
                        className={`font-medium px-2 py-1 rounded-lg text-xs ${
                          tool.pricing === "Gratuito"
                            ? "bg-green-500/20 text-green-300"
                            : tool.pricing === "Freemium"
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-orange-500/20 text-orange-300"
                        }`}
                      >
                        {tool.pricing}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-semibold py-3 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-105 transition-all duration-300"
                    onClick={() => window.open(tool.link, "_blank")}
                  >
                    <span>Acessar Ferramenta</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section
          className={`text-center mt-32 py-20 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl border border-white/10 backdrop-blur-xl transition-all duration-1000 delay-800 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Explore Mais Categorias
            </h2>
            <p className="text-xl mb-12 text-gray-300 leading-relaxed">
              Descubra outras ferramentas de IA que podem transformar seu trabalho
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/">
                <Button className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black px-8 py-3 rounded-xl text-lg font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-105 transition-all duration-300">
                  Ver Todas as Categorias
                </Button>
              </Link>
              <Link href="/ferramentas">
                <Button
                  variant="outline"
                  className="border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 px-8 py-3 rounded-xl text-lg font-bold bg-transparent hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                >
                  Explorar Todas as Ferramentas
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
