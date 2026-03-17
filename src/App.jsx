import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Activity, XCircle, FileText,
  LifeBuoy, Target, Calculator, AlertOctagon, Bus,
  Clock, Brain, Zap, GitCommit, LineChart, Lightbulb,
  UserCheck, BookOpen, MessageSquare, Rocket,
  ChevronLeft, ChevronRight, Fingerprint,
  CheckCircle2, Award
} from 'lucide-react';

import busFactorAltoImg from './assets/bus-factor-alto.png';
import busFactorBajoImg from './assets/bus-factor-bajo.png';
import arqueroImg from './assets/arquero.png';
import spofImg from './assets/spof.png';

// Common tech-corporate styling classes
const TECH_BG = "bg-[#0B1120]"; // Very dark slate/blue
const CARD_BG = "bg-[#111827]/80 backdrop-blur-md border border-[#1E293B] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)]";
const HIGHLIGHT_TEXT = "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400";
const ACCENT_COLOR = "text-blue-400";
const SECONDARY_ACCENT = "text-cyan-400";

const slidesData = [
  {
    id: 1,
    layout: 'title_card',
    title: 'El impuesto a la Ineficiencia: Cómo la IA te devuelve el control de tu empresa',
    presenter: 'Francisco Bondino',
    position: 'Ingeniero en Sistemas Informáticos',
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 2,
    layout: 'intro',
    title: 'La Paradoja del Crecimiento',
    subtitle: 'El éxito genera más trabajo manual, más fricción y más estrés operacional.',
    steps: [
      { num: '1', title: 'Más ventas', desc: 'El objetivo que se persigue', icon: <TrendingUp className="text-blue-400" /> },
      { num: '2', title: 'Más complejidad', desc: 'Procesos que ya no escalan', icon: <Activity className="text-amber-400" /> },
      { num: '3', title: 'Procesos rotos', desc: 'Sistemas artesanales que colapsan', icon: <XCircle className="text-rose-400" /> }
    ],
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 3,
    layout: 'columns',
    title: 'El "Impuesto a la Ineficiencia"',
    subtitle: 'Un costo silencioso que limita la escalabilidad. No es solo tiempo perdido, es fricción estratégica que frena el crecimiento.',
    isCrisis: true, // New flag for specific styling
    cols: [
      {
        icon: <FileText size={24} className="text-amber-400 mb-4" />,
        title: 'Gestión Estratégica',
        impact: 'Costo de Oportunidad',
        items: [
          'Datos fragmentados que retrasan decisiones clave',
          'Dependencia de planillas manuales propensas a errores',
          'Falta de visibilidad real del ROI por canal'
        ]
      },
      {
        icon: <LifeBuoy size={24} className="text-amber-400 mb-4" />,
        title: 'Operaciones y Equipo',
        impact: 'Fuga de Talento',
        items: [
          'Talento senior atrapado en tareas repetitivas',
          'Inconsistencia en procesos críticos del negocio',
          'Memoria institucional inexistente (todo está en cabezas)'
        ]
      },
      {
        icon: <Target size={24} className="text-amber-400 mb-4" />,
        title: 'Ventas y Crecimiento',
        impact: 'Fuga de Ingresos',
        items: [
          'Leads que se enfrían por falta de respuesta inmediata',
          'Pipeline invisible: oportunidades que se "caen"',
          'Dificultad para escalar el volumen de cierres'
        ]
      }
    ],
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 4,
    layout: 'image_caption',
    title: 'El "Impuesto a la Ineficiencia"',
    subtitle: 'Uno siente que está siempre atajando penales',
    image: arqueroImg,
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 5,
    layout: 'stats',
    title: 'La Matemática del Error',
    subtitle: 'No es solo pérdida de tiempo, es pérdida de precisión. La carga manual genera errores costosos.',
    text: 'Una sola hora de trabajo manual tiene entre 1% y 5% de probabilidad de contener errores. Multiplica eso por 100 horas mensuales.',
    stats: [
      { value: '100', label: 'Horas perdidas', desc: 'Al mes en tareas repetitivas y manuales' },
      { value: '1-5%', label: 'Probabilidad de error', desc: 'En cada carga manual de datos' }
    ],
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 6,
    layout: 'spof',
    title: 'El Riesgo Real: SPOF',
    subtitle: 'Single Point of Failure - El punto único de falla que puede paralizar todo.',
    q1: '¿Qué es?',
    a1: 'Un solo empleado, un solo sistema o un solo proceso que si falla, todo se detiene.',
    q2: '¿Qué pasa cuando la persona clave se enferma, se va de vacaciones o renuncia?',
    alert: 'PUNTO ÚNICO DE FALLA: Romina es crucial para la integración. FALLA DEL SISTEMA',
    image: spofImg,
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 7,
    layout: 'bus_factor_comparison',
    title: 'El "Bus Factor"',
    subtitle: '¿Cuántas personas deben desaparecer de una organización para que esta se paralice?',
    bad: {
      title: 'BUS FACTOR ALTO',
      desc: 'El conocimiento y la operación están centralizados en una sola persona o muy pocas. Si faltan, el sistema colapsa.',
      image: busFactorAltoImg
    },
    good: {
      title: 'BUS FACTOR BAJO',
      desc: 'El conocimiento está descentralizado en sistemas o delegados. Si la pieza clave no está, la organización fluye.',
      image: busFactorBajoImg
    },
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 8,
    layout: 'features',
    title: 'Sistemas Autónomos: Escalar sin Esfuerzo',
    subtitle: 'La IA no es una herramienta, es la infraestructura que permite que la empresa escale sin que vos seas el motor.',
    items: [
      {
        icon: <Zap className="text-indigo-400" size={32} />,
        title: 'Loop Infatigable',
        desc: 'Un sistema que califica, nutre y agenda leads 24/7 de forma 100% autónoma, asegurando que ninguna oportunidad se enfríe.'
      },
      {
        icon: <Brain className="text-indigo-400" size={32} />,
        title: 'Inteligencia Operativa',
        desc: 'Procesamiento de datos en tiempo real para identificar patrones de rentabilidad que hoy son invisibles al ojo humano.'
      },
      {
        icon: <Target className="text-indigo-400" size={32} />,
        title: 'Escalabilidad Infinita',
        desc: 'Sistemas que crecen con tu demanda sin necesidad de aumentar proporcionalmente tu estructura de costos fijos.'
      }
    ],
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 9,
    layout: 'tools',
    title: 'Soberanía y Control Total',
    subtitle: 'Hacia un modelo de gestión basado en la transparencia absoluta de los datos, eliminando la dependencia de reportes manuales.',
    cols: [
      {
        icon: <LineChart className="text-emerald-500 mb-4" size={32} />,
        title: 'Tablero en el Bolsillo',
        items: [
          'Consulta tu pipeline y ROI real desde el celular con un comando',
          'Eliminación de la espera por reportes operativos semanales',
          'Alertas automáticas ante desviaciones críticas en tus costos',
          'Soberanía total: tus datos trabajando para vos, no al revés'
        ]
      },
      {
        icon: <GitCommit className="text-emerald-500 mb-4" size={32} />,
        title: 'Ecosistema Conectado',
        items: [
          'Sincronización automática entre CRM, Ventas y Contabilidad',
          'Memoria Institucional: los procesos viven en el sistema, no en cabezas',
          'Visibilidad 360 de la experiencia del cliente y conversiones',
          'Independencia total de "islas de información" individuales'
        ]
      }
    ],
    footer: 'Esto no es tecnología para el futuro; es la infraestructura que separa a las empresas que escalan de las que se estancan.',
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 10,
    layout: 'limitations',
    title: 'Lo que la IA no tiene',
    subtitle: 'Olvidemos la ciencia ficción. La IA real es una herramienta accesible que puede trabajar con vos todos los días.',
    items: [
      { icon: <Lightbulb size={28} className="text-amber-400" />, text: 'Pensamiento abstracto' },
      { icon: <UserCheck size={28} className="text-rose-400" />, text: 'Sentido común' },
      { icon: <BookOpen size={28} className="text-indigo-400" />, text: 'Conocimiento empírico' }
    ],
    footer: 'No reemplaza personas, potencia equipos. Libera tiempo para lo estratégico.',
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 11,
    layout: 'questions',
    title: 'El Debate',
    subtitle: 'Tres preguntas clave para reflexionar sobre la situación actual de cada uno',
    questions: [
      '¿Pueden identificar los procesos que les generan "dolor"?',
      '¿Cuántos de ustedes cuentan con una memoria institucional?',
      '¿Cuántos de ustedes sienten que la IA puede aplicarse en su empresa?'
    ],
    bg: TECH_BG,
    textColor: 'text-slate-100'
  },
  {
    id: 12,
    layout: 'conclusion',
    title: 'El Momento de Cambiar',
    subtitle: 'La pregunta no es si podés permitirte la automatización. Es si podés permitirte no hacerla.',
    points: ['Soltar la operación', 'Enfocarse en liderar', 'Escalabilidad real'],
    footer: 'El verdadero liderazgo no está en hacer más, sino en construir sistemas autónomos.',
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
  const isBusFactorComparison = slide.layout === 'bus_factor_comparison';
  const isFeatures = slide.layout === 'features';
  const isTools = slide.layout === 'tools';
  const isLimitations = slide.layout === 'limitations';
  const isQuestions = slide.layout === 'questions';
  const isConclusion = slide.layout === 'conclusion';
  const isTitleCard = slide.layout === 'title_card';
  const isImageCaption = slide.layout === 'image_caption';

  if (isTitleCard) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor} className="flex flex-col items-center justify-center text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="relative z-10 w-full max-w-5xl flex flex-col items-center space-y-12"
        >
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] drop-shadow-sm max-w-4xl mx-auto">
              {slide.title}
            </h1>
            <div className={`h-1.5 w-48 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full`}></div>
          </div>

          <div className="space-y-4 pt-8">
            <h3 className="text-3xl md:text-5xl font-bold text-slate-100 italic">
              {slide.presenter}
            </h3>
            <p className="text-xl md:text-2xl text-slate-400 font-light tracking-[0.2em] uppercase">
              {slide.position}
            </p>
          </div>
        </motion.div>
      </MotionContainer>
    );
  }

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
          <div className={`inline-flex items-center gap-3 mb-6 ${slide.isCrisis ? 'bg-amber-950/30 border-amber-900/50 text-amber-500' : 'bg-blue-950/30 border-blue-900/50 text-blue-400'} border px-4 py-1.5 rounded-full text-sm font-mono uppercase tracking-widest`}>
            <Fingerprint size={16} /> {slide.isCrisis ? 'Sanción Operativa' : 'Estructura de Costos'}
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
              className={`${CARD_BG} p-10 rounded-xl relative group transition-all duration-500 hover:border-amber-900/50`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${slide.isCrisis ? 'bg-gradient-to-r from-amber-600 to-orange-500' : 'bg-gradient-to-r from-blue-600 to-cyan-500'} opacity-30 group-hover:opacity-100 transition-opacity`}></div>

              <div className="flex justify-between items-start mb-8">
                <div className={`${slide.isCrisis ? 'bg-amber-950/40 border-amber-800/40' : 'bg-[#1E293B]/50 border-[#334155]'} w-14 h-14 rounded-lg flex items-center justify-center border transition-colors`}>
                  {col.icon}
                </div>
                {col.impact && (
                  <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-md text-[10px] uppercase tracking-tighter text-amber-500 font-bold">
                    {col.impact}
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-bold mb-6 text-white">{col.title}</h3>
              <ul className="space-y-4 mb-8">
                {col.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-4 text-slate-400 text-base md:text-lg font-light leading-snug">
                    <span className={`mt-1.5 font-mono text-sm ${slide.isCrisis ? 'text-amber-500' : 'text-blue-500'}`}>›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {slide.isCrisis && (
                <div className="pt-4 border-t border-[#1E293B] opacity-50 group-hover:opacity-100 transition-opacity">
                  <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">
                    // Riesgo de Escalabilidad
                  </p>
                </div>
              )}
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
              <div className="w-[40%] text-right">
                <div className={`text-5xl md:text-7xl font-black ${HIGHLIGHT_TEXT} tracking-tighter whitespace-nowrap`}>
                  {stat.value}
                </div>
              </div>
              <div className="w-[60%] border-l border-[#1E293B] pl-8">
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
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="mb-6">
          <div className="inline-flex items-center gap-3 mb-4 bg-rose-950/30 border border-rose-900/50 px-4 py-1.5 rounded-full text-rose-400 text-xs font-mono uppercase tracking-widest">
            <AlertOctagon size={14} /> Riesgo Estructural
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-100">{slide.title}</h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-4xl font-light">{slide.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl mb-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className={`${CARD_BG} p-6 rounded-xl`}>
            <h3 className="text-slate-500 font-mono text-xs mb-2 tracking-widest uppercase border-b border-[#1E293B] pb-2">{slide.q1}</h3>
            <p className="text-slate-300 text-base font-light leading-relaxed">{slide.a1}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className={`${CARD_BG} p-6 rounded-xl relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-2 h-full bg-rose-500/50"></div>
            <h3 className="text-slate-500 font-mono text-xs mb-2 tracking-widest uppercase border-b border-[#1E293B] pb-2">El Problema:</h3>
            <p className="text-slate-300 text-base font-light leading-relaxed">{slide.q2}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}
          className="w-full max-w-5xl bg-rose-950/20 border border-rose-900/50 p-4 rounded-xl flex items-center gap-4 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0 tracking-widest"></div>
          <p className="text-rose-400 font-mono text-xs md:text-sm selection:bg-rose-500/30">{slide.alert}</p>
        </motion.div>

        {slide.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="max-w-4xl w-full rounded-2xl overflow-hidden border border-rose-900/30 shadow-2xl mx-auto"
          >
            <img src={slide.image} alt="SPOF Visualization" className="w-full max-h-[30vh] object-cover" />
          </motion.div>
        )}
      </MotionContainer>
    );
  }

  if (isBusFactorComparison) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor}>
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 mb-6 bg-indigo-950/30 border border-indigo-900/50 px-4 py-1.5 rounded-full text-indigo-400 text-sm font-mono uppercase tracking-widest">
            <Bus size={16} /> Métrica de Continuidad
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-100">{slide.title}</h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto font-light">{slide.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 w-full max-w-6xl mx-auto mb-12">
          {/* BUS FACTOR ALTO (BAD) */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className={`${CARD_BG} p-10 rounded-xl relative overflow-hidden border border-rose-900/30 shadow-[0_0_30px_-10px_rgba(244,63,94,0.15)]`}>
            <div className="absolute top-0 right-0 w-2 h-full bg-rose-500/50"></div>
            <div className="flex items-center gap-6 mb-8 border-b border-[#1E293B] pb-6">
              <div className="bg-rose-950/50 p-4 rounded-full text-rose-500 border border-rose-900/50 shadow-inner">
                <XCircle size={40} strokeWidth={2.5} />
              </div>
              <h3 className="text-3xl font-black text-rose-100 tracking-tight">{slide.bad.title}</h3>
            </div>
            <p className="text-slate-300 text-xl font-light leading-relaxed mb-8">{slide.bad.desc}</p>
            <div className="rounded-xl overflow-hidden border border-[#1E293B] shadow-2xl relative group">
              <div className="absolute inset-0 bg-rose-500/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500"></div>
              <img src={slide.bad.image} alt="Bus Factor Alto" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
          </motion.div>

          {/* BUS FACTOR BAJO (GOOD) */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className={`${CARD_BG} p-10 rounded-xl relative overflow-hidden border border-emerald-900/30 shadow-[0_0_30px_-10px_rgba(16,185,129,0.15)]`}>
            <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500/50"></div>
            <div className="flex items-center gap-6 mb-8 border-b border-[#1E293B] pb-6">
              <div className="bg-emerald-950/50 p-4 rounded-full text-emerald-500 border border-emerald-900/50 shadow-inner">
                <CheckCircle2 size={40} strokeWidth={2.5} />
              </div>
              <h3 className="text-3xl font-black text-emerald-100 tracking-tight">{slide.good.title}</h3>
            </div>
            <p className="text-slate-300 text-xl font-light leading-relaxed mb-8">{slide.good.desc}</p>
            <div className="rounded-xl overflow-hidden border border-[#1E293B] shadow-2xl relative group">
              <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500"></div>
              <img src={slide.good.image} alt="Bus Factor Bajo" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
          </motion.div>
        </div>
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

  if (isImageCaption) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor} className="flex flex-col items-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-slate-100">{slide.title}</h2>
          <p className="text-2xl md:text-4xl text-blue-400 font-light italic">
            "{slide.subtitle}"
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative max-w-4xl w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
        >
          <img src={slide.image} alt={slide.title} className="w-full h-auto object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-40"></div>
        </motion.div>
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
