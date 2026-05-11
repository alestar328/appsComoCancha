import Link from 'next/link';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  href: string;
  id?: string;
  accent?: 'gold' | 'fuchsia' | 'green' | 'cyan' | 'red' | 'magenta';
}

const accents = {
  gold: {
    color: '#FFE600',
    shadow: 'rgba(255,230,0,0.2)',
    offsetShadow: '#FF006E',
    iconBg: 'linear-gradient(135deg, #FFE600, #FF6600)',
    borderTop: '4px solid #FFE600',
    checkColor: '#FFE600',
  },
  fuchsia: {
    color: '#FF006E',
    shadow: 'rgba(255,0,110,0.2)',
    offsetShadow: '#FFE600',
    iconBg: 'linear-gradient(135deg, #FF006E, #CC00FF)',
    borderTop: '4px solid #FF006E',
    checkColor: '#FF006E',
  },
  green: {
    color: '#39FF14',
    shadow: 'rgba(57,255,20,0.2)',
    offsetShadow: '#00FFFF',
    iconBg: 'linear-gradient(135deg, #39FF14, #00CC44)',
    borderTop: '4px solid #39FF14',
    checkColor: '#39FF14',
  },
  cyan: {
    color: '#00FFFF',
    shadow: 'rgba(0,255,255,0.2)',
    offsetShadow: '#CC00FF',
    iconBg: 'linear-gradient(135deg, #00FFFF, #0066FF)',
    borderTop: '4px solid #00FFFF',
    checkColor: '#00FFFF',
  },
  red: {
    color: '#FF2200',
    shadow: 'rgba(255,34,0,0.2)',
    offsetShadow: '#FFE600',
    iconBg: 'linear-gradient(135deg, #FF2200, #FF6600)',
    borderTop: '4px solid #FF2200',
    checkColor: '#FF2200',
  },
  magenta: {
    color: '#FF00AA',
    shadow: 'rgba(255,0,170,0.2)',
    offsetShadow: '#FFE600',
    iconBg: 'linear-gradient(135deg, #FF00AA, #FF006E)',
    borderTop: '4px solid #FF00AA',
    checkColor: '#FF00AA',
  },
};

export default function ServiceCard({
  icon,
  title,
  description,
  features,
  href,
  id,
  accent = 'gold',
}: ServiceCardProps) {
  const s = accents[accent];

  return (
    <article
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className={`rounded-2xl p-6 flex flex-col h-full group sc-${accent}`}
      style={{
        background: '#0d0d0d',
        border: `1px solid #1f1f1f`,
        borderTopWidth: '4px',
        borderTopColor: s.color,
        borderTopStyle: 'solid',
      }}
    >
      {/* Icono */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
        style={{ background: s.iconBg }}
      >
        <div className="w-7 h-7 text-black">{icon}</div>
      </div>

      {/* Título */}
      <h3
        id={id ? `${id}-title` : undefined}
        className="font-display font-black text-xl mb-3 text-white"
      >
        {title}
      </h3>

      {/* Descripción */}
      <p className="text-gray-400 mb-5 leading-relaxed text-sm">{description}</p>

      {/* Features */}
      <ul className="space-y-2 mb-7 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-2.5">
            <span
              className="font-black text-base leading-none mt-0.5 flex-shrink-0"
              style={{ color: s.checkColor }}
            >
              ✦
            </span>
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={href}
        className="inline-flex items-center font-display font-black text-sm group-hover:gap-2 transition-all"
        style={{ color: s.color }}
      >
        Ver más
        <svg
          className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </article>
  );
}
