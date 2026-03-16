import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Activity, XCircle, FileText,
  LifeBuoy, Target, Calculator, AlertOctagon, Bus,
  Clock, Brain, Zap, GitCommit, LineChart, Lightbulb,
  UserCheck, BookOpen, MessageSquare, Rocket,
  ChevronLeft, ChevronRight, Fingerprint
} from 'lucide-react';

// Common tech-corporate styling classes
const TECH_BG = "bg-[#0B1120]"; // Very dark slate/blue
const CARD_BG = "bg-[#111827]/80 backdrop-blur-md border border-[#1E293B] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)]";
const HIGHLIGHT_TEXT = "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400";
const ACCENT_COLOR = "text-blue-400";
const SECONDARY_ACCENT = "text-cyan-400";

const slidesData = [
  {
    id: 1,
    layout: 'intro',
    title: 'La Paradoja del Crecimiento',
    subtitle: 'El éxito genera más trabajo manual, más fricción y más estrés operacional.',
    steps: [
      { num: '01', title: 'Expansión Comercial', desc: 'Aumento de volumen transaccional continuo', icon: <TrendingUp className="text-blue-400" /> },
      { num: '02', title: 'Fricción Operativa', desc: 'Procesos legacy que no escalan linealmente', icon: <Activity className="text-amber-400" /> },
      { num: '03', title: 'Colapso Sistémico', desc: 'Cuellos de botella en flujos artesanales', icon: <XCircle className="text-rose-400" /> }
    ],
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 2,
    layout: 'columns',
    title: 'El "Impuesto a la Ineficiencia"',
    subtitle: 'Un costo estructural silencioso. La pérdida de capital humano en tareas automatizables erosiona los márgenes.',
    cols: [
      {
        icon: <FileText size={24} className="text-blue-400 mb-4" />,
        title: 'Operaciones CORE',
        items: ['Conciliación manual de datos fragmentados.', 'Doble o triple carga de información.']
      },
      {
        icon: <LifeBuoy size={24} className="text-cyan-400 mb-4" />,
        title: 'Atención al Cliente',
        items: ['Resolución reiterativa de consultas L1.', 'Falta de enrutamiento inteligente de tickets.']
      },
      {
        icon: <Target size={24} className="text-indigo-400 mb-4" />,
        title: 'Crecimiento (Ventas)',
        items: ['Seguimiento asíncrono y manual en CRM.', 'Pérdida de tracción por latencia en respuestas.']
      }
    ],
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 3,
    layout: 'stats',
    title: 'La Matemática del Error',
    subtitle: 'Impacto cuantitativo de la dependencia humana en transferencia de datos.',
    text: 'La intervención manual en procesos de datos conlleva una desviación estándar inevitable. El impacto compuesto destruye la confiabilidad del dato.',
    stats: [
      { value: '100h', label: 'Fuga Operativa', desc: 'Por FTE/mes en tareas no cognitivas' },
      { value: '±3%', label: 'Margen de Error Base', desc: 'En cada nodo de entrada manual' }
    ],
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 4,
    layout: 'spof',
    title: 'Vulnerabilidad: SPOF',
    subtitle: 'Single Point of Failure - Nodos críticos no redundantes en la arquitectura organizacional.',
    q1: 'Definición Técnica',
    a1: 'Un componente central (humano o proceso) cuya interrupción causa un fallo total del sistema.',
    q2: 'El Escenario de Riesgo',
    alert: 'ERR_CRITICAL_DEPENDENCY: EL PROCESO DEPENDE DE UN SOLO ACTOR',
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 5,
    layout: 'center_focus',
    title: 'El "Bus Factor"',
    text: 'El número mínimo de miembros del equipo que deben desaparecer repentinamente para que la operatividad técnica se detenga por completo.',
    bigNumber: '1',
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 6,
    layout: 'features',
    title: 'La IA como Infraestructura',
    subtitle: 'Transición de flujos manuales a sistemas autónomos supervisados. La IA como capa habilitadora.',
    items: [
      { icon: <Clock className="text-blue-400" size={32} />, title: 'Disponibilidad Lógica 24/7', desc: 'Ejecución continua sin degradación de rendimiento.' },
      { icon: <Brain className="text-cyan-400" size={32} />, title: 'Procesamiento Cognitivo', desc: 'Análisis de datos desestructurados a escala.' },
      { icon: <Zap className="text-indigo-400" size={32} />, title: 'Integración Seamless', desc: 'Orquestación de APIs y sistemas fragmentados.' }
    ],
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 7,
    layout: 'tools',
    title: 'Arquitectura de Soluciones',
    subtitle: 'Stack tecnológico aplicado a la resolución de problemas empresariales comunes.',
    cols: [
      {
        icon: <GitCommit className="text-blue-500 mb-4" size={32} />,
        title: 'Orquestación: n8n / Make',
        items: ['Pipelines de datos automatizados', 'Sincronización ERP <-> CRM en tiempo real', 'Workflows basados en eventos puros']
      },
      {
        icon: <LineChart className="text-cyan-500 mb-4" size={32} />,
        title: 'Análisis: LLMs',
        items: ['Parsing inteligente de facturación', 'Detección de anomalías en P&L', 'Generación automatizada de reportes BI']
      }
    ],
    footer: 'Infraestructura disponible hoy bajo modelos SaaS/PaaS accesibles.',
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 8,
    layout: 'limitations',
    title: 'Fronteras del Sistema',
    subtitle: 'Limitaciones inherentes de los modelos algorítmicos actuales en entornos empresariales.',
    items: [
      { icon: <Lightbulb size={28} className="text-amber-400" />, text: 'Razonamiento Lateral' },
      { icon: <UserCheck size={28} className="text-rose-400" />, text: 'Contexto Social Tácito' },
      { icon: <BookOpen size={28} className="text-indigo-400" />, text: 'Responsabilidad Fiduciaria' }
    ],
    footer: 'Aumentación Sistémica > Reemplazo Humano.',
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 9,
    layout: 'questions',
    title: 'Auditoría Interna',
    subtitle: 'Preguntas de diagnóstico para la evaluación de madurez operativa:',
    questions: [
      'Identificar cuellos de botella: ¿Dónde está la latencia operativa mayor en su estructura?',
      'Identificar SPOFs: ¿Cuántos procesos dependen de conocimiento no documentado?',
      'Viabilidad: ¿Qué porcentaje de esas horas perdidas es técnica y financieramente automatizable HOY?'
    ],
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 10,
    layout: 'conclusion',
    title: 'El Up-Grade Necesario',
    subtitle: 'La automatización dejó de ser una ventaja competitiva para convertirse en un requisito de subsistencia operativa.',
    points: ['Sistematizar Operaciones', 'Delegar en Máquinas', 'Liderar Humanos'],
    footer: 'El objetivo final de la tecnología es construir sistemas que funcionen cuando no estás mirando.',
    bg: TECH_BG,
    textColor: 'text-slate-100'
  }
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Background Grid Component for Tech Feel
const TechGrid = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-900 to-transparent opacity-50"></div>
  </div>
);

const MotionContainer = ({ children, bg, textColor, className = "" }) => (
  <motion.section 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className={`fixed inset-0 w-full h-full flex flex-col justify-center py-20 px-6 sm:px-12 md:px-24 ${bg} ${textColor || ''} overflow-hidden`}
  >
    <TechGrid />
    <div className={`max-w-6xl mx-auto w-full z-10 relative ${className}`}>
      {children}
    </div>
  </motion.section>
);

const SectionRenderer = ({ slide }) => {
  const isIntro = slide.layout === 'intro';
  const isColumns = slide.layout === 'columns';
  const isStats = slide.layout === 'stats';
  const isSpof = slide.layout === 'spof';
  const isCenterFocus = slide.layout === 'center_focus';
  const isFeatures = slide.layout === 'features';
  const isTools = slide.layout === 'tools';
  const isLimitations = slide.layout === 'limitations';
  const isQuestions = slide.layout === 'questions';
  const isConclusion = slide.layout === 'conclusion';

  if (isIntro) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor}>
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="border-l-2 border-blue-500 pl-8 mb-12">
          <h1 className={`text-6xl md:text-8xl font-black tracking-tighter mb-6 ${HIGHLIGHT_TEXT}`}>
            {slide.title}
          </h1>
          <p className="text-2xl md:text-3xl font-light text-slate-400 max-w-4xl">
            {slide.subtitle}
          </p>
        </motion.div>

        <motion.div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl mt-8">
          {slide.steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial="hidden" animate="visible" 
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { delay: 0.2 + i * 0.1 } }
              }}
              className={`${CARD_BG} p-8 rounded-xl flex flex-col gap-6 relative overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl tracking-tighter mix-blend-overlay group-hover:scale-110 transition-transform">
                {step.num}
              </div>
              <div className="flex items-center gap-4 border-b border-[#1E293B] pb-4">
                <div className="p-3 bg-blue-950/30 rounded-lg border border-blue-900/50">{step.icon}</div>
                <h3 className="text-xl font-bold text-slate-200">{step.title}</h3>
              </div>
              <div>
                <p className="text-base text-slate-400 leading-relaxed font-light">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </MotionContainer>
    );
  }

  if (isColumns) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor}>
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="mb-16">
          <div className="inline-flex items-center gap-3 mb-6 bg-blue-950/30 border border-blue-900/50 px-4 py-1.5 rounded-full text-blue-400 text-sm font-mono uppercase tracking-widest">
            <Fingerprint size={16} /> Estructura de Costos
          </div>
          <h2 className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-100`}>{slide.title}</h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-5xl font-light">{slide.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
          {slide.cols.map((col, i) => (
            <motion.div 
              key={i} 
              initial="hidden" animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.1 } }
              }}
              className={`${CARD_BG} p-10 rounded-xl relative`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-50"></div>
              <div className="bg-[#1E293B]/50 w-14 h-14 rounded-lg flex items-center justify-center mb-8 border border-[#334155]">
                {col.icon}
              </div>
              <h3 className="text-2xl font-bold mb-6 text-white">{col.title}</h3>
              <ul className="space-y-4">
                {col.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-4 text-slate-400 text-base md:text-lg font-light">
                    <span className="text-blue-500 mt-1.5 font-mono text-sm">›</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </MotionContainer>
    );
  }

  if (isStats) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor} className="flex flex-col md:flex-row md:items-center gap-16">
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="md:w-1/2">
          <div className="inline-flex items-center gap-3 mb-6 bg-cyan-950/30 border border-cyan-900/50 px-4 py-1.5 rounded-full text-cyan-400 text-sm font-mono uppercase tracking-widest">
            <Calculator size={16} /> Análisis Cuantitativo
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight text-slate-100">{slide.title}</h2>
          <p className="text-2xl font-medium text-slate-300 mb-8 leading-snug font-light">{slide.subtitle}</p>
          <div className="bg-[#111827] border-l-4 border-blue-500 p-6 rounded-r-lg">
            <p className="text-lg text-slate-400 leading-relaxed font-mono text-sm">{slide.text}</p>
          </div>
        </motion.div>
        <div className="md:w-1/2 grid gap-6">
          {slide.stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.2 }}
              className={`${CARD_BG} p-8 rounded-xl flex items-center gap-8`}
            >
              <div className="w-1/3 text-right">
                <div className={`text-5xl md:text-7xl font-black ${HIGHLIGHT_TEXT} tracking-tighter`}>
                  {stat.value}
                </div>
              </div>
              <div className="w-2/3 border-l border-[#1E293B] pl-8">
                <h3 className="text-xl font-bold text-white mb-2">{stat.label}</h3>
                <p className="text-sm text-slate-400 font-light">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </MotionContainer>
    );
  }

  if (isSpof) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor}>
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="mb-16">
          <div className="inline-flex items-center gap-3 mb-6 bg-rose-950/30 border border-rose-900/50 px-4 py-1.5 rounded-full text-rose-400 text-sm font-mono uppercase tracking-widest">
            <AlertOctagon size={16} /> Riesgo Estructural
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-100">{slide.title}</h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-4xl font-light">{slide.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl mb-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className={`${CARD_BG} p-8 rounded-xl`}>
            <h3 className="text-slate-500 font-mono text-sm mb-4 tracking-widest uppercase border-b border-[#1E293B] pb-4">{slide.q1}</h3>
            <p className="text-slate-300 text-lg font-light leading-relaxed">{slide.a1}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className={`${CARD_BG} p-8 rounded-xl relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-2 h-full bg-rose-500/50"></div>
            <h3 className="text-slate-500 font-mono text-sm mb-4 tracking-widest uppercase border-b border-[#1E293B] pb-4">El Problema:</h3>
            <p className="text-slate-300 text-lg font-light leading-relaxed">{slide.q2}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}
          className="w-full max-w-5xl bg-rose-950/20 border border-rose-900/50 p-6 rounded-xl flex items-center gap-6"
        >
          <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse shrink-0 tracking-widest"></div>
          <p className="text-rose-400 font-mono text-sm md:text-base selection:bg-rose-500/30">{slide.alert}</p>
        </motion.div>
      </MotionContainer>
    );
  }

  if (isCenterFocus) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor} className="flex flex-col items-center justify-center text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="flex flex-col items-center z-10 w-full max-w-4xl">
          <div className="inline-flex items-center gap-3 mb-10 bg-indigo-950/30 border border-indigo-900/50 px-4 py-1.5 rounded-full text-indigo-400 text-sm font-mono uppercase tracking-widest">
            <Bus size={16} /> Métrica de Continuidad
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-slate-100">{slide.title}</h2>
          <p className="text-xl md:text-3xl text-slate-400 leading-relaxed font-light">{slide.text}</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="mt-12 text-[15rem] md:text-[20rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-slate-700 to-slate-900 drop-shadow-sm select-none"
        >
          {slide.bigNumber}
        </motion.div>
      </MotionContainer>
    );
  }

  if (isFeatures) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor}>
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="mb-16">
          <div className="inline-flex items-center gap-3 mb-6 bg-blue-950/30 border border-blue-900/50 px-4 py-1.5 rounded-full text-blue-400 text-sm font-mono uppercase tracking-widest">
            <Brain size={16} /> Infraestructura Cognitiva
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-100">{slide.title}</h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-4xl font-light">{slide.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
          {slide.items.map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
              className={`${CARD_BG} p-10 rounded-xl group relative overflow-hidden`}
            >
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform">
                {React.cloneElement(item.icon, { size: 120 })}
              </div>
              <div className="bg-[#1E293B]/50 w-14 h-14 rounded-lg flex items-center justify-center border border-[#334155] mb-8 relative z-10">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-100 relative z-10">{item.title}</h3>
              <p className="text-base text-slate-400 leading-relaxed font-light relative z-10">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </MotionContainer>
    );
  }

  if (isTools) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor}>
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="mb-16">
          <div className="inline-flex items-center gap-3 mb-6 bg-cyan-950/30 border border-cyan-900/50 px-4 py-1.5 rounded-full text-cyan-400 text-sm font-mono uppercase tracking-widest">
            <Zap size={16} /> Stack Tecnológico
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-100">{slide.title}</h2>
          <p className="text-xl md:text-2xl text-slate-400 mb-16 font-light max-w-4xl">{slide.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 w-full max-w-6xl mb-12">
          {slide.cols.map((col, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.2 }}
              className={`${CARD_BG} p-10 rounded-xl border-t-2 ${i === 0 ? 'border-t-blue-500' : 'border-t-cyan-500'}`}
            >
              <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-4">
                {col.icon} {col.title}
              </h3>
              <ul className="space-y-4">
                {col.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-4 text-slate-300 text-base font-light">
                    <div className="w-1.5 h-1.5 bg-[#475569] shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="max-w-6xl">
          <p className="text-slate-500 text-sm font-mono uppercase tracking-widest border-t border-[#1E293B] pt-6 inline-block">
            // {slide.footer}
          </p>
        </motion.div>
      </MotionContainer>
    );
  }

  if (isLimitations) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor}>
        <div className="flex flex-col md:flex-row gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="md:w-1/3">
              <div className="inline-flex items-center gap-3 mb-6 bg-amber-950/30 border border-amber-900/50 px-4 py-1.5 rounded-full text-amber-500 text-sm font-mono uppercase tracking-widest">
                <AlertOctagon size={16} /> Restricciones
              </div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-slate-100">{slide.title}</h2>
              <p className="text-xl text-slate-400 font-light leading-relaxed">{slide.subtitle}</p>
            </motion.div>

            <div className="md:w-2/3 grid gap-4 w-full">
              {slide.items.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
                  className={`${CARD_BG} p-6 tracking-wide rounded-xl flex items-center gap-6`}
                >
                  <div className="p-3 bg-[#1E293B]/50 rounded-lg border border-[#334155]">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-200">{item.text}</h3>
                </motion.div>
              ))}
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 border-l-2 border-indigo-500 pl-6">
                <p className="text-lg font-light text-slate-300">
                  {slide.footer}
                </p>
              </motion.div>
            </div>
        </div>
      </MotionContainer>
    );
  }

  if (isQuestions) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor} className="flex flex-col justify-center max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="mb-16">
          <div className="inline-flex items-center gap-3 mb-6 bg-indigo-950/30 border border-indigo-900/50 px-4 py-1.5 rounded-full text-indigo-400 text-sm font-mono uppercase tracking-widest">
            <Target size={16} /> Evaluación
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-100">{slide.title}</h2>
          <p className="text-xl text-slate-400 max-w-3xl font-light">{slide.subtitle}</p>
        </motion.div>

        <div className="grid gap-4 w-full">
          {slide.questions.map((q, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
              className={`${CARD_BG} p-8 rounded-xl flex items-start sm:items-center gap-6`}
            >
              <div className="text-slate-600 font-mono text-xl sm:text-2xl font-black">
                0{i + 1}
              </div>
              <p className="text-lg sm:text-xl font-medium text-slate-200 leading-tight">{q}</p>
            </motion.div>
          ))}
        </div>
      </MotionContainer>
    );
  }

  if (isConclusion) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor}>
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="w-full">
            <div className="inline-flex items-center gap-3 mb-8 bg-emerald-950/30 border border-emerald-900/50 px-4 py-1.5 rounded-full text-emerald-400 text-sm font-mono uppercase tracking-widest">
               Siguientes Pasos
            </div>
            <h2 className={`text-6xl md:text-8xl font-black tracking-tighter mb-8 ${HIGHLIGHT_TEXT}`}>{slide.title}</h2>
            <p className="text-2xl md:text-3xl text-slate-400 font-light leading-snug mb-16">{slide.subtitle}</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-20">
            {slide.points.map((point, i) => (
              <motion.span 
                key={i} 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-[#1E293B]/50 text-slate-300 border border-[#334155] px-6 py-3 rounded-lg text-lg font-medium"
              >
                {point}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="w-full border-t border-[#1E293B] pt-12"
          >
            <p className="text-xl md:text-2xl font-mono tracking-tight text-slate-500">
              <span className="text-green-500 mr-2">root@sistemas:~#</span> 
              {slide.footer}
              <span className="inline-block w-3 h-6 bg-slate-500 ml-2 align-middle animate-pulse"></span>
            </p>
          </motion.div>
        </div>
      </MotionContainer>
    );
  }

  return null;
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1 < slidesData.length ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div className="fixed inset-0 bg-[#0B1120] text-slate-50 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Top Bar Area */}
      <div className="fixed top-0 left-0 right-0 h-16 border-b border-[#1E293B] bg-[#0B1120]/80 backdrop-blur-md z-50 flex items-center justify-between px-8">
         <div className="flex items-center gap-3">
             <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-cyan-400"></div>
             <span className="font-bold text-sm tracking-widest text-slate-200">
               OP // SISTEMAS
             </span>
         </div>
         <div className="font-mono text-xs tracking-widest text-slate-500">
            SLIDE_{String(currentSlide + 1).padStart(2, '0')} / {String(slidesData.length).padStart(2, '0')}
         </div>
      </div>

      <AnimatePresence mode="wait">
        <SectionRenderer key={slidesData[currentSlide].id} slide={slidesData[currentSlide]} />
      </AnimatePresence>

      {/* Manual Controls for easy clicking / Canva prepping */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 bg-[#0B1120]/90 border border-[#1E293B] shadow-2xl px-6 py-3 rounded-full backdrop-blur-md">
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="text-slate-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex gap-2">
           {slidesData.map((_, i) => (
             <button 
               key={i} 
               onClick={() => setCurrentSlide(i)}
               className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-cyan-400 w-6' : 'bg-slate-700'}`} 
             />
           ))}
        </div>

        <button 
          onClick={nextSlide}
          disabled={currentSlide === slidesData.length - 1}
          className="text-slate-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
