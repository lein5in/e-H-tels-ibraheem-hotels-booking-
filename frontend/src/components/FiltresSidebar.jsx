import { useState, useEffect } from 'react'
import axios from 'axios'

export default function FiltresSidebar({ filtres, onChange }) {
  const [chaines, setChaines] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/hotels')
      .then(res => {
        const unique = [...new Map(res.data.map(h => [h.chaine_id, { id: h.chaine_id, nom: h.chaine_nom }])).values()]
        setChaines(unique)
      })
  }, [])

  const inputStyle = {
    width: '100%', padding: '9px 12px',
    border: '0.5px solid #cdd8e8',
    borderRadius: 'var(--radius-sm)',
    fontSize: '13px', color: 'var(--texte)',
    background: 'var(--blanc)', outline: 'none'
  }

  const labelStyle = {
    fontSize: '12px', fontWeight: '500',
    color: 'var(--texte-secondaire)',
    textTransform: 'uppercase', letterSpacing: '0.5px',
    marginBottom: '6px', display: 'block'
  }

  const sectionStyle = { marginBottom: '20px' }

  return (
    <div style={{
      background: 'var(--blanc)',
      borderRadius: 'var(--radius)',
      border: '0.5px solid #e0e8f0',
      padding: '20px',
      position: 'sticky',
      top: '80px'
    }}>
      <h3 style={{
        fontSize: '15px', fontWeight: '600',
        color: 'var(--bleu-fonce)', marginBottom: '20px',
        paddingBottom: '12px', borderBottom: '1px solid #e0e8f0'
      }}>
        Filtres de recherche
      </h3>

      <div style={sectionStyle}>
        <label style={labelStyle}>Date d'arrivée</label>
        <input type="date" style={inputStyle} value={filtres.date_debut}
          onChange={e => onChange({ ...filtres, date_debut: e.target.value })} />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Date de départ</label>
        <input type="date" style={inputStyle} value={filtres.date_fin}
          onChange={e => onChange({ ...filtres, date_fin: e.target.value })} />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Capacité minimum</label>
        <select style={inputStyle} value={filtres.capacite}
          onChange={e => onChange({ ...filtres, capacite: e.target.value })}>
          <option value="">Toutes</option>
          <option value="1">1 personne</option>
          <option value="2">2 personnes</option>
          <option value="3">3 personnes</option>
          <option value="4">4 personnes</option>
        </select>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Prix maximum ($/nuit)</label>
        <input type="number" placeholder="Ex: 500" style={inputStyle}
          value={filtres.prix_max}
          onChange={e => onChange({ ...filtres, prix_max: e.target.value })} />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Chaîne hôtelière</label>
        <select style={inputStyle} value={filtres.chaine_id}
          onChange={e => onChange({ ...filtres, chaine_id: e.target.value })}>
          <option value="">Toutes les chaînes</option>
          {chaines.map(c => (
            <option key={c.id} value={c.id}>{c.nom}</option>
          ))}
        </select>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Catégorie</label>
        <select style={inputStyle} value={filtres.categorie}
          onChange={e => onChange({ ...filtres, categorie: e.target.value })}>
          <option value="">Toutes</option>
          {[1,2,3,4,5].map(n => (
            <option key={n} value={n}>{'★'.repeat(n)}</option>
          ))}
        </select>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Vue</label>
        <select style={inputStyle} value={filtres.vue}
          onChange={e => onChange({ ...filtres, vue: e.target.value })}>
          <option value="">Toutes</option>
          {['ville','mer','montagne','lac','fleuve','parc','panoramique','rivière','piste','port','jardin'].map(v => (
            <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>
          ))}
        </select>
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Commodités</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { key: 'wifi', label: 'WiFi' },
            { key: 'tv', label: 'Télévision' },
            { key: 'climatisation', label: 'Climatisation' },
          ].map(({ key, label }) => (
            <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
              <input type="checkbox" checked={filtres[key] || false}
                onChange={e => onChange({ ...filtres, [key]: e.target.checked })}
                style={{ accentColor: 'var(--bleu-moyen)', width: '15px', height: '15px' }} />
              {label}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => onChange({ date_debut: '', date_fin: '', capacite: '', prix_max: '', chaine_id: '', categorie: '', vue: '', wifi: false, tv: false, climatisation: false })}
        style={{
          width: '100%', padding: '10px',
          background: 'transparent', color: 'var(--texte-secondaire)',
          border: '0.5px solid #cdd8e8', borderRadius: 'var(--radius-sm)',
          fontSize: '13px', marginTop: '4px'
        }}
      >
        Réinitialiser les filtres
      </button>
    </div>
  )
}
