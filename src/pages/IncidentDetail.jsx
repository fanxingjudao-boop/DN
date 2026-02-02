import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDataset } from '../components/data.js'

function storeKey(incidentId){ return `pb_checks_${incidentId}` }

export default function IncidentDetail({ scenario }){
  const { id } = useParams()
  const ds = getDataset(scenario)
  const incident = useMemo(()=> (ds.incidents||[]).find(x=>x.id===id),[ds,id])

  const [checks, setChecks] = useState(()=>{
    try{
      const raw = localStorage.getItem(storeKey(id))
      return raw ? JSON.parse(raw) : {}
    }catch{ return {} }
  })

  if (!incident) return <div className="card">インシデントが見つかりません。</div>

  const playbooks = (ds.playbooks||[]).filter(pb => (incident.recommended_playbooks||[]).includes(pb.id))

  const toggle = (stepId) => {
    const next = { ...checks, [stepId]: !checks[stepId] }
    setChecks(next)
    localStorage.setItem(storeKey(id), JSON.stringify(next))
  }

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <div className="h1">インシデント詳細</div>
          <div style={{fontSize:18,fontWeight:700}}>{incident.title}</div>
          <div className="muted" style={{marginTop:6}}>{incident.summary}</div>
          <div style={{marginTop:10}}>
            {(incident.tags||[]).map(t => <span key={t} className="pill">{t}</span>)}
          </div>
        </div>
      </div>

      <div className="col-6">
        <div className="card">
          <div className="h1">タイムライン</div>
          <table className="table">
            <thead><tr><th>時点</th><th>イベント</th><th>症状</th><th>ヒント</th></tr></thead>
            <tbody>
              {(incident.timeline||[]).map((e,idx)=>(
                <tr key={idx}>
                  <td>{e.t}</td>
                  <td>{e.what}</td>
                  <td className="muted">{e.symptom}</td>
                  <td className="muted">{e.hint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-6">
        <div className="card">
          <div className="h1">推奨プレイブック</div>
          {playbooks.length === 0 ? <div className="muted">このモードでは推奨プレイブックがありません。</div> : playbooks.map(pb => (
            <div key={pb.id} style={{marginBottom:16}}>
              <div style={{fontWeight:700}}>{pb.title}</div>
              <div className="muted">{pb.phase}</div>
              <div style={{marginTop:8}}>
                {pb.steps.map(s => (
                  <label key={s.id} style={{display:'flex',gap:10,alignItems:'flex-start',margin:'8px 0'}}>
                    <input type="checkbox" checked={!!checks[s.id]} onChange={()=>toggle(s.id)} style={{marginTop:3}}/>
                    <span>{s.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-12">
        <div className="card">
          <div className="h1">関連資産</div>
          <table className="table">
            <thead><tr><th>名前</th><th>重要度</th><th>概要</th><th>事故フラグ</th></tr></thead>
            <tbody>
              {(incident.related_assets||[]).map(aid => ds.assets.find(a=>a.id===aid)).filter(Boolean).map(a=>(
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.criticality}</td>
                  <td className="muted">{a.summary}</td>
                  <td>{(a.incident_flags||[]).map(f=><span key={f} className="pill">{f}</span>)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
