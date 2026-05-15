'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FormData {
  nombre: string;
  email: string;
  negocio: string;
  servicio: string;
  mensaje: string;
}

const serviciosOptions = [
  { value: '', label: 'Selecciona un servicio' },
  { value: 'web', label: 'Página Web' },
  { value: 'ecommerce', label: 'Tienda Online / Catálogo Digital' },
  { value: 'android', label: 'App Android' },
  { value: 'sistema', label: 'Sistema a Medida (inventario, pedidos, etc.)' },
  { value: 'otro', label: 'Otro / No estoy seguro' },
];

const razones = [
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Respuesta en 24 horas',
    description: 'Respondemos todas las consultas en menos de un día. Normalmente mucho antes.',
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Cotización sin costo',
    description: 'Te damos el precio exacto sin compromiso. Conoce cuánto cuesta antes de decidir.',
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    title: 'Asesoría gratuita',
    description: 'Si no sabes qué necesitas, te orientamos. Sin cobrarte por la consulta.',
  },
];

export default function ContactoPage() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    negocio: '',
    servicio: '',
    mensaje: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!formData.nombre || !formData.email || !formData.mensaje) {
      setError('Por favor, completa tu nombre, email y mensaje.');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();
      setIsSubmitted(true);
    } catch {
      setError('Hubo un error al enviar. Escríbenos directamente por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative bg-chicha py-16 md:py-24">
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-display font-bold mb-6 border border-primary-500/30">
              ✦ Contáctanos
            </span>
            <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-6">
              Cuéntanos qué necesita{' '}
              <span className="chicha-text">tu negocio</span>
            </h1>
            <p className="text-lg text-gray-300">
              Escríbenos por WhatsApp o llena el formulario.
              Te respondemos con una cotización en menos de 24 horas. Sin compromiso.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WHATSAPP CTA (destacado) ===== */}
      <section className="py-8 bg-green-500">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="text-gray-900">
              <p className="font-display font-black text-lg">¿Prefieres WhatsApp?</p>
              <p className="text-sm font-medium opacity-80">La forma más rápida de contactarnos</p>
            </div>
            <a
              href="https://wa.me/51900000000?text=Hola%2C%20quiero%20una%20cotizaci%C3%B3n%20para%20mi%20negocio"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-display font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg whitespace-nowrap"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              +51 900 000 000
            </a>
          </div>
        </div>
      </section>

      {/* ===== FORMULARIO Y CONTACTO ===== */}
      <section className="section bg-white" aria-labelledby="contacto-form">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Formulario */}
            <div className="lg:col-span-3">
              <h2 id="contacto-form" className="font-display font-black text-2xl text-gray-900 mb-2">
                Formulario de contacto
              </h2>
              <p className="text-gray-600 mb-8">O si prefieres, escríbenos directo al WhatsApp de arriba.</p>

              {isSubmitted ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display font-black text-2xl text-gray-900 mb-2">
                    ¡Recibimos tu mensaje!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Gracias {formData.nombre}, te respondemos en menos de 24 horas con tu cotización.
                  </p>
                  <Link href="/" className="btn-primary">
                    Volver al inicio
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-display font-bold text-gray-700 mb-2">
                        Tu nombre <span className="text-accent-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-display font-bold text-gray-700 mb-2">
                        Email <span className="text-accent-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors"
                        placeholder="tu@correo.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="negocio" className="block text-sm font-display font-bold text-gray-700 mb-2">
                        Nombre de tu negocio
                      </label>
                      <input
                        type="text"
                        id="negocio"
                        name="negocio"
                        value={formData.negocio}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors"
                        placeholder="Ferretería El Martillo (opcional)"
                      />
                    </div>
                    <div>
                      <label htmlFor="servicio" className="block text-sm font-display font-bold text-gray-700 mb-2">
                        ¿Qué necesitas?
                      </label>
                      <select
                        id="servicio"
                        name="servicio"
                        value={formData.servicio}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors bg-white"
                      >
                        {serviciosOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-display font-bold text-gray-700 mb-2">
                      Cuéntanos sobre tu negocio <span className="text-accent-500">*</span>
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-colors resize-none"
                      placeholder="¿Qué tipo de negocio tienes? ¿Cuántos productos tienes? ¿Tienes clientes mayoristas? Cuéntanos todo lo que necesitamos saber..."
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar mensaje
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-sm text-gray-500">
                    Usamos tus datos solo para responderte. Nunca los compartimos con terceros.
                  </p>
                </form>
              )}
            </div>

            {/* Info lateral */}
            <div className="lg:col-span-2">
              {/* Contacto directo */}
              <div className="bg-chicha rounded-2xl p-8 text-white mb-6 border border-white/10">
                <h3 className="font-display font-bold text-xl mb-6 text-primary-400">Contacto directo</h3>
                <div className="space-y-4">
                  <a
                    href="https://wa.me/51900000000"
                    className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors"
                  >
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>+51 900 000 000 (WhatsApp)</span>
                  </a>
                  <a
                    href="mailto:hola@appscomocancha.com"
                    className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>hola@appscomocancha.com</span>
                  </a>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Lun - Sáb: 9:00 - 19:00 (Lima)</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <span className="text-lg">🇵🇪</span>
                    <span>Lima, Perú</span>
                  </div>
                </div>
              </div>

              {/* Razones */}
              <div className="space-y-4">
                {razones.map((razon, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                      <div className="w-5 h-5">{razon.icon}</div>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-gray-900">{razon.title}</h4>
                      <p className="text-gray-600 text-sm">{razon.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section bg-gray-50" aria-labelledby="faq-heading">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 id="faq-heading" className="font-display font-black text-2xl md:text-3xl text-gray-900 text-center mb-12">
              Preguntas frecuentes
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: '¿Cuánto cuesta una página web?',
                  a: 'Los precios varían según lo que necesites. Una web básica puede empezar desde S/. 500. Te damos el precio exacto después de conocer tu negocio, sin costo ni compromiso.',
                },
                {
                  q: '¿Puedo pagar con Yape o transferencia?',
                  a: 'Sí, aceptamos Yape, Plin, transferencia bancaria y otras formas de pago comunes en Perú. También podemos hablar de facilidades de pago según el proyecto.',
                },
                {
                  q: '¿Trabajan con negocios fuera de Lima?',
                  a: 'Sí, trabajamos 100% de forma remota. Si estás en Arequipa, Trujillo, Cusco o cualquier otro lugar del Perú, te atendemos igual por WhatsApp o videollamada.',
                },
                {
                  q: '¿Cuánto tiempo tarda en estar lista mi web?',
                  a: 'Una web básica puede estar lista en 1-2 semanas. Una tienda online completa puede tomar 3-4 semanas. Un sistema a medida depende de la complejidad, te damos el plazo exacto en la cotización.',
                },
                {
                  q: '¿Qué pasa si necesito cambios después de la entrega?',
                  a: 'Incluimos un período de soporte y ajustes después de la entrega. Para cambios mayores o nuevas funciones, los cotizamos por separado a precio justo.',
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="bg-white rounded-xl border-2 border-gray-100 hover:border-primary-200 transition-colors group"
                >
                  <summary className="px-6 py-4 cursor-pointer font-display font-bold text-gray-900 flex items-center justify-between hover:text-primary-600 transition-colors">
                    {faq.q}
                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
