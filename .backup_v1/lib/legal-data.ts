export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Scales' | 'Document' | 'People' | 'Handshake';
  detail: string;
}

export interface ValueItem {
  number: string;
  title: string;
  summary: string;
}

export type PracticeCategory =
  | 'Todas'
  | 'Corporativo'
  | 'Civil y Patrimonial'
  | 'Litigio y Negociación';

export interface PracticeArea {
  id: string;
  title: string;
  category: Exclude<PracticeCategory, 'Todas'>;
  description: string;
  scope: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  attribution: string;
  engagementContext: string;
  stars: number;
}

export type BlogCategory =
  | 'Todos'
  | 'Corporativo'
  | 'Laboral'
  | 'Resolución';

export interface BlogArticle {
  id: string;
  title: string;
  category: Exclude<BlogCategory, 'Todos'>;
  dateLabel: string;
  readTime: string;
  excerpt: string;
  paragraphs: string[];
}

export const BRAND_INFO = {
  name: 'CleyLawyerlegal',
  slogan: 'Criterio jurídico, respaldo firme',
  phone: '+507 123 4567',
  email: 'info@cleylawyerlegal.com',
  location: 'Panamá, Panamá',
  copyright: '© 2025 CleyLawyerlegal. Todos los derechos reservados.',
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Áreas de Práctica', href: '#areas-de-practica' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contacto', href: '#contacto' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'asesoria-legal',
    title: 'Asesoría Legal',
    description: 'Orientación profesional en todo momento.',
    iconName: 'Scales',
    detail:
      'Acompañamiento jurídico continuo para la toma de decisiones personales y empresariales con seguridad normativa.',
  },
  {
    id: 'consultoria-juridica',
    title: 'Consultoría Jurídica',
    description: 'Estrategias legales personalizadas.',
    iconName: 'Document',
    detail:
      'Análisis preventivo de riesgos, estructuración contractual y dictámenes adaptados a cada operación.',
  },
  {
    id: 'representacion-legal',
    title: 'Representación Legal',
    description: 'Defensa firme en sus asuntos legales.',
    iconName: 'People',
    detail:
      'Patrocinio procesal ante instancias administrativas y judiciales con rigor técnico y seguimiento transparente.',
  },
  {
    id: 'resolucion-conflictos',
    title: 'Resolución de Conflictos',
    description: 'Soluciones efectivas y negociadas.',
    iconName: 'Handshake',
    detail:
      'Mediación, conciliación y acuerdos extrajudiciales orientados a proteger su patrimonio y tiempo.',
  },
];

export const FIRM_PILLARS = [
  {
    title: 'Atención Directa y Confidencial',
    description:
      'Cada asunto es evaluado de forma personalizada, garantizando reserva absoluta y comunicación clara sobre cada etapa.',
  },
  {
    title: 'Criterio Jurídico Preventivo',
    description:
      'Priorizamos la identificación temprana de contingencias legales antes de que escalen en litigios costosos.',
  },
  {
    title: 'Soluciones Estructuradas en Panamá',
    description:
      'Enfoque práctico alineado con el marco normativo panameño para personas naturales, comercios y sociedades.',
  },
];

export const VALUES_ITEMS: ValueItem[] = [
  {
    number: '01',
    title: 'Compromiso',
    summary: 'Dedicación íntegra en la defensa de cada caso.',
  },
  {
    number: '02',
    title: 'Profesionalismo',
    summary: 'Rigor técnico, ética y excelencia en cada gestión.',
  },
  {
    number: '03',
    title: 'Confianza',
    summary: 'Transparencia y acompañamiento cercano en todo proceso.',
  },
  {
    number: '04',
    title: 'Resultados',
    summary: 'Estrategias orientadas a soluciones concretas y viables.',
  },
];

export const PRACTICE_CATEGORIES: PracticeCategory[] = [
  'Todas',
  'Corporativo',
  'Civil y Patrimonial',
  'Litigio y Negociación',
];

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'derecho-corporativo',
    title: 'Derecho Corporativo y Societario',
    category: 'Corporativo',
    description:
      'Constitución de sociedades, gobierno corporativo, pactos de accionistas y cumplimiento mercantil.',
    scope: [
      'Redacción y revisión de contratos mercantiles',
      'Estructuración de acuerdos societarios',
      'Asesoría preventiva para juntas directivas',
    ],
  },
  {
    id: 'contratos-comerciales',
    title: 'Contratación Comercial y Cumplimiento',
    category: 'Corporativo',
    description:
      'Diseño de cláusulas claras que resguardan obligaciones, plazos, confidencialidad y garantías.',
    scope: [
      'Contratos de prestación de servicios y suministro',
      'Acuerdos de confidencialidad y no competencia',
      'Auditoría documental y prevención de incumplimientos',
    ],
  },
  {
    id: 'derecho-civil-patrimonial',
    title: 'Derecho Civil y Patrimonial',
    category: 'Civil y Patrimonial',
    description:
      'Protección de bienes, obligaciones civiles, sucesiones y planificación patrimonial ordenada.',
    scope: [
      'Redacción de contratos civiles y arrendamientos',
      'Procesos sucesorios y declaratorias',
      'Resguardo de derechos reales y patrimoniales',
    ],
  },
  {
    id: 'derecho-inmobiliario',
    title: 'Derecho Inmobiliario',
    category: 'Civil y Patrimonial',
    description:
      'Debida diligencia registral, promesas de compraventa y seguridad jurídica en operaciones inmobiliarias.',
    scope: [
      'Verificación de títulos y gravámenes',
      'Contratos de compraventa y arrendamiento comercial',
      'Regularización documental de propiedades',
    ],
  },
  {
    id: 'derecho-laboral',
    title: 'Derecho Laboral Preventivo',
    category: 'Litigio y Negociación',
    description:
      'Orientación en contratación laboral, reglamentos internos y manejo adecuado de terminaciones.',
    scope: [
      'Contratos individuales y políticas internas',
      'Atención de conflictos laborales individuales',
      'Acuerdos transaccionales ante autoridad competente',
    ],
  },
  {
    id: 'negociacion-arbitraje',
    title: 'Litigio Estratégico y Mediación',
    category: 'Litigio y Negociación',
    description:
      'Representación firme en disputas civiles y comerciales, priorizando salidas negociadas eficientes.',
    scope: [
      'Mediación y conciliación extrajudicial',
      'Estrategia procesal en reclamaciones civiles',
      'Ejecución y seguimiento de acuerdos firmados',
    ],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'testimonio-1',
    quote:
      'Su orientación jurídica nos permitió reestructurar nuestros contratos comerciales con total claridad y prevenir conflictos antes de firmar acuerdos clave.',
    attribution: 'Cliente Corporativo',
    engagementContext: 'Asesoría en Contratación Comercial · Panamá',
    stars: 5,
  },
  {
    id: 'testimonio-2',
    quote:
      'Destacamos el trato serio, la puntualidad en cada respuesta y la firmeza con la que condujeron nuestra negociación hasta lograr un acuerdo equilibrado.',
    attribution: 'Cliente Empresarial',
    engagementContext: 'Resolución de Conflictos · Ciudad de Panamá',
    stars: 5,
  },
  {
    id: 'testimonio-3',
    quote:
      'Nos brindaron tranquilidad desde la primera consulta, explicando cada paso legal en un lenguaje comprensible y acompañando todo el trámite patrimonial.',
    attribution: 'Cliente Particular',
    engagementContext: 'Consultoría Civil y Patrimonial · Panamá',
    stars: 5,
  },
];

export const BLOG_CATEGORIES: BlogCategory[] = [
  'Todos',
  'Corporativo',
  'Laboral',
  'Resolución',
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'clausulas-contratos-mercantiles',
    title: 'Cláusulas esenciales para blindar un contrato comercial en Panamá',
    category: 'Corporativo',
    dateLabel: 'Guía Jurídica',
    readTime: '4 min de lectura',
    excerpt:
      'Definir con precisión el alcance, las causales de terminación y la jurisdicción evita ambigüedades costosas entre socios o proveedores.',
    paragraphs: [
      'Un contrato bien redactado no solo documenta un acuerdo comercial: establece reglas previsibles cuando surgen cambios operativos o diferencias de interpretación.',
      'Entre las cláusulas imprescindibles se encuentran la delimitación exacta de entregables y plazos, los mecanismos de notificación formal, la confidencialidad de la información intercambiada y un procedimiento claro para resolver controversias antes de acudir a litigio.',
      'Revisar cada documento con criterio preventivo antes de la firma reduce riesgos financieros y protege la continuidad de las relaciones comerciales.',
    ],
  },
  {
    id: 'prevencion-riesgos-laborales',
    title: 'Prevención legal en la gestión de relaciones laborales',
    category: 'Laboral',
    dateLabel: 'Orientación Empresarial',
    readTime: '5 min de lectura',
    excerpt:
      'La documentación ordenada desde el inicio de la relación laboral es la herramienta más efectiva para mantener el equilibrio entre las partes.',
    paragraphs: [
      'Muchas contingencias laborales se originan por acuerdos verbales imprecisos, ausencia de políticas internas claras o falta de respaldo documental en modificaciones de jornada o funciones.',
      'Contar con contratos debidamente formalizados, descripciones de cargo coherentes y procedimientos disciplinarios documentados brinda certeza jurídica tanto al empleador como al colaborador.',
      'Ante una eventual desvinculación o desacuerdo, la asesoría jurídica oportuna permite optar por salidas ordenadas y conformes a la normativa vigente.',
    ],
  },
  {
    id: 'negociacion-extrajudicial-efectiva',
    title: 'Cuándo priorizar una resolución negociada frente al litigio tradicional',
    category: 'Resolución',
    dateLabel: 'Estrategia Legal',
    readTime: '4 min de lectura',
    excerpt:
      'Evaluar costos, tiempos procesales y objetivos reales permite diseñar acuerdos ejecutables que protegen su patrimonio sin desgastes innecesarios.',
    paragraphs: [
      'No toda controversia requiere iniciar un proceso judicial prolongado para alcanzar una defensa firme de sus intereses.',
      'Una negociación estructurada, respaldada por un análisis sólido de la posición jurídica y probatoria, suele ofrecer soluciones más rápidas, confidenciales y predecibles para las partes involucradas.',
      'Cuando el acuerdo no resulta viable o justo, la preparación previa fortalece de inmediato la estrategia de representación ante los tribunales.',
    ],
  },
];
