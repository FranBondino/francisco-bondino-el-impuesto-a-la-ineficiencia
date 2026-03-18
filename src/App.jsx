import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Activity, XCircle, FileText,
  LifeBuoy, Target, Calculator, AlertOctagon, Bus,
  Clock, Brain, Zap, GitCommit, LineChart, Lightbulb,
  UserCheck, BookOpen, MessageSquare, Rocket,
  ChevronLeft, ChevronRight, Fingerprint,
  CheckCircle2, Award, Printer, User
} from 'lucide-react';

import busFactorAltoImg from './assets/bus-factor-alto.png';
import busFactorBajoImg from './assets/bus-factor-bajo-nuevo.png';
import arqueroImg from './assets/arquero.png';
import spofImg from './assets/spof.png';

// Common tech-corporate styling classes
const TECH_BG = "bg-[#0B1120]"; // Very dark slate/blue
const HIGHLIGHT_TEXT = "text-blue-400 sm:text-transparent sm:bg-clip-text sm:bg-gradient-to-r sm:from-blue-400 sm:to-cyan-400";
const ACCENT_COLOR = "text-blue-400";
const SECONDARY_ACCENT = "text-cyan-400";
const CARD_BG = "bg-[#111827]/50 backdrop-blur-sm border border-slate-800/50";

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
    title: 'Punto Unico de falla (SPOF)',
    subtitle: 'Cuando el crecimiento depende de una memoria individual, el negocio tiene un techo invisible de cristal.',
    alert: 'En empresas en crecimiento, el punto único de falla (SPOF) suele tener nombre y apellido.',
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
    className={`motion-section fixed inset-0 w-full h-[100dvh] flex flex-col items-center justify-start md:justify-center py-12 md:py-20 px-5 sm:px-12 md:px-24 ${bg} ${textColor || ''} overflow-y-auto overflow-x-hidden`}
  >
    <TechGrid />
    <div className={`max-w-6xl mx-auto w-full z-10 relative pt-10 pb-36 md:py-8 ${className}`}>
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
          <div className="space-y-6 sm:space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] drop-shadow-sm max-w-4xl mx-auto">
              {slide.title}
            </h1>
            <div className={`h-1 w-24 sm:h-1.5 sm:w-48 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full`}></div>
          </div>

          <div className="space-y-2 sm:space-y-4 pt-4 sm:pt-8">
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-100 italic">
              {slide.presenter}
            </h3>
            <p className="text-base sm:text-xl md:text-2xl text-slate-400 font-light tracking-[0.1em] sm:tracking-[0.2em] uppercase">
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
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="border-l-2 border-blue-500 pl-4 sm:pl-8 mb-8 sm:mb-12">
          <h1 className={`text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-4 sm:mb-6 ${HIGHLIGHT_TEXT}`}>
            {slide.title}
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl font-light text-slate-400 max-w-4xl">
            {slide.subtitle}
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-6xl mt-4 sm:mt-8">
          {slide.steps.map((step, i) => (
            <motion.div
              key={i}
              initial="hidden" animate="visible"
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { delay: 0.2 + i * 0.1 } }
              }}
              className={`${CARD_BG} p-6 sm:p-8 rounded-xl flex flex-col gap-4 sm:gap-6 relative overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-4xl sm:text-6xl tracking-tighter mix-blend-overlay group-hover:scale-110 transition-transform">
                {step.num}
              </div>
              <div className="flex items-center gap-4 border-b border-[#1E293B] pb-4">
                <div className="p-2 sm:p-3 bg-blue-950/30 rounded-lg border border-blue-900/50 scale-90 sm:scale-100">{step.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-200">{step.title}</h3>
              </div>
              <div>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-light">{step.desc}</p>
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
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="mb-8 sm:mb-16">
          <div className={`inline-flex items-center gap-3 mb-4 sm:mb-6 ${slide.isCrisis ? 'bg-amber-950/30 border-amber-900/50 text-amber-500' : 'bg-blue-950/30 border-blue-900/50 text-blue-400'} border px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-mono uppercase tracking-widest`}>
            <Fingerprint size={slide.isCrisis ? 14 : 16} /> {slide.isCrisis ? 'Sanción Operativa' : 'Estructura de Costos'}
          </div>
          <h2 className={`text-2xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 sm:mb-6 text-slate-100`}>{slide.title}</h2>
          <p className="text-base sm:text-xl md:text-2xl text-slate-400 max-w-5xl font-light leading-snug">{slide.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl w-full">
          {slide.cols.map((col, i) => (
            <motion.div
              key={i}
              initial="hidden" animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.1 } }
              }}
              className={`${CARD_BG} p-6 sm:p-10 rounded-xl relative group transition-all duration-500 hover:border-amber-900/50`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${slide.isCrisis ? 'bg-gradient-to-r from-amber-600 to-orange-500' : 'bg-gradient-to-r from-blue-600 to-cyan-500'} opacity-30 group-hover:opacity-100 transition-opacity`}></div>

              <div className="flex justify-between items-start mb-6 sm:mb-8">
                <div className={`${slide.isCrisis ? 'bg-amber-950/40 border-amber-800/40' : 'bg-[#1E293B]/50 border-[#334155]'} w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center border transition-colors`}>
                  {React.cloneElement(col.icon, { size: 20 })}
                </div>
                {col.impact && (
                  <div className="bg-amber-500/10 border border-amber-500/20 px-2 sm:px-3 py-1 rounded-md text-[9px] sm:text-[10px] uppercase tracking-tighter text-amber-500 font-bold">
                    {col.impact}
                  </div>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">{col.title}</h3>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {col.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 sm:gap-4 text-slate-400 text-sm sm:text-lg font-light leading-snug">
                    <span className={`mt-1 sm:mt-1.5 font-mono text-xs sm:text-sm ${slide.isCrisis ? 'text-amber-500' : 'text-blue-500'}`}>›</span>
                    <span>{item}</span>
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
      <MotionContainer bg={slide.bg} textColor={slide.textColor} className="flex flex-col md:flex-row md:items-center gap-8 sm:gap-16">
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="md:w-1/2">
          <div className="inline-flex items-center gap-3 mb-4 sm:mb-6 bg-cyan-950/30 border border-cyan-900/50 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-cyan-400 text-xs sm:text-sm font-mono uppercase tracking-widest">
            <Calculator size={14} /> Análisis Cuantitativo
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 sm:mb-8 leading-tight text-slate-100">{slide.title}</h2>
          <p className="text-lg sm:text-2xl font-medium text-slate-300 mb-4 sm:mb-8 leading-snug font-light">{slide.subtitle}</p>
          <div className="bg-[#111827] border-l-4 border-blue-500 p-4 sm:p-6 rounded-r-lg">
            <p className="text-sm sm:text-lg text-slate-400 leading-relaxed font-mono">{slide.text}</p>
          </div>
        </motion.div>
        <div className="md:w-1/2 grid gap-4 sm:gap-6">
          {slide.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.2 }}
              className={`${CARD_BG} p-6 sm:p-8 rounded-xl flex items-center gap-4 sm:gap-8`}
            >
              <div className="w-[35%] sm:w-[40%] text-right overflow-hidden">
                <div className={`text-4xl sm:text-5xl md:text-7xl font-black ${HIGHLIGHT_TEXT} tracking-tighter whitespace-nowrap`}>
                  {stat.value}
                </div>
              </div>
              <div className="w-[65%] sm:w-[60%] border-l border-[#1E293B] pl-4 sm:pl-8">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{stat.label}</h3>
                <p className="text-[10px] sm:text-sm text-slate-400 font-light leading-tight">{stat.desc}</p>
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
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="mb-4 sm:mb-8 text-center md:text-left">
          <div className="inline-flex items-center gap-3 mb-4 bg-rose-950/30 border border-rose-900/50 px-4 py-1.5 rounded-full text-rose-400 text-xs font-mono uppercase tracking-widest">
            <AlertOctagon size={14} /> Riesgo Estructural
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 text-slate-100">{slide.title}</h2>
          <p className="text-lg sm:text-2xl text-slate-400 max-w-4xl font-light leading-snug">{slide.subtitle}</p>
        </motion.div>

        <div className="relative w-full max-w-2xl h-64 sm:h-80 mx-auto my-8 sm:my-16 flex items-center justify-center pointer-events-none">
          {/* Central Node (The Human Bottleneck) */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: ["0 0 0px rgba(244,63,94,0)", "0 0 40px rgba(244,63,94,0.4)", "0 0 0px rgba(244,63,94,0)"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 sm:w-24 sm:h-24 bg-rose-500 rounded-full flex items-center justify-center z-20 shadow-2xl relative border-4 border-rose-400/30"
          >
            <User size={40} className="text-white drop-shadow-lg" strokeWidth={2.5} />
            <motion.div
              animate={{ opacity: [0, 0.5, 0], scale: [1, 1.8, 2.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 bg-rose-500 rounded-full"
            />
          </motion.div>

          {/* Peripheral Nodes (Tasks/Processes) */}
          {[
            { icon: <TrendingUp size={20} />, label: "Ventas", angle: 0 },
            { icon: <Activity size={20} />, label: "Operación", angle: 60 },
            { icon: <LifeBuoy size={20} />, label: "Soporte", angle: 120 },
            { icon: <Calculator size={20} />, label: "Finanzas", angle: 180 },
            { icon: <Target size={20} />, label: "Estrategia", angle: 240 },
            { icon: <GitCommit size={20} />, label: "Integración", angle: 300 },
          ].map((node, i) => {
            const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 110 : 160;
            const x = Math.cos((node.angle * Math.PI) / 180) * radius;
            const y = Math.sin((node.angle * Math.PI) / 180) * radius;

            return (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.15 }}
                  transition={{ delay: 1 + i * 0.1, duration: 1.2 }}
                  className="absolute h-px bg-gradient-to-r from-rose-500 to-transparent origin-left z-10"
                  style={{
                    width: radius,
                    left: "50%",
                    top: "50%",
                    transform: `rotate(${node.angle}deg)`,
                  }}
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.5 + i * 0.1, type: "spring", stiffness: 200 }}
                  className="absolute w-12 h-12 sm:w-16 sm:h-16 bg-[#111827] border border-slate-700/50 rounded-xl flex flex-col items-center justify-center z-30 shadow-2xl backdrop-blur-sm"
                  style={{
                    left: `calc(50% + ${x}px - ${typeof window !== 'undefined' && window.innerWidth < 640 ? 24 : 32}px)`,
                    top: `calc(50% + ${y}px - ${typeof window !== 'undefined' && window.innerWidth < 640 ? 24 : 32}px)`,
                  }}
                >
                  <div className="text-slate-400 group-hover:text-rose-400 transition-colors">{node.icon}</div>
                  <span className="hidden sm:block text-[9px] uppercase tracking-tighter text-slate-500 font-bold mt-1">{node.label}</span>
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="w-full max-w-5xl bg-rose-950/20 border-l-4 border-rose-500 p-6 rounded-r-xl flex items-center gap-6 mt-8 sm:mt-0"
        >
          <div className="p-3 bg-rose-500/10 rounded-full">
            <AlertOctagon className="text-rose-500" size={24} />
          </div>
          <p className="text-rose-100 font-medium text-base sm:text-xl leading-relaxed italic">
            "{slide.alert}"
          </p>
        </motion.div>
      </MotionContainer>
    );
  }

  if (isBusFactorComparison) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor}>
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="mb-8 sm:mb-16 text-center">
          <div className="inline-flex items-center gap-3 mb-4 sm:mb-6 bg-indigo-950/30 border border-indigo-900/50 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-indigo-400 text-xs sm:text-sm font-mono uppercase tracking-widest">
            <Bus size={14} /> Métrica de Continuidad
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 sm:mb-6 text-slate-100">{slide.title}</h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto font-light">{slide.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 w-full max-w-6xl mx-auto mb-12">
          {/* BUS FACTOR ALTO (BAD) */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className={`${CARD_BG} p-6 sm:p-10 rounded-xl relative overflow-hidden border border-rose-900/30 shadow-[0_0_30px_-10px_rgba(244,63,94,0.15)]`}>
            <div className="absolute top-0 right-0 w-1.5 sm:w-2 h-full bg-rose-500/50"></div>
            <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8 border-b border-[#1E293B] pb-4 sm:pb-6">
              <div className="bg-rose-950/50 p-3 sm:p-4 rounded-full text-rose-500 border border-rose-900/50 shadow-inner scale-90 sm:scale-100">
                <XCircle size={32} sm:size={40} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-rose-100 tracking-tight">{slide.bad.title}</h3>
            </div>
            <p className="text-slate-300 text-lg sm:text-xl font-light leading-relaxed mb-6 sm:mb-8">{slide.bad.desc}</p>
            <div className="rounded-xl overflow-hidden border border-[#1E293B] shadow-2xl relative group">
              <div className="absolute inset-0 bg-rose-500/10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500"></div>
              <img src={slide.bad.image} alt="Bus Factor Alto" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
            </div>
          </motion.div>

          {/* BUS FACTOR BAJO (GOOD) */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className={`${CARD_BG} p-6 sm:p-10 rounded-xl relative overflow-hidden border border-emerald-900/30 shadow-[0_0_30px_-10px_rgba(16,185,129,0.15)]`}>
            <div className="absolute top-0 right-0 w-1.5 sm:w-2 h-full bg-emerald-500/50"></div>
            <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8 border-b border-[#1E293B] pb-4 sm:pb-6">
              <div className="bg-emerald-950/50 p-3 sm:p-4 rounded-full text-emerald-500 border border-emerald-900/50 shadow-inner scale-90 sm:scale-100">
                <CheckCircle2 size={32} sm:size={40} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-emerald-100 tracking-tight">{slide.good.title}</h3>
            </div>
            <p className="text-slate-300 text-lg sm:text-xl font-light leading-relaxed mb-6 sm:mb-8">{slide.good.desc}</p>
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
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-100">{slide.title}</h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-4xl font-light">{slide.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl">
          {slide.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
              className={`${CARD_BG} p-6 sm:p-10 rounded-xl group relative overflow-hidden`}
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
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-100">{slide.title}</h2>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-400 mb-8 sm:mb-16 font-light max-w-4xl">{slide.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full max-w-6xl mb-12">
          {slide.cols.map((col, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.2 }}
              className={`${CARD_BG} p-6 sm:p-10 rounded-xl border-t-2 ${i === 0 ? 'border-t-blue-500' : 'border-t-cyan-500'}`}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-white flex items-center gap-4">
                {React.cloneElement(col.icon, { size: 24 })} {col.title}
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {col.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3 sm:gap-4 text-slate-300 text-sm sm:text-base font-light">
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
        <div className="flex flex-col md:flex-row gap-8 sm:gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="md:w-1/3 text-center md:text-left">
            <div className="inline-flex items-center gap-3 mb-4 sm:mb-6 bg-amber-950/30 border border-amber-900/50 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-amber-500 text-xs sm:text-sm font-mono uppercase tracking-widest">
              <AlertOctagon size={14} /> Restricciones
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6 text-slate-100">{slide.title}</h2>
            <p className="text-lg sm:text-xl text-slate-400 font-light leading-relaxed">{slide.subtitle}</p>
          </motion.div>

          <div className="md:w-2/3 grid gap-3 sm:gap-4 w-full">
            {slide.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
                className={`${CARD_BG} p-4 sm:p-6 tracking-wide rounded-xl flex items-center gap-4 sm:gap-6`}
              >
                <div className="p-2 sm:p-3 bg-[#1E293B]/50 rounded-lg border border-[#334155] scale-90 sm:scale-100">
                  {React.cloneElement(item.icon, { size: 24 })}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-200">{item.text}</h3>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-4 sm:mt-8 border-l-2 border-indigo-500 pl-4 sm:pl-6">
              <p className="text-base sm:text-lg font-light text-slate-300 leading-snug">
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
      <MotionContainer bg={slide.bg} textColor={slide.textColor} className="flex flex-col md:justify-center max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariants} className="mb-16">
          <div className="inline-flex items-center gap-3 mb-6 bg-indigo-950/30 border border-indigo-900/50 px-4 py-1.5 rounded-full text-indigo-400 text-sm font-mono uppercase tracking-widest">
            <Target size={16} /> Evaluación
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 text-slate-100">{slide.title}</h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl font-light">{slide.subtitle}</p>
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
            <div className="inline-flex items-center gap-3 mb-6 sm:mb-8 bg-emerald-950/30 border border-emerald-900/50 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-emerald-400 text-xs sm:text-sm font-mono uppercase tracking-widest">
              Siguientes Pasos
            </div>
            <h2 className={`text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6 sm:mb-8 ${HIGHLIGHT_TEXT}`}>{slide.title}</h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-slate-400 font-light leading-snug mb-8 sm:mb-16">{slide.subtitle}</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-20">
            {slide.points.map((point, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-[#1E293B]/50 text-slate-300 border border-[#334155] px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-medium"
              >
                {point}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            className="w-full border-t border-[#1E293B] pt-8 sm:pt-12"
          >
            <p className="text-lg sm:text-xl md:text-2xl font-mono tracking-tight text-slate-500">
              <span className="text-green-500 mr-2 sm:inline block">root@sistemas:~#</span>
              <span className="leading-tight">{slide.footer}</span>
              <span className="inline-block w-2 sm:w-3 h-4 sm:h-6 bg-slate-500 ml-2 align-middle animate-pulse"></span>
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
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 sm:mb-8 text-slate-100">{slide.title}</h2>
          <p className="text-xl sm:text-2xl md:text-4xl text-blue-400 font-light italic">
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
  const [isPrintMode, setIsPrintMode] = useState(false);

  useEffect(() => {
    const handleBeforePrint = () => setIsPrintMode(true);
    const handleAfterPrint = () => setIsPrintMode(false);
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1 < slidesData.length ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance in px
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

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
    <div
      className="fixed inset-0 bg-[#0B1120] text-slate-50 font-sans selection:bg-blue-500/30 overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Top Bar Area */}
      <div className="fixed top-0 left-0 right-0 h-14 sm:h-16 border-b border-[#1E293B] bg-[#0B1120]/80 backdrop-blur-md z-50 flex items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2 sm:gap-3 max-w-[65%] sm:max-w-[50%] overflow-hidden">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-gradient-to-br from-blue-500 to-cyan-400 shrink-0"></div>
          <span className="font-bold text-[9px] sm:text-xs tracking-wider text-slate-300 uppercase truncate">
            {slidesData[0].title}
          </span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={() => {
              setIsPrintMode(true);
              setTimeout(() => {
                window.print();
              }, 500);
            }}
            className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors group"
            title="Exportar a PDF (para Google Slides/Canva)"
          >
            <Printer size={18} className="group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-xs font-mono tracking-widest uppercase">PDF</span>
          </button>
          <div className="font-mono text-xs tracking-widest text-slate-500">
            SLIDE_{String(currentSlide + 1).padStart(2, '0')} / {String(slidesData.length).padStart(2, '0')}
          </div>
        </div>
      </div>

      {isPrintMode ? (
        <div className="print-view bg-[#0B1120] min-h-screen">
          {slidesData.map((slide) => (
            <div key={slide.id} className="print-slide-wrapper">
              <SectionRenderer slide={slide} />
            </div>
          ))}
        </div>
      ) : (
        <AnimatePresence>
          <SectionRenderer key={slidesData[currentSlide].id} slide={slidesData[currentSlide]} />
        </AnimatePresence>
      )}

      {/* Manual Controls for easy clicking / Canva prepping */}
      <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 sm:gap-6 bg-[#0B1120]/90 border border-[#1E293B] shadow-2xl px-3 sm:px-6 py-2 sm:py-3 rounded-full backdrop-blur-md w-[90%] sm:w-auto justify-center">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="text-slate-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed p-1 sm:p-2 shrink-0"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="flex gap-1.5 sm:gap-2 items-center overflow-x-auto no-scrollbar py-1">
          {slidesData.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all shrink-0 ${i === currentSlide ? 'bg-cyan-400 w-4 sm:w-6 h-2 sm:h-2.5' : 'bg-slate-700 w-2 sm:w-2.5 h-2 sm:h-2.5'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slidesData.length - 1}
          className="text-slate-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed p-1 sm:p-2 shrink-0"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
}
