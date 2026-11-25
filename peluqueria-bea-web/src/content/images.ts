/**
 * Manifiesto de fotografías. Todas son fotos REALES del salón, publicadas por
 * Peluquería Bea en su ficha de Booksy (galería y fotos de servicios), es decir,
 * trabajos de Bea hechos en el salón. Procedencia en docs/DATOS-PENDIENTES.md.
 *
 * `focal` = punto de encuadre (object-position) cuando la caja recorta la foto.
 */

export type ImageEntry = {
  src: string;
  alt: string;
  /** Proporción real del archivo (ancho / alto). */
  ratio: string;
  focal?: string;
};

const sq = (file: string, alt: string, focal = "50% 45%"): ImageEntry => ({
  src: `/images/${file}.webp`,
  alt,
  ratio: "1 / 1",
  focal,
});

export const images = {
  bea: sq("bea", "Bea, la peluquera, sonriendo con secador, peine y tijeras en el salón", "45% 30%"),
  ondasLargas: sq("ondas-largas", "Melena muy larga con balayage rubio y ondas marcadas", "55% 40%"),
  ondasRubias: sq("ondas-rubias", "Media melena con mechas rubias y ondas", "52% 45%"),
  recogidoJoya: sq("recogido-joya", "Recogido bajo trenzado con peineta de pedrería", "50% 40%"),
  recogidoCobrizo: sq("recogido-cobrizo", "Recogido trenzado en melena cobriza", "50% 45%"),
  colorRojo: sq("color-rojo", "Melena larga y lisa en color rojo intenso", "50% 40%"),
  semirecogido: sq("semirecogido", "Semirrecogido con trenza y horquillas brillantes en melena rubia", "55% 35%"),
  trenzasMono: {
    src: "/images/trenzas-mono.webp",
    alt: "Trenzas pegadas que terminan en moño alto",
    ratio: "4 / 3",
    focal: "50% 40%",
  },
  lisoCastano: sq("liso-castano", "Melena lisa castaña con corte recto", "50% 45%"),
  lisoCaoba: sq("liso-caoba", "Melena larga lisa en tono caoba", "50% 45%"),
  melenaMechas: sq("melena-mechas", "Media melena con mechas caramelo y puntas hacia fuera", "55% 50%"),
  bobRojo: sq("bob-rojo", "Bob recto en color fucsia", "50% 45%"),
  trenzasBoxeadoras: sq("trenzas-boxeadoras", "Trenzas boxeadoras en una niña", "50% 40%"),
  trenzasSalon: sq("trenzas-salon", "Dos trenzas boxeadoras largas delante del logotipo del salón", "50% 35%"),
  hombreColeta: sq("hombre-coleta", "Corte de caballero con laterales rapados y coleta", "45% 40%"),
  hombreCorte: sq("hombre-corte", "Corte corto de caballero visto desde atrás", "50% 45%"),
  ninoCorte: sq("nino-corte", "Corte infantil degradado con raya marcada", "55% 45%"),
  pixiePlatino: sq("pixie-platino", "Corte pixie en rubio platino", "45% 40%"),
  recogidoPlata: sq("recogido-plata", "Recogido con trenza y tocado floral en cabello gris", "45% 45%"),
  permanente: sq("permanente", "Melena rizada con permanente delante del logotipo del salón", "50% 50%"),
  cortoRubio: sq("corto-rubio", "Corte corto texturizado en rubio", "50% 45%"),
  recogidoInformal: sq("recogido-informal", "Recogido desenfadado con mechas", "50% 45%"),
  keratinaAntes: {
    src: "/images/keratina-antes.webp",
    alt: "Antes del alisado de keratina: melena encrespada y sin forma",
    ratio: "420 / 810",
    focal: "50% 35%",
  },
  keratinaDespues: {
    src: "/images/keratina-despues.webp",
    alt: "Después del alisado de keratina: melena lisa y brillante con corte recto",
    ratio: "410 / 810",
    focal: "50% 35%",
  },
} satisfies Record<string, ImageEntry>;

export type ImageKey = keyof typeof images;
