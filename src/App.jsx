import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  TrendingUp, Activity, XCircle, FileText,
  LifeBuoy, Target, Calculator, AlertOctagon, Bus,
  Clock, Brain, Zap, GitCommit, LineChart, Lightbulb,
  UserCheck, BookOpen, MessageSquare, Rocket
} from 'lucide-react';

const slidesData = [
  {
    id: 1,
    layout: 'intro',
    title: 'La Paradoja del Crecimiento',
    subtitle: 'El éxito genera más trabajo manual, más fricción y más estrés operacional.',
    steps: [
      { num: '1', title: 'Más ventas', desc: 'El objetivo que se persigue', icon: <TrendingUp className="text-emerald-500" /> },
      { num: '2', title: 'Más complejidad', desc: 'Procesos que ya no escalan', icon: <Activity className="text-amber-500" /> },
      { num: '3', title: 'Procesos rotos', desc: 'Sistemas artesanales que colapsan', icon: <XCircle className="text-rose-500" /> }
    ],
    bg: 'bg-slate-950',
    textColor: 'text-white'
  },
  {
    id: 2,
    layout: 'columns',
    title: 'El "Impuesto a la Ineficiencia"',
    subtitle: 'Un costo silencioso que todos pagamos sin darnos cuenta. Cada dia perdemos tiempo valioso en tareas que podrian automatizarse.',
    cols: [
      {
        icon: <FileText size={24} className="text-blue-400 mb-4" />,
        title: 'En Administración',
        items: ['Horas al día cargando planillas a mano y analizandolas.']
      },
      {
        icon: <LifeBuoy size={24} className="text-indigo-400 mb-4" />,
        title: 'En Soporte',
        items: ['Preguntas repetidas que se responden mil veces', 'Formularios que se llenan manualmente', 'Respuestas que se copian y pegan']
      },
      {
        icon: <Target size={24} className="text-cyan-400 mb-4" />,
        title: 'En Ventas',
        items: ['Follow-up manual en CRM', 'Propuestas que se copian', 'Seguimiento de leads perdido']
      }
    ],
    bg: 'bg-slate-900',
    textColor: 'text-slate-50'
  },
  {
    id: 3,
    layout: 'stats',
    title: 'La Matemática del Error',
    subtitle: 'No es solo pérdida de tiempo, es pérdida de precisión. La carga manual genera errores costosos.',
    text: 'Una sola hora de trabajo manual tiene entre 1% y 5% de probabilidad de contener errores. Multiplica eso por 100 horas mensuales.',
    stats: [
      { value: '100', label: 'Horas perdidas', desc: 'Al mes en tareas repetitivas y manuales' },
      { value: '1-5%', label: 'Probabilidad de error', desc: 'En cada carga manual de datos' }
    ],
    bg: 'bg-slate-950',
    textColor: 'text-white'
  },
  {
    id: 4,
    layout: 'spof',
    title: 'El Riesgo Real: SPOF',
    subtitle: 'Single Point of Failure - El punto único de falla que puede paralizar todo.',
    q1: '¿Qué es?',
    a1: 'Un solo empleado, un solo sistema o un solo proceso que si falla, todo se detiene.',
    q2: '¿Qué pasa cuando la persona clave se enferma, se va de vacaciones o renuncia?',
    alert: 'PUNTO ÚNICO DE FALLA: Romina es crucial para la integración. FALLA DEL SISTEMA',
    bg: 'bg-zinc-900',
    textColor: 'text-white'
  },
  {
    id: 5,
    layout: 'center_focus',
    title: 'El "Bus Factor"',
    text: '¿Cuántas personas deben desaparecer de una organización para que esta se paralice?',
    bigNumber: '80',
    bg: 'bg-slate-800',
    textColor: 'text-white'
  },
  {
    id: 6,
    layout: 'features',
    title: 'La IA como Copiloto',
    subtitle: 'Olvidemos la ciencia ficción. La IA real es una herramienta accesible que puede trabajar con las empresas todos los días.',
    items: [
      { icon: <Clock className="text-blue-400" size={32} />, title: 'Asistente 24/7', desc: 'Trabaja sin descanso y sin errores propios de la fatiga' },
      { icon: <Brain className="text-purple-400" size={32} />, title: 'Análisis inteligente', desc: 'Procesa datos, encuentra patrones y genera insights' },
      { icon: <Zap className="text-amber-400" size={32} />, title: 'Automatización real', desc: 'Conecta sistemas, mueve datos, ejecuta tareas sin tocar' }
    ],
    bg: 'bg-slate-950',
    textColor: 'text-white'
  },
  {
    id: 7,
    layout: 'tools',
    title: 'Casos de Uso Reales',
    subtitle: 'Herramientas que están cambiando la gestión diaria da agencias y plymes',
    cols: [
      {
        icon: <GitCommit className="text-rose-500 mb-4" size={32} />,
        title: 'n8n: Automatización 24/7',
        items: ['Conecta tu CRM con tu contabilidad', 'Genera facturas automaticamente', 'Sincroniza leads sin tocar', 'Flujos que nunca duermen']
      },
      {
        icon: <LineChart className="text-emerald-500 mb-4" size={32} />,
        title: 'GPT: Tu Analista Financiero',
        items: ['Analiza tu hoja de costes en segundos', 'Identifica desviaciones automáticamente', 'Genera reportes ejecutivos', 'Responde preguntas de datos']
      }
    ],
    footer: 'Estas no son tecnologias del futuro, están disponibles hoy. Y son más accesibles de lo que uno cree.',
    bg: 'bg-zinc-950',
    textColor: 'text-white'
  },
  {
    id: 8,
    layout: 'limitations',
    title: 'Lo que la IA no tiene',
    subtitle: 'Olvidemos la ciencia ficción. La IA real es una herramienta accesible que puede trabajar con uno todos los días.',
    items: [
      { icon: <Lightbulb size={28} className="text-amber-300" />, text: 'Pensamiento abstracto' },
      { icon: <UserCheck size={28} className="text-blue-300" />, text: 'Sentido común' },
      { icon: <BookOpen size={28} className="text-emerald-300" />, text: 'Conocimiento empírico' }
    ],
    footer: 'No reemplaza personas, potencia equipos. Libera tiempo para lo estratégico.',
    bg: 'bg-slate-900',
    textColor: 'text-white'
  },
  {
    id: 9,
    layout: 'questions',
    title: 'El Debate',
    subtitle: 'Tres preguntas clave para reflexionar sobre la situación actual de cada uno',
    questions: [
      '¿Pueden identificar los procesos que les generan "dolor"?',
      '¿Cuántos de ustedes cuentan con una memoria institucional?',
      '¿Cuántos de ustedes sienten que la IA puede aplicarse en su empresa?'
    ],
    bg: 'bg-slate-800',
    textColor: 'text-white'
  },
  {
    id: 10,
    layout: 'conclusion',
    title: 'El Momento de Cambiar',
    subtitle: 'La pregunta no es si puedes permitirte la automatización. Es si puedes permitirte no hacerla.',
    points: ['Soltar la operación', 'Enfocarse en liderar', 'Escalabilidad real'],
    footer: 'El verdadero liderazgo no está en hacer más, sino en construir sistemas autónomos.',
    bg: 'bg-slate-950',
    textColor: 'text-white'
  }
];


const MotionContainer = ({ children, bg, textColor, className = "" }) => (
  <section className={`min-h-screen w-full flex flex-col justify-center py-20 px-6 sm:px-12 md:px-24 ${bg} ${textColor || ''}`}>
    <div className={`max-w-6xl mx-auto w-full ${className}`}>
      {children}
    </div>
  </section>
);

const fadeUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};
const statVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, type: "spring" } }
};

const SectionRenderer = ({ slide, index }) => {
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
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariants}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 pb-2">
            {slide.title}
          </h1>
          <div className="w-32 h-1.5 bg-blue-500 mb-12 rounded-full"></div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 w-full max-w-5xl mb-16 mt-4"
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        >
          {slide.steps.map((step, i) => (
            <motion.div key={i} variants={fadeUpVariants} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl flex flex-col gap-6 hover:bg-white/10 transition-colors shadow-2xl">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-black text-white/10">{step.num})</span>
                <div className="p-3 bg-white/5 rounded-xl">{step.icon}</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-base text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants} className="text-xl md:text-3xl font-light text-slate-300 max-w-4xl border-l-4 border-blue-500 pl-8 py-2">
          {slide.subtitle}
        </motion.p>
      </MotionContainer>
    );
  }

  if (isColumns) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariants}>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">{slide.title}</h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-5xl mb-16 font-light">{slide.subtitle}</p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 max-w-6xl w-full"
        >
          {slide.cols.map((col, i) => (
            <motion.div key={i} variants={fadeUpVariants} className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-10 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-slate-800/80 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-slate-700">
                {col.icon}
              </div>
              <h3 className="text-2xl font-bold mb-6 text-white border-b border-slate-700/50 pb-4">{col.title}</h3>
              <ul className="space-y-4">
                {col.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-4 text-slate-300 text-base md:text-lg">
                    <span className="text-blue-500 mt-1.5">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </MotionContainer>
    );
  }

  if (isStats) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor} className="flex flex-col md:flex-row md:items-center gap-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariants} className="md:w-1/2">
          <div className="bg-blue-500/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
            <Calculator className="text-blue-400 w-10 h-10" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">{slide.title}</h2>
          <p className="text-2xl font-medium text-slate-300 mb-8 leading-snug">{slide.subtitle}</p>
          <p className="text-xl text-slate-400 leading-relaxed border-l-4 border-slate-700 pl-6 py-2">{slide.text}</p>
        </motion.div>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="md:w-1/2 grid gap-8"
        >
          {slide.stats.map((stat, i) => (
            <motion.div key={i} variants={statVariants} className="bg-gradient-to-br from-slate-900 to-slate-800/80 border border-slate-700/50 p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              <div className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 tracking-tighter mb-4 drop-shadow-sm">
                {stat.value}
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">{stat.label}</h3>
              <p className="text-lg text-slate-400">{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </MotionContainer>
    );
  }

  if (isSpof) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariants} className="flex items-center gap-6 mb-8">
          <div className="p-4 bg-rose-500/10 rounded-2xl">
            <AlertOctagon className="text-rose-500 w-12 h-12 md:w-16 md:h-16" />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight">{slide.title}</h2>
        </motion.div>
        <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants} className="text-2xl md:text-3xl text-rose-200/80 font-medium mb-16 max-w-4xl leading-tight">
          {slide.subtitle}
        </motion.p>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 w-full max-w-5xl mb-16"
        >
          <motion.div variants={fadeUpVariants} className="bg-slate-800/40 p-10 rounded-3xl border border-slate-700/50 shadow-xl">
            <h3 className="text-blue-400 font-bold mb-4 text-xl tracking-wide uppercase">{slide.q1}</h3>
            <p className="text-slate-200 text-xl font-medium leading-relaxed">{slide.a1}</p>
          </motion.div>
          <motion.div variants={fadeUpVariants} className="bg-slate-800/40 p-10 rounded-3xl border border-slate-700/50 shadow-xl">
            <h3 className="text-rose-400 font-bold mb-4 text-xl tracking-wide uppercase">El problema:</h3>
            <p className="text-slate-200 text-xl font-medium leading-relaxed">{slide.q2}</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} viewport={{ once: true }}
          className="w-full max-w-5xl bg-rose-500/10 border border-rose-500/30 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent"></div>
          <p className="text-rose-400 font-mono text-sm md:text-base font-bold uppercase tracking-widest mb-4">Diagnóstico del Sistema</p>
          <p className="text-white text-2xl md:text-4xl font-black tracking-tight">{slide.alert}</p>
        </motion.div>
      </MotionContainer>
    );
  }

  if (isCenterFocus) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor} className="flex flex-col items-center justify-center text-center min-h-[100vh]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants} className="flex flex-col items-center">
          <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center mb-10">
            <Bus className="text-amber-500 w-12 h-12" />
          </div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tight mb-10">{slide.title}</h2>
          <p className="text-2xl md:text-5xl text-slate-300 max-w-5xl leading-tight mb-12 font-light">{slide.text}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 100 }} whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }} viewport={{ once: true, margin: "-100px" }}
          className="text-[12rem] md:text-[24rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-800 drop-shadow-2xl"
        >
          {slide.bigNumber}
        </motion.div>
      </MotionContainer>
    );
  }

  if (isFeatures) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">{slide.title}</h2>
          <p className="text-2xl text-slate-400 max-w-4xl mb-20 font-light leading-relaxed">{slide.subtitle}</p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid md:grid-cols-3 gap-12 w-full max-w-6xl"
        >
          {slide.items.map((item, i) => (
            <motion.div key={i} variants={fadeUpVariants} className="flex flex-col gap-6 group hover:-translate-y-2 transition-transform duration-300">
              <div className="bg-slate-800/40 w-24 h-24 rounded-3xl flex items-center justify-center border border-slate-700/50 mb-4 group-hover:bg-slate-800/80 transition-colors shadow-lg">
                <div className="scale-150 transform">{item.icon}</div>
              </div>
              <h3 className="text-3xl font-bold">{item.title}</h3>
              <p className="text-lg text-slate-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </MotionContainer>
    );
  }

  if (isTools) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">{slide.title}</h2>
          <p className="text-xl md:text-2xl text-slate-400 mb-16 font-light max-w-4xl">{slide.subtitle}</p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-8 w-full max-w-6xl mb-16"
        >
          {slide.cols.map((col, i) => (
            <motion.div key={i} variants={fadeUpVariants} className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-10 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <div className="scale-[5]">{col.icon}</div>
              </div>
              <div className="bg-zinc-800/50 inline-flex p-4 rounded-2xl mb-8 border border-zinc-700">
                {React.cloneElement(col.icon, { className: 'w-10 h-10 mb-0' })}
              </div>
              <h3 className="text-3xl font-bold mb-8 text-white tracking-tight">{col.title}</h3>
              <ul className="space-y-6">
                {col.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-4 text-zinc-300 text-lg">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }} viewport={{ once: true }}
          className="max-w-6xl w-full bg-blue-500/10 border border-blue-500/20 p-8 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6 backdrop-blur-sm"
        >
          <div className="p-3 bg-blue-500/20 rounded-xl shrink-0">
            <Lightbulb className="text-blue-400 w-8 h-8" />
          </div>
          <p className="text-blue-100 text-lg md:text-xl font-medium leading-relaxed sm:pt-1 text-center sm:text-left">{slide.footer}</p>
        </motion.div>
      </MotionContainer>
    );
  }

  if (isLimitations) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor} className="flex flex-col items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants} className="text-center w-full max-w-4xl mx-auto mb-16">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">{slide.title}</h2>
          <p className="text-2xl text-slate-400 font-light leading-relaxed">{slide.subtitle}</p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 w-full max-w-5xl mb-20"
        >
          {slide.items.map((item, i) => (
            <motion.div key={i} variants={statVariants} className="bg-slate-800/40 p-10 rounded-3xl flex flex-col items-center text-center gap-6 border border-slate-700/50 shadow-xl backdrop-blur-md">
              <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-700">
                <div className="scale-125">{item.icon}</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{item.text}</h3>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="text-center relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full"></div>
            <p className="relative z-10 text-xl md:text-3xl font-medium text-emerald-300 bg-emerald-950/50 py-8 px-12 rounded-3xl border border-emerald-500/30 inline-block shadow-2xl backdrop-blur-sm">
              {slide.footer}
            </p>
          </div>
        </motion.div>
      </MotionContainer>
    );
  }

  if (isQuestions) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor} className="flex flex-col items-center text-center justify-center min-h-[100vh]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants} className="flex flex-col items-center max-w-4xl mx-auto mb-16">
          <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center mb-8">
            <MessageSquare className="text-indigo-400 w-12 h-12" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">
            {slide.title}
          </h2>
          <p className="text-2xl md:text-3xl text-slate-300 max-w-3xl font-light leading-relaxed">
            {slide.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid gap-6 w-full max-w-4xl mx-auto"
        >
          {slide.questions.map((q, i) => (
            <motion.div key={i} variants={fadeUpVariants} className="bg-slate-700/20 hover:bg-slate-700/40 transition-colors border border-slate-600/50 p-6 md:p-8 rounded-3xl flex items-center gap-6 md:gap-8 text-left shadow-lg backdrop-blur-md group">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-black text-2xl shrink-0 border border-indigo-500/30 group-hover:scale-110 group-hover:bg-indigo-500/30 transition-all duration-300">
                {i + 1}
              </div>
              <p className="text-xl md:text-3xl font-medium text-white leading-tight">{q}</p>
            </motion.div>
          ))}
        </motion.div>
      </MotionContainer>
    );
  }

  if (isConclusion) {
    return (
      <MotionContainer bg={slide.bg} textColor={slide.textColor}>
        <div className="max-w-5xl mx-auto w-full md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUpVariants}>
            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-10">
              <Rocket className="text-blue-500 w-10 h-10" />
            </div>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 pb-2">{slide.title}</h2>
            <p className="text-3xl md:text-4xl text-slate-300 font-light leading-snug mb-16 border-l-4 border-blue-500 pl-8">{slide.subtitle}</p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="flex flex-wrap gap-4 md:gap-6 mb-20"
          >
            {slide.points.map((point, i) => (
              <motion.span key={i} variants={fadeUpVariants} className="bg-blue-900/40 text-blue-200 border border-blue-500/30 px-8 py-4 rounded-full text-xl md:text-2xl font-medium shadow-lg hover:bg-blue-800/60 transition-colors cursor-default">
                {point}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-white to-slate-200 text-slate-950 p-10 md:p-14 rounded-[2.5rem] shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute right-0 top-0 w-64 h-64 bg-slate-900/5 rounded-bl-full -z-0 group-hover:scale-110 transition-transform duration-1000"></div>
            <p className="relative z-10 text-3xl md:text-5xl font-black leading-tight tracking-tight text-center md:text-left balancing-text">
              {slide.footer}
            </p>
          </motion.div>
        </div>
      </MotionContainer>
    );
  }

  return null;
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative bg-slate-950 min-h-screen text-slate-50 font-sans selection:bg-blue-500/30">
      {/* Progress Bar Fixed at Top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 md:h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Watermark Logo */}
      <div className="fixed top-8 right-8 z-40 Mix-blend-difference opacity-80 pointer-events-none select-none">
        <span className="font-bold text-sm tracking-[0.2em] md:text-base text-white/50 bg-slate-950/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 shadow-2xl">
          SISTEMAS // OP
        </span>
      </div>

      {/* Main Scrollytelling Sections */}
      <main className="w-full flex flex-col">
        {slidesData.map((slide, index) => (
          <SectionRenderer key={slide.id} slide={slide} index={index} />
        ))}
      </main>

      {/* Scroll Down Hint Icon */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none mix-blend-difference hidden md:block">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-8 h-12 rounded-full border-2 border-white/20 flex justify-center pt-2 backdrop-blur-sm"
        >
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}
