import { useState, useEffect } from 'react'
import axios from 'axios'

const STATUT_STYLE = {
  'active':    { bg: '#EAF3DE',              color: '#3B6D11',          label: 'Active' },
  'convertie': { bg: 'var(--bleu-tres-pale)', color: 'var(--bleu-fonce)', label: 'Convertie' },
  'annulee':   { bg: '#FCEBEB',              color: '#A32D2D',          label: 'Annulée' },
  'expirée':   { bg: '#F1EFE8',              color: '#5F5E5A',          label: 'Expirée' },
}

function Badge({ statut }) {
  const s = STATUT_STYLE[statut] || { bg: '#F1EFE8', color: '#5F5E5A', label: statut }
  return (
    <span style={{
      background: s.bg, color: s.color,
      fontSize: '11px', fontWeight: '600', padding: '3px 10px',
      borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.5px'
    }}>
      {s.label}
    </span>
  )
}

function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('fr-CA', { year: 'numeric', month: 'short', day: 'numeric' })
}

function nuits(d1, d2) {
  const diff = new Date(d2) - new Date(d1)
  return Math.round(diff / (1000 * 60 * 60 * 24))
}

export default function Reservations() {
  const [reservations, setReservations] = useState([])
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingLoc, setLoadingLoc] = useState(true)
  const [erreur, setErreur] = useState('')
  const [toast, setToast] = useState({ msg: '', type: 'success' })
  const [confirmModal, setConfirmModal] = useState(null)
  const [employes, setEmployes] = useState([])
  const [employeId, setEmployeId] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [filtreStatut, setFiltreStatut] = useState('tous')
  const [onglet, setOnglet] = useState('reservations') // 'reservations' | 'locations'

  const fetchReservations = async () => {
    setLoading(true)
    setErreur('')
    try {
      const res = await axios.get('http://localhost:3000/api/reservations')
      setReservations(res.data)
    } catch {
      setErreur('Impossible de charger les réservations.')
    }
    setLoading(false)
  }

  const fetchLocations = async () => {
    setLoadingLoc(true)
    try {
      const res = await axios.get('http://localhost:3000/api/locations')
      setLocations(res.data)
    } catch {
      // silencieux
    }
    setLoadingLoc(false)
  }

  useEffect(() => {
    fetchReservations()
    fetchLocations()
  }, [])

  async function ouvrirConvertir(r) {
    setEmployeId('')
    setConfirmModal({ id: r.id, action: 'convertir', res: r })
    try {
      // On utilise hotel_id depuis la chambre via la réservation
      const res = await axios.get(`http://localhost:3000/api/employes/hotel/${r.hotel_id}`)
      setEmployes(res.data)
    } catch {
      setEmployes([])
    }
  }

  const afficherToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg: '', type: 'success' }), 3500)
  }

  async function confirmerAction() {
    if (!confirmModal) return
    if (confirmModal.action === 'convertir' && !employeId) {
      afficherToast('Veuillez sélectionner un employé.', 'error')
      return
    }
    setActionLoading(true)
    try {
      if (confirmModal.action === 'convertir') {
        await axios.put(`http://localhost:3000/api/reservations/${confirmModal.id}/convertir`, {
          employe_id: parseInt(employeId)
        })
        afficherToast('Réservation convertie en location !')
        fetchLocations()
      } else {
        await axios.put(`http://localhost:3000/api/reservations/${confirmModal.id}/annuler`)
        afficherToast('Réservation annulée.', 'warning')
      }
      await fetchReservations()
    } catch (err) {
      afficherToast(err.response?.data?.error || 'Une erreur est survenue.', 'error')
    }
    setActionLoading(false)
    setConfirmModal(null)
  }

  // Filtre avec 'annulee' sans accent
  const reservationsFiltrees = filtreStatut === 'tous'
    ? reservations
    : reservations.filter(r => r.statut === filtreStatut)

  const compteurs = {
    tous:      reservations.length,
    active:    reservations.filter(r => r.statut === 'active').length,
    convertie: reservations.filter(r => r.statut === 'convertie').length,
    'annulee': reservations.filter(r => r.statut === 'annulee').length,
  }

  const inputStyle = {
    width: '100%', padding: '10px 12px',
    border: '0.5px solid #cdd8e8', borderRadius: 'var(--radius-sm)',
    fontSize: '14px', outline: 'none', marginBottom: '14px', fontFamily: 'inherit'
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gris-clair)' }}>

      {/* Header */}
      <div style={{ background: 'var(--blanc)', borderBottom: '0.5px solid #e0e8f0', padding: '28px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--bleu-fonce)', marginBottom: '4px' }}>
            Réservations & Locations
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--texte-secondaire)' }}>
            Gérez et suivez toutes les réservations et locations
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 24px' }}>

        {/* Onglets Réservations / Locations */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '24px', borderBottom: '0.5px solid #e0e8f0' }}>
          {[
            { val: 'reservations', label: '📋 Réservations' },
            { val: 'locations',    label: '🏨 Locations' },
          ].map(o => (
            <button key={o.val} onClick={() => setOnglet(o.val)} style={{
              padding: '10px 24px',
              background: 'transparent',
              color: onglet === o.val ? 'var(--bleu-fonce)' : 'var(--texte-secondaire)',
              border: 'none',
              borderBottom: onglet === o.val ? '2px solid var(--bleu-moyen)' : '2px solid transparent',
              fontSize: '14px', fontWeight: onglet === o.val ? '600' : '400',
              cursor: 'pointer', marginBottom: '-1px'
            }}>
              {o.label}
            </button>
          ))}
        </div>

        {/* ===== ONGLET RÉSERVATIONS ===== */}
        {onglet === 'reservations' && (
          <>
            {/* Compteurs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
              {[
                { label: 'Total',      count: compteurs.tous,         bg: 'var(--bleu-tres-pale)', color: 'var(--bleu-fonce)' },
                { label: 'Actives',    count: compteurs.active,       bg: '#EAF3DE',               color: '#3B6D11' },
                { label: 'Converties', count: compteurs.convertie,    bg: 'var(--bleu-tres-pale)', color: 'var(--bleu-moyen)' },
                { label: 'Annulées',   count: compteurs['annulee'],   bg: '#FCEBEB',               color: '#A32D2D' },
              ].map(s => (
                <div key={s.label} style={{ background: s.bg, borderRadius: 'var(--radius)', padding: '16px 20px' }}>
                  <p style={{ fontSize: '11px', fontWeight: '600', color: s.color, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>{s.label}</p>
                  <p style={{ fontSize: '28px', fontWeight: '700', color: s.color }}>{s.count}</p>
                </div>
              ))}
            </div>

            {/* Filtres */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {[
                { val: 'tous',      label: 'Toutes' },
                { val: 'active',    label: 'Actives' },
                { val: 'convertie', label: 'Converties' },
                { val: 'annulee',   label: 'Annulées' },
              ].map(f => (
                <button key={f.val} onClick={() => setFiltreStatut(f.val)} style={{
                  padding: '8px 18px',
                  background: filtreStatut === f.val ? 'var(--bleu-fonce)' : 'var(--blanc)',
                  color: filtreStatut === f.val ? 'var(--blanc)' : 'var(--texte-secondaire)',
                  border: '0.5px solid #cdd8e8', borderRadius: '30px',
                  fontSize: '13px', fontWeight: '500', transition: 'all 0.15s'
                }}>
                  {f.label}
                </button>
              ))}
            </div>

            {loading && (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid var(--bleu-tres-pale)', borderTop: '3px solid var(--bleu-moyen)', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <p style={{ color: 'var(--texte-secondaire)', fontSize: '14px' }}>Chargement...</p>
              </div>
            )}

            {!loading && erreur && (
              <div style={{ background: '#FCEBEB', border: '0.5px solid #F09595', borderRadius: 'var(--radius)', padding: '20px', textAlign: 'center', color: '#A32D2D' }}>{erreur}</div>
            )}

            {!loading && !erreur && reservationsFiltrees.length === 0 && (
              <div style={{ background: 'var(--blanc)', borderRadius: 'var(--radius)', border: '0.5px solid #e0e8f0', padding: '60px', textAlign: 'center' }}>
                <p style={{ fontSize: '36px', marginBottom: '12px' }}>📋</p>
                <p style={{ fontSize: '16px', fontWeight: '600', color: 'var(--bleu-fonce)' }}>Aucune réservation</p>
                <p style={{ fontSize: '14px', color: 'var(--texte-secondaire)', marginTop: '6px' }}>
                  {filtreStatut !== 'tous' ? 'Aucune réservation dans cette catégorie.' : 'Aucune réservation enregistrée.'}
                </p>
              </div>
            )}

            {!loading && !erreur && reservationsFiltrees.length > 0 && (
              <div style={{ background: 'var(--blanc)', borderRadius: 'var(--radius)', border: '0.5px solid #e0e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--bleu-tres-pale)' }}>
                      {['#', 'Client', 'Chambre / Hôtel', 'Dates', 'Nuits', 'Statut', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: 'var(--bleu-fonce)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {reservationsFiltrees.map((r, i) => (
                      <tr key={r.id}
                        style={{ borderTop: '0.5px solid #e0e8f0', background: i % 2 === 0 ? 'var(--blanc)' : 'var(--gris-clair)', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bleu-tres-pale)'}
                        onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'var(--blanc)' : 'var(--gris-clair)'}
                      >
                        <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--texte-secondaire)' }}>#{r.id}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--texte)' }}>{r.client_prenom} {r.client_nom}</p>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--bleu-fonce)' }}>{r.hotel_nom}</p>
                          <p style={{ fontSize: '12px', color: 'var(--texte-secondaire)' }}>Chambre {r.chambre_numero}</p>
                        </td>
                        <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--texte)' }}>
                          <p>{formatDate(r.date_debut)}</p>
                          <p style={{ color: 'var(--texte-secondaire)' }}>→ {formatDate(r.date_fin)}</p>
                        </td>
                        <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--texte)', textAlign: 'center' }}>{nuits(r.date_debut, r.date_fin)}</td>
                        <td style={{ padding: '14px 16px' }}><Badge statut={r.statut} /></td>
                        <td style={{ padding: '14px 16px' }}>
                          {r.statut === 'active' ? (
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              <button onClick={() => ouvrirConvertir(r)} style={{ padding: '6px 12px', fontSize: '12px', background: 'var(--bleu-tres-pale)', color: 'var(--bleu-fonce)', border: '0.5px solid var(--bleu-pale)', borderRadius: 'var(--radius-sm)', fontWeight: '500' }}>
                                Convertir
                              </button>
                              <button onClick={() => setConfirmModal({ id: r.id, action: 'annuler', res: r })} style={{ padding: '6px 12px', fontSize: '12px', background: '#FCEBEB', color: '#A32D2D', border: '0.5px solid #F09595', borderRadius: 'var(--radius-sm)', fontWeight: '500' }}>
                                Annuler
                              </button>
                            </div>
                          ) : (
                            <span style={{ fontSize: '12px', color: 'var(--texte-secondaire)' }}>—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ===== ONGLET LOCATIONS ===== */}
        {onglet === 'locations' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '24px' }}>
              <div style={{ background: 'var(--bleu-tres-pale)', borderRadius: 'var(--radius)', padding: '16px 20px' }}>
                <p style={{ fontSize: '11px', fontWeight: '600', color: 'var(--bleu-fonce)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Total locations</p>
                <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--bleu-fonce)' }}>{locations.length}</p>
              </div>
              <div style={{ background: '#EAF3DE', borderRadius: 'var(--radius)', padding: '16px 20px' }}>
                <p style={{ fontSize: '11px', fontWeight: '600', color: '#3B6D11', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Dont directes (sans réservation)</p>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#3B6D11' }}>{locations.filter(l => !l.reservation_id).length}</p>
              </div>
            </div>

            {loadingLoc ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <p style={{ color: 'var(--texte-secondaire)', fontSize: '14px' }}>Chargement...</p>
              </div>
            ) : locations.length === 0 ? (
              <div style={{ background: 'var(--blanc)', borderRadius: 'var(--radius)', border: '0.5px solid #e0e8f0', padding: '60px', textAlign: 'center' }}>
                <p style={{ fontSize: '36px', marginBottom: '12px' }}>🏨</p>
                <p style={{ fontSize: '16px', fontWeight: '600', color: 'var(--bleu-fonce)' }}>Aucune location</p>
                <p style={{ fontSize: '14px', color: 'var(--texte-secondaire)', marginTop: '6px' }}>Aucune location enregistrée.</p>
              </div>
            ) : (
              <div style={{ background: 'var(--blanc)', borderRadius: 'var(--radius)', border: '0.5px solid #e0e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--bleu-tres-pale)' }}>
                      {['#', 'Client', 'Chambre / Hôtel', 'Employé', 'Dates', 'Nuits', 'Source'].map(h => (
                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: 'var(--bleu-fonce)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {locations.map((l, i) => (
                      <tr key={l.id}
                        style={{ borderTop: '0.5px solid #e0e8f0', background: i % 2 === 0 ? 'var(--blanc)' : 'var(--gris-clair)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bleu-tres-pale)'}
                        onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'var(--blanc)' : 'var(--gris-clair)'}
                      >
                        <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--texte-secondaire)' }}>#{l.id}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--texte)' }}>{l.client_prenom} {l.client_nom}</p>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--bleu-fonce)' }}>{l.hotel_nom}</p>
                          <p style={{ fontSize: '12px', color: 'var(--texte-secondaire)' }}>Chambre {l.chambre_numero}</p>
                        </td>
                        <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--texte)' }}>
                          {l.employe_prenom} {l.employe_nom}
                        </td>
                        <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--texte)' }}>
                          <p>{formatDate(l.date_debut)}</p>
                          <p style={{ color: 'var(--texte-secondaire)' }}>→ {formatDate(l.date_fin)}</p>
                        </td>
                        <td style={{ padding: '14px 16px', fontSize: '13px', color: 'var(--texte)', textAlign: 'center' }}>{nuits(l.date_debut, l.date_fin)}</td>
                        <td style={{ padding: '14px 16px' }}>
                          {l.reservation_id ? (
                            <span style={{ background: 'var(--bleu-tres-pale)', color: 'var(--bleu-fonce)', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px' }}>
                              Résa #{l.reservation_id}
                            </span>
                          ) : (
                            <span style={{ background: '#EAF3DE', color: '#3B6D11', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px' }}>
                              Directe
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal confirmation */}
      {confirmModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(12,68,124,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setConfirmModal(null)}>
          <div style={{ background: 'var(--blanc)', borderRadius: 'var(--radius)', padding: '28px', width: '420px', maxWidth: '90vw' }} onClick={e => e.stopPropagation()}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--bleu-fonce)' }}>
                {confirmModal.action === 'convertir' ? 'Convertir en location' : 'Annuler la réservation'}
              </h2>
              <button onClick={() => setConfirmModal(null)} style={{ background: 'none', border: 'none', fontSize: '20px', color: 'var(--gris)', cursor: 'pointer' }}>×</button>
            </div>

            <div style={{ background: confirmModal.action === 'convertir' ? 'var(--bleu-tres-pale)' : '#FCEBEB', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: '18px', fontSize: '13px', color: confirmModal.action === 'convertir' ? 'var(--bleu-fonce)' : '#A32D2D' }}>
              Réservation #{confirmModal.id} — {confirmModal.res?.client_prenom} {confirmModal.res?.client_nom}
              <br />
              <span style={{ opacity: 0.8 }}>{confirmModal.res?.hotel_nom} · Chambre {confirmModal.res?.chambre_numero}</span>
            </div>

            {confirmModal.action === 'convertir' && (
              <>
                <label style={{ fontSize: '12px', fontWeight: '500', color: 'var(--texte-secondaire)', display: 'block', marginBottom: '6px' }}>
                  Employé responsable
                </label>
                <select style={inputStyle} value={employeId} onChange={e => setEmployeId(e.target.value)}>
                  <option value="">Sélectionner un employé</option>
                  {employes.map(e => (
                    <option key={e.id} value={e.id}>{e.prenom} {e.nom} — {e.role}</option>
                  ))}
                </select>
                {employes.length === 0 && (
                  <p style={{ fontSize: '12px', color: '#A32D2D', marginTop: '-10px', marginBottom: '14px' }}>
                    Aucun employé trouvé pour cet hôtel.
                  </p>
                )}
              </>
            )}

            {confirmModal.action === 'annuler' && (
              <p style={{ fontSize: '14px', color: 'var(--texte-secondaire)', marginBottom: '18px' }}>
                Cette action est irréversible. La réservation sera marquée comme annulée.
              </p>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setConfirmModal(null)} style={{ flex: 1, padding: '11px', background: 'transparent', border: '0.5px solid #cdd8e8', borderRadius: 'var(--radius-sm)', fontSize: '14px', color: 'var(--texte-secondaire)' }}>
                Retour
              </button>
              <button onClick={confirmerAction} disabled={actionLoading} style={{ flex: 1, padding: '11px', background: actionLoading ? '#ccc' : confirmModal.action === 'convertir' ? 'var(--bleu-moyen)' : '#E24B4A', color: 'var(--blanc)', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: '14px', fontWeight: '500' }}>
                {actionLoading ? 'En cours...' : confirmModal.action === 'convertir' ? 'Confirmer la conversion' : "Confirmer l'annulation"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.msg && (
        <div style={{ position: 'fixed', bottom: '28px', left: '50%', transform: 'translateX(-50%)', background: toast.type === 'error' ? '#A32D2D' : 'var(--bleu-fonce)', color: 'var(--blanc)', padding: '12px 24px', borderRadius: '30px', fontSize: '14px', fontWeight: '500', zIndex: 2000, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: toast.type === 'error' ? '#F09595' : 'var(--or)' }}>{toast.type === 'error' ? '✕' : '✓'}</span>
          {toast.msg}
        </div>
      )}
    </div>
  )
}