import type { Metadata } from 'next';
import { LegalDocumentLayout } from '@/components/LegalDocumentLayout';
import { BRAND_INFO } from '@/lib/legal-data';

export const metadata: Metadata = {
  title: 'Política de Privacidad | CleyLawyerlegal',
  description:
    'Política de Privacidad y tratamiento de datos personales de CleyLawyerlegal conforme a la Ley 81 de 2019 y el Decreto Ejecutivo 285 de 2021 de la República de Panamá.',
  alternates: {
    canonical: '/politica-de-privacidad',
  },
};

export default function PoliticaDePrivacidadPage() {
  return (
    <LegalDocumentLayout
      title="Política de Privacidad"
      subtitle="Tratamiento de datos personales conforme a la Ley 81 de 2019 y el Decreto Ejecutivo 285 de 2021 de la República de Panamá."
      currentPath="/politica-de-privacidad"
      sections={[
        {
          heading: '1. Responsable del tratamiento',
          paragraphs: [
            `El responsable del tratamiento de los datos proporcionados a través de este sitio web es ${BRAND_INFO.name}, bajo la dirección profesional del ${BRAND_INFO.lawyerName} (${BRAND_INFO.profession}, Idoneidad ${BRAND_INFO.licenseId}), con oficina en ${BRAND_INFO.fullAddress}.`,
            `Canal oficial de contacto en materia de privacidad: ${BRAND_INFO.email} y línea telefónica ${BRAND_INFO.phoneDisplay}.`,
          ],
        },
        {
          heading: '2. Finalidad y alcance del tratamiento de datos',
          paragraphs: [
            'Los datos personales suministrados voluntariamente en los formularios de contacto o WhatsApp (nombre, teléfono, correo electrónico, provincia y motivo general de consulta) se utilizan exclusivamente para responder su solicitud de orientación jurídica, coordinar citas presenciales o remotas y gestionar comunicaciones relacionadas con el servicio solicitado.',
            'No utilizamos los datos recabados para venta a terceros, envío de publicidad masiva ni perfilamiento automatizado.',
          ],
        },
        {
          heading: '3. Uso responsable de los formularios iniciales',
          paragraphs: [
            'Por seguridad jurídica y confidencialidad del usuario, se recomienda abstenerse de incluir números de expediente reservados, documentos sensibles, contraseñas o información financiera confidencial en el formulario web inicial.',
            'El envío por WhatsApp o correo electrónico se realiza de forma voluntaria y directa por el titular mediante el enlace preparado tras validar sus datos.',
          ],
        },
        {
          heading: '4. Derechos ARCO (Ley 81 de 2019)',
          paragraphs: [
            'De conformidad con la Ley 81 de 26 de marzo de 2019 y su reglamentación mediante el Decreto Ejecutivo 285 de 2021, el titular de los datos personales puede ejercer en cualquier momento sus derechos de Acceso, Rectificación, Cancelación, Oposición y Portabilidad.',
            `Para ejercer cualquiera de estos derechos, puede remitir una solicitud escrita al correo ${BRAND_INFO.email} indicando su nombre completo y el requerimiento específico.`,
          ],
        },
      ]}
    />
  );
}
