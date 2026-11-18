import { addDays, today } from '../utils'

// Datos de ejemplo. Todas las fechas son relativas a "hoy" para que la agenda siempre tenga contenido.
export function buildSeed() {
  const t = today()
  const d = (n) => addDays(t, n)
  const at = (n, hm = '10:30') => `${d(n)}T${hm}:00`

  const svc = (o = {}) => ({
    landing: { contratado: false, entregado: false },
    corporativa: { contratado: false, entregado: false },
    bd: { contratado: false, entregado: false, tipos: [] },
    dominio: { contratado: false, entregado: false },
    ...o,
  })
  const A = (...t) => t.map((text, i) => ({ id: `a${Math.random().toString(36).slice(2, 7)}${i}`, text }))

  const leads = [
    {
      id: 'l1', empresa: 'Clínica Dental Sonrisa', sector: 'Clínica dental', contacto: 'Marta Illescas', telefono: '612 345 101', email: 'info@clinicasonrisa.example',
      web: 'clinicasonrisa.example', maps: 'https://maps.google.com/?q=Clinica+Dental+Sonrisa', etapa: 'frio', responsable: 'Socio 1',
      auditoria: A('Web no responsive', 'Citas por teléfono y agenda en papel', 'Sin Google Business verificado'), auditoriaNotas: 'Reseñas muy buenas (4,8★) pero la web es de 2014. Ideal para sistema de citas + recordatorios.',
      proximoSeguimiento: null, servicios: svc(), enlaces: [], creadoEn: d(-6),
    },
    {
      id: 'l2', empresa: 'Taller Mecánico Hermanos Ruiz', sector: 'Taller mecánico', contacto: 'Andrés Ruiz', telefono: '634 220 118', email: '',
      web: '', maps: 'https://maps.google.com/?q=Taller+Hermanos+Ruiz', etapa: 'frio', responsable: 'Socio 2',
      auditoria: A('No tienen web', 'Stock de recambios en Excel', 'Presupuestos a mano'), auditoriaNotas: 'Solo tienen ficha de Google. Llamar por la mañana, por la tarde están con coches.',
      proximoSeguimiento: null, servicios: svc(), enlaces: [], creadoEn: d(-6),
    },
    {
      id: 'l3', empresa: 'Peluquería Estilo & Co', sector: 'Peluquería / Estética', contacto: 'Lucía Ferrer', telefono: '655 019 440', email: 'estiloco@example.com',
      web: 'instagram.com/estiloco', maps: '', etapa: 'frio', responsable: 'Socio 1',
      auditoria: A('No tienen web', 'Reservas por WhatsApp e Instagram', 'Sin base de datos de clientes'), auditoriaNotas: '',
      proximoSeguimiento: null, servicios: svc(), enlaces: [], creadoEn: d(-5),
    },
    {
      id: 'l4', empresa: 'Restaurante La Plazuela', sector: 'Restauración', contacto: 'Jorge Benítez', telefono: '911 887 203', email: 'reservas@laplazuela.example',
      web: 'laplazuela.example', maps: 'https://maps.google.com/?q=La+Plazuela', etapa: 'llamada', responsable: 'Socio 2',
      auditoria: A('Web lenta / desactualizada', 'Reservas en libreta', 'Carta en PDF de 12 MB'), auditoriaNotas: '',
      proximoSeguimiento: d(0), servicios: svc(), enlaces: [], creadoEn: d(-9),
    },
    {
      id: 'l5', empresa: 'Gimnasio FitZone', sector: 'Gimnasio', contacto: 'Raquel Soto', telefono: '699 301 552', email: 'raquel@fitzone.example',
      web: 'fitzone.example', maps: '', etapa: 'llamada', responsable: 'Socio 1',
      auditoria: A('Altas y cuotas en Excel', 'Web sin formulario de contacto'), auditoriaNotas: 'Tienen 400 socios y llevan los impagos a mano.',
      proximoSeguimiento: d(-1), servicios: svc(), enlaces: [], creadoEn: d(-10),
    },
    {
      id: 'l6', empresa: 'Ferretería El Tornillo', sector: 'Comercio local', contacto: 'Pepe Ortega', telefono: '626 778 009', email: '',
      web: '', maps: 'https://maps.google.com/?q=Ferreteria+El+Tornillo', etapa: 'contacto', responsable: 'Socio 2',
      auditoria: A('No tienen web', 'Stock en papel', 'Sin base de datos de clientes habituales'), auditoriaNotas: 'Le preocupa el coste. Venderle el mini-stock primero, web después.',
      proximoSeguimiento: d(0), servicios: svc(), enlaces: [], creadoEn: d(-12),
    },
    {
      id: 'l7', empresa: 'Inmobiliaria Costa Sur', sector: 'Inmobiliaria', contacto: 'Verónica Pons', telefono: '672 114 380', email: 'vpons@costasur.example',
      web: 'costasur.example', maps: '', etapa: 'contacto', responsable: 'Socio 1',
      auditoria: A('Web no responsive', 'Cartera de inmuebles en hoja de cálculo'), auditoriaNotas: '',
      proximoSeguimiento: d(2), servicios: svc(), enlaces: [], creadoEn: d(-14),
    },
    {
      id: 'l8', empresa: 'Academia Idiomas Nova', sector: 'Formación', contacto: 'Daniel Cuesta', telefono: '648 902 115', email: 'direccion@academianova.example',
      web: 'academianova.example', maps: '', etapa: 'reunion', responsable: 'Socio 2',
      auditoria: A('Matrículas y horarios en papel', 'Web con WordPress sin mantenimiento'), auditoriaNotas: 'Demo agendada: enseñar panel de alumnos/matrículas con datos ficticios.',
      proximoSeguimiento: d(1), servicios: svc(), enlaces: [], creadoEn: d(-16),
    },
    {
      id: 'l9', empresa: 'Floristería Margarita', sector: 'Comercio local', contacto: 'Inés Margarita', telefono: '605 443 226', email: 'hola@floristeriamargarita.example',
      web: '', maps: 'https://maps.google.com/?q=Floristeria+Margarita', etapa: 'presupuesto', responsable: 'Socio 1',
      auditoria: A('No tienen web', 'Pedidos por WhatsApp sin control'), auditoriaNotas: 'Quiere tienda sencilla + registro de pedidos para eventos.',
      proximoSeguimiento: d(0), servicios: svc({ landing: { contratado: true, entregado: false }, bd: { contratado: true, entregado: false, tipos: ['Pedidos'] }, dominio: { contratado: true, entregado: false } }), enlaces: [], creadoEn: d(-20),
    },
    {
      id: 'l10', empresa: 'Fisioterapia Movimiento', sector: 'Salud', contacto: 'Álvaro Gil', telefono: '633 551 870', email: 'alvaro@fisiomov.example',
      web: 'fisiomov.example', maps: '', etapa: 'presupuesto', responsable: 'Socio 2',
      auditoria: A('Citas por teléfono', 'Historial de pacientes en carpetas'), auditoriaNotas: '',
      proximoSeguimiento: d(-2), servicios: svc({ corporativa: { contratado: true, entregado: false }, bd: { contratado: true, entregado: false, tipos: ['Clientes', 'Citas / reservas'] } }), enlaces: [], creadoEn: d(-22),
    },
    {
      id: 'l11', empresa: 'Veterinaria Patitas', sector: 'Salud', contacto: 'Sonia Marín', telefono: '677 208 914', email: 'clinica@patitas.example',
      web: 'patitas.example', maps: 'https://maps.google.com/?q=Veterinaria+Patitas', etapa: 'activo', responsable: 'Socio 1',
      auditoria: A('Web antigua', 'Fichas de mascotas en papel', 'Vacunas sin recordatorio'), auditoriaNotas: 'Proyecto prioritario. Entrega prevista en 3 semanas.',
      proximoSeguimiento: d(3), servicios: svc({ corporativa: { contratado: true, entregado: true }, bd: { contratado: true, entregado: false, tipos: ['Clientes', 'Citas / reservas'] }, dominio: { contratado: true, entregado: true } }),
      enlaces: [{ id: 'e1', label: 'Staging', value: 'https://patitas-staging.example' }, { id: 'e2', label: 'Panel hosting (usuario)', value: 'patitas_admin' }, { id: 'e3', label: 'Figma', value: 'https://figma.example/patitas' }], creadoEn: d(-40),
    },
    {
      id: 'l12', empresa: 'Autoescuela Rápida', sector: 'Formación', contacto: 'Tomás Vidal', telefono: '652 100 783', email: 'info@autoescuelarapida.example',
      web: 'autoescuelarapida.example', maps: '', etapa: 'activo', responsable: 'Socio 2',
      auditoria: A('Alumnos y clases en libreta', 'Sin web propia'), auditoriaNotas: '',
      proximoSeguimiento: d(5), servicios: svc({ landing: { contratado: true, entregado: true }, bd: { contratado: true, entregado: false, tipos: ['Clientes'] }, dominio: { contratado: true, entregado: true } }),
      enlaces: [{ id: 'e4', label: 'Repositorio', value: 'github.com/norventis/autoescuela-rapida' }], creadoEn: d(-35),
    },
    {
      id: 'l13', empresa: 'Panadería Horno Viejo', sector: 'Comercio local', contacto: 'Carmen Aranda', telefono: '691 337 450', email: 'carmen@hornoviejo.example',
      web: 'hornoviejo.example', maps: '', etapa: 'recurrente', responsable: 'Socio 1',
      auditoria: A('Pedidos de encargo en papel'), auditoriaNotas: 'Plan de mantenimiento mensual (hosting + soporte).',
      proximoSeguimiento: d(14), servicios: svc({ landing: { contratado: true, entregado: true }, bd: { contratado: true, entregado: true, tipos: ['Pedidos'] }, dominio: { contratado: true, entregado: true } }),
      enlaces: [{ id: 'e5', label: 'Web en producción', value: 'https://hornoviejo.example' }], creadoEn: d(-90),
    },
    {
      id: 'l14', empresa: 'Estudio Arquitectura Línea', sector: 'Arquitectura', contacto: 'Pablo Rey', telefono: '644 889 021', email: 'pablo@estudiolinea.example',
      web: 'estudiolinea.example', maps: '', etapa: 'perdido', responsable: 'Socio 2',
      auditoria: A('Portfolio en PDF'), auditoriaNotas: 'Ya tienen agencia fija. Retomar en 6 meses.',
      proximoSeguimiento: null, servicios: svc(), enlaces: [], creadoEn: d(-25),
    },
    {
      id: 'l15', empresa: 'Bar Casa Paco', sector: 'Restauración', contacto: 'Paco Lara', telefono: '687 400 311', email: '',
      web: '', maps: '', etapa: 'frio', responsable: 'Socio 2',
      auditoria: A('No tienen web', 'Sin Google Business'), auditoriaNotas: '',
      proximoSeguimiento: null, servicios: svc(), enlaces: [], creadoEn: d(-2),
    },
  ]

  const act = (id, leadId, n, hm, tipo, resultado, responsable, notas, proximoSeguimiento = null) => ({
    id, leadId, fecha: at(n, hm), tipo, resultado, responsable, notas, proximoSeguimiento,
  })
  const activities = [
    act('c1', 'l4', -3, '11:05', 'llamada', 'no_contesta', 'Socio 2', 'Teléfono fijo, no lo coge nadie en hora de comidas.'),
    act('c2', 'l4', -1, '17:20', 'llamada', 'llamar_luego', 'Socio 2', 'Contesta camarero: el dueño está de 11 a 12 por la mañana. Llamar hoy a las 11.', d(0)),
    act('c3', 'l5', -4, '10:15', 'llamada', 'buzon', 'Socio 1', 'Salta buzón de voz.'),
    act('c4', 'l5', -3, '12:40', 'llamada', 'no_contesta', 'Socio 1', ''),
    act('c5', 'l5', -2, '09:55', 'whatsapp', null, 'Socio 1', 'Enviado WhatsApp de presentación con enlace a ejemplo de gestor de socios.', d(-1)),
    act('c6', 'l6', -5, '10:00', 'llamada', 'interesado', 'Socio 2', 'Pepe quiere controlar el stock sin Excel ni papel. Duda por el precio.', d(-1)),
    act('c7', 'l6', -1, '12:10', 'llamada', 'llamar_luego', 'Socio 2', 'Está con un cliente. Pide que le llamemos hoy.', d(0)),
    act('c8', 'l7', -4, '16:30', 'llamada', 'interesado', 'Socio 1', 'Ve útil un catálogo de inmuebles con filtros. Pide ver ejemplos.', d(2)),
    act('c9', 'l7', -4, '16:45', 'email', null, 'Socio 1', 'Enviado portfolio con 3 casos similares.'),
    act('c10', 'l8', -7, '10:20', 'llamada', 'interesado', 'Socio 2', 'Interesado en gestión de matrículas y pagos.', d(-3)),
    act('c11', 'l8', -3, '11:00', 'llamada', 'interesado', 'Socio 2', 'Agendamos demo online con dirección.', d(1)),
    act('c12', 'l9', -10, '10:05', 'llamada', 'interesado', 'Socio 1', 'Le gusta la idea de tienda + control de pedidos para bodas.'),
    act('c13', 'l9', -6, '17:00', 'reunion', 'interesado', 'Socio 1', 'Visita a la tienda. Define alcance: landing + pedidos + dominio.'),
    act('c14', 'l9', -3, '13:15', 'email', null, 'Socio 1', 'Enviado presupuesto P-2026-014 (1.450 €).', d(0)),
    act('c15', 'l10', -9, '09:40', 'llamada', 'interesado', 'Socio 2', 'Gestionan 30 citas al día por teléfono.'),
    act('c16', 'l10', -5, '12:00', 'reunion', 'interesado', 'Socio 2', 'Demo del sistema de citas. Le gustó el recordatorio por SMS.'),
    act('c17', 'l10', -4, '18:30', 'email', null, 'Socio 2', 'Enviado presupuesto P-2026-013.', d(-2)),
    act('c18', 'l11', -38, '10:00', 'llamada', 'interesado', 'Socio 1', 'Primera toma de contacto.'),
    act('c19', 'l11', -30, '11:30', 'reunion', 'cerrado', 'Socio 1', 'Cerrado proyecto web + base de datos de pacientes (mascotas) con 50% adelantado.'),
    act('c20', 'l11', -2, '15:00', 'llamada', 'interesado', 'Socio 1', 'Revisión de avance: pide añadir recordatorios de vacunas.', d(3)),
    act('c21', 'l12', -33, '10:10', 'llamada', 'cerrado', 'Socio 2', 'Cierra landing + gestor de alumnos.'),
    act('c22', 'l13', -85, '10:10', 'llamada', 'cerrado', 'Socio 1', 'Cierra web + pedidos de encargo.'),
    act('c23', 'l14', -20, '12:00', 'llamada', 'no_interesa', 'Socio 2', 'Ya tienen agencia fija.'),
    act('c24', 'l1', -1, '09:30', 'llamada', 'no_contesta', 'Socio 1', 'Recepción cerrada hasta las 10.'),
    act('c25', 'l2', 0, '09:45', 'llamada', 'no_contesta', 'Socio 2', ''),
    act('c26', 'l4', 0, '09:20', 'llamada', 'no_contesta', 'Socio 2', 'Intento temprano, sin respuesta.', d(0)),
  ]

  const docs = [
    { id: 'd1', leadId: 'l9', tipo: 'presupuesto', numero: 'P-2026-014', concepto: 'Landing + registro de pedidos + dominio', total: 1450, pagado: 0, emision: d(-3), vencimiento: d(12), estado: 'Enviado', archivo: { name: 'Presupuesto_Floristeria_Margarita.pdf', size: 184320, dataUrl: null } },
    { id: 'd2', leadId: 'l10', tipo: 'presupuesto', numero: 'P-2026-013', concepto: 'Web corporativa + sistema de citas de pacientes', total: 2900, pagado: 0, emision: d(-4), vencimiento: d(10), estado: 'Enviado', archivo: { name: 'Presupuesto_Fisio_Movimiento.pdf', size: 221184, dataUrl: null } },
    { id: 'd3', leadId: 'l11', tipo: 'presupuesto', numero: 'P-2026-009', concepto: 'Web corporativa + base de datos de mascotas y vacunas', total: 3200, pagado: 0, emision: d(-31), vencimiento: d(-16), estado: 'Aceptado', archivo: { name: 'Presupuesto_Veterinaria_Patitas.pdf', size: 205312, dataUrl: null } },
    { id: 'd4', leadId: 'l11', tipo: 'factura', numero: 'F-2026-021', concepto: 'Anticipo 50% — Web + BD Veterinaria Patitas', total: 1600, pagado: 1600, emision: d(-29), vencimiento: d(-14), estado: 'Pagada', archivo: { name: 'Factura_F-2026-021.pdf', size: 98304, dataUrl: null } },
    { id: 'd5', leadId: 'l11', tipo: 'factura', numero: 'F-2026-030', concepto: 'Segundo pago 50% — entrega final', total: 1600, pagado: 0, emision: d(-1), vencimiento: d(14), estado: 'Borrador', archivo: null },
    { id: 'd6', leadId: 'l12', tipo: 'factura', numero: 'F-2026-024', concepto: 'Anticipo 50% — Landing + gestor de alumnos', total: 950, pagado: 950, emision: d(-30), vencimiento: d(-15), estado: 'Pagada', archivo: { name: 'Factura_F-2026-024.pdf', size: 87040, dataUrl: null } },
    { id: 'd7', leadId: 'l12', tipo: 'factura', numero: 'F-2026-028', concepto: 'Hito 2 — Landing publicada', total: 475, pagado: 0, emision: d(-12), vencimiento: d(-2), estado: 'Enviada', archivo: { name: 'Factura_F-2026-028.pdf', size: 90112, dataUrl: null } },
    { id: 'd8', leadId: 'l13', tipo: 'factura', numero: 'F-2026-005', concepto: 'Proyecto completo — Web + pedidos de encargo', total: 1800, pagado: 1800, emision: d(-85), vencimiento: d(-70), estado: 'Pagada', archivo: { name: 'Factura_F-2026-005.pdf', size: 101376, dataUrl: null } },
    { id: 'd9', leadId: 'l13', tipo: 'factura', numero: 'F-2026-031', concepto: 'Mantenimiento mensual (hosting + soporte)', total: 60, pagado: 0, emision: d(-3), vencimiento: d(12), estado: 'Enviada', archivo: { name: 'Factura_F-2026-031.pdf', size: 60416, dataUrl: null } },
  ]

  return { leads, activities, docs }
}
