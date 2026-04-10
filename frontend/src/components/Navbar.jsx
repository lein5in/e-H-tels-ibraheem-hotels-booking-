import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  const links = [
    { path: '/', label: 'Recherche' },
    { path: '/reservations', label: 'Réservations' },
    { path: '/gestion', label: 'Gestion' },
  ]

  return (
    <nav style={{
      background: 'var(--bleu-fonce)',
      padding: '0 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.15)'
    }}>
      <Link to="/" style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        textDecoration: 'none'
      }}>
        {/* Logo mark */}
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: 'var(--or)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px', fontWeight: '700', color: 'var(--blanc)',
          flexShrink: 0
        }}>
          S
        </div>
        <span style={{
          fontSize: '18px', fontWeight: '600',
          color: 'var(--blanc)', letterSpacing: '0.5px'
        }}>
          Séjourly
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '8px' }}>
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '14px',
              fontWeight: '500',
              color: location.pathname === link.path ? 'var(--bleu-fonce)' : 'var(--bleu-pale)',
              background: location.pathname === link.path ? 'var(--bleu-pale)' : 'transparent',
              transition: 'all 0.2s ease',
              textDecoration: 'none'
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}