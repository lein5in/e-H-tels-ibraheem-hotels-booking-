import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import FiltresSidebar from '../components/FiltresSidebar'
import ChambreCard from '../components/ChambreCard'
import ReservationModal from '../components/ReservationModal'
import LocationModal from '../components/LocationModal'

const FILTRES_DEFAUT = {
  date_debut: '', date_fin: '',
  capacite: '', prix_max: '',
  chaine_id: '', categorie: '',
  vue: '', wifi: false, tv: false, climatisation: false
}

export default function Recherche() {
  const [filtres, setFiltres] = useState(FILTRES_DEFAUT)
  const [chambres, setChambres] = useState([])
  const [vedettes, setVedettes] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingVedettes, setLoadingVedettes] = useState(true)
  const [erreur, setErreur] = useState('')
  const [chambreSelectionnee, setChambreSelectionnee] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [toast, setToast] = useState('')
  const [rechercheEffectuee, setRechercheEffectuee] = useState(false)

  
  useEffect(() => {
    axios.get('http://localhost:3000/api/chambres/disponibles')
      .then(res => {
        
        const toutes = res.data
        const selection = []
        const pas = Math.max(1, Math.floor(toutes.length / 4))
        for (let i = 0; i < toutes.length && selection.length < 4; i += pas) {
          selection.push(toutes[i])
        }
        setVedettes(selection)
      })
      .catch(() => setVedettes([]))
      .finally(() => setLoadingVedettes(false))
  }, [])

  const afficherToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3500)
  }

  const fetchChambres = useCallback(async () => {
    setLoading(true)
    setErreur('')
    setRechercheEffectuee(true)
    try {
      const params = {}
      if (filtres.date_debut) params.date_debut = filtres.date_debut
      if (filtres.date_fin) params.date_fin = filtres.date_fin
      if (filtres.capacite) params.capacite = filtres.capacite
      if (filtres.prix_max) params.prix_max = filtres.prix_max
      if (filtres.chaine_id) params.chaine_id = filtres.chaine_id
      if (filtres.categorie) params.categorie = filtres.categorie
      if (filtres.vue) params.vue = filtres.vue
      if (filtres.wifi) params.wifi = 'true'
      if (filtres.tv) params.tv = 'true'
      if (filtres.climatisation) params.climatisation = 'true'

      const res = await axios.get('http://localhost:3000/api/chambres/disponibles', { params })
      setChambres(res.data)
    } catch {
      setErreur('Impossible de charger les chambres. Vérifiez que le serveur est démarré.')
      setChambres([])
    }
    setLoading(false)
  }, [filtres])

  function ouvrirReservation(chambre) { setChambreSelectionnee(chambre); setModalType('reservation') }
  function ouvrirLocation(chambre) { setChambreSelectionnee(chambre); setModalType('location') }
  function fermerModal() { setChambreSelectionnee(null); setModalType(null) }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gris-clair)' }}>

      {}
      <div style={{
        background: 'linear-gradient(135deg, var(--bleu-fonce) 0%, var(--bleu-moyen) 100%)',
        padding: '64px 32px 56px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '260px', height: '260px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(239,159,39,0.10)', pointerEvents: 'none' }} />

        <p style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '3px', color: 'var(--or)', textTransform: 'uppercase', marginBottom: '14px' }}>
          Séjourly
        </p>
        <h1 style={{ fontSize: '38px', fontWeight: '700', color: 'var(--blanc)', marginBottom: '14px', lineHeight: '1.2' }}>
          Trouvez votre chambre idéale
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.68)', maxWidth: '460px', margin: '0 auto 36px' }}>
          5 chaînes, 40 hôtels partout au Canada. Entrez vos dates pour commencer.
        </p>

        {}
        <div style={{
          display: 'inline-flex', gap: '10px', alignItems: 'flex-end',
          background: 'rgba(255,255,255,0.10)', borderRadius: 'var(--radius)',
          padding: '14px 16px', flexWrap: 'wrap', justifyContent: 'center'
        }}>
          {[
            { label: 'Arrivée', type: 'date', key: 'date_debut' },
            { label: 'Départ', type: 'date', key: 'date_fin' },
          ].map(f => (
            <div key={f.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: '600', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '5px', paddingLeft: '4px' }}>{f.label}</span>
              <input type={f.type} value={filtres[f.key]}
                onChange={e => setFiltres({ ...filtres, [f.key]: e.target.value })}
                style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: 'none', fontSize: '14px', outline: 'none', background: 'var(--blanc)', color: 'var(--texte)', minWidth: '155px' }}
              />
            </div>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: '600', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '5px', paddingLeft: '4px' }}>Personnes</span>
            <select value={filtres.capacite} onChange={e => setFiltres({ ...filtres, capacite: e.target.value })}
              style={{ padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: 'none', fontSize: '14px', outline: 'none', background: 'var(--blanc)', color: 'var(--texte)', minWidth: '130px' }}>
              <option value="">Toutes</option>
              {[1,2,3,4].map(n => <option key={n} value={n}>{n} personne{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
          <button onClick={fetchChambres} style={{
            padding: '10px 28px', background: 'var(--or)', color: 'var(--blanc)',
            border: 'none', borderRadius: 'var(--radius-sm)', fontSize: '14px',
            fontWeight: '600', transition: 'background 0.2s ease', cursor: 'pointer',
            alignSelf: 'flex-end'
          }}
            onMouseEnter={e => e.target.style.background = 'var(--or-fonce)'}
            onMouseLeave={e => e.target.style.background = 'var(--or)'}
          >
            Rechercher
          </button>
        </div>
      </div>

      {}
      <div style={{
        maxWidth: '1300px', margin: '0 auto', padding: '32px 24px',
        display: 'grid', gridTemplateColumns: '280px 1fr',
        gap: '28px', alignItems: 'start'
      }}>

        {}
        <aside>
          <FiltresSidebar filtres={filtres} onChange={setFiltres} />
          <button onClick={fetchChambres} style={{
            marginTop: '12px', width: '100%', padding: '12px',
            background: 'var(--bleu-moyen)', color: 'var(--blanc)',
            border: 'none', borderRadius: 'var(--radius-sm)',
            fontSize: '14px', fontWeight: '600', cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
            onMouseEnter={e => e.target.style.background = 'var(--bleu-fonce)'}
            onMouseLeave={e => e.target.style.background = 'var(--bleu-moyen)'}
          >
            Appliquer les filtres
          </button>
        </aside>

        {}
        <main>

          {}
          {!rechercheEffectuee && !loading && (
            <>
              {}
              <div style={{
                background: 'linear-gradient(135deg, var(--bleu-tres-pale), #fff)',
                border: '0.5px solid #cce0f5',
                borderRadius: 'var(--radius)', padding: '20px 24px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: '24px', flexWrap: 'wrap', gap: '12px'
              }}>
                <div>
                  <p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--bleu-fonce)', marginBottom: '2px' }}>
                    Où souhaitez-vous séjourner ?
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--texte-secondaire)' }}>
                    Entrez vos dates ci-dessus pour voir les disponibilités exactes.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                  {[{ icon: '🏨', label: '40 hôtels' }, { icon: '🛏️', label: '200 chambres' }, { icon: '🌟', label: '5 chaînes' }].map(s => (
                    <div key={s.label} style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '20px', marginBottom: '2px' }}>{s.icon}</p>
                      <p style={{ fontSize: '12px', color: 'var(--texte-secondaire)', fontWeight: '500' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {}
              {!loadingVedettes && vedettes.length > 0 && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--or-fonce)', background: '#FFF8EC', padding: '3px 12px', borderRadius: '20px', border: '0.5px solid var(--or)' }}>
                      ✦ Sélection du moment
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--texte-secondaire)' }}>
                      Lancez une recherche pour voir toutes les disponibilités
                    </span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {vedettes.map(chambre => (
                      <ChambreCard key={chambre.id} chambre={chambre}
                        onReserver={ouvrirReservation} onLouer={ouvrirLocation} />
                    ))}
                  </div>
                </>
              )}

              {loadingVedettes && (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '3px solid var(--bleu-tres-pale)', borderTop: '3px solid var(--bleu-moyen)', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
              )}
            </>
          )}

          {}
          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 20px', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid var(--bleu-tres-pale)', borderTop: '3px solid var(--bleu-moyen)', animation: 'spin 0.8s linear infinite' }} />
              <p style={{ color: 'var(--texte-secondaire)', fontSize: '14px' }}>Recherche en cours...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {}
          {!loading && erreur && (
            <div style={{ background: '#FCEBEB', border: '0.5px solid #F09595', borderRadius: 'var(--radius)', padding: '20px', textAlign: 'center', color: '#A32D2D' }}>
              <p style={{ fontWeight: '600', marginBottom: '4px' }}>Erreur de connexion</p>
              <p style={{ fontSize: '13px' }}>{erreur}</p>
            </div>
          )}

          {}
          {!loading && !erreur && rechercheEffectuee && chambres.length === 0 && (
            <div style={{ background: 'var(--blanc)', borderRadius: 'var(--radius)', border: '0.5px solid #e0e8f0', padding: '60px 20px', textAlign: 'center' }}>
              <p style={{ fontSize: '48px', marginBottom: '16px' }}>🏨</p>
              <p style={{ fontSize: '16px', fontWeight: '600', color: 'var(--bleu-fonce)', marginBottom: '8px' }}>Aucune chambre trouvée</p>
              <p style={{ fontSize: '14px', color: 'var(--texte-secondaire)', marginBottom: '20px' }}>Essayez de modifier vos filtres ou de changer les dates.</p>
              <button onClick={() => { setFiltres(FILTRES_DEFAUT); setRechercheEffectuee(false) }}
                style={{ padding: '10px 24px', background: 'var(--bleu-tres-pale)', color: 'var(--bleu-fonce)', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {}
          {!loading && !erreur && rechercheEffectuee && chambres.length > 0 && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <p style={{ fontSize: '14px', color: 'var(--texte-secondaire)' }}>
                  <span style={{ fontWeight: '600', color: 'var(--bleu-fonce)' }}>{chambres.length}</span>{' '}
                  chambre{chambres.length !== 1 ? 's' : ''} disponible{chambres.length !== 1 ? 's' : ''}
                </p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {filtres.date_debut && filtres.date_fin && (
                    <span style={{ fontSize: '13px', color: 'var(--texte-secondaire)', background: 'var(--bleu-tres-pale)', padding: '4px 12px', borderRadius: '20px' }}>
                      {filtres.date_debut} → {filtres.date_fin}
                    </span>
                  )}
                  <button onClick={() => { setFiltres(FILTRES_DEFAUT); setRechercheEffectuee(false) }}
                    style={{ fontSize: '12px', color: 'var(--texte-secondaire)', background: 'transparent', border: '0.5px solid #cdd8e8', borderRadius: '20px', padding: '4px 12px', cursor: 'pointer' }}>
                    Effacer
                  </button>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {chambres.map(chambre => (
                  <ChambreCard key={chambre.id} chambre={chambre}
                    onReserver={ouvrirReservation} onLouer={ouvrirLocation} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      {}
      {modalType === 'reservation' && chambreSelectionnee && (
        <ReservationModal chambre={chambreSelectionnee} onClose={fermerModal}
          onSuccess={(msg) => { fermerModal(); afficherToast(msg) }} />
      )}
      {modalType === 'location' && chambreSelectionnee && (
        <LocationModal chambre={chambreSelectionnee} onClose={fermerModal}
          onSuccess={(msg) => { fermerModal(); afficherToast(msg) }} />
      )}

      {}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--bleu-fonce)', color: 'var(--blanc)',
          padding: '12px 24px', borderRadius: '30px', fontSize: '14px',
          fontWeight: '500', zIndex: 2000, display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <span style={{ color: 'var(--or)' }}>✓</span> {toast}
        </div>
      )}
    </div>
  )
}