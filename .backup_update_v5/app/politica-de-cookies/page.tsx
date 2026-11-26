import type { Metadata } from 'next';
import { LegalDocumentLayout } from '@/components/LegalDocumentLayout';

import { buildSocialMetadata, getSiteUrl } from '@/lib/seo-config';

export function generateMetadata(): Metadata {
  return buildSocialMetadata({
    siteUrl: getSiteUrl(),
    path: '/politica-de-cookies',
    title: 'Política de Cookies y Analítica | CleyLawyerLegal',
    description:
      'Información transparente sobre almacenamiento técnico esencial y consentimiento previo para Google Analytics 4 conforme a la Ley 81 de 2019 de Panamá.',
  });
}

export default function PoliticaDeCookiesPage() {
  return (
    <LegalDocumentLayout
      title="Política de Cookies"
      subtitle="Transparencia sobre almacenamiento técnico esencial y consentimiento previo para medición estadística."
      currentPath="/politica-de-cookies"
      sections={[
        {
          heading: '1. Criterio de mínima recolección y ausencia de publicidad',
          paragraphs: [
            'Este sitio web opera bajo criterios de mínima recolección técnica. No utilizamos cookies publicitarias, retargeting comercial ni herramientas de perfilamiento de terceros.',
          ],
        },
        {
          heading: '2. Recursos técnicos estrictamente necesarios',
          paragraphs: [
            'Pueden emplearse mecanismos técnicos esenciales propios de la infraestructura web y del navegador del usuario para garantizar la estabilidad de navegación, recordar su preferencia de privacidad y asegurar la correcta visualización de las páginas.',
          ],
        },
        {
          heading: '3. Analítica web opcional (GA4, GTM y Microsoft Clarity) sujeta a consentimiento',
          paragraphs: [
            'Cuando el despacho habilita identificadores oficiales de medición (Google Analytics 4, Google Tag Manager o Microsoft Clarity), la analítica permanece desactivada por defecto (`analytics_storage: denied`) y no se carga ningún script externo de medición hasta que el usuario otorgue su consentimiento expreso mediante el panel de preferencias.',
            'En caso de aceptar la analítica, la configuración aplica anonimización de dirección IP, mantiene desactivadas las señales publicitarias y aplica enmascaramiento sobre los campos de formularios para evitar el registro de datos personales ingresados. El usuario puede revocar o modificar su elección en cualquier momento desde el enlace de preferencias ubicado en el pie de página o enviando una solicitud conforme a la Ley 81 de 2019 y el Decreto Ejecutivo 285 de 2021 de la República de Panamá.',
          ],
        },
      ]}
    />
  );
}
