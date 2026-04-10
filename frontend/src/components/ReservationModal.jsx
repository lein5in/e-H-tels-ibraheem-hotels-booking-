import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ReservationModal({ chambre, onClose, onSuccess }) {
  const [clients, setClients] = useState([])
  const [form, setForm] = useState({
    client_id: '', date_debut: '', date_fin: ''
  })
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/api/clients').then(res => setClients(res.data))
  }, [])

  async function handleSubmit() {
    setErreur('')
    if (!form.client_id || !form.date_debut || !form.date_fin) {
      setErreur('Veuillez remplir tous les champs.')
      return
    }
    if (form.date_fin <= form.date_debut) {
      setErreur('La date de départ doit être après la date d\'arrivée.')
      return
    }
    setLoading(true)
    try {
      await axios.post('http://localhost:3000/api/reservations', {
        client_id: parseInt(form.client_id),
        chambre_id: chambre.id,
        date_debut: form.date_debut,
        date_fin: form.date_fin
      })
      onSuccess('Réservation créée avec succès !')
      onClose()
    } catch (err) {
      setErreur(err.response?.data?.error || 'Erreur lors de la réservation.')
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', padding: '10px 12px',
    border: '0.5px solid #cdd8e8', borderRadius: 'var(--radius-sm)',
    fontSize: '14px', outline: 'none', marginBottom: '14px'
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(12,68,124,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: 'var(--blanc)', borderRadius: 'var(--radius)',
        padding: '28px', width: '420px', maxWidth: '90vw'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--bleu-fonce)' }}>
            Réserver une chambre
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', color: 'var(--gris)', cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ background: 'var(--bleu-tres-pale)', borderRadius: 'var(--radius-sm)', padding: '12px', marginBottom: '20px' }}>
          <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--bleu-fonce)' }}>{chambre.hotel_nom}</p>
          <p style={{ fontSize: '13px', color: 'var(--texte-secondaire)' }}>Chambre {chambre.numero} · {chambre.prix}$/nuit</p>
        </div>

        <label style={{ fontSize: '12px', fontWeight: '500', color: 'var(--texte-secondaire)', display: 'block', marginBottom: '6px' }}>Client</label>
        <select style={inputStyle} value={form.client_id}
          onChange={e => setForm({ ...form, client_id: e.target.value })}>
          <option value="">Sélectionner un client</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>{c.prenom} {c.nom}</option>
          ))}
        </select>

        <label style={{ fontSize: '12px', fontWeight: '500', color: 'var(--texte-secondaire)', display: 'block', marginBottom: '6px' }}>Date d'arrivée</label>
        <input type="date" style={inputStyle} value={form.date_debut}
          onChange={e => setForm({ ...form, date_debut: e.target.value })} />

        <label style={{ fontSize: '12px', fontWeight: '500', color: 'var(--texte-secondaire)', display: 'block', marginBottom: '6px' }}>Date de départ</label>
        <input type="date" style={inputStyle} value={form.date_fin}
          onChange={e => setForm({ ...form, date_fin: e.target.value })} />

        {erreur && (
          <p style={{ color: '#A32D2D', fontSize: '13px', marginBottom: '12px', background: '#FCEBEB', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>
            {erreur}
          </p>
        )}

        <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '11px', background: 'transparent',
            border: '0.5px solid #cdd8e8', borderRadius: 'var(--radius-sm)',
            fontSize: '14px', color: 'var(--texte-secondaire)'
          }}>
            Annuler
          </button>
          <button onClick={handleSubmit} disabled={loading} style={{
            flex: 1, padding: '11px',
            background: loading ? 'var(--bleu-pale)' : 'var(--bleu-moyen)',
            color: 'var(--blanc)', border: 'none',
            borderRadius: 'var(--radius-sm)', fontSize: '14px', fontWeight: '500'
          }}>
            {loading ? 'En cours...' : 'Confirmer'}
          </button>
        </div>
      </div>
    </div>
  )
}