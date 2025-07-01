"use client"

import { useState, useEffect } from "react"
import { Menu, X, Mail, MessageCircle, Phone, Send, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/footer"

export default function Contato() {
  // -------------------- UI State --------------------
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // -------------------- Effects --------------------
  // Pretty cursor light
  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [])

  // Hide / show header on scroll
  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY
      if (cur < 10) setIsHeaderVisible(true)
      else if (cur > lastScrollY && cur > 100) setIsHeaderVisible(false)
      else if (cur < lastScrollY) setIsHeaderVisible(true)
      setLastScrollY(cur)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [lastScrollY])

  // Fade-in animation
  useEffect(() => setIsLoaded(true), [])

  // -------------------- Data --------------------
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      tagline: "Envie-nos um email",
      contact: "calangoflux@proton.me",
      action: "mailto:calangoflux@proton.me",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: "WhatsApp",
      tagline: "Converse via WhatsApp",
      contact: "+55 22 98832-4416",
      action: "https://wa.me/5522988324416",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: MessageCircle,
      title: "Telegram",
      tagline: "Nosso canal no Telegram",
      contact: "Grupo CalangoFlux",
      action: "https://t.me/+Uh2Uc5-lNogxMDJh",
      gradient: "from-blue-400 to-blue-600",
    },
  ] as const

  // -------------------- Render --------------------
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Hexagonal background */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute inset-0 bg-hexagon-pattern" />
      </div>

      {/* Cursor light */}
      <div
        className="fixed w-96 h-96 pointer-events-none transition-all duration-300 ease-out z-10"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background:
            "radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(20,184,166,0.1) 30%, rgba(6,182,212,0.05) 60%, transparent 100%)",
          filter: "blur(40px)",
        }}
      />

      {/* ------------ Header ------------ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl transition-all duration-500 ${
          isHeaderVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/images/AIdeaFlux_icon.png"
              alt="AideaFlux"
              width={40}
              height={40}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              AideaFlux
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm">
            {[
              { label: "Início", href: "/" },
              { label: "Diretório de IA", href: "/diretorio-de-ia" },
              { label: "Cursos de IA", href: "/cursos-de-ia" },
              { label: "Blog", href: "/blog" },
              { label: "Contato", href: "/contato" },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`relative group ${
                  href === "/contato" ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"
                } transition-colors`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 ${
                    href === "/contato" ? "w-full" : "w-0 group-hover:w-full"
                  } transition-all`}
                />
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-200 hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-black/40 backdrop-blur-xl">
            <nav className="flex flex-col p-6 space-y-4 text-lg">
              {[
                { label: "Início", href: "/" },
                { label: "Diretório de IA", href: "/diretorio-de-ia" },
                { label: "Cursos de IA", href: "/cursos-de-ia" },
                { label: "Blog", href: "/blog" },
                { label: "Contato", href: "/contato" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`${href === "/contato" ? "text-cyan-400" : "text-gray-300 hover:text-cyan-400"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ------------ Main ------------ */}
      <main className="relative z-10 pt-28 px-6 pb-20">
        {/* Title */}
        <section
          className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-700 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Contato
          </h1>
          <p className="text-xl text-gray-300">Conecte-se conosco através do canal que preferir.</p>
        </section>

        {/* Contact cards */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactMethods.map(({ icon: Icon, title, tagline, contact, action, gradient }, i) => (
            <Card
              key={title}
              className={`bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/60 hover:bg-white/10 transition-all duration-300 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <CardHeader className="text-center">
                <div
                  className={`mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">{title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p className="text-gray-400">{tagline}</p>
                <p className="font-medium text-cyan-400">{contact}</p>
                <Button
                  className={`w-full bg-gradient-to-r ${gradient} hover:brightness-110 text-white font-semibold`}
                  onClick={() => window.open(action, "_blank")}
                >
                  <Send className="w-4 h-4 mr-2" /> Entrar em Contato
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Extra info */}
        <section className="max-w-4xl mx-auto mt-24">
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
            <CardContent className="p-8 grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-semibold">Localização</h3>
                </div>
                <p className="text-gray-300 ml-7">Operamos remotamente, conectando-nos a todo o mundo.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-teal-400" />
                  <h3 className="font-semibold">Horário de atendimento</h3>
                </div>
                <p className="text-gray-300 ml-7">Segunda - Sexta, 09h-18h (GMT-3). Respondemos em até 24 h.</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* ------------ Footer ------------ */}
      <Footer />
    </div>
  )
}
