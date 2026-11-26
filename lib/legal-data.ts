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
  targetHref: string;
}

export interface ValueItem {
  number: string;
  title: string;
  summary: string;
}

export type PracticeFamily =
  | 'Todas'
  | 'Defensa Penal y Garantías'
  | 'Persona, Familia y Patrimonio'
  | 'Empresa, Bienes y Contratos'
  | 'Trabajo, Migración y Territorio'
  | 'Formación Profesional';

export interface PracticeFaqItem {
  question: string;
  answer: string;
}

export interface PracticeAreaDetail {
  number: string;
  slug: string;
  name: string;
  family: Exclude<PracticeFamily, 'Todas'>;
  heroTitle: string;
  introDescription: string;
  detailedExplanation: string;
  situations: string[];
  services: string[];
  importance: string;
  faqs: PracticeFaqItem[];
  relatedSlugs: string[];
  seoTitle: string;
  seoDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  imageAlt: string;
}

export interface CommitmentItem {
  id: string;
  quote: string;
  attribution: string;
  context: string;
}

export type BlogCategory =
  | 'Todos'
  | 'Penal y Garantías'
  | 'Corporativo'
  | 'Laboral';

export interface BlogArticle {
  id: string;
  title: string;
  category: Exclude<BlogCategory, 'Todos'>;
  dateLabel: string;
  readTime: string;
  excerpt: string;
  paragraphs: string[];
  relatedSlug: string;
}

export const BRAND_INFO = {
  name: 'CleyLawyerLegal',
  lawyerName: 'Licdo. Cley González Caballero',
  profession: 'Abogado litigante',
  licenseId: '5551',
  education:
    'Licenciatura en Derecho y Ciencias Políticas — Universidad Autónoma de Chiriquí (UNACHI)',
  experience: 'Más de 26 años en servicios profesionales',
  primaryFocus: 'Derecho Penal y fase de cumplimiento de la pena',
  slogan: 'Criterio jurídico, respaldo firme',
  primaryMessage: 'Defensa penal con rigor y discreción',
  secondaryMessage: 'Desde Chiriquí para todo Panamá',
  address: 'Avenida Segunda, Edificio Don José, primer alto, oficina número 2',
  cityRegionCountry: 'David, provincia de Chiriquí, Panamá',
  fullAddress:
    'Avenida Segunda, Edificio Don José, primer alto, oficina número 2, David, provincia de Chiriquí, Panamá',
  mapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=Avenida+Segunda+Edificio+Don+Jose+David+Chiriqui+Panama',
  phoneDisplay: '+507 6497-1468',
  phoneHref: 'tel:+50764971468',
  whatsappUrl: 'https://wa.me/50764971468',
  email: 'cleylawyerlegal@outlook.com',
  emailHref: 'mailto:cleylawyerlegal@outlook.com',
} as const;

export const SOCIAL_LINKS = [
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@cleygonzalezcaballero',
    href: 'https://www.instagram.com/cleygonzalezcaballero?fqnt=MXhkb3Jya3Y0ZWhkaQ==',
    ariaLabel: 'Instagram oficial de CleyLawyerLegal (@cleygonzalezcaballero)',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'CleyLawyerLegal',
    href: 'https://www.facebook.com/share/1A6azADdP5/',
    ariaLabel: 'Facebook oficial de CleyLawyerLegal',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@abogadocleygonzalez',
    href: 'https://www.tiktok.com/@abogadocleygonzalez',
    ariaLabel: 'TikTok oficial de CleyLawyerLegal (@abogadocleygonzalez)',
  },
] as const;

export const PANAMA_PROVINCES = [
  'Chiriquí',
  'Panamá',
  'Panamá Oeste',
  'Colón',
  'Coclé',
  'Veraguas',
  'Herrera',
  'Los Santos',
  'Bocas del Toro',
  'Darién',
  'Comarcas / Otra ubicación',
] as const;

export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Áreas de Práctica', href: '/areas-de-practica' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Contacto', href: '/contacto' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'asesoria-legal',
    title: 'Representación y Asesoría Legal',
    description: 'Orientación jurídica clara, estratégica y confidencial.',
    iconName: 'Scales',
    detail:
      'Acompañamiento legal, análisis de casos, gestión de trámites y defensa de sus intereses con seriedad y compromiso profesional.',
    targetHref: '/derecho-penal?from=servicios',
  },
  {
    id: 'consultoria-juridica',
    title: 'Consultoría Jurídica',
    description: 'Soluciones legales preventivas y oportunas.',
    iconName: 'Document',
    detail:
      'Revisión de antecedentes, evaluación de riesgos, redacción y orientación legal adaptada a personas y empresas.',
    targetHref: '/redaccion-documentos-juridicos?from=servicios',
  },
  {
    id: 'representacion-legal',
    title: 'Representación Legal',
    description: 'Defensa firme en sus asuntos legales.',
    iconName: 'People',
    detail:
      'Patrocinio procesal ante tribunales ordinarios, jurisdicción constitucional, contencioso-administrativa y juzgados agrarios o laborales.',
    targetHref: '/procesos-judiciales?from=servicios',
  },
  {
    id: 'resolucion-conflictos',
    title: 'Resolución de Conflictos',
    description: 'Soluciones efectivas y negociadas.',
    iconName: 'Handshake',
    detail:
      'Mediación, conciliación y acuerdos extrajudiciales orientados a proteger sus derechos, familia y patrimonio en todo Panamá.',
    targetHref: '/derecho-civil?from=servicios',
  },
];

export const FIRM_PILLARS = [
  {
    title: 'Licdo. Cley González Caballero · Idoneidad 5551',
    description:
      'Abogado litigante egresado de la Licenciatura en Derecho y Ciencias Políticas de la Universidad Autónoma de Chiriquí (UNACHI), con más de 26 años en servicios profesionales.',
  },
  {
    title: 'Derecho Penal y Cumplimiento de la Pena',
    description:
      'Área principal orientada a la defensa técnica responsable, respeto a las garantías fundamentales y seguimiento riguroso en cada etapa procesal.',
  },
  {
    title: 'Desde Chiriquí para todo Panamá',
    description:
      'Atención presencial en David, Avenida Segunda, Edificio Don José, primer alto, oficina número 2, así como orientación coordinada a nivel nacional.',
  },
];

export const VALUES_ITEMS: ValueItem[] = [
  {
    number: '01',
    title: 'Compromiso',
    summary: 'Dedicación íntegra y discreción en el análisis de cada asunto.',
  },
  {
    number: '02',
    title: 'Profesionalismo',
    summary: 'Rigor técnico, ética e idoneidad profesional 5551.',
  },
  {
    number: '03',
    title: 'Confianza',
    summary: 'Comunicación clara sobre riesgos, escenarios y alternativas legales.',
  },
  {
    number: '04',
    title: 'Criterio Jurídico',
    summary: 'Estrategias fundamentadas en la legislación panameña vigente.',
  },
];

export const PRACTICE_FAMILIES: PracticeFamily[] = [
  'Todas',
  'Defensa Penal y Garantías',
  'Persona, Familia y Patrimonio',
  'Empresa, Bienes y Contratos',
  'Trabajo, Migración y Territorio',
  'Formación Profesional',
];

export const PRACTICE_AREAS_17: PracticeAreaDetail[] = [
  {
    number: '01',
    slug: 'derecho-penal',
    name: 'Derecho Penal y Administrativo',
    family: 'Defensa Penal y Garantías',
    heroTitle: 'DEFENSA PENAL CON FIRMEZA, ESTRATEGIA Y COMPROMISO.',
    introDescription:
      'Cuando una persona enfrenta una investigación o un proceso penal, cada decisión puede tener consecuencias importantes. Una defensa jurídica responsable comienza con el análisis de los hechos, la evaluación de las actuaciones procesales y la protección de las garantías fundamentales.',
    detailedExplanation:
      'En el Sistema Penal Acusatorio de Panamá y en los procedimientos administrativos sancionatorios, la intervención oportuna de un abogado litigante permite examinar la legalidad de las diligencias, velar por el debido proceso y preparar una defensa técnica acorde con los elementos del expediente. Asimismo, en la fase de cumplimiento de la pena, el análisis jurídico se orienta a verificar cómputos y evaluar las solicitudes legales que correspondan ante el Juez de Cumplimiento.',
    situations: [
      'Aprehensión o citación por parte del Ministerio Público o autoridades de investigación.',
      'Necesidad de representación inmediata en audiencias de control de aprehensión o imputación.',
      'Revisión de medidas cautelares personales y solicitudes de modificación ante el juez competente.',
      'Seguimiento de la fase de cumplimiento de la pena y procedimientos administrativos sancionatorios.',
    ],
    services: [
      'Defensa técnica en el Sistema Penal Acusatorio',
      'Asistencia ante aprehensiones',
      'Audiencias de control de aprehensión',
      'Medidas cautelares personales',
      'Audiencias de imputación',
      'Juicio oral',
      'Recursos procesales',
      'Asesoría en fase de cumplimiento de la pena',
      'Procedimientos administrativos sancionatorios',
    ],
    importance:
      'Contar con orientación jurídica desde los primeros momentos de una investigación evita decisiones precipitadas, resguarda el derecho de defensa y permite estructurar una estrategia procesal objetiva y respetuosa de las garantías legales.',
    faqs: [
      {
        question: '¿Qué debo hacer si un familiar es aprehendido?',
        answer:
          'Es fundamental mantener la calma, conocer ante qué autoridad o despacho se encuentra la persona y contactar de inmediato a un abogado para que verifique su situación jurídica y ejerza la defensa técnica desde las primeras diligencias. Solicite una evaluación individual para analizar su caso.',
      },
      {
        question: '¿Qué sucede durante una audiencia de control de aprehensión?',
        answer:
          'En esta audiencia el Juez de Garantías revisa si la aprehensión se efectuó respetando los derechos fundamentales y el procedimiento legal establecido en Panamá. La defensa interviene para exponer las observaciones jurídicas pertinentes. Consulte su caso de manera particular.',
      },
      {
        question: '¿Qué son las medidas cautelares?',
        answer:
          'Son disposiciones judiciales destinadas a asegurar la comparecencia de la persona al proceso o proteger determinados fines procesales mientras avanza la causa, existiendo distintas modalidades de menor a mayor intensidad según la valoración judicial. Requiere análisis individualizado.',
      },
      {
        question: '¿Qué es un Juez de Cumplimiento y qué ocurre en la fase de cumplimiento?',
        answer:
          'El Juez de Cumplimiento es la autoridad judicial encargada de velar por la ejecución de las sanciones penales, revisar el cómputo de la pena y conocer solicitudes vinculadas a penas sustitutivas o libertad condicional conforme a la ley vigente. Cada caso exige evaluación específica.',
      },
    ],
    relatedSlugs: [
      'derecho-constitucional',
      'derecho-contencioso-administrativo',
      'procesos-judiciales',
    ],
    seoTitle: 'Abogado Penalista en Panamá y David, Chiriquí | CleyLawyerLegal',
    seoDescription:
      'Defensa penal en el Sistema Penal Acusatorio, audiencias de control, medidas cautelares y fase de cumplimiento de la pena con el Licdo. Cley González Caballero.',
    primaryKeyword: 'Abogado penalista en Panamá',
    secondaryKeywords: [
      'Abogado penalista en David',
      'abogado penal en Chiriquí',
      'defensa penal Panamá',
      'Sistema Penal Acusatorio',
      'fase de cumplimiento de pena',
    ],
    imageAlt:
      'Podio de sala de audiencias penal con códigos jurídicos y expedientes en madera oscura',
  },
  {
    number: '02',
    slug: 'derecho-constitucional',
    name: 'Derecho Constitucional',
    family: 'Defensa Penal y Garantías',
    heroTitle: 'LA PROTECCIÓN DE TUS DERECHOS FUNDAMENTALES ES ESENCIAL.',
    introDescription:
      'La Constitución reconoce garantías fundamentales que deben ser respetadas por las autoridades. Cuando estos derechos resultan afectados, existen mecanismos jurídicos para solicitar su protección conforme al ordenamiento panameño.',
    detailedExplanation:
      'Las acciones constitucionales exigen precisión argumentativa, identificación clara del acto u omisión cuestionada y fundamentación en la Constitución Política de la República de Panamá. Analizamos cada escenario para determinar si procede una acción de amparo, hábeas corpus, hábeas data o control de constitucionalidad.',
    situations: [
      'Actos u órdenes de servidores públicos que afecten garantías fundamentales del debido proceso.',
      'Privaciones o restricciones a la libertad ambulatoria que requieran control constitucional.',
      'Negativa injustificada o demora en la entrega de información personal o pública.',
      'Normas o disposiciones que planteen posibles contradicciones con preceptos constitucionales.',
    ],
    services: [
      'Amparo de garantías constitucionales',
      'Hábeas corpus',
      'Acciones de inconstitucionalidad',
      'Hábeas data',
    ],
    importance:
      'Las acciones constitucionales están sujetas a requisitos formales y presupuestos procesales estrictos; una presentación técnica adecuada es clave para su debida admisión y análisis ante los tribunales competentes.',
    faqs: [
      {
        question: '¿Cuándo procede un amparo de garantías constitucionales?',
        answer:
          'Procede frente a órdenes o actos emitidos por servidores públicos que vulneren o amenacen derechos y garantías consagrados en la Constitución, cuando se cumplan los presupuestos procesales aplicables. Solicite una evaluación individual del acto cuestionado.',
      },
      {
        question: '¿En qué se diferencia el hábeas corpus del amparo?',
        answer:
          'El hábeas corpus protege específicamente el derecho a la libertad personal frente a detenciones ilegales o arbitrarias, mientras que el amparo tutela el resto de las garantías constitucionales. Cada situación requiere revisión legal directa.',
      },
      {
        question: '¿Para qué sirve la acción de hábeas data?',
        answer:
          'Permite a cualquier persona solicitar el acceso, corrección o actualización de datos personales o información que repose en registros públicos o entidades obligadas conforme a la ley panameña. Consulte su caso para verificar requisitos.',
      },
    ],
    relatedSlugs: [
      'derecho-penal',
      'derecho-contencioso-administrativo',
      'procesos-judiciales',
    ],
    seoTitle: 'Abogado Constitucionalista en Panamá | CleyLawyerLegal',
    seoDescription:
      'Amparo de garantías constitucionales, hábeas corpus, hábeas data y acciones de inconstitucionalidad en David, Chiriquí y todo Panamá.',
    primaryKeyword: 'Abogado constitucionalista en Panamá',
    secondaryKeywords: [
      'amparo de garantías constitucionales Panamá',
      'hábeas corpus Panamá',
      'hábeas data Panamá',
    ],
    imageAlt:
      'Columnas neoclásicas de tribunal y balanza dorada junto a libro jurídico encuadernado sobre mármol oscuro',
  },
  {
    number: '03',
    slug: 'derecho-contencioso-administrativo',
    name: 'Derecho Contencioso-Administrativo',
    family: 'Defensa Penal y Garantías',
    heroTitle: 'DEFIENDE TUS DERECHOS FRENTE A LAS DECISIONES ADMINISTRATIVAS.',
    introDescription:
      'Las decisiones de las instituciones públicas pueden producir efectos importantes sobre los derechos de las personas y las empresas. Su revisión requiere un análisis técnico de la actuación administrativa y de los mecanismos de impugnación disponibles.',
    detailedExplanation:
      'Desde la vía gubernativa hasta la jurisdicción contencioso-administrativa ante la Sala Tercera de la Corte Suprema de Justicia, cada resolución administrativa debe examinarse en cuanto a competencia, motivación, procedimiento y prueba, respetando las etapas legales aplicables.',
    situations: [
      'Notificación de resoluciones administrativas sancionatorias o desfavorables.',
      'Necesidad de agotar recursos administrativos de reconsideración o apelación.',
      'Controversias derivadas de actos de contratación pública o licitaciones.',
      'Impugnación judicial de actos administrativos mediante nulidad o plena jurisdicción.',
    ],
    services: [
      'Recursos de reconsideración y apelación',
      'Acciones de plena jurisdicción',
      'Demandas de nulidad',
      'Reclamos en contratación pública',
    ],
    importance:
      'La vía administrativa y contencioso-administrativa exige el cumplimiento estricto de formalidades y el agotamiento previo de recursos; la asesoría oportuna evita perder oportunidades de defensa válidas.',
    faqs: [
      {
        question: '¿Qué es la vía gubernativa y por qué es importante?',
        answer:
          'Es el trámite de impugnación que se presenta directamente ante la entidad administrativa antes de acudir a la vía judicial, mediante recursos como reconsideración o apelación según el procedimiento aplicable. Solicite revisión de su resolución.',
      },
      {
        question: '¿Cuál es la diferencia entre nulidad y plena jurisdicción?',
        answer:
          'La acción de nulidad busca declarar la ilegalidad objetiva de un acto general o impersonal, mientras que la de plena jurisdicción pretende además el restablecimiento de un derecho subjetivo afectado. Requiere evaluación individual.',
      },
      {
        question: '¿Se pueden atender reclamos en contratación pública?',
        answer:
          'Sí, el ordenamiento panameño contempla mecanismos específicos de reclamo e impugnación dentro de los procesos de selección de contratista y ejecución contractual. Consulte su expediente para orientar el trámite.',
      },
    ],
    relatedSlugs: [
      'derecho-constitucional',
      'derecho-penal',
      'derecho-ambiental',
    ],
    seoTitle: 'Abogado Contencioso-Administrativo en Panamá | CleyLawyerLegal',
    seoDescription:
      'Recursos en vía gubernativa, acciones de plena jurisdicción, demandas de nulidad y reclamos de contratación pública en Panamá.',
    primaryKeyword: 'Abogado contencioso-administrativo en Panamá',
    secondaryKeywords: [
      'vía gubernativa Panamá',
      'plena jurisdicción Panamá',
      'contratación pública abogado Chiriquí',
    ],
    imageAlt:
      'Escritorio jurídico con expedientes administrativos en cuero oscuro, balanza y fachada institucional al fondo',
  },
  {
    number: '04',
    slug: 'derecho-civil',
    name: 'Derecho Civil',
    family: 'Persona, Familia y Patrimonio',
    heroTitle: 'PROTEGE TUS DERECHOS Y TU PATRIMONIO.',
    introDescription:
      'Los conflictos civiles pueden afectar bienes, obligaciones, contratos y relaciones patrimoniales. Una orientación jurídica adecuada permite evaluar las alternativas legales y actuar con fundamento.',
    detailedExplanation:
      'Abordamos controversias civiles y patrimoniales desde una perspectiva preventiva y litigiosa, analizando documentos, títulos y medios probatorios para procurar acuerdos equilibrados mediante mediación o ejercer la representación correspondiente ante los juzgados civiles.',
    situations: [
      'Incumplimiento de obligaciones contractuales o de pago por parte de terceros.',
      'Reclamaciones civiles por daños y perjuicios patrimoniales o contractuales.',
      'Conflictos sobre propiedad, posesión o uso de bienes muebles e inmuebles.',
      'Búsqueda de acuerdos extrajudiciales mediante mediación o conciliación documentada.',
    ],
    services: [
      'Demandas y contestaciones',
      'Cobro de créditos',
      'Reclamaciones de daños y perjuicios',
      'Mediación y conciliación',
    ],
    importance:
      'Evaluar la solidez documental y las vías disponibles antes de iniciar un proceso civil ayuda a tomar decisiones realistas y a resguardar adecuadamente su patrimonio.',
    faqs: [
      {
        question: '¿Siempre es necesario ir a juicio para resolver un conflicto civil?',
        answer:
          'No necesariamente. En muchos asuntos resulta viable explorar mecanismos de mediación o conciliación extrajudicial debidamente formalizados antes de acudir a un proceso judicial. Solicite una evaluación de su situación.',
      },
      {
        question: '¿Qué documentos son útiles para evaluar el cobro de un crédito?',
        answer:
          'Resulta importante reunir contratos, pagarés, facturas, comprobantes de transferencia o comunicaciones escritas que acrediten la obligación y su exigibilidad. Agende una revisión documental para analizar las opciones.',
      },
      {
        question: '¿Qué implica una reclamación por daños y perjuicios?',
        answer:
          'Requiere acreditar la existencia de un hecho generador de responsabilidad, el daño sufrido y la relación causal conforme a las reglas probatorias del derecho civil panameño. Consulte su caso de manera individual.',
      },
    ],
    relatedSlugs: [
      'seguros-bienes-raices-contratos',
      'procesos-judiciales',
      'sucesiones',
    ],
    seoTitle: 'Abogado Civil en Chiriquí y Panamá | CleyLawyerLegal',
    seoDescription:
      'Asesoría y representación en demandas civiles, cobro de créditos, daños y perjuicios, y conciliación en David, Chiriquí y Panamá.',
    primaryKeyword: 'Abogado civil en Chiriquí',
    secondaryKeywords: [
      'abogado civil David Panamá',
      'cobro de créditos Panamá',
      'daños y perjuicios Chiriquí',
    ],
    imageAlt:
      'Mesa de caoba con contrato civil formal, pluma estilográfica negra y dorada y libros de derecho civil',
  },
  {
    number: '05',
    slug: 'derecho-familia',
    name: 'Derecho de Familia',
    family: 'Persona, Familia y Patrimonio',
    heroTitle: 'SOLUCIONES JURÍDICAS CON RESPONSABILIDAD Y SENSIBILIDAD HUMANA.',
    introDescription:
      'Los asuntos familiares requieren un tratamiento profesional que combine conocimiento jurídico, prudencia y atención a las circunstancias particulares de cada familia.',
    detailedExplanation:
      'Acompañamos procesos de derecho de familia buscando proteger el bienestar de las partes involucradas y el interés superior de los menores, ya sea mediante acuerdos ordenados de mutuo consentimiento o representación responsable ante los juzgados de familia.',
    situations: [
      'Procesos de divorcio por mutuo acuerdo o por causales legales.',
      'Fijación, revisión o cumplimiento de pensiones alimenticias.',
      'Regulación de guarda, crianza y régimen de comunicación y visitas.',
      'Liquidación del régimen patrimonial matrimonial y solicitud de medidas de protección.',
    ],
    services: [
      'Divorcios',
      'Pensiones alimenticias',
      'Guarda, crianza y régimen de visitas',
      'Liquidación del régimen patrimonial matrimonial',
      'Medidas de protección',
    ],
    importance:
      'Manejar los procesos familiares con serenidad, confidencialidad y claridad legal reduce conflictos innecesarios y aporta estabilidad a las decisiones futuras del grupo familiar.',
    faqs: [
      {
        question: '¿Cómo se tramita un divorcio en Panamá?',
        answer:
          'Puede gestionarse por mutuo consentimiento cuando ambas partes acuerdan sus términos y cumplen los requisitos de ley, o por vía contenciosa invocando causales legales ante el juzgado competente. Solicite orientación para su situación particular.',
      },
      {
        question: '¿Cómo se determina o revisa una pensión alimenticia?',
        answer:
          'La autoridad judicial pondera las necesidades de quien tiene derecho a alimentos y la capacidad económica de quien debe suministrarlos, pudiendo revisarse si cambian las circunstancias. Consulte su caso de forma privada.',
      },
      {
        question: '¿Se pueden acordar regímenes de visitas y guarda?',
        answer:
          'Sí, siempre priorizando el bienestar e interés superior de los hijos menores de edad, mediante convenio aprobado judicialmente o resolución del tribunal. Agende una consulta para orientación.',
      },
    ],
    relatedSlugs: ['sucesiones', 'derecho-civil', 'notarial-registral'],
    seoTitle: 'Abogado de Familia en David, Panamá | CleyLawyerLegal',
    seoDescription:
      'Divorcios, pensiones alimenticias, guarda y crianza, liquidación patrimonial y medidas de protección en David, Chiriquí, Panamá.',
    primaryKeyword: 'Abogado de familia en David Panamá',
    secondaryKeywords: [
      'abogado de familia Chiriquí',
      'pensión alimenticia Panamá',
      'divorcio David Chiriquí',
    ],
    imageAlt:
      'Sala de consulta jurídica cálida y serena con sillones de cuero y luz natural filtrada por cortinas de lino',
  },
  {
    number: '06',
    slug: 'sucesiones',
    name: 'Sucesiones',
    family: 'Persona, Familia y Patrimonio',
    heroTitle: 'PROTEGE EL PATRIMONIO FAMILIAR Y GARANTIZA LA SEGURIDAD JURÍDICA.',
    introDescription:
      'Los procesos sucesorios requieren determinar derechos hereditarios, revisar documentación y gestionar las actuaciones necesarias para la distribución legal de los bienes.',
    detailedExplanation:
      'Asesoramos tanto en la planificación sucesoria preventiva como en la tramitación de sucesiones testadas e intestadas en Panamá, verificando títulos de propiedad, inventario de bienes, deudas hereditarias y adjudicación final conforme a la ley.',
    situations: [
      'Fallecimiento de un familiar que dejó bienes muebles, inmuebles o cuentas por formalizar.',
      'Revisión de testamentos y determinación de herederos legítimos.',
      'Controversias hereditarias o necesidad de impugnación testamentaria.',
      'Planificación patrimonial ordenada para evitar conflictos sucesorios futuros.',
    ],
    services: [
      'Apertura de sucesiones',
      'Impugnación de testamentos',
      'Administración de masa hereditaria',
      'Planificación sucesoria',
    ],
    importance:
      'Una tramitación sucesoria ordenada evita bloqueos sobre inmuebles o cuentas y brinda certeza jurídica a los herederos respecto de la titularidad de los bienes.',
    faqs: [
      {
        question: '¿Qué diferencia hay entre sucesión testada e intestada?',
        answer:
          'La sucesión testada se rige por un testamento válido otorgado por el causante, mientras que la intestada aplica cuando no existe testamento o este no dispone de todos los bienes, llamándose a los herederos que establece la ley. Solicite revisión de su caso.',
      },
      {
        question: '¿Qué documentos se requieren inicialmente para abrir una sucesión?',
        answer:
          'Por lo general se recopila el certificado de defunción, certificados de nacimiento o matrimonio que acrediten el parentesco, información sobre posible testamento y documentación de los bienes. Le orientamos según su expediente.',
      },
      {
        question: '¿Se puede planificar la sucesión en vida?',
        answer:
          'Sí, mediante herramientas jurídicas como el testamento o estructuras patrimoniales lícitas debidamente asesoradas según la realidad familiar. Agende una evaluación individual.',
      },
    ],
    relatedSlugs: [
      'derecho-familia',
      'derecho-civil',
      'notarial-registral',
    ],
    seoTitle: 'Abogado de Sucesiones en Panamá y Chiriquí | CleyLawyerLegal',
    seoDescription:
      'Apertura de sucesiones testadas e intestadas, administración de masa hereditaria y planificación sucesoria en David, Chiriquí y Panamá.',
    primaryKeyword: 'Abogado de sucesiones en Panamá',
    secondaryKeywords: [
      'sucesiones en Chiriquí',
      'herencias en Panamá',
      'planificación sucesoria Panamá',
    ],
    imageAlt:
      'Documentos de planificación patrimonial, sello de lacre clásico y libro de archivo familiar sobre escritorio de nogal',
  },
  {
    number: '07',
    slug: 'sociedades-y-fundaciones',
    name: 'Mercantil, sociedades y fundaciones de interés privado',
    family: 'Empresa, Bienes y Contratos',
    heroTitle: 'CONSTRUYE Y PROTEGE TUS ESTRUCTURAS EMPRESARIALES.',
    introDescription:
      'La organización jurídica de una empresa requiere documentos adecuados, cumplimiento normativo y una estructura que responda a sus objetivos comerciales y patrimoniales.',
    detailedExplanation:
      'Brindamos orientación para la constitución, mantenimiento y actualización de sociedades anónimas, sociedades de responsabilidad limitada y fundaciones de interés privado bajo la legislación panameña, cuidando actas, poderes, reformas y obligaciones corporativas vigentes.',
    situations: [
      'Inicio de una actividad comercial que requiere constitución formal de sociedad.',
      'Protección y organización patrimonial mediante fundación de interés privado.',
      'Cambios de junta directiva, dignatarios, objeto social o reformas al pacto social.',
      'Necesidad de cumplimiento corporativo y actualización de registros societarios.',
    ],
    services: [
      'Constitución y mantenimiento de sociedades',
      'Fundaciones de interés privado',
      'Reformas societarias',
      'Poderes y dignatarios',
      'Cumplimiento corporativo',
    ],
    importance:
      'Mantener sus sociedades y fundaciones al día conforme a las obligaciones vigentes en Panamá evita sanciones, suspensiones registrales y contratiempos en operaciones bancarias o comerciales.',
    faqs: [
      {
        question: '¿Cuál es la diferencia práctica entre una sociedad y una fundación de interés privado?',
        answer:
          'La sociedad mercantil está concebida primordialmente para actividades comerciales y de negocio, mientras que la fundación de interés privado suele emplearse para administración y planificación patrimonial o familiar sin fines lucrativos directos. Requiere análisis según su objetivo.',
      },
      {
        question: '¿Se pueden modificar los dignatarios o el pacto social de una sociedad existente?',
        answer:
          'Sí, mediante la celebración de las actas correspondientes, protocolización notarial e inscripción ante el Registro Público de Panamá. Consulte los requisitos para su entidad.',
      },
      {
        question: '¿Por qué es relevante el cumplimiento corporativo continuo?',
        answer:
          'Las entidades jurídicas panameñas deben observar obligaciones registrales, contables y de debida diligencia ante su agente residente y autoridades competentes para conservar su vigencia. Solicite orientación preventiva.',
      },
    ],
    relatedSlugs: [
      'redaccion-documentos-juridicos',
      'notarial-registral',
      'seguros-bienes-raices-contratos',
    ],
    seoTitle: 'Abogado Corporativo y Sociedades en Panamá | CleyLawyerLegal',
    seoDescription:
      'Constitución y mantenimiento de sociedades, fundaciones de interés privado, reformas societarias y cumplimiento corporativo en Panamá.',
    primaryKeyword: 'Abogado corporativo en Panamá',
    secondaryKeywords: [
      'constitución de sociedades Panamá',
      'fundaciones de interés privado Panamá',
      'derecho mercantil Chiriquí',
    ],
    imageAlt:
      'Mesa ejecutiva de madera oscura con carpetas societarias y vista urbana de distrito financiero',
  },
  {
    number: '08',
    slug: 'seguros-bienes-raices-contratos',
    name: 'Seguros, bienes raíces y contratos',
    family: 'Empresa, Bienes y Contratos',
    heroTitle: 'SEGURIDAD JURÍDICA PARA TUS BIENES Y NEGOCIOS.',
    introDescription:
      'Las operaciones inmobiliarias y contractuales requieren revisión documental, análisis de obligaciones y prevención de riesgos jurídicos antes de asumir compromisos.',
    detailedExplanation:
      'Acompañamos transacciones sobre bienes inmuebles, contratos de arrendamiento o construcción y reclamaciones vinculadas a pólizas de seguros, verificando antecedentes registrales, gravámenes y condiciones contractuales antes de la firma.',
    situations: [
      'Compra o venta de terrenos, residencias o locales comerciales en Chiriquí u otras provincias.',
      'Necesidad de debida diligencia registral para confirmar titularidad y ausencia de gravámenes.',
      'Redacción o revisión de contratos de arrendamiento residencial, comercial o de construcción.',
      'Objeciones o demoras en reclamaciones frente a compañías aseguradoras.',
    ],
    services: [
      'Compraventas de inmuebles',
      'Debida diligencia inmobiliaria',
      'Reclamaciones ante aseguradoras',
      'Contratos de arrendamiento',
      'Contratos de construcción',
    ],
    importance:
      'Una revisión jurídica previa a la entrega de arras o firma de escritura protege su inversión frente a vicios ocultos, gravámenes no advertidos o cláusulas desequilibradas.',
    faqs: [
      {
        question: '¿Qué incluye una debida diligencia inmobiliaria?',
        answer:
          'Comprende la verificación de la finca en el Registro Público, titularidad actual, hipotecas, embargos, servidumbres, paz y salvos aplicables y congruencia de los linderos documentales. Solicite revisión antes de comprometer fondos.',
      },
      {
        question: '¿Por qué revisar un contrato de promesa de compraventa antes de firmarlo?',
        answer:
          'Porque establece plazos de pago, condiciones resolutorias, penalidades y obligaciones de saneamiento que vinculan a las partes desde su firma. Agende una consulta preventiva.',
      },
      {
        question: '¿Cómo abordar una controversia con una aseguradora?',
        answer:
          'El primer paso consiste en examinar las condiciones generales y particulares de la póliza, las exclusiones alegadas y la documentación del siniestro para definir la vía de reclamación procedente. Consulte su caso.',
      },
    ],
    relatedSlugs: [
      'notarial-registral',
      'derecho-civil',
      'redaccion-documentos-juridicos',
    ],
    seoTitle: 'Bienes Raíces, Seguros y Contratos en Panamá | CleyLawyerLegal',
    seoDescription:
      'Compraventas de inmuebles, debida diligencia registral, contratos de arrendamiento y reclamaciones de seguros en David, Chiriquí y Panamá.',
    primaryKeyword: 'Abogado inmobiliario en Chiriquí',
    secondaryKeywords: [
      'bienes raíces David Chiriquí',
      'debida diligencia inmobiliaria Panamá',
      'reclamaciones de seguros Panamá',
    ],
    imageAlt:
      'Planos arquitectónicos, llaves de bronce y carpeta de escritura inmobiliaria sobre escritorio de travertino y roble',
  },
  {
    number: '09',
    slug: 'notarial-registral',
    name: 'Notarial y registral',
    family: 'Empresa, Bienes y Contratos',
    heroTitle: 'DOCUMENTOS BIEN ESTRUCTURADOS, TRÁMITES CON SEGURIDAD JURÍDICA.',
    introDescription:
      'La correcta formalización e inscripción de documentos permite dar cumplimiento a los requisitos legales correspondientes y proteger los intereses de las partes.',
    detailedExplanation:
      'Gestionamos la preparación de minutas para escrituras públicas, poderes notariales, rectificaciones o inscripciones ante el Registro Público y coordinación de apostillas para uso internacional, evitando defectos registrales que retrasen sus gestiones.',
    situations: [
      'Otorgamiento de poderes generales o especiales para trámites en Panamá o el extranjero.',
      'Elaboración de minutas de compraventa, hipoteca, cancelaciones o actas protocolizables.',
      'Subsanación de defectos y correcciones de asientos en el Registro Público.',
      'Legalización y apostilla de documentos públicos para validez internacional.',
    ],
    services: [
      'Escrituras públicas',
      'Inscripciones y correcciones registrales',
      'Poderes notariales',
      'Apostilla de documentos',
    ],
    importance:
      'La redacción técnica previa de los instrumentos notariales previene calificaciones defectuosas en el Registro Público y asegura que la voluntad de las partes quede fielmente asentada.',
    faqs: [
      {
        question: '¿Qué diferencia hay entre un poder general y un poder especial?',
        answer:
          'El poder general otorga facultades amplias de administración o representación conforme a sus términos, mientras que el poder especial se limita a gestiones específicas determinadas expresamente. Solicite orientación para redactar el alcance correcto.',
      },
      {
        question: '¿Cuándo requiere un documento la Apostilla de La Haya?',
        answer:
          'Cuando un documento público emitido en Panamá debe surtir efectos legales en otro país miembro del Convenio de La Haya, o viceversa. Le orientamos sobre el trámite aplicable.',
      },
      {
        question: '¿Se pueden corregir errores en inscripciones registrales?',
        answer:
          'Sí, dependiendo de la naturaleza del error material o de concepto, existen procedimientos notariales o registrales para solicitar su rectificación. Consulte su asiento registral para evaluación.',
      },
    ],
    relatedSlugs: [
      'seguros-bienes-raices-contratos',
      'sociedades-y-fundaciones',
      'redaccion-documentos-juridicos',
    ],
    seoTitle: 'Abogado Notarial y Registral en Panamá | CleyLawyerLegal',
    seoDescription:
      'Escrituras públicas, inscripciones y correcciones registrales, poderes notariales y apostilla de documentos en David, Chiriquí y Panamá.',
    primaryKeyword: 'Abogado notarial y registral en Panamá',
    secondaryKeywords: [
      'escrituras públicas Panamá',
      'Registro Público Panamá',
      'poderes notariales Chiriquí',
    ],
    imageAlt:
      'Sello notarial clásico de bronce e hierro junto a tomos de escrituras públicas y documento formal',
  },
  {
    number: '10',
    slug: 'propiedad-intelectual',
    name: 'Propiedad intelectual',
    family: 'Empresa, Bienes y Contratos',
    heroTitle: 'PROTEGE LO QUE HAS CREADO. DEFIENDE EL VALOR DE TU MARCA.',
    introDescription:
      'Las marcas, obras y creaciones representan activos importantes. Su protección jurídica ayuda a prevenir usos indebidos y a establecer derechos sobre los activos intelectuales.',
    detailedExplanation:
      'Orientamos a emprendedores, profesionales y empresas en la verificación previa de antecedentes marcarios, registro de signos distintivos ante la Dirección General del Registro de la Propiedad Industrial (DIGERPI), renovaciones, licencias de uso y defensa frente a oposiciones o usos no autorizados.',
    situations: [
      'Lanzamiento de una marca comercial o nombre de producto que requiere protección registral.',
      'Vigilancia de renovaciones periódicas y mantenimiento de registros vigentes.',
      'Uso no autorizado de signos distintivos similares en el mercado.',
      'Necesidad de formalizar contratos de licencia o cesión de uso de marca.',
    ],
    services: [
      'Registro de marcas',
      'Vigilancia y renovación',
      'Defensa frente a infracciones',
      'Contratos de licencia',
    ],
    importance:
      'El registro oportuno otorga seguridad jurídica sobre su identidad comercial y constituye el respaldo principal frente a eventuales imitaciones o conflictos de marca.',
    faqs: [
      {
        question: '¿Por qué es importante hacer una búsqueda previa antes de registrar una marca?',
        answer:
          'Permite verificar si existen signos idénticos o similares ya registrados o en trámite en la misma clase, reduciendo el riesgo de oposiciones o rechazos. Solicite una verificación previa.',
      },
      {
        question: '¿El registro de una sociedad protege automáticamente mi marca comercial?',
        answer:
          'No. La razón social de una sociedad y el registro de una marca ante la autoridad de propiedad industrial son trámites distintos y con efectos jurídicos independientes. Consulte cómo resguardar su marca.',
      },
      {
        question: '¿Puedo autorizar a terceros el uso de mi marca mediante contrato?',
        answer:
          'Sí, a través de contratos de licencia de uso debidamente estructurados que delimiten territorio, vigencia, calidad y regalías. Solicite asesoría contractual.',
      },
    ],
    relatedSlugs: [
      'sociedades-y-fundaciones',
      'redaccion-documentos-juridicos',
      'procesos-judiciales',
    ],
    seoTitle: 'Marcas y Propiedad Intelectual en Panamá | CleyLawyerLegal',
    seoDescription:
      'Registro de marcas en Panamá, vigilancia, renovaciones, contratos de licencia y defensa frente a infracciones de propiedad intelectual.',
    primaryKeyword: 'Registro de marcas en Panamá',
    secondaryKeywords: [
      'propiedad intelectual Panamá',
      'abogado de marcas Chiriquí',
      'DIGERPI Panamá',
    ],
    imageAlt:
      'Bocetos de diseño minimalista, compás de bronce y carpeta de registro marcario sobre pizarra oscura',
  },
  {
    number: '11',
    slug: 'redaccion-documentos-juridicos',
    name: 'Redacción de documentos jurídicos',
    family: 'Empresa, Bienes y Contratos',
    heroTitle: 'CADA PALABRA IMPORTA. CADA CLÁUSULA CUENTA.',
    introDescription:
      'Un documento jurídico bien elaborado permite establecer obligaciones, responsabilidades y condiciones claras. La revisión profesional ayuda a reducir ambigüedades y riesgos contractuales.',
    detailedExplanation:
      'Redactamos y revisamos contratos civiles, comerciales y acuerdos privados adaptados a la operación real del cliente, evitando plantillas genéricas que omiten garantías, mecanismos de terminación o soluciones claras ante incumplimientos.',
    situations: [
      'Firma de contratos de prestación de servicios, suministro, distribución o colaboración.',
      'Necesidad de revisar un borrador recibido de una contraparte antes de comprometerse.',
      'Solicitud de dictámenes jurídicos escritos para evaluar riesgos de una operación.',
      'Preparación de declaraciones, autorizaciones y documentos para gestiones en el exterior.',
    ],
    services: [
      'Contratos a la medida',
      'Revisión y negociación contractual',
      'Dictámenes jurídicos',
      'Documentos para trámites internacionales',
    ],
    importance:
      'La claridad en la redacción contractual es la herramienta preventiva más rentable para evitar interpretaciones divergentes y litigios futuros.',
    faqs: [
      {
        question: '¿Por qué evitar contratos genéricos descargados de internet?',
        answer:
          'Porque suelen responder a legislaciones extranjeras o no contemplan particularidades de la legislación panameña ni los riesgos concretos de su acuerdo. Solicite una redacción adaptada a su operación.',
      },
      {
        question: '¿Pueden revisar un contrato antes de que yo lo firme?',
        answer:
          'Sí, evaluamos las cláusulas propuestas, identificamos riesgos u obligaciones desproporcionadas y sugerimos ajustes concretos para su negociación. Agende una revisión documental.',
      },
      {
        question: '¿Qué es un dictamen jurídico?',
        answer:
          'Es un análisis técnico por escrito sobre una situación o documento específico que expone el marco legal aplicable, posibles contingencias y recomendaciones prácticas. Consulte su requerimiento.',
      },
    ],
    relatedSlugs: [
      'sociedades-y-fundaciones',
      'seguros-bienes-raices-contratos',
      'notarial-registral',
    ],
    seoTitle: 'Redacción de Contratos Jurídicos en Panamá | CleyLawyerLegal',
    seoDescription:
      'Contratos a la medida, revisión contractual, dictámenes jurídicos y documentos para trámites internacionales en David, Chiriquí y Panamá.',
    primaryKeyword: 'Redacción de contratos jurídicos en Panamá',
    secondaryKeywords: [
      'revisión de contratos Panamá',
      'dictámenes jurídicos Chiriquí',
      'contratos comerciales Panamá',
    ],
    imageAlt:
      'Primer plano de redacción y revisión de cláusulas jurídicas con pluma estilográfica negra y dorada',
  },
  {
    number: '12',
    slug: 'procesos-judiciales',
    name: 'Procesos judiciales y práctica forense',
    family: 'Empresa, Bienes y Contratos',
    heroTitle: 'PREPARACIÓN, ESTRATEGIA Y ACTUACIÓN JURÍDICA.',
    introDescription:
      'La litigación exige preparación, conocimiento procesal y análisis de las pruebas. Cada procedimiento debe abordarse conforme a sus particularidades y al marco jurídico aplicable.',
    detailedExplanation:
      'Con más de 26 años de ejercicio profesional, el Licdo. Cley González Caballero ofrece conducción técnica en práctica forense: preparación de audiencias, sustento probatorio, solicitudes de medidas cautelares, formulación de recursos y seguimiento disciplinado de expedientes.',
    situations: [
      'Necesidad de comparecer como demandante o demandado en un proceso judicial.',
      'Resguardo urgente de bienes mediante medidas cautelares patrimoniales procedentes.',
      'Interposición de recursos ordinarios o extraordinarios frente a resoluciones adversas.',
      'Revisión técnica y seguimiento continuo de un expediente judicial en curso.',
    ],
    services: [
      'Preparación de audiencias y alegatos',
      'Medidas cautelares patrimoniales',
      'Recursos ordinarios y extraordinarios',
      'Seguimiento de expedientes',
    ],
    importance:
      'El respeto riguroso a la técnica procesal, los medios de prueba y el seguimiento oportuno de cada etapa determinan la solidez de la defensa en estrados.',
    faqs: [
      {
        question: '¿Es posible asumir la representación en un proceso que ya inició?',
        answer:
          'Sí, previa revisión integral del expediente para conocer el estado procesal actual, las actuaciones surtidas y las alternativas legales vigentes. Solicite una revisión del caso.',
      },
      {
        question: '¿Qué finalidad tienen las medidas cautelares patrimoniales?',
        answer:
          'Buscan evitar que los bienes objeto de controversia se distraigan o pierdan valor mientras se tramita el proceso, siempre que se cumplan los requisitos legales establecidos. Consulte su viabilidad.',
      },
      {
        question: '¿Cómo se mantiene informado al cliente sobre un proceso?',
        answer:
          'Brindamos seguimiento transparente y comunicación oportuna de las resoluciones y avances relevantes del expediente. Agende una consulta inicial.',
      },
    ],
    relatedSlugs: [
      'derecho-penal',
      'derecho-civil',
      'derecho-constitucional',
    ],
    seoTitle: 'Abogado Litigante en Panamá y David, Chiriquí | CleyLawyerLegal',
    seoDescription:
      'Práctica forense, preparación de audiencias, medidas cautelares, recursos procesales y seguimiento de expedientes en Chiriquí y Panamá.',
    primaryKeyword: 'Abogado litigante en Panamá',
    secondaryKeywords: [
      'práctica forense Panamá',
      'abogado litigante Chiriquí',
      'procesos judiciales David',
    ],
    imageAlt:
      'Sala formal de audiencias judiciales con estrado de caoba, mazo judicial y expedientes ordenados',
  },
  {
    number: '13',
    slug: 'derecho-laboral',
    name: 'Derecho Laboral',
    family: 'Trabajo, Migración y Territorio',
    heroTitle: 'CONOCE Y DEFIENDE TUS DERECHOS LABORALES.',
    introDescription:
      'Las relaciones laborales generan derechos y obligaciones tanto para trabajadores como para empleadores. La orientación jurídica permite evaluar situaciones contractuales y resolver controversias conforme a la legislación laboral.',
    detailedExplanation:
      'Atendemos tanto a trabajadores que requieren orientación sobre despidos, prestaciones o reclamos, como a empleadores que buscan prevención mediante contratos claros, políticas internas y auditoría laboral conforme al Código de Trabajo de Panamá.',
    situations: [
      'Terminación de la relación de trabajo y verificación del cálculo de prestaciones.',
      'Redacción de contratos de trabajo individuales y reglamentos internos de empresa.',
      'Atención de citaciones, conciliaciones o demandas ante la jurisdicción laboral.',
      'Revisión preventiva de cumplimiento patronal para comercios y empresas.',
    ],
    services: [
      'Asesoría patronal',
      'Defensa del trabajador',
      'Negociación de liquidaciones',
      'Auditoría laboral',
    ],
    importance:
      'La asesoría laboral preventiva o temprana permite documentar correctamente las relaciones de trabajo y alcanzar soluciones conformes a derecho sin desgastes prolongados.',
    faqs: [
      {
        question: '¿Qué debo revisar antes de firmar una liquidación o mutuo acuerdo laboral?',
        answer:
          'Conviene verificar los conceptos incluidos, fechas de ingreso y salida, salario base y cumplimiento de los derechos que correspondan según el tipo de terminación. Solicite una revisión previa antes de firmar.',
      },
      {
        question: '¿En qué consiste una auditoría laboral para empresas?',
        answer:
          'Consiste en examinar contratos, planillas, reglamentos internos y prácticas de contratación para detectar riesgos de incumplimiento y corregirlos preventivamente. Consulte por este servicio.',
      },
      {
        question: '¿Atienden casos tanto de trabajadores como de empleadores?',
        answer:
          'Sí, ofrecemos orientación técnica imparcial para la parte que requiera representación o asesoría en su asunto laboral concreto. Agende su consulta.',
      },
    ],
    relatedSlugs: [
      'redaccion-documentos-juridicos',
      'sociedades-y-fundaciones',
      'procesos-judiciales',
    ],
    seoTitle: 'Abogado Laboral en Chiriquí y Panamá | CleyLawyerLegal',
    seoDescription:
      'Asesoría patronal, defensa del trabajador, negociación de liquidaciones y auditoría laboral en David, Chiriquí y Panamá.',
    primaryKeyword: 'Abogado laboral en Chiriquí',
    secondaryKeywords: [
      'abogado laboral David Panamá',
      'liquidación laboral Panamá',
      'asesoría patronal Chiriquí',
    ],
    imageAlt:
      'Mesa ejecutiva de consulta con carpetas de contratos laborales y pluma de bronce en oficina moderna',
  },
  {
    number: '14',
    slug: 'derecho-migratorio',
    name: 'Derecho Migratorio',
    family: 'Trabajo, Migración y Territorio',
    heroTitle: 'TU PROYECTO DE VIDA EN PANAMÁ MERECE SEGURIDAD JURÍDICA.',
    introDescription:
      'Los procedimientos migratorios requieren identificar la categoría correspondiente, reunir los documentos exigidos y cumplir los requisitos establecidos por las autoridades competentes.',
    detailedExplanation:
      'Brindamos acompañamiento en trámites ante el Servicio Nacional de Migración y el Ministerio de Trabajo y Desarrollo Laboral, verificando autenticaciones, apostillas, antecedentes y requisitos vigentes para residencias, permisos laborales, renovaciones o naturalización.',
    situations: [
      'Evaluación de categoría migratoria aplicable para establecer residencia en Panamá.',
      'Gestión de permisos de trabajo vinculados a categorías migratorias vigentes.',
      'Trámites de renovación o cambio de estatus migratorio dentro de los tiempos requeridos.',
      'Orientación en procesos de naturalización panameña conforme a requisitos legales.',
    ],
    services: [
      'Residencias',
      'Permisos de trabajo',
      'Naturalización panameña',
      'Renovaciones y cambios de categoría migratoria',
    ],
    importance:
      'Presentar expedientes migratorios completos, debidamente apostillados y ajustados a la categoría correcta evita rechazos administrativos, multas o demoras innecesarias.',
    faqs: [
      {
        question: '¿Todas las residencias incluyen automáticamente permiso de trabajo?',
        answer:
          'No necesariamente. En Panamá el estatus migratorio y el permiso de trabajo se tramitan ante autoridades distintas y dependen de la categoría migratoria aplicable. Solicite evaluación de su perfil.',
      },
      {
        question: '¿Qué preparación documental requieren los documentos emitidos en el extranjero?',
        answer:
          'Generalmente deben contar con apostilla o legalización consular correspondiente, traducción oficial al español si están en otro idioma y vigencia adecuada según el requisito de la autoridad. Consulte antes de viajar o presentar.',
      },
      {
        question: '¿Cuándo conviene iniciar la renovación de una residencia?',
        answer:
          'Es recomendable preparar la documentación con suficiente antelación al vencimiento del carné vigente para cumplir ordenadamente los requisitos administrativos. Agende una orientación.',
      },
    ],
    relatedSlugs: [
      'derecho-laboral',
      'notarial-registral',
      'sociedades-y-fundaciones',
    ],
    seoTitle: 'Abogado Migratorio y Residencias en Panamá | CleyLawyerLegal',
    seoDescription:
      'Trámites de residencias en Panamá, permisos de trabajo, renovaciones y naturalización panameña con asesoría legal en Chiriquí y Panamá.',
    primaryKeyword: 'Abogado migratorio en Panamá',
    secondaryKeywords: [
      'residencias en Panamá',
      'permisos de trabajo Panamá',
      'abogado migración Chiriquí',
    ],
    imageAlt:
      'Expediente de residencia legal internacional, documento de viaje y globo de bronce sobre escritorio de nogal',
  },
  {
    number: '15',
    slug: 'derecho-agrario',
    name: 'Derecho Agrario',
    family: 'Trabajo, Migración y Territorio',
    heroTitle: 'PROTEGE LEGALMENTE TU TIERRA Y TU PATRIMONIO RURAL.',
    introDescription:
      'Los asuntos relacionados con tierras rurales, posesión, titulación y conflictos agrarios requieren revisar antecedentes, documentos y procedimientos ante las autoridades correspondientes.',
    detailedExplanation:
      'Con profundo conocimiento de la realidad agropecuaria y territorial de Chiriquí y el resto del país, asesoramos en trámites de titulación, defensa de la posesión agraria, contratos rurales y litigios ante los juzgados agrarios.',
    situations: [
      'Regularización y trámite de titulación o adjudicación de tierras rurales.',
      'Conflictos por linderos, servidumbres de paso o perturbación de posesión agraria.',
      'Redacción de contratos agrarios de arrendamiento, aparcería o explotación.',
      'Representación en procesos tramitados ante la jurisdicción agraria.',
    ],
    services: [
      'Titulación y adjudicación',
      'Defensa de posesión',
      'Contratos agrarios',
      'Procesos ante juzgados agrarios',
    ],
    importance:
      'La seguridad jurídica sobre la tierra rural protege la inversión agrícola y ganadera, facilita el acceso a financiamiento y previene disputas territoriales entre colindantes.',
    faqs: [
      {
        question: '¿Qué diferencia existe entre derechos posesorios y propiedad titulada?',
        answer:
          'Los derechos posesorios corresponden al aprovechamiento material acreditado sobre una parcela conforme a la ley, mientras que la propiedad titulada cuenta con inscripción definitiva de dominio en el Registro Público. Solicite análisis de sus antecedentes.',
      },
      {
        question: '¿Qué documentos ayudan a respaldar la posesión agraria?',
        answer:
          'Planos aprobados, certificaciones de colindantes, comprobantes de mejoras o aprovechamiento productivo y antecedentes históricos de tenencia suelen ser relevantes para la evaluación jurídica. Agende revisión.',
      },
      {
        question: '¿Se pueden formalizar acuerdos agrarios por escrito?',
        answer:
          'Sí, documentar contratos agrarios con claridad sobre plazos, uso de la tierra, mejoras y obligaciones protege tanto al propietario o poseedor como al productor. Consulte su caso.',
      },
    ],
    relatedSlugs: [
      'seguros-bienes-raices-contratos',
      'derecho-ambiental',
      'derecho-civil',
    ],
    seoTitle: 'Abogado Agrario y Tierras en Chiriquí | CleyLawyerLegal',
    seoDescription:
      'Titulación y adjudicación de tierras, defensa de posesión, contratos agrarios y procesos ante juzgados agrarios en David, Chiriquí y Panamá.',
    primaryKeyword: 'Abogado agrario en Chiriquí',
    secondaryKeywords: [
      'titulación de tierras Panamá',
      'derechos posesorios Chiriquí',
      'juzgados agrarios Panamá',
    ],
    imageAlt:
      'Colinas agrícolas verdes en tierras altas de Chiriquí Panamá al atardecer con cerca de linderos rurales',
  },
  {
    number: '16',
    slug: 'derecho-ambiental',
    name: 'Derecho Ambiental',
    family: 'Trabajo, Migración y Territorio',
    heroTitle: 'SEGURIDAD JURÍDICA PARA TUS PROYECTOS Y EL ENTORNO.',
    introDescription:
      'El cumplimiento de las obligaciones ambientales es fundamental para el desarrollo responsable de proyectos y actividades económicas. Su análisis jurídico permite identificar requisitos y riesgos regulatorios.',
    detailedExplanation:
      'Orientamos a empresas, desarrolladores y propietarios en el análisis legal de requisitos ambientales, trámites de permisos o concesiones, evaluación preventiva de riesgos regulatorios y defensa en procedimientos administrativos sancionatorios ambientales.',
    situations: [
      'Verificación de obligaciones y permisos ambientales antes de iniciar obras o proyectos.',
      'Atención de inspecciones, requerimientos o procesos sancionatorios ambientales.',
      'Evaluación jurídica de cumplimiento para actividades agrícolas, turísticas o comerciales.',
      'Revisión de concesiones y autorizaciones vinculadas al aprovechamiento sostenible.',
    ],
    services: [
      'Permisos y concesiones',
      'Evaluación de riesgos legales',
      'Defensa en procesos sancionatorios',
      'Asesoría a proyectos',
    ],
    importance:
      'Anticipar el cumplimiento ambiental evita suspensiones de obra, sanciones administrativas y retrasos significativos en la ejecución de proyectos productivos.',
    faqs: [
      {
        question: '¿Cuándo es conveniente realizar una revisión legal ambiental?',
        answer:
          'Antes de iniciar el desarrollo de un proyecto o adquirir una propiedad destinada a actividad productiva, para identificar autorizaciones aplicables y prevenir contingencias. Solicite una consulta preventiva.',
      },
      {
        question: '¿Qué hacer ante una notificación o procedimiento sancionatorio ambiental?',
        answer:
          'Es importante analizar de inmediato el acta de inspección o resolución notificada, recopilar los permisos y descargos técnicos existentes y ejercer la defensa administrativa oportuna. Consulte su expediente.',
      },
      {
        question: '¿Trabajan en coordinación con consultores técnicos ambientales?',
        answer:
          'Sí, el acompañamiento jurídico complementa la labor de ingenieros y especialistas ambientales para asegurar que los expedientes cumplan tanto los criterios técnicos como las exigencias legales. Agende orientación.',
      },
    ],
    relatedSlugs: [
      'derecho-agrario',
      'derecho-contencioso-administrativo',
      'seguros-bienes-raices-contratos',
    ],
    seoTitle: 'Abogado Ambiental en Panamá y Chiriquí | CleyLawyerLegal',
    seoDescription:
      'Permisos y concesiones ambientales, evaluación de riesgos legales y defensa en procesos sancionatorios ambientales en Panamá.',
    primaryKeyword: 'Abogado ambiental en Panamá',
    secondaryKeywords: [
      'cumplimiento ambiental Panamá',
      'permisos ambientales Chiriquí',
      'procesos sancionatorios ambientales',
    ],
    imageAlt:
      'Valle fluvial de bosque nuboso en Panamá con libreta de campo de cumplimiento ambiental sobre barandal de madera',
  },
  {
    number: '17',
    slug: 'formacion-profesional',
    name: 'Formación y ejercicio profesional en Panamá',
    family: 'Formación Profesional',
    heroTitle: 'FORTALECE TU EJERCICIO PROFESIONAL CON FUNDAMENTO JURÍDICO Y ÉTICO.',
    introDescription:
      'El ejercicio de la abogacía requiere preparación, responsabilidad y conocimiento de las normas que regulan la profesión. La formación jurídica y la orientación profesional contribuyen al desarrollo de una práctica responsable.',
    detailedExplanation:
      'A partir de más de 26 años de práctica forense y litigación, el Licdo. Cley González Caballero ofrece espacios de orientación para futuros abogados y profesionales jóvenes en cuanto al camino hacia la idoneidad profesional, criterios prácticos de litigación, ética de la abogacía y acompañamiento en el ejercicio responsable.',
    situations: [
      'Estudiantes o egresados de Derecho que buscan orientación práctica sobre el trámite de idoneidad.',
      'Abogados recién incorporados que desean fortalecer su criterio en técnicas de litigación.',
      'Consultas sobre ética profesional y deberes frente al cliente y los tribunales.',
      'Acompañamiento formativo en práctica forense y estructuración de escritos jurídicos.',
    ],
    services: [
      'Orientación para obtener la idoneidad',
      'Talleres de litigación',
      'Consultoría ética',
      'Acompañamiento profesional',
    ],
    importance:
      'La formación ética y práctica sólida desde los inicios del ejercicio profesional eleva la calidad del servicio jurídico y protege la confianza de la sociedad en la abogacía.',
    faqs: [
      {
        question: '¿A quién está dirigido este servicio de orientación profesional?',
        answer:
          'Está orientado a egresados de Derecho, pasantes y abogados en ejercicio inicial en Panamá que buscan guía ética y práctica forense basada en experiencia real en tribunales. Solicite información.',
      },
      {
        question: '¿En qué consiste el acompañamiento en litigación y práctica forense?',
        answer:
          'Se enfoca en compartir criterios metodológicos sobre preparación de audiencias, ordenación documental, redacción jurídica y conducta ética profesional. Consulte disponibilidad y modalidades.',
      },
      {
        question: '¿Ofrecen orientación general sobre los requisitos formales de idoneidad?',
        answer:
          'Sí, brindamos guía informativa sobre el proceso y la preparación ética necesaria para ejercer la abogacía de forma responsable conforme a las disposiciones vigentes en Panamá.',
      },
    ],
    relatedSlugs: [
      'procesos-judiciales',
      'derecho-penal',
      'redaccion-documentos-juridicos',
    ],
    seoTitle: 'Formación y Ejercicio de la Abogacía en Panamá | CleyLawyerLegal',
    seoDescription:
      'Orientación para idoneidad, talleres de litigación, consultoría ética y acompañamiento profesional en Panamá con el Licdo. Cley González Caballero.',
    primaryKeyword: 'Ejercicio de la abogacía en Panamá',
    secondaryKeywords: [
      'idoneidad de abogado Panamá',
      'talleres de litigación Chiriquí',
      'ética profesional abogado Panamá',
    ],
    imageAlt:
      'Biblioteca jurídica de caoba con libro doctrinal abierto sobre atril de lectura y lámpara clásica de bronce',
  },
];

export const COMMITMENT_CARDS: CommitmentItem[] = [
  {
    id: 'compromiso-1',
    quote:
      'Cada consulta es atendida de forma directa y confidencial por el Licdo. Cley González Caballero, analizando los hechos y documentos antes de trazar una ruta jurídica.',
    attribution: 'Atención Personalizada · Idoneidad 5551',
    context: 'David, provincia de Chiriquí, Panamá',
  },
  {
    id: 'compromiso-2',
    quote:
      'Defensa penal con rigor y discreción en cada etapa del Sistema Penal Acusatorio y seguimiento disciplinado en la fase de cumplimiento de la pena.',
    attribution: 'Área Principal · Derecho Penal y Cumplimiento',
    context: 'Desde Chiriquí para todo Panamá',
  },
  {
    id: 'compromiso-3',
    quote:
      'Comunicación honesta y clara sobre escenarios, procedimientos legales y alternativas de solución, sin promesas infundadas y con estricto apego a la ley panameña.',
    attribution: 'Ética y Transparencia · +26 años de servicio',
    context: 'Criterio jurídico, respaldo firme',
  },
];

export const BLOG_CATEGORIES: BlogCategory[] = [
  'Todos',
  'Penal y Garantías',
  'Corporativo',
  'Laboral',
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'audiencia-control-aprehension',
    title: 'La importancia de la defensa técnica desde la audiencia de control de aprehensión',
    category: 'Penal y Garantías',
    dateLabel: 'Orientación Penal',
    readTime: '4 min de lectura',
    excerpt:
      'En el Sistema Penal Acusatorio, la primera audiencia ante el Juez de Garantías marca el resguardo efectivo de las garantías fundamentales.',
    paragraphs: [
      'Cuando se produce una aprehensión en el marco de una investigación penal en Panamá, las primeras horas son determinantes para verificar la legalidad del procedimiento y preservar el derecho de defensa.',
      'Durante la audiencia de control de aprehensión, la defensa técnica examina las circunstancias de la detención, las actas incorporadas y el respeto a los derechos constitucionales del investigado antes de pasar a etapas posteriores como la imputación o la discusión de medidas cautelares.',
      'Contar con asesoría jurídica temprana permite preparar argumentos objetivos y velar en todo momento por un debido proceso transparente.',
    ],
    relatedSlug: 'derecho-penal',
  },
  {
    id: 'clausulas-contratos-mercantiles',
    title: 'Cláusulas esenciales para proteger sus acuerdos comerciales y bienes en Panamá',
    category: 'Corporativo',
    dateLabel: 'Guía Jurídica',
    readTime: '4 min de lectura',
    excerpt:
      'Definir con precisión el alcance, las garantías y los mecanismos de solución de controversias evita ambigüedades costosas entre partes.',
    paragraphs: [
      'Un contrato bien redactado no solo documenta un acuerdo comercial o inmobiliario: establece reglas claras cuando surgen cambios operativos o diferencias de interpretación.',
      'Entre los aspectos imprescindibles se encuentran la delimitación exacta de obligaciones, plazos verificables, formalidades de notificación y condiciones claras de terminación o saneamiento.',
      'Revisar cada documento antes de firmarlo reduce riesgos patrimoniales y protege la continuidad de sus proyectos.',
    ],
    relatedSlug: 'redaccion-documentos-juridicos',
  },
  {
    id: 'prevencion-riesgos-laborales',
    title: 'Prevención legal en la gestión de relaciones laborales en Chiriquí y Panamá',
    category: 'Laboral',
    dateLabel: 'Orientación Laboral',
    readTime: '5 min de lectura',
    excerpt:
      'La documentación ordenada desde el inicio de la relación laboral es la herramienta más efectiva para mantener seguridad jurídica.',
    paragraphs: [
      'Muchas controversias laborales surgen por acuerdos informales, imprecisiones sobre funciones o falta de respaldo documental ante cambios en la relación de trabajo.',
      'Formalizar contratos claros, políticas internas coherentes y liquidaciones debidamente verificadas brinda certeza jurídica tanto a trabajadores como a empleadores.',
      'Ante cualquier desacuerdo o terminación laboral, la orientación jurídica oportuna permite evaluar las alternativas legales conforme a la normativa vigente.',
    ],
    relatedSlug: 'derecho-laboral',
  },
];

export const LEGAL_PAGES_LINKS = [
  { label: 'Política de privacidad', href: '/politica-de-privacidad' },
  { label: 'Aviso legal', href: '/aviso-legal' },
  { label: 'Términos y condiciones', href: '/terminos-y-condiciones' },
  { label: 'Política de cookies', href: '/politica-de-cookies' },
] as const;

export function getPracticeAreaBySlug(
  slug: string,
): PracticeAreaDetail | undefined {
  return PRACTICE_AREAS_17.find((area) => area.slug === slug);
}

export function getRelatedPracticeAreas(
  area: PracticeAreaDetail,
): PracticeAreaDetail[] {
  return area.relatedSlugs
    .map((slug) => getPracticeAreaBySlug(slug))
    .filter((item): item is PracticeAreaDetail => Boolean(item));
}
