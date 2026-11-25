/**
 * Manifiesto de fotografías. Todas son de STOCK (Pexels, licencia libre para uso
 * comercial) y NO son trabajos del salón: se usan como ambiente e inspiración.
 * La galería lo indica. Procedencia en docs/DATOS-PENDIENTES.md.
 */

export type ImageEntry = { src: string; alt: string; ratio: string; focal?: string; pexels: string };

const img = (file: string, pexels: string, alt: string, ratio: string, focal = "50% 50%"): ImageEntry => ({
  src: `/images/${file}.webp`,
  alt,
  ratio,
  focal,
  pexels,
});

export const images = {
  lavadoMasaje: img("lavado-masaje", "7755482", "Clienta relajada mientras le masajean el cuero cabelludo en el lavacabezas", "3 / 2", "62% 45%"),
  planchado: img("planchado", "8467969", "Alisado de una melena castaña con plancha y peine", "2 / 3", "50% 40%"),
  corteRizos: img("corte-rizos", "4969866", "Corte con tijera en un pelo rizado", "2 / 3", "50% 50%"),
  colorPincel: img("color-pincel", "2799605", "Aplicación de color con pincel en una melena larga", "3 / 2", "50% 50%"),
  ondas: img("ondas", "3065171", "Melena con mechas y ondas marcadas", "3 / 2", "50% 40%"),
  corteCaballero: img("corte-caballero", "1805600", "Corte de caballero con tijera y peine", "3 / 2", "50% 45%"),
  tinteClienta: img("tinte-clienta", "3993290", "Peluquera aplicando tinte a una clienta", "2 / 3", "50% 35%"),
  utensiliosColor: img("utensilios-color", "8468141", "Cuencos y pinceles para preparar el color", "2 / 3", "50% 50%"),
  degradado: img("degradado", "2076930", "Peluquero perfilando un degradado con peine y tijera", "2 / 3", "50% 40%"),
  maquinaCaballero: img("maquina-caballero", "3356174", "Arreglo de nuca con máquina en un cliente de pelo canoso", "3 / 2", "45% 45%"),
  barberoCepillo: img("barbero-cepillo", "1836983", "Peinado de caballero con cepillo después del corte", "2 / 3", "50% 35%"),
  lavadoHombre: img("lavado-hombre", "7447121", "Lavado de pelo rizado en el lavacabezas", "3 / 2", "50% 50%"),
} satisfies Record<string, ImageEntry>;

export type ImageKey = keyof typeof images;
