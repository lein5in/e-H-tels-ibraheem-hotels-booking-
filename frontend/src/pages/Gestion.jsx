import { useState, useEffect } from 'react'
import axios from 'axios'


const inputStyle = {
  width: '100%', padding: '10px 12px',
  border: '0.5px solid #cdd8e8', borderRadius: 'var(--radius-sm)',
  fontSize: '14px', outline: 'none', marginBottom: '14px', fontFamily: 'inherit',
  background: 'var(--blanc)', color: 'var(--texte)'
}
const labelStyle = {
  fontSize: '12px', fontWeight: '500', color: 'var(--texte-secondaire)',
  display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px'
}
const btnPrimary = {
  padding: '10px 20px', background: 'var(--bleu-moyen)', color: 'var(--blanc)',
  border: 'none', borderRadius: 'var(--radius-sm)', fontSize: '13px',
  fontWeight: '600', cursor: 'pointer'
}
const btnDanger = {
  padding: '6px 12px', background: '#FCEBEB', color: '#A32D2D',
  border: '0.5px solid #F09595', borderRadius: 'var(--radius-sm)',
  fontSize: '12px', fontWeight: '500', cursor: 'pointer'
}
const btnEdit = {
  padding: '6px 12px', background: 'var(--bleu-tres-pale)', color: 'var(--bleu-fonce)',
  border: '0.5px solid var(--bleu-pale)', borderRadius: 'var(--radius-sm)',
  fontSize: '12px', fontWeight: '500', cursor: 'pointer'
}


function Modal({ titre, onClose, children }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(12,68,124,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
      onClick={onClose}>
      <div style={{ background: 'var(--blanc)', borderRadius: 'var(--radius)', padding: '28px', width: '480px', maxWidth: '92vw', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--bleu-fonce)' }}>{titre}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '22px', color: 'var(--gris)', cursor: 'pointer' }}>×</button>
        </div>
        {children}
      </div>
    </div>
  )
}


function ConfirmDelete({ label, onConfirm, onClose, loading }) {
  return (
    <Modal titre="Confirmer la suppression" onClose={onClose}>
      <div style={{ background: '#FCEBEB', borderRadius: 'var(--radius-sm)', padding: '12px 16px', marginBottom: '20px', color: '#A32D2D', fontSize: '14px' }}>
        Supprimer <strong>{label}</strong> ? Cette action est irréversible.
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={onClose} style={{ flex: 1, padding: '11px', background: 'transparent', border: '0.5px solid #cdd8e8', borderRadius: 'var(--radius-sm)', fontSize: '14px', color: 'var(--texte-secondaire)', cursor: 'pointer' }}>Annuler</button>
        <button onClick={onConfirm} disabled={loading} style={{ flex: 1, padding: '11px', background: loading ? '#ccc' : '#E24B4A', color: 'var(--blanc)', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
          {loading ? 'Suppression...' : 'Supprimer'}
        </button>
      </div>
    </Modal>
  )
}


function Table({ colonnes, lignes, onEdit, onDelete }) {
  if (lignes.length === 0) return (
    <div style={{ background: 'var(--blanc)', borderRadius: 'var(--radius)', border: '0.5px solid #e0e8f0', padding: '48px', textAlign: 'center' }}>
      <p style={{ fontSize: '14px', color: 'var(--texte-secondaire)' }}>Aucune donnée.</p>
    </div>
  )
  return (
    <div style={{ background: 'var(--blanc)', borderRadius: 'var(--radius)', border: '0.5px solid #e0e8f0', overflow: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
        <thead>
          <tr style={{ background: 'var(--bleu-tres-pale)' }}>
            {colonnes.map(c => (
              <th key={c.key} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: 'var(--bleu-fonce)', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
                {c.label}
              </th>
            ))}
            <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '600', color: 'var(--bleu-fonce)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lignes.map((row, i) => (
            <tr key={row.id}
              style={{ borderTop: '0.5px solid #e0e8f0', background: i % 2 === 0 ? 'var(--blanc)' : 'var(--gris-clair)', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bleu-tres-pale)'}
              onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'var(--blanc)' : 'var(--gris-clair)'}
            >
              {colonnes.map(c => (
                <td key={c.key} style={{ padding: '13px 16px', fontSize: '13px', color: c.primary ? 'var(--bleu-fonce)' : 'var(--texte)', fontWeight: c.primary ? '600' : '400', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {c.render ? c.render(row) : (row[c.key] ?? '—')}
                </td>
              ))}
              <td style={{ padding: '13px 16px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => onEdit(row)} style={btnEdit}>Modifier</button>
                  <button onClick={() => onDelete(row)} style={btnDanger}>Supprimer</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


function OngletClients({ toast }) {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // 'add' | 'edit' | 'delete'
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ nom: '', prenom: '', adresse: '', nas: '' })
  const [saving, setSaving] = useState(false)
  const [erreur, setErreur] = useState('')

  const fetch = async () => {
    setLoading(true)
    try { const r = await axios.get('http://localhost:3000/api/clients'); setClients(r.data) }
    catch { toast('Erreur chargement clients', 'error') }
    setLoading(false)
  }
  useEffect(() => { fetch() }, [])

  function ouvrirAjout() { setForm({ nom: '', prenom: '', adresse: '', nas: '' }); setErreur(''); setModal('add') }
  function ouvrirEdit(c) { setSelected(c); setForm({ nom: c.nom, prenom: c.prenom, adresse: c.adresse || '', nas: c.nas || '' }); setErreur(''); setModal('edit') }
  function ouvrirDelete(c) { setSelected(c); setModal('delete') }

  async function sauvegarder() {
    if (!form.nom || !form.prenom) { setErreur('Nom et prénom requis.'); return }
    setSaving(true); setErreur('')
    try {
      if (modal === 'add') {
        if (!form.nas) { setErreur('Le NAS est requis.'); setSaving(false); return }
        await axios.post('http://localhost:3000/api/clients', form)
        toast('Client ajouté !')
      } else {
        await axios.put(`http://localhost:3000/api/clients/${selected.id}`, { nom: form.nom, prenom: form.prenom, adresse: form.adresse })
        toast('Client modifié !')
      }
      setModal(null); fetch()
    } catch (err) { setErreur(err.response?.data?.error || 'Erreur.') }
    setSaving(false)
  }

  async function supprimer() {
    setSaving(true)
    try { await axios.delete(`http://localhost:3000/api/clients/${selected.id}`); toast('Client supprimé.'); setModal(null); fetch() }
    catch (err) { toast(err.response?.data?.error || 'Erreur suppression.', 'error'); setModal(null) }
    setSaving(false)
  }

  const colonnes = [
    { key: 'id', label: '#' },
    { key: 'prenom', label: 'Prénom', primary: true },
    { key: 'nom', label: 'Nom', primary: true },
    { key: 'adresse', label: 'Adresse' },
    { key: 'date_inscription', label: 'Inscrit le', render: r => r.date_inscription ? new Date(r.date_inscription).toLocaleDateString('fr-CA') : '—' },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '14px', color: 'var(--texte-secondaire)' }}><strong style={{ color: 'var(--bleu-fonce)' }}>{clients.length}</strong> clients enregistrés</p>
        <button onClick={ouvrirAjout} style={btnPrimary}>+ Nouveau client</button>
      </div>
      {loading ? <p style={{ color: 'var(--texte-secondaire)', fontSize: '14px' }}>Chargement...</p>
        : <Table colonnes={colonnes} lignes={clients} onEdit={ouvrirEdit} onDelete={ouvrirDelete} />}

      {(modal === 'add' || modal === 'edit') && (
        <Modal titre={modal === 'add' ? 'Nouveau client' : 'Modifier le client'} onClose={() => setModal(null)}>
          <label style={labelStyle}>Prénom</label>
          <input style={inputStyle} value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} placeholder="Prénom" />
          <label style={labelStyle}>Nom</label>
          <input style={inputStyle} value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Nom" />
          <label style={labelStyle}>Adresse</label>
          <input style={inputStyle} value={form.adresse} onChange={e => setForm({ ...form, adresse: e.target.value })} placeholder="Adresse complète" />
          {modal === 'add' && (<>
            <label style={labelStyle}>NAS (numéro d'assurance sociale)</label>
            <input style={inputStyle} value={form.nas} onChange={e => setForm({ ...form, nas: e.target.value })} placeholder="NAS" />
          </>)}
          {erreur && <p style={{ color: '#A32D2D', fontSize: '13px', background: '#FCEBEB', padding: '8px 12px', borderRadius: 'var(--radius-sm)', marginBottom: '14px' }}>{erreur}</p>}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setModal(null)} style={{ flex: 1, padding: '11px', background: 'transparent', border: '0.5px solid #cdd8e8', borderRadius: 'var(--radius-sm)', fontSize: '14px', color: 'var(--texte-secondaire)', cursor: 'pointer' }}>Annuler</button>
            <button onClick={sauvegarder} disabled={saving} style={{ ...btnPrimary, flex: 1, padding: '11px' }}>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</button>
          </div>
        </Modal>
      )}
      {modal === 'delete' && selected && (
        <ConfirmDelete label={`${selected.prenom} ${selected.nom}`} onConfirm={supprimer} onClose={() => setModal(null)} loading={saving} />
      )}
    </div>
  )
}


function OngletEmployes({ toast }) {
  const [employes, setEmployes] = useState([])
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ hotel_id: '', nom: '', prenom: '', adresse: '', nas: '', role: '' })
  const [saving, setSaving] = useState(false)
  const [erreur, setErreur] = useState('')

  const fetch = async () => {
    setLoading(true)
    try {
      const [e, h] = await Promise.all([
        axios.get('http://localhost:3000/api/employes'),
        axios.get('http://localhost:3000/api/hotels')
      ])
      setEmployes(e.data); setHotels(h.data)
    } catch { toast('Erreur chargement employés', 'error') }
    setLoading(false)
  }
  useEffect(() => { fetch() }, [])

  function ouvrirAjout() { setForm({ hotel_id: '', nom: '', prenom: '', adresse: '', nas: '', role: '' }); setErreur(''); setModal('add') }
  function ouvrirEdit(e) { setSelected(e); setForm({ hotel_id: e.hotel_id, nom: e.nom, prenom: e.prenom, adresse: e.adresse || '', nas: e.nas || '', role: e.role || '' }); setErreur(''); setModal('edit') }
  function ouvrirDelete(e) { setSelected(e); setModal('delete') }

  async function sauvegarder() {
    if (!form.nom || !form.prenom || !form.role) { setErreur('Nom, prénom et rôle requis.'); return }
    setSaving(true); setErreur('')
    try {
      if (modal === 'add') {
        if (!form.hotel_id || !form.nas) { setErreur('Hôtel et NAS requis.'); setSaving(false); return }
        await axios.post('http://localhost:3000/api/employes', { ...form, hotel_id: parseInt(form.hotel_id) })
        toast('Employé ajouté !')
      } else {
        await axios.put(`http://localhost:3000/api/employes/${selected.id}`, { nom: form.nom, prenom: form.prenom, adresse: form.adresse, role: form.role })
        toast('Employé modifié !')
      }
      setModal(null); fetch()
    } catch (err) { setErreur(err.response?.data?.error || 'Erreur.') }
    setSaving(false)
  }

  async function supprimer() {
    setSaving(true)
    try { await axios.delete(`http://localhost:3000/api/employes/${selected.id}`); toast('Employé supprimé.'); setModal(null); fetch() }
    catch (err) { toast(err.response?.data?.error || 'Erreur suppression.', 'error'); setModal(null) }
    setSaving(false)
  }

  const roles = ['Réceptionniste', 'Femme de chambre', 'Valet', 'Concierge', 'Gérant', 'Technicien', 'Cuisinier', 'Sécurité']

  const colonnes = [
    { key: 'id', label: '#' },
    { key: 'prenom', label: 'Prénom', primary: true },
    { key: 'nom', label: 'Nom', primary: true },
    { key: 'role', label: 'Rôle' },
    { key: 'hotel_nom', label: 'Hôtel' },
    { key: 'chaine_nom', label: 'Chaîne' },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '14px', color: 'var(--texte-secondaire)' }}><strong style={{ color: 'var(--bleu-fonce)' }}>{employes.length}</strong> employés enregistrés</p>
        <button onClick={ouvrirAjout} style={btnPrimary}>+ Nouvel employé</button>
      </div>
      {loading ? <p style={{ color: 'var(--texte-secondaire)', fontSize: '14px' }}>Chargement...</p>
        : <Table colonnes={colonnes} lignes={employes} onEdit={ouvrirEdit} onDelete={ouvrirDelete} />}

      {(modal === 'add' || modal === 'edit') && (
        <Modal titre={modal === 'add' ? 'Nouvel employé' : 'Modifier l\'employé'} onClose={() => setModal(null)}>
          {modal === 'add' && (<>
            <label style={labelStyle}>Hôtel</label>
            <select style={inputStyle} value={form.hotel_id} onChange={e => setForm({ ...form, hotel_id: e.target.value })}>
              <option value="">Sélectionner un hôtel</option>
              {hotels.map(h => <option key={h.id} value={h.id}>{h.nom} — {h.chaine_nom}</option>)}
            </select>
          </>)}
          <label style={labelStyle}>Prénom</label>
          <input style={inputStyle} value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} placeholder="Prénom" />
          <label style={labelStyle}>Nom</label>
          <input style={inputStyle} value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Nom" />
          <label style={labelStyle}>Adresse</label>
          <input style={inputStyle} value={form.adresse} onChange={e => setForm({ ...form, adresse: e.target.value })} placeholder="Adresse" />
          {modal === 'add' && (<>
            <label style={labelStyle}>NAS</label>
            <input style={inputStyle} value={form.nas} onChange={e => setForm({ ...form, nas: e.target.value })} placeholder="NAS" />
          </>)}
          <label style={labelStyle}>Rôle</label>
          <select style={inputStyle} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="">Sélectionner un rôle</option>
            {roles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          {erreur && <p style={{ color: '#A32D2D', fontSize: '13px', background: '#FCEBEB', padding: '8px 12px', borderRadius: 'var(--radius-sm)', marginBottom: '14px' }}>{erreur}</p>}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setModal(null)} style={{ flex: 1, padding: '11px', background: 'transparent', border: '0.5px solid #cdd8e8', borderRadius: 'var(--radius-sm)', fontSize: '14px', color: 'var(--texte-secondaire)', cursor: 'pointer' }}>Annuler</button>
            <button onClick={sauvegarder} disabled={saving} style={{ ...btnPrimary, flex: 1, padding: '11px' }}>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</button>
          </div>
        </Modal>
      )}
      {modal === 'delete' && selected && (
        <ConfirmDelete label={`${selected.prenom} ${selected.nom}`} onConfirm={supprimer} onClose={() => setModal(null)} loading={saving} />
      )}
    </div>
  )
}


function OngletHotels({ toast }) {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ chaine_id: '', nom: '', categorie: '', adresse: '', emails: '', telephones: '', gestionnaire_id: '' })
  const [chaines, setChaines] = useState([])
  const [saving, setSaving] = useState(false)
  const [erreur, setErreur] = useState('')

  const fetch = async () => {
    setLoading(true)
    try {
      const r = await axios.get('http://localhost:3000/api/hotels')
      setHotels(r.data)
      const unique = [...new Map(r.data.map(h => [h.chaine_id, { id: h.chaine_id, nom: h.chaine_nom }])).values()]
      setChaines(unique)
    } catch { toast('Erreur chargement hôtels', 'error') }
    setLoading(false)
  }
  useEffect(() => { fetch() }, [])

  function ouvrirAjout() { setForm({ chaine_id: '', nom: '', categorie: '', adresse: '', emails: '', telephones: '', gestionnaire_id: '' }); setErreur(''); setModal('add') }
  function ouvrirEdit(h) {
    setSelected(h)
    setForm({ chaine_id: h.chaine_id, nom: h.nom, categorie: h.categorie, adresse: h.adresse || '', emails: '', telephones: '', gestionnaire_id: h.gestionnaire_id || '' })
    setErreur(''); setModal('edit')
  }
  function ouvrirDelete(h) { setSelected(h); setModal('delete') }

  async function sauvegarder() {
    if (!form.nom || !form.categorie) { setErreur('Nom et catégorie requis.'); return }
    setSaving(true); setErreur('')
    try {
      if (modal === 'add') {
        if (!form.chaine_id) { setErreur('Chaîne hôtelière requise.'); setSaving(false); return }
        const emails = form.emails ? form.emails.split(',').map(e => e.trim()).filter(Boolean) : []
        const telephones = form.telephones ? form.telephones.split(',').map(t => t.trim()).filter(Boolean) : []
        await axios.post('http://localhost:3000/api/hotels', {
          chaine_id: parseInt(form.chaine_id), nom: form.nom,
          categorie: parseInt(form.categorie), adresse: form.adresse,
          emails, telephones
        })
        toast('Hôtel ajouté !')
      } else {
        await axios.put(`http://localhost:3000/api/hotels/${selected.id}`, {
          nom: form.nom, categorie: parseInt(form.categorie),
          adresse: form.adresse,
          gestionnaire_id: form.gestionnaire_id ? parseInt(form.gestionnaire_id) : null
        })
        toast('Hôtel modifié !')
      }
      setModal(null); fetch()
    } catch (err) { setErreur(err.response?.data?.error || 'Erreur.') }
    setSaving(false)
  }

  async function supprimer() {
    setSaving(true)
    try { await axios.delete(`http://localhost:3000/api/hotels/${selected.id}`); toast('Hôtel supprimé.'); setModal(null); fetch() }
    catch (err) { toast(err.response?.data?.error || 'Erreur suppression.', 'error'); setModal(null) }
    setSaving(false)
  }

  const colonnes = [
    { key: 'id', label: '#' },
    { key: 'nom', label: 'Nom', primary: true },
    { key: 'chaine_nom', label: 'Chaîne' },
    { key: 'categorie', label: 'Étoiles', render: r => '★'.repeat(r.categorie) },
    { key: 'adresse', label: 'Adresse' },
    { key: 'gestionnaire_prenom', label: 'Gestionnaire', render: r => r.gestionnaire_prenom ? `${r.gestionnaire_prenom} ${r.gestionnaire_nom}` : '—' },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '14px', color: 'var(--texte-secondaire)' }}><strong style={{ color: 'var(--bleu-fonce)' }}>{hotels.length}</strong> hôtels enregistrés</p>
        <button onClick={ouvrirAjout} style={btnPrimary}>+ Nouvel hôtel</button>
      </div>
      {loading ? <p style={{ color: 'var(--texte-secondaire)', fontSize: '14px' }}>Chargement...</p>
        : <Table colonnes={colonnes} lignes={hotels} onEdit={ouvrirEdit} onDelete={ouvrirDelete} />}

      {(modal === 'add' || modal === 'edit') && (
        <Modal titre={modal === 'add' ? 'Nouvel hôtel' : 'Modifier l\'hôtel'} onClose={() => setModal(null)}>
          {modal === 'add' && (<>
            <label style={labelStyle}>Chaîne hôtelière</label>
            <select style={inputStyle} value={form.chaine_id} onChange={e => setForm({ ...form, chaine_id: e.target.value })}>
              <option value="">Sélectionner une chaîne</option>
              {chaines.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
            </select>
          </>)}
          <label style={labelStyle}>Nom de l'hôtel</label>
          <input style={inputStyle} value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} placeholder="Nom" />
          <label style={labelStyle}>Catégorie (étoiles)</label>
          <select style={inputStyle} value={form.categorie} onChange={e => setForm({ ...form, categorie: e.target.value })}>
            <option value="">Sélectionner</option>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{'★'.repeat(n)} ({n})</option>)}
          </select>
          <label style={labelStyle}>Adresse</label>
          <input style={inputStyle} value={form.adresse} onChange={e => setForm({ ...form, adresse: e.target.value })} placeholder="Adresse complète" />
          {modal === 'add' && (<>
            <label style={labelStyle}>Emails (séparés par virgule)</label>
            <input style={inputStyle} value={form.emails} onChange={e => setForm({ ...form, emails: e.target.value })} placeholder="ex: info@hotel.com, resa@hotel.com" />
            <label style={labelStyle}>Téléphones (séparés par virgule)</label>
            <input style={inputStyle} value={form.telephones} onChange={e => setForm({ ...form, telephones: e.target.value })} placeholder="ex: 514-555-0001, 514-555-0002" />
          </>)}
          {modal === 'edit' && (<>
            <label style={labelStyle}>ID Gestionnaire (optionnel)</label>
            <input style={inputStyle} type="number" value={form.gestionnaire_id} onChange={e => setForm({ ...form, gestionnaire_id: e.target.value })} placeholder="ID de l'employé gestionnaire" />
          </>)}
          {erreur && <p style={{ color: '#A32D2D', fontSize: '13px', background: '#FCEBEB', padding: '8px 12px', borderRadius: 'var(--radius-sm)', marginBottom: '14px' }}>{erreur}</p>}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setModal(null)} style={{ flex: 1, padding: '11px', background: 'transparent', border: '0.5px solid #cdd8e8', borderRadius: 'var(--radius-sm)', fontSize: '14px', color: 'var(--texte-secondaire)', cursor: 'pointer' }}>Annuler</button>
            <button onClick={sauvegarder} disabled={saving} style={{ ...btnPrimary, flex: 1, padding: '11px' }}>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</button>
          </div>
        </Modal>
      )}
      {modal === 'delete' && selected && (
        <ConfirmDelete label={selected.nom} onConfirm={supprimer} onClose={() => setModal(null)} loading={saving} />
      )}
    </div>
  )
}


function OngletChambres({ toast }) {
  const [chambres, setChambres] = useState([])
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ hotel_id: '', numero: '', prix: '', capacite: '', vue: '', superficie: '', tv: false, climatisation: false, frigo: false, wifi: false, lit_extensible: false, etat: 'disponible' })
  const [saving, setSaving] = useState(false)
  const [erreur, setErreur] = useState('')

  const fetch = async () => {
    setLoading(true)
    try {
      const [c, h] = await Promise.all([
        axios.get('http://localhost:3000/api/chambres'),
        axios.get('http://localhost:3000/api/hotels')
      ])
      setChambres(c.data); setHotels(h.data)
    } catch { toast('Erreur chargement chambres', 'error') }
    setLoading(false)
  }
  useEffect(() => { fetch() }, [])

  function ouvrirAjout() {
    setForm({ hotel_id: '', numero: '', prix: '', capacite: '', vue: '', superficie: '', tv: false, climatisation: false, frigo: false, wifi: false, lit_extensible: false, etat: 'disponible' })
    setErreur(''); setModal('add')
  }
  function ouvrirEdit(c) {
    setSelected(c)
    setForm({ hotel_id: c.hotel_id, numero: c.numero, prix: c.prix, capacite: c.capacite, vue: c.vue || '', superficie: c.superficie || '', tv: c.tv || false, climatisation: c.climatisation || false, frigo: c.frigo || false, wifi: c.wifi || false, lit_extensible: c.lit_extensible || false, etat: c.etat || 'disponible' })
    setErreur(''); setModal('edit')
  }
  function ouvrirDelete(c) { setSelected(c); setModal('delete') }

  async function sauvegarder() {
    if (!form.numero || !form.prix || !form.capacite) { setErreur('Numéro, prix et capacité requis.'); return }
    setSaving(true); setErreur('')
    try {
      const payload = {
        prix: parseFloat(form.prix), capacite: parseInt(form.capacite),
        vue: form.vue || null, superficie: form.superficie ? parseFloat(form.superficie) : null,
        tv: form.tv, climatisation: form.climatisation, frigo: form.frigo,
        wifi: form.wifi, lit_extensible: form.lit_extensible, etat: form.etat
      }
      if (modal === 'add') {
        if (!form.hotel_id) { setErreur('Hôtel requis.'); setSaving(false); return }
        await axios.post('http://localhost:3000/api/chambres', { ...payload, hotel_id: parseInt(form.hotel_id), numero: form.numero })
        toast('Chambre ajoutée !')
      } else {
        await axios.put(`http://localhost:3000/api/chambres/${selected.id}`, payload)
        toast('Chambre modifiée !')
      }
      setModal(null); fetch()
    } catch (err) { setErreur(err.response?.data?.error || 'Erreur.') }
    setSaving(false)
  }

  async function supprimer() {
    setSaving(true)
    try { await axios.delete(`http://localhost:3000/api/chambres/${selected.id}`); toast('Chambre supprimée.'); setModal(null); fetch() }
    catch (err) { toast(err.response?.data?.error || 'Erreur suppression.', 'error'); setModal(null) }
    setSaving(false)
  }

  const vues = ['ville','mer','montagne','lac','fleuve','parc','panoramique','rivière','piste','port','jardin']
  const etats = ['disponible', 'occupée', 'maintenance']

  const colonnes = [
    { key: 'id', label: '#' },
    { key: 'numero', label: 'N°', primary: true },
    { key: 'hotel_nom', label: 'Hôtel' },
    { key: 'prix', label: 'Prix', render: r => `${r.prix}$/nuit` },
    { key: 'capacite', label: 'Cap.', render: r => `${r.capacite} pers.` },
    { key: 'vue', label: 'Vue', render: r => r.vue ? r.vue.charAt(0).toUpperCase() + r.vue.slice(1) : '—' },
    { key: 'etat', label: 'État', render: r => {
      const colors = { disponible: { bg: '#EAF3DE', c: '#3B6D11' }, 'occupée': { bg: 'var(--bleu-tres-pale)', c: 'var(--bleu-fonce)' }, maintenance: { bg: '#FAEEDA', c: '#854F0B' } }
      const s = colors[r.etat] || { bg: '#F1EFE8', c: '#5F5E5A' }
      return <span style={{ background: s.bg, color: s.c, fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px' }}>{r.etat}</span>
    }},
  ]

  const checkStyle = { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', marginBottom: '10px' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '14px', color: 'var(--texte-secondaire)' }}><strong style={{ color: 'var(--bleu-fonce)' }}>{chambres.length}</strong> chambres enregistrées</p>
        <button onClick={ouvrirAjout} style={btnPrimary}>+ Nouvelle chambre</button>
      </div>
      {loading ? <p style={{ color: 'var(--texte-secondaire)', fontSize: '14px' }}>Chargement...</p>
        : <Table colonnes={colonnes} lignes={chambres} onEdit={ouvrirEdit} onDelete={ouvrirDelete} />}

      {(modal === 'add' || modal === 'edit') && (
        <Modal titre={modal === 'add' ? 'Nouvelle chambre' : 'Modifier la chambre'} onClose={() => setModal(null)}>
          {modal === 'add' && (<>
            <label style={labelStyle}>Hôtel</label>
            <select style={inputStyle} value={form.hotel_id} onChange={e => setForm({ ...form, hotel_id: e.target.value })}>
              <option value="">Sélectionner un hôtel</option>
              {hotels.map(h => <option key={h.id} value={h.id}>{h.nom} — {h.chaine_nom}</option>)}
            </select>
            <label style={labelStyle}>Numéro de chambre</label>
            <input style={inputStyle} value={form.numero} onChange={e => setForm({ ...form, numero: e.target.value })} placeholder="Ex: 101" />
          </>)}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <div>
              <label style={labelStyle}>Prix ($/nuit)</label>
              <input style={inputStyle} type="number" value={form.prix} onChange={e => setForm({ ...form, prix: e.target.value })} placeholder="Ex: 150" />
            </div>
            <div>
              <label style={labelStyle}>Capacité (personnes)</label>
              <select style={inputStyle} value={form.capacite} onChange={e => setForm({ ...form, capacite: e.target.value })}>
                <option value="">Sélectionner</option>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Vue</label>
              <select style={inputStyle} value={form.vue} onChange={e => setForm({ ...form, vue: e.target.value })}>
                <option value="">Aucune</option>
                {vues.map(v => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Superficie (m²)</label>
              <input style={inputStyle} type="number" value={form.superficie} onChange={e => setForm({ ...form, superficie: e.target.value })} placeholder="Ex: 32" />
            </div>
          </div>
          <label style={labelStyle}>État</label>
          <select style={inputStyle} value={form.etat} onChange={e => setForm({ ...form, etat: e.target.value })}>
            {etats.map(e => <option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>)}
          </select>
          <label style={labelStyle}>Commodités</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginBottom: '14px' }}>
            {[['wifi','WiFi'],['tv','Télévision'],['climatisation','Climatisation'],['frigo','Réfrigérateur'],['lit_extensible','Lit extensible']].map(([key, label]) => (
              <label key={key} style={checkStyle}>
                <input type="checkbox" checked={form[key]} onChange={e => setForm({ ...form, [key]: e.target.checked })}
                  style={{ accentColor: 'var(--bleu-moyen)', width: '15px', height: '15px' }} />
                {label}
              </label>
            ))}
          </div>
          {erreur && <p style={{ color: '#A32D2D', fontSize: '13px', background: '#FCEBEB', padding: '8px 12px', borderRadius: 'var(--radius-sm)', marginBottom: '14px' }}>{erreur}</p>}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setModal(null)} style={{ flex: 1, padding: '11px', background: 'transparent', border: '0.5px solid #cdd8e8', borderRadius: 'var(--radius-sm)', fontSize: '14px', color: 'var(--texte-secondaire)', cursor: 'pointer' }}>Annuler</button>
            <button onClick={sauvegarder} disabled={saving} style={{ ...btnPrimary, flex: 1, padding: '11px' }}>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</button>
          </div>
        </Modal>
      )}
      {modal === 'delete' && selected && (
        <ConfirmDelete label={`Chambre ${selected.numero} — ${selected.hotel_nom}`} onConfirm={supprimer} onClose={() => setModal(null)} loading={saving} />
      )}
    </div>
  )
}


export default function Gestion() {
  const [onglet, setOnglet] = useState('clients')
  const [toast, setToast] = useState({ msg: '', type: 'success' })

  const afficherToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg: '', type: 'success' }), 3500)
  }

  const onglets = [
    { id: 'clients',  label: 'Clients',  icon: '👤' },
    { id: 'employes', label: 'Employés', icon: '👔' },
    { id: 'hotels',   label: 'Hôtels',   icon: '🏨' },
    { id: 'chambres', label: 'Chambres', icon: '🛏️' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gris-clair)' }}>

      {}
      <div style={{ background: 'var(--blanc)', borderBottom: '0.5px solid #e0e8f0', padding: '28px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--bleu-fonce)', marginBottom: '4px' }}>
            Gestion
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--texte-secondaire)' }}>
            Administration des clients, employés, hôtels et chambres
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 24px' }}>

        {}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '0.5px solid #e0e8f0', paddingBottom: '0' }}>
          {onglets.map(o => (
            <button key={o.id} onClick={() => setOnglet(o.id)} style={{
              padding: '10px 20px',
              background: 'transparent',
              color: onglet === o.id ? 'var(--bleu-fonce)' : 'var(--texte-secondaire)',
              border: 'none',
              borderBottom: onglet === o.id ? '2px solid var(--bleu-moyen)' : '2px solid transparent',
              fontSize: '14px', fontWeight: onglet === o.id ? '600' : '400',
              cursor: 'pointer', transition: 'all 0.15s',
              display: 'flex', alignItems: 'center', gap: '8px',
              marginBottom: '-1px'
            }}>
              <span style={{ fontSize: '16px' }}>{o.icon}</span> {o.label}
            </button>
          ))}
        </div>

        {}
        {onglet === 'clients'  && <OngletClients  toast={afficherToast} />}
        {onglet === 'employes' && <OngletEmployes toast={afficherToast} />}
        {onglet === 'hotels'   && <OngletHotels   toast={afficherToast} />}
        {onglet === 'chambres' && <OngletChambres toast={afficherToast} />}
      </div>

      {}
      {toast.msg && (
        <div style={{
          position: 'fixed', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
          background: toast.type === 'error' ? '#A32D2D' : 'var(--bleu-fonce)',
          color: 'var(--blanc)', padding: '12px 24px', borderRadius: '30px',
          fontSize: '14px', fontWeight: '500', zIndex: 2000,
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <span style={{ color: toast.type === 'error' ? '#F09595' : 'var(--or)' }}>
            {toast.type === 'error' ? '✕' : '✓'}
          </span>
          {toast.msg}
        </div>
      )}
    </div>
  )
}