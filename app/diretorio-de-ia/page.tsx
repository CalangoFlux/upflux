"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, ExternalLink, Star, Users, Clock, Menu, X, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Footer from "@/components/footer"
import Image from "next/image"

// TODAS as LLMs organizadas por categoria - VERSÃO DEFINITIVA COMPLETA
const allAITools = [
  // ==================== AI PRODUCTIVITY TOOLS (GENERALISTAS) ====================
  {
    name: "GPT-4o",
    company: "OpenAI",
    category: "Produtividade",
    description: "Modelo multimodal avançado com alta performance em tarefas gerais e conversação.",
    link: "https://chat.openai.com",
    features: ["Multimodal", "Rápido", "Alta Performance"],
    pricing: "Freemium",
    rating: 4.8,
    users: "100M+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "Claude 3 Opus",
    company: "Anthropic",
    category: "Produtividade",
    description: "IA focada em segurança e compreensão contextual profunda.",
    link: "https://claude.ai",
    features: ["Segurança", "Contexto", "Ética"],
    pricing: "Freemium",
    rating: 4.6,
    users: "10M+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "Gemini 1.5",
    company: "Google",
    category: "Produtividade",
    description: "IA com foco em raciocínio e contexto longo, integrada aos produtos Google.",
    link: "https://gemini.google.com",
    features: ["Contexto Longo", "Raciocínio", "Integração Google"],
    pricing: "Gratuito",
    rating: 4.7,
    users: "50M+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "Qwen",
    company: "Alibaba",
    category: "Produtividade",
    description: "Modelo multimodal open source com forte performance em benchmarks chineses.",
    link: "https://huggingface.co/Qwen",
    features: ["Open Source", "Multimodal", "Chinês"],
    pricing: "Gratuito",
    rating: 4.5,
    users: "5M+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "ERNIE 4.0",
    company: "Baidu",
    category: "Produtividade",
    description: "Compreensão profunda e raciocínio, capacidades multimodais avançadas.",
    link: "https://wenxin.baidu.com/",
    features: ["Raciocínio", "Multimodal", "Chinês"],
    pricing: "Freemium",
    rating: 4.4,
    users: "20M+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "YaLM 100B",
    company: "Yandex",
    category: "Produtividade",
    description: "Modelo de 100 bilhões de parâmetros para múltiplas tarefas gerais.",
    link: "https://yandex.com/company/research/technologies/yalm",
    features: ["100B Parâmetros", "Russo", "Multilíngue"],
    pricing: "Gratuito",
    rating: 4.3,
    users: "2M+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "Luminous",
    company: "Aleph Alpha",
    category: "Produtividade",
    description: "Modelo europeu focado em transparência e explicabilidade.",
    link: "https://www.aleph-alpha.com/luminous",
    features: ["Transparência", "Europeu", "Explicável"],
    pricing: "Pago",
    rating: 4.2,
    users: "500K+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "GigaChat",
    company: "Sber",
    category: "Produtividade",
    description: "LLM conversacional para chat, busca e integração empresarial.",
    link: "https://gigachat.sber.ru/",
    features: ["Conversacional", "Empresarial", "Russo"],
    pricing: "Freemium",
    rating: 4.1,
    users: "3M+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "Cohere Command R",
    company: "Cohere",
    category: "Produtividade",
    description: "LLM canadense para uso empresarial e geral, forte suporte multilíngue.",
    link: "https://cohere.com/products/command",
    features: ["Empresarial", "Multilíngue", "Canadense"],
    pricing: "Pago",
    rating: 4.4,
    users: "1M+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "Jais",
    company: "Technology Innovation Institute",
    category: "Produtividade",
    description: "LLM principal dos Emirados Árabes, otimizado para árabe/inglês.",
    link: "https://jais.tii.ae/",
    features: ["Árabe", "Inglês", "Oriente Médio"],
    pricing: "Gratuito",
    rating: 4.0,
    users: "800K+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "MPT-30B",
    company: "MosaicML",
    category: "Produtividade",
    description: "Modelo canadense open-source otimizado para eficiência e customização.",
    link: "https://huggingface.co/mosaicml/mpt-30b",
    features: ["Open Source", "Eficiente", "Customizável"],
    pricing: "Gratuito",
    rating: 4.3,
    users: "1M+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "Noor",
    company: "ISTI Iran",
    category: "Produtividade",
    description: "LLM iraniano focado em persa e idiomas regionais.",
    link: "https://ai.isti.ir/noor",
    features: ["Persa", "Regional", "Iraniano"],
    pricing: "Gratuito",
    rating: 3.9,
    users: "500K+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "LLaMA-2-CH",
    company: "EPFL Switzerland",
    category: "Produtividade",
    description: "Adaptação suíça do LLaMA para alemão suíço e francês.",
    link: "https://huggingface.co/epfl-llama/llama-2-ch",
    features: ["Alemão Suíço", "Francês", "Suíça"],
    pricing: "Gratuito",
    rating: 4.1,
    users: "300K+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "Falcon-40B",
    company: "Technology Innovation Institute",
    category: "Produtividade",
    description: "LLM open-source dos Emirados com alta performance em múltiplas tarefas.",
    link: "https://huggingface.co/tiiuae/falcon-40b",
    features: ["Open Source", "Alta Performance", "Emirados"],
    pricing: "Gratuito",
    rating: 4.4,
    users: "2M+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "Vicuna-13B",
    company: "UC Berkeley",
    category: "Produtividade",
    description: "LLM open-source americano baseado em LLaMA com fine-tuning conversacional.",
    link: "https://huggingface.co/lmsys/vicuna-13b-v1.5",
    features: ["Conversacional", "Open Source", "Americano"],
    pricing: "Gratuito",
    rating: 4.2,
    users: "1.5M+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "Alpaca",
    company: "Stanford",
    category: "Produtividade",
    description: "LLM de Stanford baseado em LLaMA com treinamento de instrução.",
    link: "https://github.com/tatsu-lab/stanford_alpaca",
    features: ["Instrução", "Stanford", "Open Source"],
    pricing: "Gratuito",
    rating: 4.1,
    users: "800K+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "Dolly 2.0",
    company: "Databricks",
    category: "Produtividade",
    description: "LLM open-source comercialmente viável treinado em dados de alta qualidade.",
    link: "https://huggingface.co/databricks/dolly-v2-12b",
    features: ["Comercial", "Alta Qualidade", "Open Source"],
    pricing: "Gratuito",
    rating: 4.0,
    users: "600K+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "StableLM",
    company: "Stability AI",
    category: "Produtividade",
    description: "Família de LLMs open-source com diferentes tamanhos e capacidades.",
    link: "https://github.com/Stability-AI/StableLM",
    features: ["Família de Modelos", "Diferentes Tamanhos", "Open Source"],
    pricing: "Gratuito",
    rating: 4.2,
    users: "1M+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "RedPajama",
    company: "Together",
    category: "Produtividade",
    description: "LLM open-source treinado em dataset reproduzível de alta qualidade.",
    link: "https://huggingface.co/togethercomputer/RedPajama-INCITE-7B-Chat",
    features: ["Dataset Reproduzível", "Alta Qualidade", "Open Source"],
    pricing: "Gratuito",
    rating: 4.1,
    users: "700K+",
    iconSrc: "/images/icons/processor.png",
  },
  {
    name: "OpenAssistant",
    company: "LAION",
    category: "Produtividade",
    description: "Assistente conversacional open-source treinado com feedback humano.",
    link: "https://huggingface.co/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
    features: ["Feedback Humano", "Conversacional", "Open Source"],
    pricing: "Gratuito",
    rating: 4.0,
    users: "500K+",
    iconSrc: "/images/icons/processor.png",
  },

  // ==================== MULTIMODAL LLMs ====================
  {
    name: "GPT-4V",
    company: "OpenAI",
    category: "Multimodal",
    description: "Versão visual do GPT-4 com capacidades de visão computacional avançadas.",
    link: "https://chat.openai.com",
    features: ["Visão", "Texto", "Análise de Imagem"],
    pricing: "Pago",
    rating: 4.8,
    users: "50M+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "Gemini Pro Vision",
    company: "Google",
    category: "Multimodal",
    description: "Modelo multimodal do Google com capacidades avançadas de visão e texto.",
    link: "https://gemini.google.com",
    features: ["Visão", "Texto", "Google"],
    pricing: "Freemium",
    rating: 4.7,
    users: "30M+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "Claude 3 Vision",
    company: "Anthropic",
    category: "Multimodal",
    description: "Versão multimodal do Claude com análise de imagens e documentos.",
    link: "https://claude.ai",
    features: ["Análise de Imagem", "Documentos", "Segurança"],
    pricing: "Freemium",
    rating: 4.6,
    users: "8M+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "ERNIE-ViLG",
    company: "Baidu",
    category: "Multimodal",
    description: "Geração de imagens a partir de texto com tecnologia chinesa avançada.",
    link: "https://github.com/PaddlePaddle/PaddleGAN/tree/develop/applications/ERNIE-ViLG",
    features: ["Texto para Imagem", "Chinês", "Open Source"],
    pricing: "Gratuito",
    rating: 4.3,
    users: "300K+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "SenseNova",
    company: "SenseTime",
    category: "Multimodal",
    description: "Modelo multimodal chinês com aplicações em vídeo, imagem e texto.",
    link: "https://www.sensetime.com/en/technology/sensenova",
    features: ["Vídeo", "Imagem", "Texto"],
    pricing: "Pago",
    rating: 4.4,
    users: "500K+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "YandexGPT Multimodal",
    company: "Yandex",
    category: "Multimodal",
    description: "Modelo multimodal russo integrado aos produtos Yandex.",
    link: "https://yandex.ru/ai/gpt",
    features: ["Multimodal", "Integração", "Russo"],
    pricing: "Freemium",
    rating: 4.2,
    users: "2M+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "HyperCLOVA X",
    company: "Naver",
    category: "Multimodal",
    description: "Modelo multimodal coreano com forte suporte para coreano e inglês.",
    link: "https://clova.ai/en/tech/hyperclova.html",
    features: ["Coreano", "Inglês", "Multimodal"],
    pricing: "Pago",
    rating: 4.3,
    users: "800K+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "KoGPT Multimodal",
    company: "Kakao",
    category: "Multimodal",
    description: "Modelo multimodal coreano com API pública para desenvolvedores.",
    link: "https://developers.kakao.com/ko/docs/latest/ko/kogpt/rest",
    features: ["Coreano", "API Pública", "Desenvolvedores"],
    pricing: "Freemium",
    rating: 4.1,
    users: "600K+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "LLaVA",
    company: "University of Wisconsin-Madison",
    category: "Multimodal",
    description: "Large Language and Vision Assistant open-source para análise visual.",
    link: "https://github.com/haotian-liu/LLaVA",
    features: ["Visão", "Open Source", "Análise Visual"],
    pricing: "Gratuito",
    rating: 4.4,
    users: "400K+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "MiniGPT-4",
    company: "King Abdullah University",
    category: "Multimodal",
    description: "Modelo multimodal compacto com capacidades de visão e linguagem.",
    link: "https://github.com/Vision-CAIR/MiniGPT-4",
    features: ["Compacto", "Visão", "Linguagem"],
    pricing: "Gratuito",
    rating: 4.2,
    users: "300K+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "InstructBLIP",
    company: "Salesforce",
    category: "Multimodal",
    description: "Modelo de visão e linguagem treinado com instruções para tarefas visuais.",
    link: "https://github.com/salesforce/LAVIS/tree/main/projects/instructblip",
    features: ["Instruções", "Tarefas Visuais", "Salesforce"],
    pricing: "Gratuito",
    rating: 4.3,
    users: "250K+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "BLIP-2",
    company: "Salesforce",
    category: "Multimodal",
    description: "Modelo de visão e linguagem com arquitetura Q-Former inovadora.",
    link: "https://github.com/salesforce/LAVIS/tree/main/projects/blip2",
    features: ["Q-Former", "Visão", "Linguagem"],
    pricing: "Gratuito",
    rating: 4.4,
    users: "500K+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "Flamingo",
    company: "DeepMind",
    category: "Multimodal",
    description: "Modelo few-shot learning para tarefas de visão e linguagem.",
    link: "https://deepmind.com/research/publications/2022/flamingo-a-visual-language-model-for-few-shot-learning",
    features: ["Few-shot", "Visão", "DeepMind"],
    pricing: "Pesquisa",
    rating: 4.5,
    users: "100K+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "KOSMOS-1",
    company: "Microsoft",
    category: "Multimodal",
    description: "Modelo multimodal da Microsoft para compreensão de linguagem e visão.",
    link: "https://github.com/microsoft/unilm/tree/master/kosmos-1",
    features: ["Compreensão", "Microsoft", "Multimodal"],
    pricing: "Pesquisa",
    rating: 4.3,
    users: "200K+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "PaLM-E",
    company: "Google",
    category: "Multimodal",
    description: "Modelo embodied multimodal para robótica e tarefas do mundo real.",
    link: "https://palm-e.github.io/",
    features: ["Robótica", "Mundo Real", "Embodied"],
    pricing: "Pesquisa",
    rating: 4.4,
    users: "150K+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },

  // ==================== SEARCH & RETRIEVAL LLMs ====================
  {
    name: "Bing Chat",
    company: "Microsoft",
    category: "Busca",
    description: "Busca conversacional integrada com GPT-4 e acesso à web em tempo real.",
    link: "https://www.bing.com/chat",
    features: ["GPT-4", "Web Real-time", "Conversacional"],
    pricing: "Gratuito",
    rating: 4.5,
    users: "100M+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },
  {
    name: "Perplexity AI",
    company: "Perplexity",
    category: "Busca",
    description: "Motor de busca conversacional com citações e fontes verificadas.",
    link: "https://perplexity.ai",
    features: ["Citações", "Fontes", "Conversacional"],
    pricing: "Freemium",
    rating: 4.6,
    users: "10M+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },
  {
    name: "You.com",
    company: "You.com",
    category: "Busca",
    description: "Motor de busca com IA que combina resultados web com respostas geradas.",
    link: "https://you.com",
    features: ["Web + IA", "Resultados Combinados", "Privacidade"],
    pricing: "Freemium",
    rating: 4.3,
    users: "5M+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },
  {
    name: "Yandex Search AI",
    company: "Yandex",
    category: "Busca",
    description: "Busca semântica russa com respostas geradas por IA.",
    link: "https://yandex.com/search/",
    features: ["Semântica", "IA Generativa", "Russo"],
    pricing: "Gratuito",
    rating: 4.3,
    users: "50M+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },
  {
    name: "Baidu Search AI",
    company: "Baidu",
    category: "Busca",
    description: "Busca chinesa com respostas inteligentes alimentadas por ERNIE.",
    link: "https://www.baidu.com/",
    features: ["ERNIE", "Chinês", "Respostas Inteligentes"],
    pricing: "Gratuito",
    rating: 4.4,
    users: "200M+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },
  {
    name: "Phind",
    company: "Phind",
    category: "Busca",
    description: "Motor de busca especializado para desenvolvedores e programação.",
    link: "https://phind.com",
    features: ["Programação", "Desenvolvedores", "Código"],
    pricing: "Freemium",
    rating: 4.4,
    users: "2M+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },
  {
    name: "Komo AI",
    company: "Komo",
    category: "Busca",
    description: "Motor de busca conversacional com foco em privacidade.",
    link: "https://komo.ai",
    features: ["Privacidade", "Conversacional", "Sem Rastreamento"],
    pricing: "Gratuito",
    rating: 4.1,
    users: "500K+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },
  {
    name: "Metaphor",
    company: "Metaphor Systems",
    category: "Busca",
    description: "Busca semântica que entende intenção e contexto das consultas.",
    link: "https://metaphor.systems",
    features: ["Semântica", "Intenção", "Contexto"],
    pricing: "Freemium",
    rating: 4.2,
    users: "300K+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },
  {
    name: "Neeva AI",
    company: "Neeva",
    category: "Busca",
    description: "Busca privada sem anúncios com respostas geradas por IA.",
    link: "https://neeva.com",
    features: ["Privada", "Sem Anúncios", "IA"],
    pricing: "Pago",
    rating: 4.3,
    users: "1M+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },
  {
    name: "Brave Search AI",
    company: "Brave",
    category: "Busca",
    description: "Busca independente com respostas de IA e foco em privacidade.",
    link: "https://search.brave.com",
    features: ["Independente", "Privacidade", "IA"],
    pricing: "Gratuito",
    rating: 4.2,
    users: "10M+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },

  // ==================== HEALTHCARE & MEDICAL LLMs ====================
  {
    name: "Med-PaLM 2",
    company: "Google",
    category: "Saúde",
    description: "LLM médico do Google especializado em questões de saúde e medicina.",
    link: "https://sites.research.google/med-palm/",
    features: ["Medicina", "Google", "Especializado"],
    pricing: "Pesquisa",
    rating: 4.7,
    users: "50K+",
    iconSrc: "/images/icons/thinking.png",
  },
  {
    name: "ChatDoctor",
    company: "UC San Diego",
    category: "Saúde",
    description: "LLM médico treinado em dados clínicos para suporte diagnóstico.",
    link: "https://github.com/Kent0n-Li/ChatDoctor",
    features: ["Diagnóstico", "Dados Clínicos", "Open Source"],
    pricing: "Gratuito",
    rating: 4.2,
    users: "100K+",
    iconSrc: "/images/icons/thinking.png",
  },
  {
    name: "MedGPT",
    company: "Microsoft",
    category: "Saúde",
    description: "LLM médico da Microsoft para análise de literatura médica.",
    link: "https://www.microsoft.com/en-us/research/project/medgpt/",
    features: ["Literatura Médica", "Microsoft", "Análise"],
    pricing: "Pesquisa",
    rating: 4.4,
    users: "75K+",
    iconSrc: "/images/icons/thinking.png",
  },
  {
    name: "GatorTron",
    company: "University of Florida",
    category: "Saúde",
    description: "LLM clínico para análise de registros eletrônicos de saúde.",
    link: "https://github.com/uf-hobi-informatics-lab/GatorTron",
    features: ["Registros Eletrônicos", "Clínico", "Universidade"],
    pricing: "Pesquisa",
    rating: 4.3,
    users: "30K+",
    iconSrc: "/images/icons/thinking.png",
  },
  {
    name: "ClinicalBERT",
    company: "MIT",
    category: "Saúde",
    description: "Modelo BERT especializado para textos clínicos e médicos.",
    link: "https://github.com/kexinhuang12345/clinicalBERT",
    features: ["BERT", "Textos Clínicos", "MIT"],
    pricing: "Gratuito",
    rating: 4.1,
    users: "80K+",
    iconSrc: "/images/icons/thinking.png",
  },
  {
    name: "BioBERT",
    company: "Korea University",
    category: "Saúde",
    description: "BERT pré-treinado em literatura biomédica para NLP médico.",
    link: "https://github.com/dmis-lab/biobert",
    features: ["Literatura Biomédica", "NLP Médico", "Coreano"],
    pricing: "Gratuito",
    rating: 4.4,
    users: "120K+",
    iconSrc: "/images/icons/thinking.png",
  },
  {
    name: "PubMedBERT",
    company: "Microsoft",
    category: "Saúde",
    description: "BERT treinado exclusivamente em abstracts do PubMed.",
    link: "https://huggingface.co/microsoft/BiomedNLP-PubMedBERT-base-uncased-abstract",
    features: ["PubMed", "Abstracts", "Microsoft"],
    pricing: "Gratuito",
    rating: 4.3,
    users: "90K+",
    iconSrc: "/images/icons/thinking.png",
  },
  {
    name: "SciBERT",
    company: "Allen Institute for AI",
    category: "Saúde",
    description: "BERT para literatura científica e biomédica.",
    link: "https://github.com/allenai/scibert",
    features: ["Literatura Científica", "Biomédica", "Allen AI"],
    pricing: "Gratuito",
    rating: 4.2,
    users: "70K+",
    iconSrc: "/images/icons/thinking.png",
  },
  {
    name: "MedAlpaca",
    company: "Stanford",
    category: "Saúde",
    description: "LLM médico baseado em LLaMA com fine-tuning médico.",
    link: "https://github.com/kbressem/medAlpaca",
    features: ["LLaMA", "Fine-tuning", "Stanford"],
    pricing: "Gratuito",
    rating: 4.0,
    users: "40K+",
    iconSrc: "/images/icons/thinking.png",
  },
  {
    name: "PMC-LLaMA",
    company: "Shanghai AI Lab",
    category: "Saúde",
    description: "LLaMA adaptado para medicina com dados do PMC.",
    link: "https://github.com/chaoyi-wu/PMC-LLaMA",
    features: ["PMC", "Medicina", "Shanghai AI"],
    pricing: "Gratuito",
    rating: 4.1,
    users: "35K+",
    iconSrc: "/images/icons/thinking.png",
  },

  // ==================== AI IMAGE & ART GENERATION TOOLS ====================
  {
    name: "DALL-E 3",
    company: "OpenAI",
    category: "Imagens",
    description: "Gerador de imagens de alta qualidade a partir de descrições textuais.",
    link: "https://openai.com/dall-e-3",
    features: ["Texto para Imagem", "Alta Qualidade", "OpenAI"],
    pricing: "Pago",
    rating: 4.8,
    users: "10M+",
    iconSrc: "/images/icons/ai-generated-image.png",
  },
  {
    name: "Midjourney",
    company: "Midjourney",
    category: "Arte",
    description: "Plataforma de arte digital com IA para criação de imagens artísticas.",
    link: "https://midjourney.com",
    features: ["Arte Digital", "Criativo", "Comunidade"],
    pricing: "Pago",
    rating: 4.7,
    users: "15M+",
    iconSrc: "/images/icons/paint-palette.png",
  },
  {
    name: "Stable Diffusion",
    company: "Stability AI",
    category: "Arte",
    description: "Modelo open source para geração de imagens com controle avançado.",
    link: "https://stability.ai",
    features: ["Open Source", "Customizável", "Controle Avançado"],
    pricing: "Gratuito",
    rating: 4.6,
    users: "20M+",
    iconSrc: "/images/icons/paint-palette.png",
  },
  {
    name: "Adobe Firefly",
    company: "Adobe",
    category: "Arte",
    description: "IA generativa da Adobe integrada ao Creative Suite.",
    link: "https://firefly.adobe.com",
    features: ["Creative Suite", "Profissional", "Adobe"],
    pricing: "Freemium",
    rating: 4.5,
    users: "8M+",
    iconSrc: "/images/icons/paint-palette.png",
  },
  {
    name: "Leonardo AI",
    company: "Leonardo.ai",
    category: "Arte",
    description: "Plataforma para criação de arte digital e design gráfico com IA.",
    link: "https://leonardo.ai",
    features: ["Arte Digital", "Design Gráfico", "Plataforma"],
    pricing: "Freemium",
    rating: 4.4,
    users: "3M+",
    iconSrc: "/images/icons/paint-palette.png",
  },
  {
    name: "Kandinsky 3.0",
    company: "Sber AI",
    category: "Arte",
    description: "IA russa para geração de imagens artísticas com estilo único.",
    link: "https://fusionbrain.ai/",
    features: ["Artístico", "Russo", "Estilo Único"],
    pricing: "Freemium",
    rating: 4.3,
    users: "1M+",
    iconSrc: "/images/icons/paint-palette.png",
  },
  {
    name: "Imagen 2",
    company: "Google",
    category: "Imagens",
    description: "Gerador de imagens do Google com alta fidelidade fotorrealística.",
    link: "https://imagen.research.google/",
    features: ["Fotorrealística", "Alta Fidelidade", "Google"],
    pricing: "Pesquisa",
    rating: 4.5,
    users: "500K+",
    iconSrc: "/images/icons/ai-generated-image.png",
  },
  {
    name: "Parti",
    company: "Google",
    category: "Imagens",
    description: "Modelo de geração de imagens com compreensão textual avançada.",
    link: "https://parti.research.google/",
    features: ["Compreensão Textual", "Avançado", "Google"],
    pricing: "Pesquisa",
    rating: 4.4,
    users: "300K+",
    iconSrc: "/images/icons/ai-generated-image.png",
  },
  {
    name: "Bing Image Creator",
    company: "Microsoft",
    category: "Imagens",
    description: "Gerador de imagens integrado ao Bing com tecnologia DALL-E.",
    link: "https://www.bing.com/images/create",
    features: ["DALL-E", "Integrado", "Microsoft"],
    pricing: "Gratuito",
    rating: 4.2,
    users: "25M+",
    iconSrc: "/images/icons/ai-generated-image.png",
  },
  {
    name: "Waifu Diffusion",
    company: "Waifu Diffusion",
    category: "Arte",
    description: "Modelo especializado em arte anime e manga com estilo japonês.",
    link: "https://huggingface.co/hakurei/waifu-diffusion",
    features: ["Anime", "Manga", "Japonês"],
    pricing: "Gratuito",
    rating: 4.3,
    users: "2M+",
    iconSrc: "/images/icons/paint-palette.png",
  },

  // ==================== AI CODE TOOLS ====================
  {
    name: "GitHub Copilot",
    company: "GitHub + OpenAI",
    category: "Programação",
    description: "Assistente de programação que sugere código em tempo real.",
    link: "https://github.com/features/copilot",
    features: ["Tempo Real", "Múltiplas Linguagens", "VS Code"],
    pricing: "Pago",
    rating: 4.7,
    users: "5M+",
    iconSrc: "/images/icons/code-tools.png",
  },
  {
    name: "Code Llama",
    company: "Meta",
    category: "Programação",
    description: "LLM especializado em geração e explicação de código.",
    link: "https://code.meta.com/llama",
    features: ["Geração", "Explicação", "Open Source"],
    pricing: "Gratuito",
    rating: 4.5,
    users: "2M+",
    iconSrc: "/images/icons/code-tools.png",
  },
  {
    name: "Tabnine",
    company: "Tabnine",
    category: "Programação",
    description: "Assistente de código com IA que aprende seu estilo de programação.",
    link: "https://tabnine.com",
    features: ["Personalizado", "Privacidade", "Múltiplas IDEs"],
    pricing: "Freemium",
    rating: 4.4,
    users: "1M+",
    iconSrc: "/images/icons/code-tools.png",
  },
  {
    name: "CodeGeeX2",
    company: "THUDM",
    category: "Programação",
    description: "LLM multilíngue open source com suporte a 20+ linguagens.",
    link: "https://huggingface.co/THUDM/codegeex2-6b",
    features: ["Multilíngue", "Open Source", "20+ Linguagens"],
    pricing: "Gratuito",
    rating: 4.4,
    users: "800K+",
    iconSrc: "/images/icons/code-tools.png",
  },
  {
    name: "StarCoder",
    company: "BigCode",
    category: "Programação",
    description: "LLM de código open-source com forte performance multilíngue.",
    link: "https://huggingface.co/bigcode/starcoder",
    features: ["Open Source", "Multilíngue", "BigCode"],
    pricing: "Gratuito",
    rating: 4.5,
    users: "1.2M+",
    iconSrc: "/images/icons/code-tools.png",
  },
  {
    name: "AlphaCode",
    company: "DeepMind",
    category: "Programação",
    description: "Modelo especializado em programação competitiva e resolução de problemas.",
    link: "https://deepmind.com/research/highlighted-research/alphacode",
    features: ["Programação Competitiva", "DeepMind", "Resolução"],
    pricing: "Pesquisa",
    rating: 4.6,
    users: "200K+",
    iconSrc: "/images/icons/code-tools.png",
  },
  {
    name: "CodeT5",
    company: "Salesforce",
    category: "Programação",
    description: "Modelo encoder-decoder para tarefas de compreensão e geração de código.",
    link: "https://github.com/salesforce/CodeT5",
    features: ["Encoder-Decoder", "Compreensão", "Salesforce"],
    pricing: "Gratuito",
    rating: 4.2,
    users: "500K+",
    iconSrc: "/images/icons/code-tools.png",
  },
  {
    name: "InCoder",
    company: "Meta",
    category: "Programação",
    description: "Modelo de código que suporta preenchimento bidirecional.",
    link: "https://github.com/dpfried/incoder",
    features: ["Bidirecional", "Preenchimento", "Meta"],
    pricing: "Gratuito",
    rating: 4.1,
    users: "400K+",
    iconSrc: "/images/icons/code-tools.png",
  },
  {
    name: "CodeParrot",
    company: "Hugging Face",
    category: "Programação",
    description: "Modelo GPT treinado em código Python do GitHub.",
    link: "https://huggingface.co/codeparrot/codeparrot",
    features: ["Python", "GitHub", "GPT"],
    pricing: "Gratuito",
    rating: 4.0,
    users: "600K+",
    iconSrc: "/images/icons/code-tools.png",
  },
  {
    name: "SantaCoder",
    company: "BigCode",
    category: "Programação",
    description: "Modelo de código open-source focado em Python, Java e JavaScript.",
    link: "https://huggingface.co/bigcode/santacoder",
    features: ["Python", "Java", "JavaScript"],
    pricing: "Gratuito",
    rating: 4.3,
    users: "700K+",
    iconSrc: "/images/icons/code-tools.png",
  },

  // ==================== AI VIDEO TOOLS ====================
  {
    name: "RunwayML",
    company: "Runway",
    category: "Vídeo",
    description: "Suite completa de ferramentas de IA para criação e edição de vídeos.",
    link: "https://runwayml.com",
    features: ["Edição Avançada", "Efeitos IA", "Tempo Real"],
    pricing: "Freemium",
    rating: 4.6,
    users: "3M+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "Synthesia",
    company: "Synthesia",
    category: "Vídeo",
    description: "Crie vídeos com avatares de IA realistas em múltiplos idiomas.",
    link: "https://synthesia.io",
    features: ["Avatares IA", "Múltiplos Idiomas", "Sem Câmera"],
    pricing: "Pago",
    rating: 4.5,
    users: "1M+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "Descript",
    company: "Descript",
    category: "Vídeo",
    description: "Editor de vídeo com IA que permite edição por texto.",
    link: "https://descript.com",
    features: ["Edição por Texto", "Clonagem de Voz", "IA"],
    pricing: "Freemium",
    rating: 4.4,
    users: "2M+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "Pictory",
    company: "Pictory",
    category: "Vídeo",
    description: "Transforme texto em vídeos profissionais automaticamente.",
    link: "https://pictory.ai",
    features: ["Texto para Vídeo", "Automático", "Profissional"],
    pricing: "Pago",
    rating: 4.3,
    users: "500K+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "Luma AI",
    company: "Luma AI",
    category: "Vídeo",
    description: "Criação de vídeos 3D e captura de realidade com NeRF.",
    link: "https://lumalabs.ai",
    features: ["3D", "NeRF", "Realidade"],
    pricing: "Freemium",
    rating: 4.5,
    users: "400K+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "Stable Video Diffusion",
    company: "Stability AI",
    category: "Vídeo",
    description: "Modelo open source para geração de vídeos a partir de imagens.",
    link: "https://stability.ai/news/stable-video-diffusion-open-ai-video-model",
    features: ["Open Source", "Imagem para Vídeo", "Stability AI"],
    pricing: "Gratuito",
    rating: 4.4,
    users: "300K+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "Pika Labs",
    company: "Pika Labs",
    category: "Vídeo",
    description: "Geração de vídeos curtos a partir de texto e imagens.",
    link: "https://pika.art",
    features: ["Texto para Vídeo", "Vídeos Curtos", "Imagens"],
    pricing: "Freemium",
    rating: 4.2,
    users: "800K+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "Gen-2",
    company: "Runway",
    category: "Vídeo",
    description: "Modelo de geração de vídeo de nova geração da Runway.",
    link: "https://research.runwayml.com/gen2",
    features: ["Nova Geração", "Runway", "Avançado"],
    pricing: "Pago",
    rating: 4.5,
    users: "200K+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "Kaiber",
    company: "Kaiber",
    category: "Vídeo",
    description: "Transforme imagens e vídeos com estilos artísticos de IA.",
    link: "https://kaiber.ai",
    features: ["Estilos Artísticos", "Transformação", "IA"],
    pricing: "Pago",
    rating: 4.1,
    users: "600K+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },
  {
    name: "Fliki",
    company: "Fliki",
    category: "Vídeo",
    description: "Crie vídeos a partir de texto com vozes de IA e imagens.",
    link: "https://fliki.ai",
    features: ["Texto para Vídeo", "Vozes IA", "Imagens"],
    pricing: "Freemium",
    rating: 4.0,
    users: "1M+",
    iconSrc: "/images/icons/professional-video-camera.png",
  },

  // ==================== MUSIC AI TOOLS ====================
  {
    name: "AIVA",
    company: "AIVA Technologies",
    category: "Música",
    description: "Compositor de IA que cria trilhas sonoras originais.",
    link: "https://aiva.ai",
    features: ["Composição", "Trilhas Sonoras", "Múltiplos Gêneros"],
    pricing: "Freemium",
    rating: 4.5,
    users: "200K+",
    iconSrc: "/images/icons/musical-notes.png",
  },
  {
    name: "Amper Music",
    company: "Shutterstock",
    category: "Música",
    description: "Plataforma de IA para criação de música personalizada.",
    link: "https://www.ampermusic.com",
    features: ["Música Personalizada", "Licenciamento", "API"],
    pricing: "Pago",
    rating: 4.3,
    users: "100K+",
    iconSrc: "/images/icons/musical-notes.png",
  },
  {
    name: "Soundraw",
    company: "Soundraw",
    category: "Música",
    description: "Gerador de música com IA para criadores de conteúdo.",
    link: "https://soundraw.io",
    features: ["Royalty-Free", "Customização", "Download"],
    pricing: "Freemium",
    rating: 4.4,
    users: "500K+",
    iconSrc: "/images/icons/musical-notes.png",
  },
  {
    name: "Mubert",
    company: "Mubert",
    category: "Música",
    description: "IA que gera música ambiente em tempo real.",
    link: "https://mubert.com",
    features: ["Tempo Real", "Streaming", "API"],
    pricing: "Freemium",
    rating: 4.2,
    users: "2M+",
    iconSrc: "/images/icons/musical-notes.png",
  },
  {
    name: "Boomy",
    company: "Boomy",
    category: "Música",
    description: "Crie e publique música original com IA em minutos.",
    link: "https://boomy.com",
    features: ["Criação Rápida", "Publicação", "Monetização"],
    pricing: "Freemium",
    rating: 4.1,
    users: "1M+",
    iconSrc: "/images/icons/musical-notes.png",
  },
  {
    name: "Jukebox",
    company: "OpenAI",
    category: "Música",
    description: "Modelo neural que gera música com canto em vários gêneros.",
    link: "https://openai.com/research/jukebox",
    features: ["Canto", "Vários Gêneros", "OpenAI"],
    pricing: "Pesquisa",
    rating: 4.4,
    users: "150K+",
    iconSrc: "/images/icons/musical-notes.png",
  },
  {
    name: "MuseNet",
    company: "OpenAI",
    category: "Música",
    description: "Rede neural que pode gerar composições musicais de 4 minutos.",
    link: "https://openai.com/research/musenet",
    features: ["Composições", "4 Minutos", "OpenAI"],
    pricing: "Pesquisa",
    rating: 4.3,
    users: "100K+",
    iconSrc: "/images/icons/musical-notes.png",
  },
  {
    name: "Loudly",
    company: "Loudly",
    category: "Música",
    description: "Plataforma de música gerada por IA para criadores.",
    link: "https://loudly.com",
    features: ["Criadores", "Plataforma", "IA"],
    pricing: "Freemium",
    rating: 4.0,
    users: "300K+",
    iconSrc: "/images/icons/musical-notes.png",
  },
  {
    name: "Beatoven.ai",
    company: "Beatoven",
    category: "Música",
    description: "Crie música original livre de royalties para seus vídeos.",
    link: "https://beatoven.ai",
    features: ["Livre de Royalties", "Vídeos", "Original"],
    pricing: "Freemium",
    rating: 4.2,
    users: "250K+",
    iconSrc: "/images/icons/musical-notes.png",
  },
  {
    name: "Endel",
    company: "Endel",
    category: "Música",
    description: "IA que cria soundscapes adaptativos para foco e relaxamento.",
    link: "https://endel.io",
    features: ["Soundscapes", "Adaptativo", "Foco"],
    pricing: "Freemium",
    rating: 4.3,
    users: "800K+",
    iconSrc: "/images/icons/musical-notes.png",
  },

  // ==================== AUDIO GENERATOR ====================
  {
    name: "ElevenLabs",
    company: "ElevenLabs",
    category: "Áudio",
    description: "Síntese de voz com IA ultra-realista em múltiplos idiomas.",
    link: "https://elevenlabs.io",
    features: ["Voz Realista", "Clonagem de Voz", "Múltiplos Idiomas"],
    pricing: "Freemium",
    rating: 4.7,
    users: "3M+",
    iconSrc: "/images/icons/ai-generated-sound.png",
  },
  {
    name: "Murf AI",
    company: "Murf",
    category: "Áudio",
    description: "Plataforma de text-to-speech com vozes naturais.",
    link: "https://murf.ai",
    features: ["Text-to-Speech", "Vozes Naturais", "Edição Avançada"],
    pricing: "Freemium",
    rating: 4.3,
    users: "1M+",
    iconSrc: "/images/icons/ai-generated-sound.png",
  },
  {
    name: "Resemble AI",
    company: "Resemble AI",
    category: "Áudio",
    description: "Clonagem de voz e síntese de fala com tecnologia neural.",
    link: "https://resemble.ai",
    features: ["Clonagem de Voz", "Neural", "API"],
    pricing: "Pago",
    rating: 4.4,
    users: "500K+",
    iconSrc: "/images/icons/ai-generated-sound.png",
  },
  {
    name: "Speechify",
    company: "Speechify",
    category: "Áudio",
    description: "Converte texto em áudio com vozes naturais.",
    link: "https://speechify.com",
    features: ["Acessibilidade", "Vozes Naturais", "Mobile"],
    pricing: "Freemium",
    rating: 4.5,
    users: "5M+",
    iconSrc: "/images/icons/ai-generated-sound.png",
  },
  {
    name: "Replica Studios",
    company: "Replica Studios",
    category: "Áudio",
    description: "Vozes de IA para jogos, filmes e conteúdo interativo.",
    link: "https://replicastudios.com",
    features: ["Jogos", "Filmes", "Interativo"],
    pricing: "Pago",
    rating: 4.2,
    users: "200K+",
    iconSrc: "/images/icons/ai-generated-sound.png",
  },
  {
    name: "Bark",
    company: "Suno AI",
    category: "Áudio",
    description: "Modelo open source para geração de áudio realista.",
    link: "https://github.com/suno-ai/bark",
    features: ["Open Source", "Áudio Realista", "Suno AI"],
    pricing: "Gratuito",
    rating: 4.3,
    users: "800K+",
    iconSrc: "/images/icons/ai-generated-sound.png",
  },
  {
    name: "Tortoise TTS",
    company: "Tortoise TTS",
    category: "Áudio",
    description: "Text-to-speech de alta qualidade com vozes expressivas.",
    link: "https://github.com/neonbjb/tortoise-tts",
    features: ["Alta Qualidade", "Expressivo", "Open Source"],
    pricing: "Gratuito",
    rating: 4.1,
    users: "400K+",
    iconSrc: "/images/icons/ai-generated-sound.png",
  },
  {
    name: "Coqui TTS",
    company: "Coqui",
    category: "Áudio",
    description: "Biblioteca open source para text-to-speech em múltiplos idiomas.",
    link: "https://github.com/coqui-ai/TTS",
    features: ["Open Source", "Múltiplos Idiomas", "Biblioteca"],
    pricing: "Gratuito",
    rating: 4.2,
    users: "600K+",
    iconSrc: "/images/icons/ai-generated-sound.png",
  },
  {
    name: "WellSaid Labs",
    company: "WellSaid Labs",
    category: "Áudio",
    description: "Vozes de IA de qualidade profissional para empresas.",
    link: "https://wellsaidlabs.com",
    features: ["Qualidade Profissional", "Empresas", "IA"],
    pricing: "Pago",
    rating: 4.4,
    users: "150K+",
    iconSrc: "/images/icons/ai-generated-sound.png",
  },
  {
    name: "Descript Overdub",
    company: "Descript",
    category: "Áudio",
    description: "Clonagem de voz integrada ao editor de áudio Descript.",
    link: "https://descript.com/overdub",
    features: ["Clonagem de Voz", "Editor Integrado", "Descript"],
    pricing: "Freemium",
    rating: 4.3,
    users: "300K+",
    iconSrc: "/images/icons/ai-generated-sound.png",
  },

  // ==================== AI TRANSLATION TOOLS ====================
  {
    name: "DeepL",
    company: "DeepL",
    category: "Tradução",
    description: "Tradutor automático com precisão superior e compreensão contextual.",
    link: "https://deepl.com",
    features: ["Alta Precisão", "Múltiplos Idiomas", "Contexto"],
    pricing: "Freemium",
    rating: 4.8,
    users: "1B+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },
  {
    name: "Google Translate",
    company: "Google",
    category: "Tradução",
    description: "Tradutor universal com suporte a mais de 100 idiomas.",
    link: "https://translate.google.com",
    features: ["Universal", "100+ Idiomas", "Gratuito"],
    pricing: "Gratuito",
    rating: 4.5,
    users: "500M+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },
  {
    name: "Microsoft Translator",
    company: "Microsoft",
    category: "Tradução",
    description: "Serviço de tradução da Microsoft com API e integração empresarial.",
    link: "https://translator.microsoft.com",
    features: ["API", "Empresarial", "Microsoft"],
    pricing: "Freemium",
    rating: 4.4,
    users: "100M+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },
  {
    name: "Papago",
    company: "Naver",
    category: "Tradução",
    description: "Tradução multilíngue com IA coreana e forte suporte asiático.",
    link: "https://papago.naver.com/",
    features: ["Coreano", "Multilíngue", "Asiático"],
    pricing: "Gratuito",
    rating: 4.5,
    users: "50M+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },
  {
    name: "Yandex Translate",
    company: "Yandex",
    category: "Tradução",
    description: "Tradutor russo com forte suporte para idiomas eslavos.",
    link: "https://translate.yandex.com",
    features: ["Russo", "Idiomas Eslavos", "Yandex"],
    pricing: "Gratuito",
    rating: 4.3,
    users: "30M+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },
  {
    name: "Baidu Translate",
    company: "Baidu",
    category: "Tradução",
    description: "Tradutor chinês com especialização em idiomas asiáticos.",
    link: "https://fanyi.baidu.com",
    features: ["Chinês", "Idiomas Asiáticos", "Baidu"],
    pricing: "Gratuito",
    rating: 4.4,
    users: "200M+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },
  {
    name: "Amazon Translate",
    company: "Amazon",
    category: "Tradução",
    description: "Serviço de tradução neural da AWS para aplicações empresariais.",
    link: "https://aws.amazon.com/translate/",
    features: ["Neural", "AWS", "Empresarial"],
    pricing: "Pago",
    rating: 4.2,
    users: "10M+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },
  {
    name: "Systran",
    company: "Systran",
    category: "Tradução",
    description: "Tradutor empresarial com foco em segurança e privacidade.",
    link: "https://systran.net",
    features: ["Empresarial", "Segurança", "Privacidade"],
    pricing: "Pago",
    rating: 4.1,
    users: "5M+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },
  {
    name: "ModernMT",
    company: "ModernMT",
    category: "Tradução",
    description: "Tradutor automático adaptativo para empresas e tradutores.",
    link: "https://www.modernmt.com/",
    features: ["Adaptativo", "Empresas", "Tradutores"],
    pricing: "Pago",
    rating: 4.0,
    users: "1M+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },
  {
    name: "Lilt",
    company: "Lilt",
    category: "Tradução",
    description: "Plataforma de tradução adaptativa com IA para equipes.",
    link: "https://lilt.com/",
    features: ["Adaptativa", "Equipes", "IA"],
    pricing: "Pago",
    rating: 4.2,
    users: "500K+",
    iconSrc: "/images/icons/microsoft-translator.png",
  },

  // ==================== AI BUSINESS TOOLS ====================
  {
    name: "Microsoft 365 Copilot",
    company: "Microsoft",
    category: "Negócios",
    description: "IA integrada ao Office 365 para automação e produtividade.",
    link: "https://www.microsoft.com/en-us/microsoft-365/copilot",
    features: ["Office 365", "Automação", "Produtividade"],
    pricing: "Pago",
    rating: 4.6,
    users: "50M+",
    iconSrc: "/images/icons/business-tools.png",
  },
  {
    name: "Google Workspace AI",
    company: "Google",
    category: "Negócios",
    description: "IA integrada ao Google Workspace para automação e colaboração.",
    link: "https://workspace.google.com/intl/en/ai/",
    features: ["Google Workspace", "Automação", "Colaboração"],
    pricing: "Pago",
    rating: 4.5,
    users: "30M+",
    iconSrc: "/images/icons/business-tools.png",
  },
  {
    name: "Jasper AI",
    company: "Jasper",
    category: "Negócios",
    description: "Assistente de IA para criação de conteúdo de marketing.",
    link: "https://jasper.ai",
    features: ["Marketing", "Conteúdo", "Geração"],
    pricing: "Pago",
    rating: 4.4,
    users: "1M+",
    iconSrc: "/images/icons/business-tools.png",
  },
  {
    name: "Surfer SEO",
    company: "Surfer",
    category: "Negócios",
    description: "IA para otimização de conteúdo SEO e pesquisa de palavras-chave.",
    link: "https://surferseo.com",
    features: ["SEO", "Otimização", "Palavras-chave"],
    pricing: "Pago",
    rating: 4.3,
    users: "500K+",
    iconSrc: "/images/icons/business-tools.png",
  },
  {
    name: "Copy.ai",
    company: "Copy.ai",
    category: "Negócios",
    description: "Geração de textos de marketing e vendas com IA.",
    link: "https://www.copy.ai",
    features: ["Marketing", "Vendas", "Geração"],
    pricing: "Freemium",
    rating: 4.2,
    users: "800K+",
    iconSrc: "/images/icons/business-tools.png",
  },
  {
    name: "Simplified",
    company: "Simplified",
    category: "Negócios",
    description: "Plataforma de design gráfico e vídeo com IA.",
    link: "https://simplified.com",
    features: ["Design Gráfico", "Vídeo", "IA"],
    pricing: "Freemium",
    rating: 4.1,
    users: "1M+",
    iconSrc: "/images/icons/business-tools.png",
  },
  {
    name: "Synthesia AI Avatars",
    company: "Synthesia",
    category: "Negócios",
    description: "Crie vídeos com avatares de IA para comunicação empresarial.",
    link: "https://www.synthesia.io/avatars",
    features: ["Avatares", "Vídeos", "Comunicação"],
    pricing: "Pago",
    rating: 4.5,
    users: "200K+",
    iconSrc: "/images/icons/business-tools.png",
  },
  {
    name: "Otter.ai",
    company: "Otter.ai",
    category: "Negócios",
    description: "Transcrição e resumo de reuniões com IA.",
    link: "https://otter.ai",
    features: ["Transcrição", "Resumo", "Reuniões"],
    pricing: "Freemium",
    rating: 4.4,
    users: "5M+",
    iconSrc: "/images/icons/business-tools.png",
  },
  {
    name: "Fireflies.ai",
    company: "Fireflies.ai",
    category: "Negócios",
    description: "Assistente de reunião com IA que grava e transcreve.",
    link: "https://fireflies.ai",
    features: ["Reunião", "Gravação", "Transcrição"],
    pricing: "Freemium",
    rating: 4.3,
    users: "1M+",
    iconSrc: "/images/icons/business-tools.png",
  },
  {
    name: "Krisp",
    company: "Krisp",
    category: "Negócios",
    description: "Remoção de ruído de fundo com IA para chamadas.",
    link: "https://krisp.ai",
    features: ["Remoção de Ruído", "Chamadas", "IA"],
    pricing: "Freemium",
    rating: 4.2,
    users: "3M+",
    iconSrc: "/images/icons/business-tools.png",
  },

  // ==================== EDUCATION & TUTORING LLMs ====================
  {
    name: "Khan Academy Khanmigo",
    company: "Khan Academy",
    category: "Educação",
    description: "Tutor virtual personalizado para estudantes da Khan Academy.",
    link: "https://www.khanacademy.org/khan-labs",
    features: ["Tutor", "Personalizado", "Khan Academy"],
    pricing: "Freemium",
    rating: 4.6,
    users: "5M+",
    iconSrc: "/images/icons/thinking.png",
  },
  {
    name: "Duolingo Max",
    company: "Duolingo",
    category: "Educação",
    description: "Aprendizado de idiomas com IA e feedback personalizado.",
    link: "https://blog.duolingo.com/duolingo-max/",
    features: ["Idiomas", "Personalizado", "IA"],
    pricing: "Freemium",
    rating: 4.5,
    users: "10M+",
    iconSrc: "/images/icons/thinking.png",
  },
  {
    name: "Quizlet Q-Chat",
    company: "Quizlet",
    category: "Educação",
    description: "Flashcards e ferramentas de estudo com IA.",
    link: "https://quizlet.com/features/q-chat",
    features: ["Flashcards", "Estudo", "IA"],
    pricing: "Freemium",
    rating: 4.4,
    users: "8M+",
    iconSrc: "/images/icons/thinking.png",
  },
  {
    name: "Brainly Tutor",
    company: "Brainly",
    category: "Educação",
    description: "Ajuda com lição de casa e perguntas com IA.",
    link: "https://brainly.com/tutor",
    features: ["Lição de Casa", "Perguntas", "IA"],
    pricing: "Freemium",
    rating: 4.3,
    users: "15M+",
    iconSrc: "/images/icons/thinking.png",
  },
  {
    name: "Socratic by Google",
    company: "Google",
    category: "Educação",
    description: "Ajuda com dúvidas escolares via IA e reconhecimento de imagem.",
    link: "https://socratic.org/",
    features: ["Escolar", "Dúvidas", "Google"],
    pricing: "Gratuito",
    rating: 4.4,
    users: "10M+",
    iconSrc: "/images/icons/thinking.png",
  },
  {
    name: "iFlytek AI Tutor",
    company: "iFlytek",
    category: "Educação",
    description: "Tutor virtual para educação básica e superior com tecnologia chinesa.",
    link: "https://www.iflytek.com/en/spark/",
    features: ["Tutor Virtual", "Chinês", "Educação"],
    pricing: "Freemium",
    rating: 4.3,
    users: "2M+",
    iconSrc: "/images/icons/thinking.png",
  },
  {
    name: "Gradescope by Turnitin",
    company: "Turnitin",
    category: "Educação",
    description: "Feedback e avaliação de trabalhos com IA.",
    link: "https://www.turnitin.com/products/gradescope",
    features: ["Feedback", "Avaliação", "IA"],
    pricing: "Pago",
    rating: 4.2,
    users: "1M+",
    iconSrc: "/images/icons/thinking.png",
  },
  {
    name: "Albert AI",
    company: "Albert.io",
    category: "Educação",
    description: "Plataforma de prática e preparação para exames com IA.",
    link: "https://www.albert.io/",
    features: ["Prática", "Exames", "IA"],
    pricing: "Pago",
    rating: 4.1,
    users: "500K+",
    iconSrc: "/images/icons/thinking.png",
  },
  {
    name: "Century Tech",
    company: "Century Tech",
    category: "Educação",
    description: "Plataforma de aprendizado personalizado com IA.",
    link: "https://www.century.tech/",
    features: ["Personalizado", "Aprendizado", "IA"],
    pricing: "Pago",
    rating: 4.0,
    users: "300K+",
    iconSrc: "/images/icons/thinking.png",
  },

  // ==================== OPEN SOURCE & CUSTOMIZABLE LLMs ====================
  {
    name: "Llama 2",
    company: "Meta",
    category: "Open Source",
    description: "Modelo de linguagem open source da Meta para pesquisa e uso comercial.",
    link: "https://ai.meta.com/llama/",
    features: ["Open Source", "Comercial", "Meta"],
    pricing: "Gratuito",
    rating: 4.5,
    users: "5M+",
    iconSrc: "/images/icons/code-tools.png",
  },
  {
    name: "Falcon",
    company: "Technology Innovation Institute",
    category: "Open Source",
    description: "Modelo de linguagem open source dos Emirados Árabes Unidos.",
    link: "https://falconllm.tii.ae/",
    features: ["Open Source", "Emirados Árabes", "Multilíngue"],
    pricing: "Gratuito",
    rating: 4.4,
    users: "3M+",
    iconSrc: "/images/icons/code-tools.png",
  },
  {
    name: "MPT",
    company: "MosaicML",
    category: "Open Source",
    description: "Modelo de linguagem open source da MosaicML para uso comercial.",
    link: "https://www.mosaicml.com/blog/mpt-7b",
    features: ["Open Source", "Comercial", "MosaicML"],
    pricing: "Gratuito",
    rating: 4.3,
    users: "1M+",
    iconSrc: "/images/icons/code-tools.png",
  },
  {
    name: "RedPajama INCITE",
    company: "Together AI",
    category: "Open Source",
    description: "Modelo de linguagem open source treinado em dados de alta qualidade.",
    link: "https://www.together.ai/blog/redpajama-models",
    features: ["Open Source", "Alta Qualidade", "Together AI"],
    pricing: "Gratuito",
    rating: 4.2,
    users: "800K+",
    iconSrc: "/images/icons/code-tools.png",
  },
  {
    name: "OpenLLaMA",
    company: "Berkeley AI Research",
    category: "Open Source",
    description: "Modelo de linguagem open source baseado em LLaMA.",
    link: "https://github.com/openlm-research/open_llama",
    features: ["Open Source", "LLaMA", "Berkeley AI"],
    pricing: "Gratuito",
    rating: 4.1,
    users: "500K+",
    iconSrc: "/images/icons/code-tools.png",
  },
  {
    name: "GPT-2",
    company: "OpenAI",
    category: "Open Source",
    description: "Modelo de linguagem open source da OpenAI.",
    link: "https://openai.com/blog/better-language-models/",
    features: ["Open Source", "OpenAI", "Base"],
    pricing: "Gratuito",
    rating: 4.0,
    users: "1M+",
    iconSrc: "/images/icons/code-tools.png",
  },
]

export default function DiretorioIA() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")

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

  // Filtrar ferramentas
  const categories = ["Todas", ...Array.from(new Set(allAITools.map((tool) => tool.category)))]

  const filteredTools = allAITools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todas" || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
              <Link href="/diretorio-de-ia" className="text-cyan-400 transition-all duration-300 relative group">
                Diretório de IA
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400"></span>
              </Link>
              <Link
                href="/cursos-de-ia"
                className="text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group"
              >
                Cursos de IA
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/blog"
                className="text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group"
              >
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
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
              <Link href="/diretorio-de-ia" className="text-cyan-400 transition-colors duration-300">
                Diretório de IA
              </Link>
              <Link href="/cursos-de-ia" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                Cursos de IA
              </Link>
              <Link href="/blog" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                Blog
              </Link>
              <Link href="/contato" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                Contato
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="relative z-10 pt-24 px-6 py-12">
        {/* Header */}
        <section
          className={`mb-16 transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
        >
          <div className="max-w-7xl mx-auto text-center mb-8">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Diretório
              </span>{" "}
              de IA
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Explore nossa coleção completa de LLMs e ferramentas de inteligência artificial organizadas por
              especialidade
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Buscar LLMs e ferramentas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-white/5 backdrop-blur-md border-2 border-white/20 text-white placeholder-gray-400 rounded-xl text-base focus:border-cyan-400/60 focus:ring-cyan-400/30"
                />
                <Search className="absolute left-4 top-3 h-6 w-6 text-gray-400" />
              </div>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-12 px-4 pr-10 bg-white/5 backdrop-blur-md border-2 border-white/20 text-white rounded-xl text-base focus:border-cyan-400/60 focus:ring-cyan-400/30 appearance-none cursor-pointer"
                >
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-gray-900 text-white">
                      {category}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-3 h-6 w-6 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-400">{filteredTools.length} LLMs encontradas</div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool, index) => (
              <Card
                key={tool.name}
                className={`group h-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/60 transition-all duration-700 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 hover:bg-white/10 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
                style={{
                  animationDelay: `${300 + index * 50}ms`,
                  transitionDelay: `${index * 25}ms`,
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <Image
                          src={tool.iconSrc || "/placeholder.svg"}
                          alt={tool.category}
                          width={24}
                          height={24}
                          className="category-icon"
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg text-white mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                          {tool.name}
                        </CardTitle>
                        <p className="text-sm text-teal-400 font-medium">{tool.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-lg">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs font-semibold">{tool.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs">
                    {tool.category}
                  </Badge>

                  <p className="text-gray-300 text-sm leading-relaxed">{tool.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {tool.features.slice(0, 3).map((feature) => (
                      <Badge
                        key={feature}
                        variant="outline"
                        className="text-xs border-white/20 text-gray-400 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors duration-300"
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
                              : tool.pricing === "Pesquisa"
                                ? "bg-purple-500/20 text-purple-300"
                                : "bg-orange-500/20 text-orange-300"
                        }`}
                      >
                        {tool.pricing}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-semibold py-2 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-105 transition-all duration-300"
                    onClick={() => window.open(tool.link, "_blank")}
                  >
                    <span>Acessar LLM</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-4">Nenhuma LLM encontrada</p>
              <p className="text-gray-500">Tente ajustar seus filtros de busca</p>
            </div>
          )}
        </section>

        {/* Stats Section */}
        <section
          className={`mt-32 py-20 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl border border-white/10 backdrop-blur-xl transition-all duration-1000 delay-800 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Diretório Completo de LLMs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { number: "110+", label: "LLMs Catalogadas", color: "text-cyan-400" },
                { number: "14", label: "Categorias Especializadas", color: "text-teal-400" },
                { number: "Global", label: "Cobertura Mundial", color: "text-emerald-400" },
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
