import type { Metadata } from 'next';
import { LegalDocumentLayout } from '@/components/LegalDocumentLayout';
import { BRAND_INFO } from '@/lib/legal-data';

export const metadata: Metadata = {
  title: 'Aviso Legal | CleyLawyerlegal',
  description:
    'Aviso legal e información profesional del Licdo. Cley González Caballero, abogado litigante con idoneidad 5551 en David, provincia de Chiriquí, Panamá.',
  alternates: {
    canonical: '/aviso-legal',
  },
};

export default function AvisoLegalPage() {
  return (
    <LegalDocumentLayout
      title="Aviso Legal"
      subtitle="Identificación profesional, alcance informativo del sitio y propiedad intelectual."
      currentPath="/aviso-legal"
      sections={[
        {
          heading: '1. Identificación profesional del titular',
          paragraphs: [
            `Sitio web institucional de ${BRAND_INFO.name}, encabezado por el ${BRAND_INFO.lawyerName}, ${BRAND_INFO.profession}, egresado de la ${BRAND_INFO.education}, con idoneidad profesional número ${BRAND_INFO.licenseId} y ${BRAND_INFO.experience.toLowerCase()}.`,
            `Domicilio profesional: ${BRAND_INFO.fullAddress}. Teléfono y WhatsApp oficial: ${BRAND_INFO.phoneDisplay}. Correo oficial: ${BRAND_INFO.email}.`,
          ],
        },
        {
          heading: '2. Naturaleza meramente informativa del contenido',
          paragraphs: [
            'Los textos, guías de áreas jurídicas y artículos publicados en este sitio web tienen carácter estrictamente orientativo e informativo sobre el marco legal panameño y no constituyen asesoría jurídica individualizada ni dictamen vinculante sobre un expediente concreto.',
            'Cada asunto requiere evaluación directa de sus hechos, pruebas y estado procesal por parte de un abogado idóneo.',
          ],
        },
        {
          heading: '3. Propiedad intelectual y signos distintivos',
          paragraphs: [
            'La marca CleyLawyerlegal, su emblema institucional, textos editoriales y estructura visual están protegidos conforme a la legislación aplicable. Se prohíbe su reproducción o uso comercial no autorizado.',
          ],
        },
      ]}
    />
  );
}
