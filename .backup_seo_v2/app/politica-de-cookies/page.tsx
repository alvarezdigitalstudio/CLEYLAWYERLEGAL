import type { Metadata } from 'next';
import { LegalDocumentLayout } from '@/components/LegalDocumentLayout';

export const metadata: Metadata = {
  title: 'Política de Cookies | CleyLawyerlegal',
  description:
    'Información transparente sobre el uso técnico de almacenamiento y cookies en el sitio web de CleyLawyerlegal.',
  alternates: {
    canonical: '/politica-de-cookies',
  },
};

export default function PoliticaDeCookiesPage() {
  return (
    <LegalDocumentLayout
      title="Política de Cookies"
      subtitle="Transparencia sobre almacenamiento técnico esencial y ausencia de rastreadores publicitarios."
      currentPath="/politica-de-cookies"
      sections={[
        {
          heading: '1. Estado actual de cookies y rastreadores',
          paragraphs: [
            'Este sitio web opera con criterios de mínima recolección técnica. Actualmente no utiliza cookies publicitarias, píxeles de seguimiento comercial ni herramientas de perfilamiento de terceros.',
          ],
        },
        {
          heading: '2. Recursos técnicos estrictamente necesarios',
          paragraphs: [
            'Únicamente pueden emplearse mecanismos técnicos esenciales propios de la infraestructura web y del navegador del usuario para garantizar la estabilidad de navegación, seguridad básica y correcta visualización de las páginas.',
          ],
        },
        {
          heading: '3. Actualización y consentimiento futuro',
          paragraphs: [
            'En caso de que en el futuro se incorporen herramientas estadísticas o de analítica que requieran cookies no esenciales, esta política será actualizada y se habilitará el mecanismo de consentimiento previo correspondiente conforme a la normativa panameña aplicable.',
          ],
        },
      ]}
    />
  );
}
