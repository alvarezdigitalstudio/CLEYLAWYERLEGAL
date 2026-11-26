import type { StaticImageData } from 'next/image';

import area01Penal from '@/src/assets/images/area_01_penal_1795582737335.jpg';
import area02Constitucional from '@/src/assets/images/area_02_constitucional_1795582826425.jpg';
import area03Contencioso from '@/src/assets/images/area_03_contencioso_1795582826058.jpg';
import area04Civil from '@/src/assets/images/area_04_civil_1795582739585.jpg';
import area05Familia from '@/src/assets/images/area_05_familia_1795582740013.jpg';
import area06Sucesiones from '@/src/assets/images/area_06_sucesiones_1795582740688.jpg';
import area07Sociedades from '@/src/assets/images/area_07_sociedades_1795582741379.jpg';
import area08Inmobiliario from '@/src/assets/images/area_08_inmobiliario_1795582742499.jpg';
import area09Notarial from '@/src/assets/images/area_09_notarial_1795582742293.jpg';
import area10PropiedadIntelectual from '@/src/assets/images/area_10_propiedad_intelectual_1795582742543.jpg';
import area11Redaccion from '@/src/assets/images/area_11_redaccion_juridica_1795582742937.jpg';
import area12ProcesosJudiciales from '@/src/assets/images/area_12_procesos_judiciales_1795582806760.jpg';
import area13Laboral from '@/src/assets/images/area_13_laboral_1795582827050.jpg';
import area14Migratorio from '@/src/assets/images/area_14_migratorio_1795582807903.jpg';
import area15Agrario from '@/src/assets/images/area_15_agrario_1795582746492.jpg';
import area16Ambiental from '@/src/assets/images/area_16_ambiental_1795582807648.jpg';
import area17Formacion from '@/src/assets/images/area_17_formacion_1795582825908.jpg';

export const PRACTICE_AREA_IMAGES: Record<string, StaticImageData> = {
  'derecho-penal': area01Penal,
  'derecho-constitucional': area02Constitucional,
  'derecho-contencioso-administrativo': area03Contencioso,
  'derecho-civil': area04Civil,
  'derecho-familia': area05Familia,
  sucesiones: area06Sucesiones,
  'sociedades-y-fundaciones': area07Sociedades,
  'seguros-bienes-raices-contratos': area08Inmobiliario,
  'notarial-registral': area09Notarial,
  'propiedad-intelectual': area10PropiedadIntelectual,
  'redaccion-documentos-juridicos': area11Redaccion,
  'procesos-judiciales': area12ProcesosJudiciales,
  'derecho-laboral': area13Laboral,
  'derecho-migratorio': area14Migratorio,
  'derecho-agrario': area15Agrario,
  'derecho-ambiental': area16Ambiental,
  'formacion-profesional': area17Formacion,
};
