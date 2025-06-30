"use client"

import { useState } from "react"
import { ArrowLeft, ExternalLink, Star, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Dados das ferramentas por categoria
const categoryData = {
  generalistas: {
    name: "AI Productivity Tools",
    description: "Ferramentas de IA para aumentar sua produtividade e automatizar tarefas do dia a dia.",
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
        name: "Llama 3",
        company: "Meta",
        description: "Open source, ótimo para personalização e integração.",
        link: "https://llama.meta.com",
        features: ["Open Source", "Personalizável", "Integração"],
        pricing: "Gratuito",
        rating: 4.5,
        users: "5M+",
      },
      {
        name: "Mistral Large",
        company: "Mistral AI",
        description: "Modelo europeu, open source, com foco em eficiência.",
        link: "https://mistral.ai",
        features: ["Europeu", "Eficiente", "Open Source"],
        pricing: "Freemium",
        rating: 4.4,
        users: "2M+",
      },
      {
        name: "Qwen",
        company: "Alibaba",
        description: "Modelo multimodal de código aberto, forte desempenho em benchmarks chineses.",
        link: "https://huggingface.co/Qwen",
        features: ["Multimodal", "Open Source", "Benchmarks"],
        pricing: "Gratuito",
        rating: 4.3,
        users: "1M+",
      },
      {
        name: "ERNIE 4.0",
        company: "Baidu",
        description: "Profunda compreensão e raciocínio, multimodal.",
        link: "https://wenxin.baidu.com/",
        features: ["Raciocínio", "Multimodal", "Compreensão"],
        pricing: "Freemium",
        rating: 4.2,
        users: "5M+",
      },
      {
        name: "YaLM 100B",
        company: "Yandex",
        description: "Modelo de 100 bilhões de parâmetros para várias tarefas gerais.",
        link: "https://yandex.com/company/research/technologies/yalm",
        features: ["100B Parâmetros", "Multilíngue", "Versátil"],
        pricing: "Freemium",
        rating: 4.1,
        users: "500K+",
      },
      {
        name: "Luminous",
        company: "Aleph Alpha",
        description: "Modelo europeu centrado na transparência e na explicabilidade.",
        link: "https://www.aleph-alpha.com/luminous",
        features: ["Transparência", "Explicabilidade", "Europeu"],
        pricing: "Pago",
        rating: 4.0,
        users: "100K+",
      },
      {
        name: "GigaChat",
        company: "Sber",
        description: "LLM conversacional para bate-papo, pesquisa e integração corporativa.",
        link: "https://gigachat.sber.ru/",
        features: ["Conversacional", "Corporativo", "Russo"],
        pricing: "Freemium",
        rating: 3.9,
        users: "2M+",
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
        name: "StarCoder",
        company: "BigCode",
        description: "Open source, treinado em múltiplas linguagens de programação.",
        link: "https://huggingface.co/bigcode/starcoder",
        features: ["Open Source", "Múltiplas Linguagens", "Treinamento Amplo"],
        pricing: "Gratuito",
        rating: 4.3,
        users: "200K+",
      },
      {
        name: "DeepSeek Coder",
        company: "DeepSeek",
        description: "Modelo open source com alta performance em benchmarks de código.",
        link: "https://deepseek.com",
        features: ["Alta Performance", "Benchmarks", "Open Source"],
        pricing: "Gratuito",
        rating: 4.4,
        users: "150K+",
      },
      {
        name: "Phind Model",
        company: "Phind",
        description: "Otimizado para busca e explicação de código.",
        link: "https://phind.com",
        features: ["Busca", "Explicação", "Otimizado"],
        pricing: "Freemium",
        rating: 4.2,
        users: "100K+",
      },
      {
        name: "PanGu-Coder",
        company: "Huawei",
        description: "Modelo para geração e explicação de código.",
        link: "https://huggingface.co/huawei-noah/CodePangu",
        features: ["Geração", "Explicação", "Huawei"],
        pricing: "Gratuito",
        rating: 4.1,
        users: "80K+",
      },
      {
        name: "CodeGeeX2",
        company: "THUDM",
        description: "Multilíngue, código aberto, suporta mais de 20 linguagens de programação.",
        link: "https://huggingface.co/THUDM/codegeex2-6b",
        features: ["20+ Linguagens", "Multilíngue", "Open Source"],
        pricing: "Gratuito",
        rating: 4.0,
        users: "60K+",
      },
      {
        name: "SberCode",
        company: "Sber",
        description: "Automação e geração de código para o mercado russo.",
        link: "https://ai.sber.ru/projects/sbercode",
        features: ["Russo", "Automação", "Geração"],
        pricing: "Freemium",
        rating: 3.9,
        users: "40K+",
      },
      {
        name: "AlphaCode",
        company: "DeepMind",
        description: "Modelo para resolução de problemas de programação competitiva.",
        link: "https://deepmind.com/research/highlighted-research/alphacode",
        features: ["Competitivo", "Resolução", "DeepMind"],
        pricing: "Pesquisa",
        rating: 4.6,
        users: "Pesquisa",
      },
      {
        name: "CodeParrot",
        company: "HuggingFace",
        description: "Código aberto, treinado em grandes volumes de código GitHub.",
        link: "https://huggingface.co/codeparrot",
        features: ["GitHub", "Open Source", "Grandes Volumes"],
        pricing: "Gratuito",
        rating: 3.8,
        users: "30K+",
      },
    ],
  },
  multimodais: {
    name: "Multimodais",
    description: "Capazes de processar e gerar múltiplos tipos de mídia: texto, imagem, áudio e vídeo.",
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
      {
        name: "LLaVA",
        company: "Microsoft",
        description: "Código aberto, combina texto e imagem.",
        link: "https://llava-vl.github.io/",
        features: ["Open Source", "Texto", "Imagem"],
        pricing: "Gratuito",
        rating: 4.4,
        users: "200K+",
      },
      {
        name: "CLIP",
        company: "OpenAI",
        description: "Relaciona imagens e textos para busca e classificação.",
        link: "https://openai.com/research/clip",
        features: ["Busca", "Classificação", "Relacionamento"],
        pricing: "Gratuito",
        rating: 4.5,
        users: "1M+",
      },
      {
        name: "Stable Diffusion XL",
        company: "Stability AI",
        description: "Geração de imagens a partir de texto.",
        link: "https://stability.ai/stable-diffusion",
        features: ["Geração", "Texto para Imagem", "Alta Qualidade"],
        pricing: "Freemium",
        rating: 4.6,
        users: "5M+",
      },
      {
        name: "ERNIE-ViLG",
        company: "Baidu",
        description: "Geração de texto para imagem, semelhante ao DALL-E.",
        link: "https://github.com/PaddlePaddle/PaddleGAN/tree/develop/applications/ERNIE-ViLG",
        features: ["Texto para Imagem", "DALL-E Like", "Chinês"],
        pricing: "Gratuito",
        rating: 4.2,
        users: "300K+",
      },
      {
        name: "SenseNova",
        company: "SenseTime",
        description: "Multimodal, com aplicações em vídeo, imagem e texto.",
        link: "https://www.sensetime.com/en/technology/sensenova",
        features: ["Vídeo", "Imagem", "Texto"],
        pricing: "Pago",
        rating: 4.1,
        users: "100K+",
      },
      {
        name: "YandexGPT",
        company: "Yandex",
        description: "Multimodal, integrado com produtos Yandex.",
        link: "https://yandex.ru/ai/gpt",
        features: ["Integração", "Russo", "Multimodal"],
        pricing: "Freemium",
        rating: 4.0,
        users: "2M+",
      },
      {
        name: "HyperCLOVA X",
        company: "Naver",
        description: "Multimodal, suporta Coreano e Inglês.",
        link: "https://clova.ai/en/tech/hyperclova.html",
        features: ["Coreano", "Inglês", "Multimodal"],
        pricing: "Pago",
        rating: 3.9,
        users: "500K+",
      },
      {
        name: "KoGPT",
        company: "Kakao",
        description: "Modelo multimodal coreano, API pública.",
        link: "https://developers.kakao.com/ko/docs/latest/ko/kogpt/rest",
        features: ["Coreano", "API Pública", "Multimodal"],
        pricing: "Freemium",
        rating: 3.8,
        users: "200K+",
      },
    ],
  },
  pesquisa: {
    name: "Pesquisa e Busca",
    description: "Aprimorados para busca semântica, sumarização e análise de grandes volumes de dados.",
    tools: [
      {
        name: "Perplexity AI",
        company: "Perplexity",
        description: "Responder perguntas com base em múltiplas fontes.",
        link: "https://perplexity.ai",
        features: ["Múltiplas Fontes", "Citações", "Tempo Real"],
        pricing: "Freemium",
        rating: 4.6,
        users: "10M+",
      },
      {
        name: "You.com",
        company: "You.com",
        description: "Motor de busca com IA integrada.",
        link: "https://you.com",
        features: ["IA Integrada", "Privacidade", "Personalização"],
        pricing: "Freemium",
        rating: 4.3,
        users: "5M+",
      },
      {
        name: "Google SGE",
        company: "Google",
        description: "Busca com respostas geradas por IA.",
        link: "https://labs.google.com/search",
        features: ["Google", "Experimental", "IA Generativa"],
        pricing: "Gratuito",
        rating: 4.4,
        users: "50M+",
      },
      {
        name: "Phind",
        company: "Phind",
        description: "Busca técnica e explicação de código.",
        link: "https://phind.com",
        features: ["Técnico", "Código", "Explicação"],
        pricing: "Freemium",
        rating: 4.2,
        users: "1M+",
      },
      {
        name: "Kagi",
        company: "Kagi",
        description: "Busca privada com IA e sumarização.",
        link: "https://kagi.com",
        features: ["Privacidade", "Sumarização", "Sem Ads"],
        pricing: "Pago",
        rating: 4.5,
        users: "100K+",
      },
      {
        name: "Bing AI",
        company: "Microsoft",
        description: "Pesquisa integrada com LLM, respostas contextuais.",
        link: "https://www.bing.com/new",
        features: ["Microsoft", "Contextual", "Integrado"],
        pricing: "Gratuito",
        rating: 4.1,
        users: "100M+",
      },
      {
        name: "Yandex Search AI",
        company: "Yandex",
        description: "Pesquisa semântica e respostas geradas por IA.",
        link: "https://yandex.com/search/",
        features: ["Semântica", "Russo", "IA Generativa"],
        pricing: "Gratuito",
        rating: 4.0,
        users: "50M+",
      },
      {
        name: "Baidu Search AI",
        company: "Baidu",
        description: "Pesquise com respostas inteligentes com tecnologia LLM.",
        link: "https://www.baidu.com/",
        features: ["Chinês", "LLM", "Inteligente"],
        pricing: "Gratuito",
        rating: 3.9,
        users: "500M+",
      },
      {
        name: "Seznam.cz LLM",
        company: "Seznam",
        description: "Pesquisa local com IA generativa para usuários tchecos.",
        link: "https://www.seznam.cz/",
        features: ["Tcheco", "Local", "IA Generativa"],
        pricing: "Gratuito",
        rating: 3.7,
        users: "5M+",
      },
      {
        name: "NeevaAI",
        company: "Neeva",
        description: "Pesquisa privada com respostas geradas por LLM.",
        link: "https://neeva.com/",
        features: ["Privacidade", "LLM", "Sem Ads"],
        pricing: "Pago",
        rating: 4.3,
        users: "500K+",
      },
    ],
  },
  saude: {
    name: "Saúde e Medicina",
    description: "Focados em linguagem médica, diagnósticos e suporte clínico.",
    tools: [
      {
        name: "MedPaLM 2",
        company: "Google",
        description: "Especializado em linguagem médica.",
        link: "https://sites.research.google/med-palm/",
        features: ["Linguagem Médica", "Google", "Especializado"],
        pricing: "Pesquisa",
        rating: 4.7,
        users: "Pesquisa",
      },
      {
        name: "BioGPT",
        company: "Microsoft",
        description: "Focado em literatura biomédica.",
        link: "https://github.com/microsoft/BioGPT",
        features: ["Biomédica", "Literatura", "Microsoft"],
        pricing: "Gratuito",
        rating: 4.4,
        users: "50K+",
      },
      {
        name: "GatorTron",
        company: "UF Health",
        description: "Processamento de linguagem clínica.",
        link: "https://ufhealth.org/gatortron",
        features: ["Clínica", "Processamento", "UF Health"],
        pricing: "Pesquisa",
        rating: 4.3,
        users: "Pesquisa",
      },
      {
        name: "ClinicalBERT",
        company: "MIT",
        description: "Modelo BERT adaptado para textos clínicos.",
        link: "https://github.com/kexinhuang12345/clinicalBERT",
        features: ["BERT", "Clínico", "MIT"],
        pricing: "Gratuito",
        rating: 4.2,
        users: "20K+",
      },
      {
        name: "PubMedBERT",
        company: "Microsoft",
        description: "Treinado em artigos científicos biomédicos.",
        link: "https://huggingface.co/microsoft/BiomedNLP-PubMedBERT-base-uncased-abstract-fulltext",
        features: ["PubMed", "Científico", "Biomédico"],
        pricing: "Gratuito",
        rating: 4.1,
        users: "30K+",
      },
      {
        name: "ChatDoctor",
        company: "Universidade",
        description: "LLM treinado em dados médicos chineses para triagem e suporte.",
        link: "https://github.com/Kent0n-Li/ChatDoctor",
        features: ["Chinês", "Triagem", "Suporte"],
        pricing: "Gratuito",
        rating: 3.9,
        users: "10K+",
      },
      {
        name: "MedGPT",
        company: "Pesquisadores",
        description: "Focado na literatura médica indiana e global.",
        link: "https://huggingface.co/medgpt",
        features: ["Indiano", "Global", "Literatura"],
        pricing: "Gratuito",
        rating: 3.8,
        users: "5K+",
      },
      {
        name: "SberMed AI",
        company: "Sber",
        description: "LLM para suporte clínico e análise de exames médicos.",
        link: "https://sbermed.ai/",
        features: ["Russo", "Clínico", "Exames"],
        pricing: "Pago",
        rating: 3.7,
        users: "50K+",
      },
      {
        name: "BioMedLM",
        company: "Stanford",
        description: "Modelo biomédico europeu, código aberto.",
        link: "https://huggingface.co/stanford-crfm/BioMedLM",
        features: ["Europeu", "Open Source", "Stanford"],
        pricing: "Gratuito",
        rating: 4.0,
        users: "15K+",
      },
    ],
  },
  negocios: {
    name: "Negócios e Produtividade",
    description: "Voltados para automatização de tarefas, análise de dados e suporte corporativo.",
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
      {
        name: "Writer",
        company: "Writer",
        description: "IA para criação de conteúdo corporativo.",
        link: "https://writer.com",
        features: ["Corporativo", "Conteúdo", "Criação"],
        pricing: "Pago",
        rating: 4.3,
        users: "500K+",
      },
      {
        name: "Notion AI",
        company: "Notion",
        description: "Assistência integrada ao Notion para produtividade.",
        link: "https://notion.so",
        features: ["Notion", "Produtividade", "Integrado"],
        pricing: "Freemium",
        rating: 4.5,
        users: "20M+",
      },
      {
        name: "Zoho Zia",
        company: "Zoho",
        description: "IA para automação de processos empresariais.",
        link: "https://www.zoho.com/zia/",
        features: ["Automação", "Empresarial", "Processos"],
        pricing: "Freemium",
        rating: 4.1,
        users: "5M+",
      },
      {
        name: "Alice",
        company: "Yandex",
        description: "Assistente virtual para negócios e produtividade.",
        link: "https://alice.yandex.com/",
        features: ["Russo", "Assistente", "Produtividade"],
        pricing: "Gratuito",
        rating: 4.0,
        users: "10M+",
      },
      {
        name: "Wenxin Yiyan",
        company: "Baidu",
        description: "IA para automação de tarefas de negócios.",
        link: "https://yiyan.baidu.com/",
        features: ["Chinês", "Automação", "Negócios"],
        pricing: "Freemium",
        rating: 3.9,
        users: "5M+",
      },
      {
        name: "SAP Joule",
        company: "SAP",
        description: "IA generativa para automação de processos de negócios.",
        link: "https://www.sap.com/products/artificial-intelligence/joule.html",
        features: ["SAP", "Generativa", "Processos"],
        pricing: "Pago",
        rating: 4.2,
        users: "1M+",
      },
      {
        name: "Carol",
        company: "TOTVS",
        description: "IA para automação e insights em gestão de negócios.",
        link: "https://www.totvs.com/carol/",
        features: ["Brasileiro", "Gestão", "Insights"],
        pricing: "Pago",
        rating: 3.8,
        users: "200K+",
      },
    ],
  },
  educacao: {
    name: "Educação e Tutoria",
    description: "Ajuda no ensino, explicação de conceitos e personalização do aprendizado.",
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
      {
        name: "QuillBot",
        company: "QuillBot",
        description: "Parafraseador e assistente de escrita.",
        link: "https://quillbot.com",
        features: ["Paráfrase", "Escrita", "Assistente"],
        pricing: "Freemium",
        rating: 4.3,
        users: "50M+",
      },
      {
        name: "Elicit",
        company: "Ought",
        description: "Pesquisa acadêmica assistida por IA.",
        link: "https://elicit.org",
        features: ["Acadêmica", "Pesquisa", "IA"],
        pricing: "Freemium",
        rating: 4.5,
        users: "1M+",
      },
      {
        name: "Duolingo Max",
        company: "Duolingo",
        description: "Aprendizado de idiomas com IA generativa.",
        link: "https://duolingo.com",
        features: ["Idiomas", "Generativa", "Aprendizado"],
        pricing: "Freemium",
        rating: 4.7,
        users: "500M+",
      },
      {
        name: "iFlytek Spark",
        company: "iFlytek",
        description: "Tutor virtual para ensino básico e superior.",
        link: "https://www.iflytek.com/en/spark/",
        features: ["Chinês", "Tutor", "Ensino"],
        pricing: "Freemium",
        rating: 4.1,
        users: "20M+",
      },
      {
        name: "SberClass",
        company: "Sber",
        description: "IA para apoio escolar e universitário.",
        link: "https://class.sber.ru/",
        features: ["Russo", "Escolar", "Universitário"],
        pricing: "Freemium",
        rating: 3.9,
        users: "2M+",
      },
      {
        name: "Byju's AI Tutor",
        company: "Byju's",
        description: "Tutor personalizado para estudantes.",
        link: "https://byjus.com/",
        features: ["Indiano", "Personalizado", "Estudantes"],
        pricing: "Pago",
        rating: 4.0,
        users: "100M+",
      },
      {
        name: "EduAI",
        company: "EduAI",
        description: "Plataforma de tutoria baseada em IA para escolas checas.",
        link: "https://www.eduai.cz/",
        features: ["Tcheco", "Escolas", "Tutoria"],
        pricing: "Pago",
        rating: 3.8,
        users: "50K+",
      },
      {
        name: "Knewton Alta",
        company: "Knewton",
        description: "Plataforma de aprendizagem adaptativa com IA.",
        link: "https://www.knewton.com/alta/",
        features: ["Adaptativa", "Aprendizagem", "Plataforma"],
        pricing: "Pago",
        rating: 4.2,
        users: "1M+",
      },
    ],
  },
  idiomas: {
    name: "Idiomas e Tradução",
    description: "Especializados em tradução automática e compreensão multilíngue.",
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
      {
        name: "NLLB",
        company: "Meta",
        description: "Tradução para mais de 200 idiomas.",
        link: "https://ai.meta.com/research/no-language-left-behind/",
        features: ["200+ Idiomas", "Open Source", "Meta"],
        pricing: "Gratuito",
        rating: 4.3,
        users: "Research",
      },
      {
        name: "BLOOM",
        company: "BigScience",
        description: "Multilíngua, open source, treinado em 46 idiomas.",
        link: "https://huggingface.co/bigscience/bloom",
        features: ["46 Idiomas", "Open Source", "Multilíngua"],
        pricing: "Gratuito",
        rating: 4.2,
        users: "100K+",
      },
      {
        name: "ModernMT",
        company: "ModernMT",
        description: "Tradução adaptativa para empresas.",
        link: "https://modernmt.com",
        features: ["Adaptativa", "Empresas", "Personalização"],
        pricing: "Pago",
        rating: 4.1,
        users: "10K+",
      },
      {
        name: "TranSmart",
        company: "Tencent",
        description: "Tradução automática para línguas asiáticas.",
        link: "https://transmart.qq.com/",
        features: ["Asiáticas", "Tencent", "Automática"],
        pricing: "Freemium",
        rating: 4.0,
        users: "50M+",
      },
      {
        name: "PROMT Neural",
        company: "PROMT",
        description: "Tradutor neural para russo, inglês e outros idiomas.",
        link: "https://www.promt.com/",
        features: ["Neural", "Russo", "Múltiplos"],
        pricing: "Freemium",
        rating: 3.9,
        users: "5M+",
      },
      {
        name: "Papago",
        company: "Naver",
        description: "Tradução multilíngue com IA coreana.",
        link: "https://papago.naver.com/",
        features: ["Coreano", "Multilíngue", "Naver"],
        pricing: "Gratuito",
        rating: 4.2,
        users: "20M+",
      },
      {
        name: "LingvaNex",
        company: "LingvaNex",
        description: "Tradutor multilíngue com IA, suporta mais de 100 idiomas.",
        link: "https://lingvanex.com/",
        features: ["100+ Idiomas", "Multilíngue", "IA"],
        pricing: "Freemium",
        rating: 3.8,
        users: "1M+",
      },
      {
        name: "Apertium",
        company: "Apertium",
        description: "Plataforma de código aberto para tradução automática.",
        link: "https://apertium.org/",
        features: ["Open Source", "Plataforma", "Automática"],
        pricing: "Gratuito",
        rating: 3.7,
        users: "500K+",
      },
    ],
  },
  "codigo-aberto": {
    name: "Código Aberto",
    description: "Projetos para fácil adaptação, treinamento e uso em projetos próprios.",
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
      {
        name: "Mixtral 8x7B",
        company: "Mistral AI",
        description: "Arquitetura MoE (Mistura de Especialistas), código aberto.",
        link: "https://mistral.ai/news/mixtral-of-experts/",
        features: ["MoE", "Especialistas", "Open Source"],
        pricing: "Gratuito",
        rating: 4.5,
        users: "1M+",
      },
      {
        name: "Phi-3",
        company: "Microsoft",
        description: "Pequeno, eficiente e open source.",
        link: "https://azure.microsoft.com/en-us/products/phi-3",
        features: ["Pequeno", "Eficiente", "Microsoft"],
        pricing: "Gratuito",
        rating: 4.3,
        users: "500K+",
      },
      {
        name: "Falcon LLM",
        company: "TII",
        description: "Código aberto, treinado em larga escala.",
        link: "https://falconllm.tii.ae/",
        features: ["Larga Escala", "TII", "Open Source"],
        pricing: "Gratuito",
        rating: 4.2,
        users: "300K+",
      },
      {
        name: "RWKV",
        company: "RWKV",
        description: "Arquitetura alternativa, código aberto, eficiente em hardware modesto.",
        link: "https://github.com/BlinkDL/RWKV-LM",
        features: ["Alternativa", "Eficiente", "Hardware Modesto"],
        pricing: "Gratuito",
        rating: 4.1,
        users: "100K+",
      },
      {
        name: "Baichuan 2",
        company: "Baichuan",
        description: "Código aberto, multilíngue, focado na adaptação local.",
        link: "https://huggingface.co/baichuan-inc/Baichuan2-13B-Chat",
        features: ["Multilíngue", "Adaptação Local", "Chinês"],
        pricing: "Gratuito",
        rating: 4.0,
        users: "200K+",
      },
      {
        name: "RuGPT-3",
        company: "Sber",
        description: "Modelo de código aberto para russo e inglês.",
        link: "https://huggingface.co/sberbank-ai/rugpt3large_based_on_gpt2",
        features: ["Russo", "Inglês", "Sber"],
        pricing: "Gratuito",
        rating: 3.9,
        users: "50K+",
      },
      {
        name: "Czech LLM",
        company: "Czech NLP",
        description: "Modelo de código aberto para a língua checa.",
        link: "https://huggingface.co/czech-nlp/cesky-llm",
        features: ["Tcheco", "Open Source", "Local"],
        pricing: "Gratuito",
        rating: 3.8,
        users: "20K+",
      },
      {
        name: "Maritaca LLM",
        company: "Maritaca AI",
        description: "Código aberto brasileiro, treinado em português.",
        link: "https://github.com/maritaca-ai/maritaca-llm",
        features: ["Brasileiro", "Português", "Open Source"],
        pricing: "Gratuito",
        rating: 4.0,
        users: "30K+",
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const category = categoryData[params.slug as keyof typeof categoryData]

  if (!category) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Categoria não encontrada</h1>
          <Link href="/">
            <Button className="bg-green-500 hover:bg-green-600 text-black">Voltar ao Início</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                <span className="text-black font-bold text-lg">U</span>
              </div>
              <span className="text-2xl font-bold text-green-500">UPFLUX</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" className="text-gray-300 hover:text-green-400 hover:bg-transparent">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Category Header */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-green-500">{category.name}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl">{category.description}</p>
        </section>

        {/* Tools Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.tools.map((tool) => (
              <Card
                key={tool.name}
                className="bg-gray-900 border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:bg-gray-800/50"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-white mb-1">{tool.name}</CardTitle>
                      <p className="text-sm text-green-500">{tool.company}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm">{tool.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm">{tool.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {tool.features.map((feature) => (
                      <Badge
                        key={feature}
                        variant="secondary"
                        className="bg-green-500/20 text-green-400 border-green-500/30"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{tool.users}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{tool.pricing}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold"
                    onClick={() => window.open(tool.link, "_blank")}
                  >
                    Acessar Ferramenta
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
