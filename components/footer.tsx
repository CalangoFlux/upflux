import Link from "next/link"
import { Github, Twitter, Instagram, Linkedin, MessageCircle, Phone, Globe } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 opacity-80 hover:opacity-100 transition-opacity duration-300"
          >
            <Image
              src="/images/AIdeaFlux_icon.png"
              alt="AideaFlux"
              width={32}
              height={32}
              className="hover:scale-110 transition-transform duration-300"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              AideaFlux
            </span>
          </Link>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a
              href="https://wa.me/5522988324416"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-green-400 transition-colors duration-300"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href="https://t.me/+Uh2Uc5-lNogxMDJh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-400 transition-colors duration-300"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/calangoflux"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-300 transition-colors duration-300"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com/calangoflux"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-400 transition-colors duration-300"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/calangoflux"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-pink-400 transition-colors duration-300"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/company/calangoflux"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-500 transition-colors duration-300"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://www.calangoflux.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-teal-400 transition-colors duration-300"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-500 space-y-2">
            <p>© 2025 AideaFlux. Todos os direitos reservados.</p>
            <p className="text-xs">
              Desenvolvido por{" "}
              <a
                href="https://www.calangoflux.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400/80 hover:text-teal-400 transition-colors duration-300"
              >
                CalangoFlux
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
