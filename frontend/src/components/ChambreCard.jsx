import { useNavigate } from 'react-router-dom'

const unsplashImages = {
  'mer': 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=220&fit=crop',
  'montagne': 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=400&h=220&fit=crop',
  'ville': 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=220&fit=crop',
  'lac': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=220&fit=crop',
  'fleuve': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=220&fit=crop',
  'parc': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=220&fit=crop',
  'panoramique': 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&h=220&fit=crop',
  'default': 'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=400&h=220&fit=crop',
}

function getImage(vue) {
  return unsplashImages[vue] || unsplashImages['default']
}

function renderEtoiles(n) {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < n ? 'var(--or)' : '#ddd', fontSize: '13px' }}>★</span>
  ))
}

function renderCommodites(chambre) {
  const items = []
  if (chambre.wifi) items.push('WiFi')
  if (chambre.tv) items.push('TV')
  if (chambre.climatisation) items.push('Clim')
  if (chambre.frigo) items.push('Frigo')
  if (chambre.lit_extensible) items.push('Lit +')
  return items
}

export default function ChambreCard({ chambre, onReserver, onLouer }) {
  const navigate = useNavigate()

  return (
    <div style={{
      background: 'var(--blanc)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      border: '0.5px solid #e0e8f0',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(24,95,165,0.15)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ position: 'relative' }} onClick={() => navigate(`/chambre/${chambre.id}`)}>
        <img
          src={getImage(chambre.vue)}
          alt={chambre.hotel_nom}
          style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
          onError={e => { e.target.src = unsplashImages['default'] }}
        />
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          background: 'var(--bleu-fonce)', color: 'var(--blanc)',
          padding: '4px 10px', borderRadius: '20px',
          fontSize: '13px', fontWeight: '600'
        }}>
          {chambre.prix}$/nuit
        </div>
        {chambre.vue && (
          <div style={{
            position: 'absolute', bottom: '12px', left: '12px',
            background: 'rgba(12,68,124,0.85)', color: 'var(--bleu-tres-pale)',
            padding: '3px 10px', borderRadius: '20px', fontSize: '12px'
          }}>
            Vue {chambre.vue}
          </div>
        )}
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ marginBottom: '4px' }}>
          {renderEtoiles(chambre.categorie)}
        </div>
        <h3 style={{
          fontSize: '16px', fontWeight: '600',
          color: 'var(--bleu-fonce)', marginBottom: '2px'
        }}>
          {chambre.hotel_nom}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--texte-secondaire)', marginBottom: '8px' }}>
          {chambre.chaine_nom} · Chambre {chambre.numero}
        </p>
        <p style={{ fontSize: '13px', color: 'var(--texte-secondaire)', marginBottom: '10px' }}>
          📍 {chambre.adresse?.split(',').slice(1).join(',').trim()}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
          <span style={{
            background: 'var(--bleu-tres-pale)', color: 'var(--bleu-fonce)',
            fontSize: '11px', padding: '3px 9px', borderRadius: '20px', fontWeight: '500'
          }}>
            {chambre.capacite} pers.
          </span>
          {chambre.superficie && (
            <span style={{
              background: 'var(--bleu-tres-pale)', color: 'var(--bleu-fonce)',
              fontSize: '11px', padding: '3px 9px', borderRadius: '20px', fontWeight: '500'
            }}>
              {chambre.superficie} m²
            </span>
          )}
          {renderCommodites(chambre).map(c => (
            <span key={c} style={{
              background: '#f0f7e6', color: '#3B6D11',
              fontSize: '11px', padding: '3px 9px', borderRadius: '20px', fontWeight: '500'
            }}>
              {c}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onReserver(chambre)}
            style={{
              flex: 1, padding: '10px',
              background: 'var(--bleu-moyen)', color: 'var(--blanc)',
              border: 'none', borderRadius: 'var(--radius-sm)',
              fontSize: '13px', fontWeight: '500',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={e => e.target.style.background = 'var(--bleu-fonce)'}
            onMouseLeave={e => e.target.style.background = 'var(--bleu-moyen)'}
          >
            Réserver
          </button>
          <button
            onClick={() => onLouer(chambre)}
            style={{
              flex: 1, padding: '10px',
              background: 'var(--blanc)', color: 'var(--or-fonce)',
              border: '1.5px solid var(--or)', borderRadius: 'var(--radius-sm)',
              fontSize: '13px', fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.target.style.background = 'var(--or)'
              e.target.style.color = 'var(--blanc)'
            }}
            onMouseLeave={e => {
              e.target.style.background = 'var(--blanc)'
              e.target.style.color = 'var(--or-fonce)'
            }}
          >
            Louer
          </button>
        </div>
      </div>
    </div>
  )
}