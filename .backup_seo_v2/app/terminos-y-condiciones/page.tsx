import type { Metadata } from 'next';
import { LegalDocumentLayout } from '@/components/LegalDocumentLayout';
import { BRAND_INFO } from '@/lib/legal-data';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | CleyLawyerlegal',
  description:
    'Términos y condiciones de uso del sitio web informativo de CleyLawyerlegal en Panamá.',
  alternates: {
    canonical: '/terminos-y-condiciones',
  },
};

export default function TerminosYCondicionesPage() {
  return (
    <LegalDocumentLayout
      title="Términos y Condiciones"
      subtitle="Condiciones de acceso, consulta informativa y relación profesional."
      currentPath="/terminos-y-condiciones"
      sections={[
        {
          heading: '1. Objeto y aceptación de uso',
          paragraphs: [
            `El acceso y navegación en este sitio web de ${BRAND_INFO.name} implica la aceptación de estos términos de uso orientados a informar sobre servicios jurídicos en la República de Panamá.`,
          ],
        },
        {
          heading: '2. Inexistencia de relación abogado-cliente automática',
          paragraphs: [
            'La simple lectura de las páginas de este sitio o el envío de una solicitud inicial de contacto mediante formulario, correo o WhatsApp no establece automáticamente una relación abogado-cliente ni obliga a asumir representación procesal.',
            'La representación jurídica formal requiere entrevista de evaluación, verificación de conflictos de interés y acuerdo expreso de honorarios y alcance del servicio.',
          ],
        },
        {
          heading: '3. Jurisdicción y legislación aplicable',
          paragraphs: [
            'El contenido y las condiciones de uso de este sitio se interpretan conforme a las leyes vigentes de la República de Panamá.',
          ],
        },
      ]}
    />
  );
}
