"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ExternalLink, Star, Users, Clock, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Footer from "@/components/footer"
import Image from "next/image"

// Dados completos das categorias com TODAS as LLMs organizadas
const categoryData = {
  generalistas: {
    name: "AI Productivity Tools",
    iconSrc: "/images/icons/processor.png",
    description: "Ferramentas de IA generalistas para aumentar sua produtividade e automatizar tarefas do dia a dia.",
    tools: [
      {
        name: "GPT-4o",
        company: "OpenAI",
        description: "Modelo multimodal avançado com alta performance em tarefas gerais e conversação.",
        link: "https://chat.openai.com",
        features: ["Multimodal", "Rápido", "Alta Performance"],
        pricing: "Freemium",
        rating: 4.8,
        users: "100M+",
      },
      {
        name: "Claude 3 Opus",
        company: "Anthropic",
        description: "IA focada em segurança e compreensão contextual profunda.",
        link: "https://claude.ai",
        features: ["Segurança", "Contexto", "Ética"],
        pricing: "Freemium",
        rating: 4.6,
        users: "10M+",
      },
      {
        name: "Gemini 1.5",
        company: "Google",
        description: "IA com foco em raciocínio e contexto longo, integrada aos produtos Google.",
        link: "https://gemini.google.com",
        features: ["Contexto Longo", "Raciocínio", "Integração Google"],
        pricing: "Gratuito",
        rating: 4.7,
        users: "50M+",
      },
      {
        name: "Qwen",
        company: "Alibaba",
        description: "Modelo multimodal open source com forte performance em benchmarks chineses.",
        link: "https://huggingface.co/Qwen",
        features: ["Open Source", "Multimodal", "Chinês"],
        pricing: "Gratuito",
        rating: 4.5,
        users: "5M+",
      },
      {
        name: "ERNIE 4.0",
        company: "Baidu",
        description: "Compreensão profunda e raciocínio, capacidades multimodais avançadas.",
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
      {
        name: "MPT-30B",
        company: "MosaicML",
        description: "Modelo canadense open-source otimizado para eficiência e customização.",
        link: "https://huggingface.co/mosaicml/mpt-30b",
        features: ["Open Source", "Eficiente", "Customizável"],
        pricing: "Gratuito",
        rating: 4.3,
        users: "1M+",
      },
      {
        name: "Noor",
        company: "ISTI Iran",
        description: "LLM iraniano focado em persa e idiomas regionais.",
        link: "https://ai.isti.ir/noor",
        features: ["Persa", "Regional", "Iraniano"],
        pricing: "Gratuito",
        rating: 3.9,
        users: "500K+",
      },
      {
        name: "LLaMA-2-CH",
        company: "EPFL Switzerland",
        description: "Adaptação suíça do LLaMA para alemão suíço e francês.",
        link: "https://huggingface.co/epfl-llama/llama-2-ch",
        features: ["Alemão Suíço", "Francês", "Suíça"],
        pricing: "Gratuito",
        rating: 4.1,
        users: "300K+",
      },
      {
        name: "Falcon-40B",
        company: "Technology Innovation Institute",
        description: "LLM open-source dos Emirados com alta performance em múltiplas tarefas.",
        link: "https://huggingface.co/tiiuae/falcon-40b",
        features: ["Open Source", "Alta Performance", "Emirados"],
        pricing: "Gratuito",
        rating: 4.4,
        users: "2M+",
      },
      {
        name: "Vicuna-13B",
        company: "UC Berkeley",
        description: "LLM open-source americano baseado em LLaMA com fine-tuning conversacional.",
        link: "https://huggingface.co/lmsys/vicuna-13b-v1.5",
        features: ["Conversacional", "Open Source", "Americano"],
        pricing: "Gratuito",
        rating: 4.2,
        users: "1.5M+",
      },
      {
        name: "Alpaca",
        company: "Stanford",
        description: "LLM de Stanford baseado em LLaMA com treinamento de instrução.",
        link: "https://github.com/tatsu-lab/stanford_alpaca",
        features: ["Instrução", "Stanford", "Open Source"],
        pricing: "Gratuito",
        rating: 4.1,
        users: "800K+",
      },
      {
        name: "Dolly 2.0",
        company: "Databricks",
        description: "LLM open-source comercialmente viável treinado em dados de alta qualidade.",
        link: "https://huggingface.co/databricks/dolly-v2-12b",
        features: ["Comercial", "Alta Qualidade", "Open Source"],
        pricing: "Gratuito",
        rating: 4.0,
        users: "600K+",
      },
      {
        name: "StableLM",
        company: "Stability AI",
        description: "Família de LLMs open-source com diferentes tamanhos e capacidades.",
        link: "https://github.com/Stability-AI/StableLM",
        features: ["Família de Modelos", "Diferentes Tamanhos", "Open Source"],
        pricing: "Gratuito",
        rating: 4.2,
        users: "1M+",
      },
      {
        name: "RedPajama",
        company: "Together",
        description: "LLM open-source treinado em dataset reproduzível de alta qualidade.",
        link: "https://huggingface.co/togethercomputer/RedPajama-INCITE-7B-Chat",
        features: ["Dataset Reproduzível", "Alta Qualidade", "Open Source"],
        pricing: "Gratuito",
        rating: 4.1,
        users: "700K+",
      },
      {
        name: "OpenAssistant",
        company: "LAION",
        description: "Assistente conversacional open-source treinado com feedback humano.",
        link: "https://huggingface.co/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
        features: ["Feedback Humano", "Conversacional", "Open Source"],
        pricing: "Gratuito",
        rating: 4.0,
        users: "500K+",
      },
    ],
  },
  programacao: {
    name: "AI Code Tools",
    iconSrc: "/images/icons/code-tools.png",
    description: "Ferramentas especializadas em programação, desenvolvimento e análise de código.",
    tools: [
      {
        name: "GitHub Copilot",
        company: "GitHub + OpenAI",
        description: "Assistente de programação que sugere código em tempo real.",
        link: "https://github.com/features/copilot",
        features: ["Tempo Real", "Múltiplas Linguagens", "VS Code"],
        pricing: "Pago",
        rating: 4.7,
        users: "5M+",
      },
      {
        name: "Code Llama",
        company: "Meta",
        description: "LLM especializado em geração e explicação de código.",
        link: "https://code.meta.com/llama",
        features: ["Geração", "Explicação", "Open Source"],
        pricing: "Gratuito",
        rating: 4.5,
        users: "2M+",
      },
      {
        name: "Tabnine",
        company: "Tabnine",
        description: "Assistente de código com IA que aprende seu estilo de programação.",
        link: "https://tabnine.com",
        features: ["Personalizado", "Privacidade", "Múltiplas IDEs"],
        pricing: "Freemium",
        rating: 4.4,
        users: "1M+",
      },
      {
        name: "CodeGeeX2",
        company: "THUDM",
        description: "LLM multilíngue open source com suporte a 20+ linguagens.",
        link: "https://huggingface.co/THUDM/codegeex2-6b",
        features: ["Multilíngue", "Open Source", "20+ Linguagens"],
        pricing: "Gratuito",
        rating: 4.4,
        users: "800K+",
      },
      {
        name: "StarCoder",
        company: "BigCode",
        description: "LLM de código open-source com forte performance multilíngue.",
        link: "https://huggingface.co/bigcode/starcoder",
        features: ["Open Source", "Multilíngue", "BigCode"],
        pricing: "Gratuito",
        rating: 4.5,
        users: "1.2M+",
      },
      {
        name: "AlphaCode",
        company: "DeepMind",
        description: "Modelo especializado em programação competitiva e resolução de problemas.",
        link: "https://deepmind.com/research/highlighted-research/alphacode",
        features: ["Programação Competitiva", "DeepMind", "Resolução"],
        pricing: "Pesquisa",
        rating: 4.6,
        users: "200K+",
      },
      {
        name: "CodeT5",
        company: "Salesforce",
        description: "Modelo encoder-decoder para tarefas de compreensão e geração de código.",
        link: "https://github.com/salesforce/CodeT5",
        features: ["Encoder-Decoder", "Compreensão", "Salesforce"],
        pricing: "Gratuito",
        rating: 4.2,
        users: "500K+",
      },
      {
        name: "InCoder",
        company: "Meta",
        description: "Modelo de código que suporta preenchimento bidirecional.",
        link: "https://github.com/dpfried/incoder",
        features: ["Bidirecional", "Preenchimento", "Meta"],
        pricing: "Gratuito",
        rating: 4.1,
        users: "400K+",
      },
      {
        name: "CodeParrot",
        company: "Hugging Face",
        description: "Modelo GPT treinado em código Python do GitHub.",
        link: "https://huggingface.co/codeparrot/codeparrot",
        features: ["Python", "GitHub", "GPT"],
        pricing: "Gratuito",
        rating: 4.0,
        users: "600K+",
      },
      {
        name: "SantaCoder",
        company: "BigCode",
        description: "Modelo de código open-source focado em Python, Java e JavaScript.",
        link: "https://huggingface.co/bigcode/santacoder",
        features: ["Python", "Java", "JavaScript"],
        pricing: "Gratuito",
        rating: 4.3,
        users: "700K+",
      },
    ],
  },
  negocios: {
    name: "AI Business Tools",
    iconSrc: "/images/icons/business-tools.png",
    description: "Ferramentas de IA para otimizar processos de negócios.",
    tools: [
      {
        name: "Microsoft 365 Copilot",
        company: "Microsoft",
        description: "IA integrada ao Office 365 para automação e produtividade.",
        link: "https://www.microsoft.com/en-us/microsoft-365/copilot",
        features: ["Office 365", "Automação", "Produtividade"],
        pricing: "Pago",
        rating: 4.6,
        users: "50M+",
      },
      {
        name: "Google Workspace AI",
        company: "Google",
        description: "IA integrada ao Google Workspace para automação e colaboração.",
        link: "https://workspace.google.com/intl/en/ai/",
        features: ["Google Workspace", "Automação", "Colaboração"],
        pricing: "Pago",
        rating: 4.5,
        users: "30M+",
      },
      {
        name: "Jasper AI",
        company: "Jasper",
        description: "Assistente de IA para criação de conteúdo de marketing.",
        link: "https://jasper.ai",
        features: ["Marketing", "Conteúdo", "Geração"],
        pricing: "Pago",
        rating: 4.4,
        users: "1M+",
      },
      {
        name: "Surfer SEO",
        company: "Surfer",
        description: "IA para otimização de conteúdo SEO e pesquisa de palavras-chave.",
        link: "https://surferseo.com",
        features: ["SEO", "Otimização", "Palavras-chave"],
        pricing: "Pago",
        rating: 4.3,
        users: "500K+",
      },
      {
        name: "Copy.ai",
        company: "Copy.ai",
        description: "Geração de textos de marketing e vendas com IA.",
        link: "https://www.copy.ai",
        features: ["Marketing", "Vendas", "Geração"],
        pricing: "Freemium",
        rating: 4.2,
        users: "800K+",
      },
      {
        name: "Simplified",
        company: "Simplified",
        description: "Plataforma de design gráfico e vídeo com IA.",
        link: "https://simplified.com",
        features: ["Design Gráfico", "Vídeo", "IA"],
        pricing: "Freemium",
        rating: 4.1,
        users: "1M+",
      },
      {
        name: "Synthesia AI Avatars",
        company: "Synthesia",
        description: "Crie vídeos com avatares de IA para comunicação empresarial.",
        link: "https://www.synthesia.io/avatars",
        features: ["Avatares", "Vídeos", "Comunicação"],
        pricing: "Pago",
        rating: 4.5,
        users: "200K+",
      },
      {
        name: "Otter.ai",
        company: "Otter.ai",
        description: "Transcrição e resumo de reuniões com IA.",
        link: "https://otter.ai",
        features: ["Transcrição", "Resumo", "Reuniões"],
        pricing: "Freemium",
        rating: 4.4,
        users: "5M+",
      },
      {
        name: "Fireflies.ai",
        company: "Fireflies.ai",
        description: "Assistente de reunião com IA que grava e transcreve.",
        link: "https://fireflies.ai",
        features: ["Reunião", "Gravação", "Transcrição"],
        pricing: "Freemium",
        rating: 4.3,
        users: "1M+",
      },
      {
        name: "Krisp",
        company: "Krisp",
        description: "Remoção de ruído de fundo com IA para chamadas.",
        link: "https://krisp.ai",
        features: ["Remoção de Ruído", "Chamadas", "IA"],
        pricing: "Freemium",
        rating: 4.2,
        users: "3M+",
      },
    ],
  },
  educacao: {
    name: "AI Education Tools",
    iconSrc: "/images/icons/thinking.png",
    description: "Ferramentas de IA para educação e aprendizado.",
    tools: [
      {
        name: "Khan Academy Khanmigo",
        company: "Khan Academy",
        description: "Tutor virtual personalizado para estudantes da Khan Academy.",
        link: "https://www.khanacademy.org/khan-labs",
        features: ["Tutor", "Personalizado", "Khan Academy"],
        pricing: "Freemium",
        rating: 4.6,
        users: "5M+",
      },
      {
        name: "Duolingo Max",
        company: "Duolingo",
        description: "Aprendizado de idiomas com IA e feedback personalizado.",
        link: "https://blog.duolingo.com/duolingo-max/",
        features: ["Idiomas", "Personalizado", "IA"],
        pricing: "Freemium",
        rating: 4.5,
        users: "10M+",
      },
      {
        name: "Quizlet Q-Chat",
        company: "Quizlet",
        description: "Flashcards e ferramentas de estudo com IA.",
        link: "https://quizlet.com/features/q-chat",
        features: ["Flashcards", "Estudo", "IA"],
        pricing: "Freemium",
        rating: 4.4,
        users: "8M+",
      },
      {
        name: "Brainly Tutor",
        company: "Brainly",
        description: "Ajuda com lição de casa e perguntas com IA.",
        link: "https://brainly.com/tutor",
        features: ["Lição de Casa", "Perguntas", "IA"],
        pricing: "Freemium",
        rating: 4.3,
        users: "15M+",
      },
      {
        name: "Socratic by Google",
        company: "Google",
        description: "Ajuda com dúvidas escolares via IA e reconhecimento de imagem.",
        link: "https://socratic.org/",
        features: ["Escolar", "Dúvidas", "Google"],
        pricing: "Gratuito",
        rating: 4.4,
        users: "10M+",
      },
      {
        name: "iFlytek AI Tutor",
        company: "iFlytek",
        description: "Tutor virtual para educação básica e superior com tecnologia chinesa.",
        link: "https://www.iflytek.com/en/spark/",
        features: ["Tutor Virtual", "Chinês", "Educação"],
        pricing: "Freemium",
        rating: 4.3,
        users: "2M+",
      },
      {
        name: "Gradescope by Turnitin",
        company: "Turnitin",
        description: "Feedback e avaliação de trabalhos com IA.",
        link: "https://www.turnitin.com/products/gradescope",
        features: ["Feedback", "Avaliação", "IA"],
        pricing: "Pago",
        rating: 4.2,
        users: "1M+",
      },
      {
        name: "Albert AI",
        company: "Albert.io",
        description: "Plataforma de prática e preparação para exames com IA.",
        link: "https://www.albert.io/",
        features: ["Prática", "Exames", "IA"],
        pricing: "Pago",
        rating: 4.1,
        users: "500K+",
      },
      {
        name: "Century Tech",
        company: "Century Tech",
        description: "Plataforma de aprendizado personalizado com IA.",
        link: "https://www.century.tech/",
        features: ["Personalizado", "Aprendizado", "IA"],
        pricing: "Pago",
        rating: 4.0,
        users: "300K+",
      },
      {
        name: "Med-PaLM 2",
        company: "Google",
        description: "LLM médico do Google especializado em questões de saúde e medicina.",
        link: "https://sites.research.google/med-palm/",
        features: ["Medicina", "Google", "Especializado"],
        pricing: "Pesquisa",
        rating: 4.7,
        users: "50K+",
      },
    ],
  },
  multimodais: {
    name: "AI Multimodal Tools",
    iconSrc: "/images/icons/professional-video-camera.png",
    description: "Ferramentas que processam múltiplos tipos de mídia.",
    tools: [
      {
        name: "GPT-4V",
        company: "OpenAI",
        description: "Versão visual do GPT-4 com capacidades de visão computacional avançadas.",
        link: "https://chat.openai.com",
        features: ["Visão", "Texto", "Análise de Imagem"],
        pricing: "Pago",
        rating: 4.8,
        users: "50M+",
      },
      {
        name: "Gemini Pro Vision",
        company: "Google",
        description: "Modelo multimodal do Google com capacidades avançadas de visão e texto.",
        link: "https://gemini.google.com",
        features: ["Visão", "Texto", "Google"],
        pricing: "Freemium",
        rating: 4.7,
        users: "30M+",
      },
      {
        name: "Claude 3 Vision",
        company: "Anthropic",
        description: "Versão multimodal do Claude com análise de imagens e documentos.",
        link: "https://claude.ai",
        features: ["Análise de Imagem", "Documentos", "Segurança"],
        pricing: "Freemium",
        rating: 4.6,
        users: "8M+",
      },
      {
        name: "ERNIE-ViLG",
        company: "Baidu",
        description: "Geração de imagens a partir de texto com tecnologia chinesa avançada.",
        link: "https://github.com/PaddlePaddle/PaddleGAN/tree/develop/applications/ERNIE-ViLG",
        features: ["Texto para Imagem", "Chinês", "Open Source"],
        pricing: "Gratuito",
        rating: 4.3,
        users: "300K+",
      },
      {
        name: "SenseNova",
        company: "SenseTime",
        description: "Modelo multimodal chinês com aplicações em vídeo, imagem e texto.",
        link: "https://www.sensetime.com/en/technology/sensenova",
        features: ["Vídeo", "Imagem", "Texto"],
        pricing: "Pago",
        rating: 4.4,
        users: "500K+",
      },
      {
        name: "YandexGPT Multimodal",
        company: "Yandex",
        description: "Modelo multimodal russo integrado aos produtos Yandex.",
        link: "https://yandex.ru/ai/gpt",
        features: ["Multimodal", "Integração", "Russo"],
        pricing: "Freemium",
        rating: 4.2,
        users: "2M+",
      },
      {
        name: "HyperCLOVA X",
        company: "Naver",
        description: "Modelo multimodal coreano com forte suporte para coreano e inglês.",
        link: "https://clova.ai/en/tech/hyperclova.html",
        features: ["Coreano", "Inglês", "Multimodal"],
        pricing: "Pago",
        rating: 4.3,
        users: "800K+",
      },
      {
        name: "KoGPT Multimodal",
        company: "Kakao",
        description: "Modelo multimodal coreano com API pública para desenvolvedores.",
        link: "https://developers.kakao.com/ko/docs/latest/ko/kogpt/rest",
        features: ["Coreano", "API Pública", "Desenvolvedores"],
        pricing: "Freemium",
        rating: 4.1,
        users: "600K+",
      },
      {
        name: "LLaVA",
        company: "University of Wisconsin-Madison",
        description: "Large Language and Vision Assistant open-source para análise visual.",
        link: "https://github.com/haotian-liu/LLaVA",
        features: ["Visão", "Open Source", "Análise Visual"],
        pricing: "Gratuito",
        rating: 4.4,
        users: "400K+",
      },
      {
        name: "MiniGPT-4",
        company: "King Abdullah University",
        description: "Modelo multimodal compacto com capacidades de visão e linguagem.",
        link: "https://github.com/Vision-CAIR/MiniGPT-4",
        features: ["Compacto", "Visão", "Linguagem"],
        pricing: "Gratuito",
        rating: 4.2,
        users: "300K+",
      },
      {
        name: "InstructBLIP",
        company: "Salesforce",
        description: "Modelo de visão e linguagem treinado com instruções para tarefas visuais.",
        link: "https://github.com/salesforce/LAVIS/tree/main/projects/instructblip",
        features: ["Instruções", "Tarefas Visuais", "Salesforce"],
        pricing: "Gratuito",
        rating: 4.3,
        users: "250K+",
      },
      {
        name: "BLIP-2",
        company: "Salesforce",
        description: "Modelo de visão e linguagem com arquitetura Q-Former inovadora.",
        link: "https://github.com/salesforce/LAVIS/tree/main/projects/blip2",
        features: ["Q-Former", "Visão", "Linguagem"],
        pricing: "Gratuito",
        rating: 4.4,
        users: "500K+",
      },
      {
        name: "Flamingo",
        company: "DeepMind",
        description: "Modelo few-shot learning para tarefas de visão e linguagem.",
        link: "https://deepmind.com/research/publications/2022/flamingo-a-visual-language-model-for-few-shot-learning",
        features: ["Few-shot", "Visão", "DeepMind"],
        pricing: "Pesquisa",
        rating: 4.5,
        users: "100K+",
      },
      {
        name: "KOSMOS-1",
        company: "Microsoft",
        description: "Modelo multimodal da Microsoft para compreensão de linguagem e visão.",
        link: "https://github.com/microsoft/unilm/tree/master/kosmos-1",
        features: ["Compreensão", "Microsoft", "Multimodal"],
        pricing: "Pesquisa",
        rating: 4.3,
        users: "200K+",
      },
      {
        name: "PaLM-E",
        company: "Google",
        description: "Modelo embodied multimodal para robótica e tarefas do mundo real.",
        link: "https://palm-e.github.io/",
        features: ["Robótica", "Mundo Real", "Embodied"],
        pricing: "Pesquisa",
        rating: 4.4,
        users: "150K+",
      },
    ],
  },
  idiomas: {
    name: "AI Translation Tools",
    iconSrc: "/images/icons/microsoft-translator.png",
    description: "Ferramentas especializadas em tradução e idiomas.",
    tools: [
      {
        name: "DeepL",
        company: "DeepL",
        description: "Tradutor automático com precisão superior e compreensão contextual.",
        link: "https://deepl.com",
        features: ["Alta Precisão", "Múltiplos Idiomas", "Contexto"],
        pricing: "Freemium",
        rating: 4.8,
        users: "1B+",
      },
      {
        name: "Google Translate",
        company: "Google",
        description: "Tradutor universal com suporte a mais de 100 idiomas.",
        link: "https://translate.google.com",
        features: ["Universal", "100+ Idiomas", "Gratuito"],
        pricing: "Gratuito",
        rating: 4.5,
        users: "500M+",
      },
      {
        name: "Microsoft Translator",
        company: "Microsoft",
        description: "Serviço de tradução da Microsoft com API e integração empresarial.",
        link: "https://translator.microsoft.com",
        features: ["API", "Empresarial", "Microsoft"],
        pricing: "Freemium",
        rating: 4.4,
        users: "100M+",
      },
      {
        name: "Papago",
        company: "Naver",
        description: "Tradução multilíngue com IA coreana e forte suporte asiático.",
        link: "https://papago.naver.com/",
        features: ["Coreano", "Multilíngue", "Asiático"],
        pricing: "Gratuito",
        rating: 4.5,
        users: "50M+",
      },
      {
        name: "Yandex Translate",
        company: "Yandex",
        description: "Tradutor russo com forte suporte para idiomas eslavos.",
        link: "https://translate.yandex.com",
        features: ["Russo", "Idiomas Eslavos", "Yandex"],
        pricing: "Gratuito",
        rating: 4.3,
        users: "30M+",
      },
      {
        name: "Baidu Translate",
        company: "Baidu",
        description: "Tradutor chinês com especialização em idiomas asiáticos.",
        link: "https://fanyi.baidu.com",
        features: ["Chinês", "Idiomas Asiáticos", "Baidu"],
        pricing: "Gratuito",
        rating: 4.4,
        users: "200M+",
      },
      {
        name: "Amazon Translate",
        company: "Amazon",
        description: "Serviço de tradução neural da AWS para aplicações empresariais.",
        link: "https://aws.amazon.com/translate/",
        features: ["Neural", "AWS", "Empresarial"],
        pricing: "Pago",
        rating: 4.2,
        users: "10M+",
      },
      {
        name: "Systran",
        company: "Systran",
        description: "Tradutor empresarial com foco em segurança e privacidade.",
        link: "https://systran.net",
        features: ["Empresarial", "Segurança", "Privacidade"],
        pricing: "Pago",
        rating: 4.1,
        users: "5M+",
      },
      {
        name: "ModernMT",
        company: "ModernMT",
        description: "Tradutor automático adaptativo para empresas e tradutores.",
        link: "https://www.modernmt.com/",
        features: ["Adaptativo", "Empresas", "Tradutores"],
        pricing: "Pago",
        rating: 4.0,
        users: "1M+",
      },
      {
        name: "Lilt",
        company: "Lilt",
        description: "Plataforma de tradução adaptativa com IA para equipes.",
        link: "https://lilt.com/",
        features: ["Adaptativa", "Equipes", "IA"],
        pricing: "Pago",
        rating: 4.2,
        users: "500K+",
      },
      {
        name: "Bing Chat",
        company: "Microsoft",
        description: "Busca conversacional integrada com GPT-4 e acesso à web em tempo real.",
        link: "https://www.bing.com/chat",
        features: ["GPT-4", "Web Real-time", "Conversacional"],
        pricing: "Gratuito",
        rating: 4.5,
        users: "100M+",
      },
      {
        name: "Perplexity AI",
        company: "Perplexity",
        description: "Motor de busca conversacional com citações e fontes verificadas.",
        link: "https://perplexity.ai",
        features: ["Citações", "Fontes", "Conversacional"],
        pricing: "Freemium",
        rating: 4.6,
        users: "10M+",
      },
    ],
  },
  music: {
    name: "Music AI Tools",
    iconSrc: "/images/icons/musical-notes.png",
    description: "Ferramentas de IA para criação e produção musical.",
    tools: [
      {
        name: "AIVA",
        company: "AIVA Technologies",
        description: "Compositor de IA que cria trilhas sonoras originais.",
        link: "https://aiva.ai",
        features: ["Composição", "Trilhas Sonoras", "Múltiplos Gêneros"],
        pricing: "Freemium",
        rating: 4.5,
        users: "200K+",
      },
      {
        name: "Amper Music",
        company: "Shutterstock",
        description: "Plataforma de IA para criação de música personalizada.",
        link: "https://www.ampermusic.com",
        features: ["Música Personalizada", "Licenciamento", "API"],
        pricing: "Pago",
        rating: 4.3,
        users: "100K+",
      },
      {
        name: "Soundraw",
        company: "Soundraw",
        description: "Gerador de música com IA para criadores de conteúdo.",
        link: "https://soundraw.io",
        features: ["Royalty-Free", "Customização", "Download"],
        pricing: "Freemium",
        rating: 4.4,
        users: "500K+",
      },
      {
        name: "Mubert",
        company: "Mubert",
        description: "IA que gera música ambiente em tempo real.",
        link: "https://mubert.com",
        features: ["Tempo Real", "Streaming", "API"],
        pricing: "Freemium",
        rating: 4.2,
        users: "2M+",
      },
      {
        name: "Boomy",
        company: "Boomy",
        description: "Crie e publique música original com IA em minutos.",
        link: "https://boomy.com",
        features: ["Criação Rápida", "Publicação", "Monetização"],
        pricing: "Freemium",
        rating: 4.1,
        users: "1M+",
      },
      {
        name: "Jukebox",
        company: "OpenAI",
        description: "Modelo neural que gera música com canto em vários gêneros.",
        link: "https://openai.com/research/jukebox",
        features: ["Canto", "Vários Gêneros", "OpenAI"],
        pricing: "Pesquisa",
        rating: 4.4,
        users: "150K+",
      },
      {
        name: "MuseNet",
        company: "OpenAI",
        description: "Rede neural que pode gerar composições musicais de 4 minutos.",
        link: "https://openai.com/research/musenet",
        features: ["Composições", "4 Minutos", "OpenAI"],
        pricing: "Pesquisa",
        rating: 4.3,
        users: "100K+",
      },
      {
        name: "Loudly",
        company: "Loudly",
        description: "Plataforma de música gerada por IA para criadores.",
        link: "https://loudly.com",
        features: ["Criadores", "Plataforma", "IA"],
        pricing: "Freemium",
        rating: 4.0,
        users: "300K+",
      },
      {
        name: "Beatoven.ai",
        company: "Beatoven",
        description: "Crie música original livre de royalties para seus vídeos.",
        link: "https://beatoven.ai",
        features: ["Livre de Royalties", "Vídeos", "Original"],
        pricing: "Freemium",
        rating: 4.2,
        users: "250K+",
      },
      {
        name: "Endel",
        company: "Endel",
        description: "IA que cria soundscapes adaptativos para foco e relaxamento.",
        link: "https://endel.io",
        features: ["Soundscapes", "Adaptativo", "Foco"],
        pricing: "Freemium",
        rating: 4.3,
        users: "800K+",
      },
      {
        name: "ElevenLabs",
        company: "ElevenLabs",
        description: "Síntese de voz com IA ultra-realista em múltiplos idiomas.",
        link: "https://elevenlabs.io",
        features: ["Voz Realista", "Clonagem de Voz", "Múltiplos Idiomas"],
        pricing: "Freemium",
        rating: 4.7,
        users: "3M+",
      },
      {
        name: "Murf AI",
        company: "Murf",
        description: "Plataforma de text-to-speech com vozes naturais.",
        link: "https://murf.ai",
        features: ["Text-to-Speech", "Vozes Naturais", "Edição Avançada"],
        pricing: "Freemium",
        rating: 4.3,
        users: "1M+",
      },
      {
        name: "Resemble AI",
        company: "Resemble AI",
        description: "Clonagem de voz e síntese de fala com tecnologia neural.",
        link: "https://resemble.ai",
        features: ["Clonagem de Voz", "Neural", "API"],
        pricing: "Pago",
        rating: 4.4,
        users: "500K+",
      },
      {
        name: "Speechify",
        company: "Speechify",
        description: "Converte texto em áudio com vozes naturais.",
        link: "https://speechify.com",
        features: ["Acessibilidade", "Vozes Naturais", "Mobile"],
        pricing: "Freemium",
        rating: 4.5,
        users: "5M+",
      },
      {
        name: "Replica Studios",
        company: "Replica Studios",
        description: "Vozes de IA para jogos, filmes e conteúdo interativo.",
        link: "https://replicastudios.com",
        features: ["Jogos", "Filmes", "Interativo"],
        pricing: "Pago",
        rating: 4.2,
        users: "200K+",
      },
    ],
  },
  imagens: {
    name: "AI Image Tools",
    iconSrc: "/images/icons/paint-palette.png",
    description: "Ferramentas de IA para criar e editar imagens.",
    tools: [
      {
        name: "DALL-E 3",
        company: "OpenAI",
        description: "Gerador de imagens de alta qualidade a partir de descrições textuais.",
        link: "https://openai.com/dall-e-3",
        features: ["Texto para Imagem", "Alta Qualidade", "OpenAI"],
        pricing: "Pago",
        rating: 4.8,
        users: "10M+",
      },
      {
        name: "Midjourney",
        company: "Midjourney",
        description: "Plataforma de arte digital com IA para criação de imagens artísticas.",
        link: "https://midjourney.com",
        features: ["Arte Digital", "Criativo", "Comunidade"],
        pricing: "Pago",
        rating: 4.7,
        users: "15M+",
      },
      {
        name: "Stable Diffusion",
        company: "Stability AI",
        description: "Modelo open source para geração de imagens com controle avançado.",
        link: "https://stability.ai",
        features: ["Open Source", "Customizável", "Controle Avançado"],
        pricing: "Gratuito",
        rating: 4.6,
        users: "20M+",
      },
      {
        name: "Adobe Firefly",
        company: "Adobe",
        description: "IA generativa da Adobe integrada ao Creative Suite.",
        link: "https://firefly.adobe.com",
        features: ["Creative Suite", "Profissional", "Adobe"],
        pricing: "Freemium",
        rating: 4.5,
        users: "8M+",
      },
      {
        name: "Leonardo AI",
        company: "Leonardo.ai",
        description: "Plataforma para criação de arte digital e design gráfico com IA.",
        link: "https://leonardo.ai",
        features: ["Arte Digital", "Design Gráfico", "Plataforma"],
        pricing: "Freemium",
        rating: 4.4,
        users: "3M+",
      },
      {
        name: "Kandinsky 3.0",
        company: "Sber AI",
        description: "IA russa para geração de imagens artísticas com estilo único.",
        link: "https://fusionbrain.ai/",
        features: ["Artístico", "Russo", "Estilo Único"],
        pricing: "Freemium",
        rating: 4.3,
        users: "1M+",
      },
      {
        name: "Imagen 2",
        company: "Google",
        description: "Gerador de imagens do Google com alta fidelidade fotorrealística.",
        link: "https://imagen.research.google/",
        features: ["Fotorrealística", "Alta Fidelidade", "Google"],
        pricing: "Pesquisa",
        rating: 4.5,
        users: "500K+",
      },
      {
        name: "Parti",
        company: "Google",
        description: "Modelo de geração de imagens com compreensão textual avançada.",
        link: "https://parti.research.google/",
        features: ["Compreensão Textual", "Avançado", "Google"],
        pricing: "Pesquisa",
        rating: 4.4,
        users: "300K+",
      },
      {
        name: "Bing Image Creator",
        company: "Microsoft",
        description: "Gerador de imagens integrado ao Bing com tecnologia DALL-E.",
        link: "https://www.bing.com/images/create",
        features: ["DALL-E", "Integrado", "Microsoft"],
        pricing: "Gratuito",
        rating: 4.2,
        users: "25M+",
      },
      {
        name: "Waifu Diffusion",
        company: "Waifu Diffusion",
        description: "Modelo especializado em arte anime e manga com estilo japonês.",
        link: "https://huggingface.co/hakurei/waifu-diffusion",
        features: ["Anime", "Manga", "Japonês"],
        pricing: "Gratuito",
        rating: 4.3,
        users: "2M+",
      },
      {
        name: "RunwayML",
        company: "Runway",
        description: "Suite completa de ferramentas de IA para criação e edição de vídeos.",
        link: "https://runwayml.com",
        features: ["Edição Avançada", "Efeitos IA", "Tempo Real"],
        pricing: "Freemium",
        rating: 4.6,
        users: "3M+",
      },
      {
        name: "Synthesia",
        company: "Synthesia",
        description: "Crie vídeos com avatares de IA realistas em múltiplos idiomas.",
        link: "https://synthesia.io",
        features: ["Avatares IA", "Múltiplos Idiomas", "Sem Câmera"],
        pricing: "Pago",
        rating: 4.5,
        users: "1M+",
      },
      {
        name: "Descript",
        company: "Descript",
        description: "Editor de vídeo com IA que permite edição por texto.",
        link: "https://descript.com",
        features: ["Edição por Texto", "Clonagem de Voz", "IA"],
        pricing: "Freemium",
        rating: 4.4,
        users: "2M+",
      },
      {
        name: "Pictory",
        company: "Pictory",
        description: "Transforme texto em vídeos profissionais automaticamente.",
        link: "https://pictory.ai",
        features: ["Texto para Vídeo", "Automático", "Profissional"],
        pricing: "Pago",
        rating: 4.3,
        users: "500K+",
      },
      {
        name: "Luma AI",
        company: "Luma AI",
        description: "Criação de vídeos 3D e captura de realidade com NeRF.",
        link: "https://lumalabs.ai",
        features: ["3D", "NeRF", "Realidade"],
        pricing: "Freemium",
        rating: 4.5,
        users: "400K+",
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
            {/* Ícone da categoria */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 flex items-center justify-center">
                <Image
                  src={category.iconSrc || "/placeholder.svg"}
                  alt={category.name}
                  width={64}
                  height={64}
                  className="category-icon"
                />
              </div>
            </div>

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
              <Link href="/categorias">
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
