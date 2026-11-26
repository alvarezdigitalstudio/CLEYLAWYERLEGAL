import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Scale, ShieldCheck } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { ReadingProgressBar } from '@/components/ReadingProgressBar';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { BRAND_INFO } from '@/lib/legal-data';
import {
  buildLegalPageJsonLdGraph,
  buildSocialMetadata,
  getSiteUrl,
  serializeJsonLd,
} from '@/lib/seo-config';

const PAGE_PATH = '/marco-de-proteccion-profesional';
const PAGE_TITLE = 'Marco de Protección y Relación Profesional | CleyLawyerLegal';
const PAGE_DESCRIPTION =
  'Conoce las condiciones de comunicación profesional, confidencialidad, protección de información y formalización de servicios jurídicos de CleyLawyerLegal.';

const FRAMEWORK_SECTIONS = [
  {
    heading: '1. Naturaleza de las comunicaciones y consultas iniciales',
    paragraphs: [
      'Los correos electrónicos, mensajes, llamadas, formularios de contacto y documentos remitidos a través de los canales de comunicación de CleyLawyerLegal tienen como finalidad facilitar el contacto inicial, recibir solicitudes y evaluar posibles necesidades de asistencia jurídica.',
      'La recepción, lectura o respuesta de una comunicación no representa por sí misma la aceptación de un encargo profesional, la emisión de un dictamen jurídico definitivo ni la asunción de representación legal.',
      'Las orientaciones generales que eventualmente puedan facilitarse durante una comunicación preliminar no sustituyen el estudio individualizado de los antecedentes, documentos, circunstancias y particularidades de cada asunto.',
    ],
  },
  {
    heading: '2. Constitución formal de la relación abogado-cliente',
    paragraphs: [
      'La relación profesional abogado-cliente requiere una aceptación expresa del encargo y la correspondiente formalización de los servicios profesionales.',
      'Para establecer dicha relación deberán determinarse, según corresponda, el objeto del servicio, su alcance, las obligaciones de las partes, los honorarios, las condiciones de prestación y los demás términos acordados mediante el correspondiente contrato de servicios profesionales.',
      'En consecuencia, el simple envío de un correo electrónico, una consulta, una llamada, un mensaje o documentación no implica automáticamente que CleyLawyerLegal haya aceptado representar, asesorar, defender o asumir responsabilidad profesional sobre un asunto determinado.',
      'Hasta que se formalice la contratación, no deberá presumirse la existencia de una representación profesional ni de obligaciones propias de un encargo jurídico aceptado, sin perjuicio de las obligaciones legales y profesionales que pudieran resultar aplicables en cada circunstancia.',
    ],
  },
  {
    heading: '3. Confidencialidad y reserva profesional',
    paragraphs: [
      'CleyLawyerLegal reconoce la importancia de proteger la información recibida en el ejercicio de su actividad profesional.',
      'La información, documentación y comunicaciones relacionadas con asuntos jurídicos serán tratadas con la diligencia y reserva que correspondan, atendiendo a las obligaciones de confidencialidad, ética profesional y secreto profesional que resulten legalmente aplicables.',
      'La confidencialidad se gestionará de acuerdo con la naturaleza de la información, el contexto de su recepción y las obligaciones profesionales correspondientes.',
      'El envío de información por medios electrónicos no garantiza por sí solo la seguridad absoluta de su transmisión ni determina automáticamente que toda comunicación quede protegida por el secreto profesional.',
      'Por esta razón, se recomienda no remitir documentos especialmente sensibles, datos financieros, información personal delicada o antecedentes confidenciales hasta que se hayan establecido los mecanismos apropiados para su recepción y tratamiento.',
    ],
  },
  {
    heading: '4. Protección de datos personales e información documental',
    paragraphs: [
      'La información personal proporcionada a través de los canales oficiales podrá utilizarse para atender consultas, gestionar solicitudes, evaluar posibles encargos profesionales y prestar los servicios jurídicos que hayan sido formalmente contratados.',
      'El tratamiento de los datos deberá realizarse conforme a la normativa aplicable en materia de protección de datos personales, atendiendo a los principios de legalidad, finalidad, proporcionalidad, confidencialidad y seguridad que correspondan.',
      'CleyLawyerLegal procurará aplicar medidas razonables de diligencia para evitar el acceso, uso, divulgación, modificación o tratamiento no autorizado de la información bajo su control.',
      'Los derechos de los titulares de datos personales y las obligaciones del responsable del tratamiento se regirán por la legislación aplicable.',
    ],
  },
  {
    heading: '5. Alcance de la responsabilidad profesional',
    paragraphs: [
      'La prestación de servicios jurídicos está sujeta a la naturaleza de cada encargo, a la información disponible, a las circunstancias particulares del asunto y a las obligaciones profesionales y legales correspondientes.',
      'Las comunicaciones preliminares no constituyen una garantía de resultado ni implican la aceptación de responsabilidad sobre procedimientos, plazos, actuaciones o decisiones que no hayan sido expresamente asumidos mediante un encargo profesional.',
      'Una vez formalizada la relación profesional, las obligaciones y responsabilidades se determinarán conforme al contrato correspondiente y a las disposiciones legales, éticas y profesionales aplicables.',
      'Ninguna disposición de este marco pretende excluir, reducir o limitar responsabilidades que legalmente sean irrenunciables o que no puedan ser objeto de exclusión contractual.',
    ],
  },
  {
    heading: '6. Independencia profesional y evaluación de los asuntos',
    paragraphs: [
      'Cada solicitud de asistencia jurídica estará sujeta a una evaluación profesional de sus antecedentes, circunstancias, viabilidad, alcance y posibles implicaciones legales.',
      'La recepción de una solicitud no obliga automáticamente a aceptar el asunto.',
      'La aceptación de un encargo estará sujeta a la disponibilidad profesional, la inexistencia de conflictos de intereses, el cumplimiento de las obligaciones éticas y legales y las condiciones de contratación correspondientes.',
      'Las opiniones y estrategias jurídicas dependerán de la información disponible y del análisis de las circunstancias concretas de cada caso.',
    ],
  },
  {
    heading: '7. Comunicaciones electrónicas y seguridad de la información',
    paragraphs: [
      'Los medios electrónicos facilitan la comunicación profesional, pero pueden estar sujetos a interrupciones, errores de transmisión, accesos no autorizados, alteraciones o riesgos tecnológicos ajenos al control razonable del remitente o destinatario.',
      'Por ello, las partes deberán adoptar medidas razonables para proteger sus comunicaciones y verificar la autenticidad de los mensajes y documentos recibidos.',
      'Cuando la naturaleza del asunto lo requiera, podrán establecerse canales específicos para el intercambio seguro de información y documentación.',
    ],
  },
  {
    heading: '8. Comunicaciones recibidas por error',
    paragraphs: [
      'Si una persona recibe una comunicación o documento que no estaba destinado a ella, deberá informar al remitente tan pronto como sea razonablemente posible.',
      'Asimismo, deberá abstenerse de divulgar, reproducir, utilizar o distribuir el contenido recibido y proceder a eliminarlo cuando corresponda, salvo que exista una obligación legal de conservación.',
    ],
  },
  {
    heading: '9. Marco jurídico nacional e internacional',
    paragraphs: [
      'La actividad profesional de CleyLawyerLegal se desarrollará conforme a las leyes, reglamentos, principios éticos y disposiciones profesionales aplicables de la República de Panamá.',
      'Cuando un asunto presente elementos internacionales, la determinación de las normas aplicables dependerá de su naturaleza, las reglas de jurisdicción y competencia, los instrumentos internacionales vigentes y las circunstancias particulares del caso.',
      'La referencia a disposiciones internacionales no implica que todas las jurisdicciones, legislaciones o mecanismos de protección resulten automáticamente aplicables a cualquier comunicación o contratación.',
    ],
  },
  {
    heading: '10. Alcance y aplicación de este marco institucional',
    paragraphs: [
      'Este documento tiene carácter informativo e institucional y establece criterios generales sobre las comunicaciones, la protección de información y la formalización de los servicios jurídicos.',
      'No sustituye el contrato individual de servicios profesionales, las políticas específicas de privacidad, los acuerdos particulares entre las partes ni las obligaciones legales y éticas que resulten aplicables.',
      'En caso de existir un contrato debidamente formalizado, sus condiciones específicas deberán interpretarse conjuntamente con la legislación aplicable y las obligaciones profesionales correspondientes.',
    ],
  },
] as const;

export function generateMetadata(): Metadata {
  return buildSocialMetadata({
    siteUrl: getSiteUrl(),
    path: PAGE_PATH,
    title: PAGE_TITLE,
    ogTitle: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  });
}

export default function MarcoDeProteccionProfesionalPage() {
  const siteUrl = getSiteUrl();
  const jsonLd = buildLegalPageJsonLdGraph(
    'Marco de Protección y Relación Profesional',
    PAGE_DESCRIPTION,
    PAGE_PATH,
    siteUrl,
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#080808]">
      <ReadingProgressBar />
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <main className="flex-1">
        <section className="bg-[#080808] text-[#FFFFFF] py-12 md:py-16 border-b border-[#D99A19]/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-5">
            <nav
              aria-label="Migas de pan"
              className="flex flex-wrap items-center gap-2 text-xs text-[#FFFFFF]/75"
            >
              <Link href="/" className="hover:text-[#F2C45D] transition-colors">
                Inicio
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#D99A19]" aria-hidden="true" />
              <Link
                href="/contacto"
                className="hover:text-[#F2C45D] transition-colors"
              >
                Contacto
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#D99A19]" aria-hidden="true" />
              <span className="text-[#F2C45D] font-medium">
                Marco de Protección y Relación Profesional
              </span>
            </nav>

            <div className="space-y-4 max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F2C45D]">
                CLEYLAWYERLEGAL
              </p>
              <h1 className="font-serif text-[clamp(1.85rem,3.6vw,3rem)] font-bold leading-[1.15] text-[#FFFFFF] text-balance">
                MARCO DE PROTECCIÓN Y RELACIÓN PROFESIONAL
              </h1>
              <div className="w-20 h-[2px] bg-[#D99A19]" aria-hidden="true" />
              <p className="text-base sm:text-lg text-[#FFFFFF]/90 leading-relaxed max-w-3xl">
                Confidencialidad, transparencia, protección de información y
                formalización de servicios jurídicos.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#D99A19]/70 rounded-md text-xs sm:text-sm font-semibold text-[#F2C45D] hover:bg-[#171717] hover:text-[#FFFFFF] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Volver a contacto</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <article className="lg:col-span-8 space-y-9">
            <div className="bg-[#171717] text-[#FFFFFF] border-l-2 border-[#D99A19] p-5 sm:p-6 rounded-r-md space-y-2">
              <p className="text-sm sm:text-base text-[#FFFFFF]/95 leading-relaxed">
                En CleyLawyerLegal reconocemos la importancia de la confianza,
                la responsabilidad y la transparencia en el ejercicio
                profesional del derecho. Por ello, establecemos este marco
                institucional para informar sobre las condiciones que regulan
                nuestras comunicaciones, el tratamiento de la información y la
                formalización de los servicios jurídicos.
              </p>
            </div>

            {FRAMEWORK_SECTIONS.map((section) => (
              <section key={section.heading} className="space-y-3.5">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#080808] leading-snug">
                  {section.heading}
                </h2>
                <div className="w-12 h-[1.5px] bg-[#D99A19]" aria-hidden="true" />
                <div className="space-y-3">
                  {section.paragraphs.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-sm sm:text-base text-[#171717] leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <div className="bg-[#080808] text-[#FFFFFF] border border-[#D99A19]/60 rounded-md p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2.5">
                <Scale className="w-5 h-5 text-[#D99A19]" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F2C45D]">
                  CLEYLAWYERLEGAL
                </p>
              </div>
              <p className="font-serif text-lg sm:text-xl font-semibold text-[#FFFFFF]">
                Compromiso profesional, transparencia y responsabilidad jurídica.
              </p>
              <div className="pt-2">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D99A19] text-[#FFFFFF] rounded-md text-sm font-semibold hover:bg-[#171717] border border-[#D99A19] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Volver a contacto</span>
                </Link>
              </div>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <div className="bg-[#080808] text-[#FFFFFF] border border-[#D99A19]/50 rounded-md p-6 space-y-3 text-xs sm:text-sm">
              <BrandLogo variant="dark" size="sm" />
              <div className="flex items-center gap-2 pt-2">
                <ShieldCheck
                  className="w-4 h-4 text-[#D99A19] shrink-0"
                  aria-hidden="true"
                />
                <p className="font-serif text-base font-semibold text-[#F2C45D]">
                  Respaldo Institucional
                </p>
              </div>
              <p className="text-[#FFFFFF]/90">{BRAND_INFO.lawyerName}</p>
              <p className="text-[#FFFFFF]/80">
                Idoneidad profesional {BRAND_INFO.licenseId}
              </p>
              <p className="text-[#FFFFFF]/80 leading-relaxed">
                {BRAND_INFO.fullAddress}
              </p>
              <p className="text-[#FFFFFF]/90 break-all">{BRAND_INFO.email}</p>
              <p className="text-[#FFFFFF]/90 tabular-nums">
                {BRAND_INFO.phoneDisplay}
              </p>
              <div className="pt-3 border-t border-[#D99A19]/30">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#F2C45D] hover:text-[#FFFFFF] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Volver a contacto</span>
                </Link>
              </div>
            </div>
          </aside>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
