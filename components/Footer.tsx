export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#080808', borderTop: '1px solid #111' }}>
      <div className="container-custom py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-600">
          <p>
            &copy; {year}{' '}
            <span style={{ color: 'var(--c-yellow)' }} className="font-bold">
              Apps Como Cancha
            </span>
            . Lima, Perú.
          </p>
          <span style={{ color: 'var(--c-yellow)', fontSize: '0.75rem', letterSpacing: '0.3rem' }}>
            ★ ✦ ★
          </span>
        </div>
      </div>
    </footer>
  );
}
