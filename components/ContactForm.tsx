'use client';

import { useState } from 'react';

const WA_URL = 'https://wa.me/51900000000?text=Hola%2C%20quiero%20una%20cotizaci%C3%B3n';

const serviciosOptions = [
  { value: '', label: 'Selecciona un servicio' },
  { value: 'web', label: 'Página Web' },
  { value: 'ecommerce', label: 'Tienda Online / Catálogo Digital' },
  { value: 'android', label: 'App Android' },
  { value: 'sistema', label: 'Sistema a Medida' },
  { value: 'otro', label: 'Otro / No estoy seguro' },
];

export default function ContactForm() {
  const [form, setForm] = useState({ nombre: '', email: '', servicio: '', mensaje: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('ok');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'ok') {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="font-display font-black text-2xl text-white mb-2">
          ¡Mensaje recibido!
        </h3>
        <p className="text-gray-400">
          Te respondemos en menos de 24 horas con tu cotización.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
      {status === 'error' && (
        <div className="bg-red-900/40 border border-red-500/40 rounded-xl px-4 py-3 text-red-300 text-sm text-center">
          Hubo un error. Escríbenos por{' '}
          <a href={WA_URL} className="underline font-bold" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          .
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-nombre" className="block text-xs font-display font-bold mb-1" style={{ color: 'var(--c-yellow)' }}>
            Tu nombre *
          </label>
          <input
            id="cf-nombre"
            name="nombre"
            type="text"
            required
            value={form.nombre}
            onChange={handleChange}
            placeholder="Pedro García"
            className="w-full px-4 py-3 rounded-xl text-white text-sm font-medium placeholder-gray-600 focus:outline-none focus:ring-2"
            style={{ background: '#111', border: '1.5px solid #2a2a2a', focusRingColor: 'var(--c-yellow)' }}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-xs font-display font-bold mb-1" style={{ color: 'var(--c-yellow)' }}>
            Tu email *
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="pedro@tucorreo.com"
            className="w-full px-4 py-3 rounded-xl text-white text-sm font-medium placeholder-gray-600 focus:outline-none focus:ring-2"
            style={{ background: '#111', border: '1.5px solid #2a2a2a' }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-servicio" className="block text-xs font-display font-bold mb-1" style={{ color: 'var(--c-yellow)' }}>
          ¿Qué necesitas?
        </label>
        <select
          id="cf-servicio"
          name="servicio"
          value={form.servicio}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2"
          style={{ background: '#111', border: '1.5px solid #2a2a2a', color: form.servicio ? '#fff' : '#4b5563' }}
        >
          {serviciosOptions.map((o) => (
            <option key={o.value} value={o.value} style={{ background: '#111', color: '#fff' }}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-mensaje" className="block text-xs font-display font-bold mb-1" style={{ color: 'var(--c-yellow)' }}>
          Cuéntanos sobre tu negocio *
        </label>
        <textarea
          id="cf-mensaje"
          name="mensaje"
          required
          rows={4}
          value={form.mensaje}
          onChange={handleChange}
          placeholder="¿Qué tipo de negocio tienes? ¿Qué necesitas exactamente?..."
          className="w-full px-4 py-3 rounded-xl text-white text-sm font-medium placeholder-gray-600 focus:outline-none focus:ring-2 resize-none"
          style={{ background: '#111', border: '1.5px solid #2a2a2a' }}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-4 font-display font-black text-base rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: 'var(--c-yellow)',
          color: '#080808',
          boxShadow: '3px 3px 0 var(--c-fuchsia)',
        }}
      >
        {status === 'sending' ? 'Enviando...' : 'Enviar mensaje →'}
      </button>

      <p className="text-center text-xs text-gray-600">
        Tus datos solo se usan para responderte. Nunca los compartimos.
      </p>
    </form>
  );
}
