import React from 'react'
import { getDataset } from '../components/data.js'

export default function Playbooks({ scenario }){
  const ds = getDataset(scenario)

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <div className="h1">プレイブック一覧</div>
          <div className="muted">事故対応を「読む」ではなく「手順として引く」ための形です（デモなので安全なダミー）。</div>
        </div>
      </div>

      {ds.playbooks.map(pb => (
        <div key={pb.id} className="col-12">
          <div className="card">
            <div style={{fontSize:18,fontWeight:700}}>{pb.title}</div>
            <div className="muted">{pb.phase}</div>
            <div style={{marginTop:8}}>
              {(pb.tags||[]).map(t => <span key={t} className="pill">{t}</span>)}
            </div>
            <ol style={{marginTop:10}}>
              {pb.steps.map(s => <li key={s.id} style={{margin:'6px 0'}}>{s.text}</li>)}
            </ol>
          </div>
        </div>
      ))}
    </div>
  )
}
