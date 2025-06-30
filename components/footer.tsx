import Link from "next/link"
import { Github, Twitter, Instagram, Linkedin, MessageCircle, Phone, Globe, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/10 bg-gradient-to-b from-transparent to-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/50 group-hover:shadow-cyan-400/70 transition-all duration-300 group-hover:scale-110">
                  <span className="text-black font-bold text-2xl">U</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  UpFlux
                </span>
                <p className="text-sm text-cyan-400/80">AI Platform</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed max-w-md">
              Descubra as melhores ferramentas de IA organizadas em categorias especializadas. Desenvolvido com 💚 pela{" "}
              <span className="text-teal-400 font-semibold">CalangoFlux</span>
              para democratizar o acesso à inteligência artificial.
            </p>

            {/* Powered by CalangoFlux */}
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-xl border border-teal-500/20 backdrop-blur-sm">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">C</span>
              </div>
              <div>
                <p className="text-sm text-gray-300">Desenvolvido por</p>
                <a
                  href="https://www.calangoflux.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 font-semibold transition-colors duration-300 flex items-center space-x-1"
                >
                  <span>CalangoFlux</span>
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Links Rápidos</h3>
            <nav className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Categorias", href: "/categorias" },
                { name: "Todas as Ferramentas", href: "/ferramentas" },
                { name: "Blog", href: "/blog" },
                { name: "Sobre", href: "/sobre" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 transform"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Conecte-se</h3>

            {/* Contact Links */}
            <div className="space-y-4">
              <a
                href="https://wa.me/5522988324416"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="group-hover:translate-x-1 transform transition-transform duration-300">WhatsApp</span>
              </a>

              <a
                href="https://t.me/+Uh2Uc5-lNogxMDJh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="group-hover:translate-x-1 transform transition-transform duration-300">Telegram</span>
              </a>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-sm text-gray-400 mb-3">Siga a CalangoFlux:</p>
              <div className="flex space-x-3">
                {[
                  { icon: Github, href: "https://github.com/calangoflux", color: "hover:text-gray-300" },
                  { icon: Twitter, href: "https://twitter.com/calangoflux", color: "hover:text-blue-400" },
                  { icon: Instagram, href: "https://instagram.com/calangoflux", color: "hover:text-pink-400" },
                  { icon: Linkedin, href: "https://linkedin.com/company/calangoflux", color: "hover:text-blue-500" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 ${social.color} hover:bg-white/20 transition-all duration-300 hover:scale-110`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <span>© 2024 UpFlux. Todos os direitos reservados.</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <span>Licença MIT</span>
                </span>
                <span className="hidden md:block">•</span>
                <a
                  href="https://www.calangoflux.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-400 transition-colors duration-300"
                >
                  CalangoFlux
                </a>
              </div>
            </div>

            {/* Made with Love */}
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>e IA por</span>
              <a
                href="https://www.calangoflux.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 font-semibold transition-colors duration-300"
              >
                CalangoFlux
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent pointer-events-none"></div>
    </footer>
  )
}
