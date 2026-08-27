import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { nombre, email, negocio, servicio, mensaje } = await req.json();

  if (!nombre || !email || !mensaje) {
    return NextResponse.json({ error: 'Faltan campos obligatorios.' }, { status: 400 });
  }

  // 465 = SMTPS (TLS directo). 587 y 25 = STARTTLS, que exige secure:false.
  const smtpPort = Number(process.env.SMTP_PORT) || 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const servicioLabel: Record<string, string> = {
    web: 'Página Web',
    ecommerce: 'Tienda Online / Catálogo Digital',
    android: 'App Android',
    sistema: 'Sistema a Medida',
    otro: 'Otro / No estoy seguro',
  };

  // CONTACT_TO admite varios destinatarios separados por coma; si no existe,
  // el correo va al propio buzon que autentica.
  const destinatarios = (process.env.CONTACT_TO || process.env.SMTP_USER || '')
    .split(',')
    .map((d) => d.trim())
    .filter(Boolean);

  try {
    await transporter.sendMail({
      from: `"Apps Como Cancha" <${process.env.SMTP_USER}>`,
      to: destinatarios,
      replyTo: email,
      subject: `Nuevo contacto: ${nombre}${negocio ? ` — ${negocio}` : ''}`,
      text: [
        `Nombre: ${nombre}`,
        `Email: ${email}`,
        negocio ? `Negocio: ${negocio}` : '',
        servicio ? `Servicio: ${servicioLabel[servicio] ?? servicio}` : '',
        `\nMensaje:\n${mensaje}`,
      ]
        .filter(Boolean)
        .join('\n'),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('SMTP error:', message);
    return NextResponse.json({ error: 'No se pudo enviar el mensaje.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
