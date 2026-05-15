import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { nombre, email, negocio, servicio, mensaje } = await req.json();

  if (!nombre || !email || !mensaje) {
    return NextResponse.json({ error: 'Faltan campos obligatorios.' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
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

  await transporter.sendMail({
    from: `"Apps Como Cancha" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
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

  return NextResponse.json({ ok: true });
}
