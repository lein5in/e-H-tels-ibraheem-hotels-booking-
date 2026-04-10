import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ReservationModal from '../components/ReservationModal'
import LocationModal from '../components/LocationModal'

const unsplashImages = {
  'mer': 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=450&fit=crop',
  'montagne': 'https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800&h=450&fit=crop',
  'ville': 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=450&fit=crop',
  'lac': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=450&fit=crop',
  'fleuve': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=450&fit=crop',
  'parc': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=450&fit=crop',
  'panoramique': 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&h=450&fit=crop',
  'default': 'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=800&h=450&fit=crop',
}

function renderEtoiles(n) {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < n ? 'var(--or)' : '#ddd', fontSize: '18px' }}>★</span>
  ))
}

export default function DetailChambre() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [chambre, setChambre] = useState(null)
  const [loading, setLoading] = useState(true)
  const [erreur, setErreur] = useState('')
  const [modalType, setModalType] = useState(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:3000/api/chambres/${id}`)
      .then(res => { setChambre(res.data); setLoading(false) })
      .catch(() => { setErreur('Chambre introuvable.'); setLoading(false) })
  }, [id])

  const afficherToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3500)
  }

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '50%',
        border: '3px solid var(--bleu-tres-pale)',
        borderTop: '3px solid var(--bleu-moyen)',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  if (erreur) return (
    <div style={{ maxWidth: '600px', margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
      <p style={{ fontSize: '48px', marginBottom: '16px' }}>🏨</p>
      <p style={{ fontSize: '18px', fontWeight: '600', color: 'var(--bleu-fonce)', marginBottom: '8px' }}>{erreur}</p>
      <button onClick={() => navigate('/')} style={{
        marginTop: '16px', padding: '10px 24px',
        background: 'var(--bleu-moyen)', color: 'var(--blanc)',
        border: 'none', borderRadius: 'var(--radius-sm)', fontSize: '14px'
      }}>Retour à la recherche</button>
    </div>
  )

  const commodites = [
    { key: 'wifi', label: 'WiFi gratuit', icon: '📶' },
    { key: 'tv', label: 'Télévision', icon: '📺' },
    { key: 'climatisation', label: 'Climatisation', icon: '❄️' },
    { key: 'frigo', label: 'Réfrigérateur', icon: '🧊' },
    { key: 'lit_extensible', label: 'Lit extensible', icon: '🛏️' },
  ].filter(c => chambre[c.key])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gris-clair)' }}>

      {}
      <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
        <img
          src={unsplashImages[chambre.vue] || unsplashImages['default']}
          alt={chambre.hotel_nom}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(12,68,124,0.7) 0%, transparent 50%)'
        }} />
        <button
          onClick={() => navigate('/')}
          style={{
            position: 'absolute', top: '20px', left: '24px',
            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)',
            color: 'var(--blanc)', border: '0.5px solid rgba(255,255,255,0.3)',
            borderRadius: '30px', padding: '8px 18px', fontSize: '13px',
            cursor: 'pointer'
          }}
        >
          ← Retour
        </button>
        {chambre.vue && (
          <div style={{
            position: 'absolute', bottom: '24px', left: '24px',
            background: 'rgba(12,68,124,0.8)', color: 'var(--bleu-tres-pale)',
            padding: '4px 14px', borderRadius: '20px', fontSize: '13px'
          }}>
            Vue {chambre.vue}
          </div>
        )}
        <div style={{
          position: 'absolute', bottom: '24px', right: '24px',
          background: 'var(--or)', color: 'var(--blanc)',
          padding: '6px 16px', borderRadius: '20px',
          fontSize: '16px', fontWeight: '700'
        }}>
          {chambre.prix}$/nuit
        </div>
      </div>

      {}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 320px',
          gap: '28px', alignItems: 'start'
        }}>

          {}
          <div>
            <div style={{ marginBottom: '6px' }}>{renderEtoiles(chambre.categorie)}</div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--bleu-fonce)', marginBottom: '4px' }}>
              {chambre.hotel_nom}
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--texte-secondaire)', marginBottom: '4px' }}>
              {chambre.chaine_nom} · Chambre {chambre.numero}
            </p>
            <p style={{ fontSize: '14px', color: 'var(--texte-secondaire)', marginBottom: '24px' }}>
              📍 {chambre.adresse}
            </p>

            {}
            <div style={{
              background: 'var(--blanc)', borderRadius: 'var(--radius)',
              border: '0.5px solid #e0e8f0', padding: '20px', marginBottom: '20px'
            }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--bleu-fonce)', marginBottom: '16px' }}>
                Détails de la chambre
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                {[
                  { label: 'Capacité', value: `${chambre.capacite} personne${chambre.capacite > 1 ? 's' : ''}` },
                  { label: 'Superficie', value: chambre.superficie ? `${chambre.superficie} m²` : 'N/A' },
                  { label: 'Catégorie', value: '★'.repeat(chambre.categorie) },
                  { label: 'Vue', value: chambre.vue ? chambre.vue.charAt(0).toUpperCase() + chambre.vue.slice(1) : 'Standard' },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    background: 'var(--bleu-tres-pale)', borderRadius: 'var(--radius-sm)',
                    padding: '12px 16px'
                  }}>
                    <p style={{ fontSize: '11px', color: 'var(--texte-secondaire)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{label}</p>
                    <p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--bleu-fonce)' }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {}
            {commodites.length > 0 && (
              <div style={{
                background: 'var(--blanc)', borderRadius: 'var(--radius)',
                border: '0.5px solid #e0e8f0', padding: '20px'
              }}>
                <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--bleu-fonce)', marginBottom: '14px' }}>
                  Commodités incluses
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {commodites.map(c => (
                    <div key={c.key} style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      background: '#f0f7e6', color: '#3B6D11',
                      padding: '8px 16px', borderRadius: '30px', fontSize: '13px', fontWeight: '500'
                    }}>
                      <span style={{ fontSize: '16px' }}>{c.icon}</span> {c.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {}
          <div style={{
            background: 'var(--blanc)', borderRadius: 'var(--radius)',
            border: '0.5px solid #e0e8f0', padding: '24px',
            position: 'sticky', top: '80px'
          }}>
            <p style={{ fontSize: '26px', fontWeight: '700', color: 'var(--bleu-fonce)', marginBottom: '2px' }}>
              {chambre.prix}$
              <span style={{ fontSize: '14px', fontWeight: '400', color: 'var(--texte-secondaire)' }}> /nuit</span>
            </p>
            <div style={{ marginBottom: '20px' }}>{renderEtoiles(chambre.categorie)}</div>

            <div style={{
              background: 'var(--bleu-tres-pale)', borderRadius: 'var(--radius-sm)',
              padding: '12px', marginBottom: '20px', fontSize: '13px', color: 'var(--texte-secondaire)'
            }}>
              <p>🏨 {chambre.hotel_nom}</p>
              <p style={{ marginTop: '4px' }}>🛏️ Chambre {chambre.numero} · {chambre.capacite} pers.</p>
            </div>

            <button
              onClick={() => setModalType('reservation')}
              style={{
                width: '100%', padding: '13px',
                background: 'var(--bleu-moyen)', color: 'var(--blanc)',
                border: 'none', borderRadius: 'var(--radius-sm)',
                fontSize: '14px', fontWeight: '600', marginBottom: '10px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.target.style.background = 'var(--bleu-fonce)'}
              onMouseLeave={e => e.target.style.background = 'var(--bleu-moyen)'}
            >
              Réserver cette chambre
            </button>
            <button
              onClick={() => setModalType('location')}
              style={{
                width: '100%', padding: '13px',
                background: 'var(--blanc)', color: 'var(--or-fonce)',
                border: '1.5px solid var(--or)', borderRadius: 'var(--radius-sm)',
                fontSize: '14px', fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.target.style.background = 'var(--or)'; e.target.style.color = 'var(--blanc)' }}
              onMouseLeave={e => { e.target.style.background = 'var(--blanc)'; e.target.style.color = 'var(--or-fonce)' }}
            >
              Location directe
            </button>
          </div>
        </div>
      </div>

      {}
      {modalType === 'reservation' && (
        <ReservationModal chambre={chambre} onClose={() => setModalType(null)}
          onSuccess={(msg) => { setModalType(null); afficherToast(msg) }} />
      )}
      {modalType === 'location' && (
        <LocationModal chambre={chambre} onClose={() => setModalType(null)}
          onSuccess={(msg) => { setModalType(null); afficherToast(msg) }} />
      )}

      {}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--bleu-fonce)', color: 'var(--blanc)',
          padding: '12px 24px', borderRadius: '30px', fontSize: '14px', fontWeight: '500',
          zIndex: 2000, display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <span style={{ color: 'var(--or)' }}>✓</span> {toast}
        </div>
      )}
    </div>
  )
}