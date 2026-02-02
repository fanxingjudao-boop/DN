import React from 'react'
import { getDataset } from '../components/data.js'

export default function Knowledge({ scenario }){
  const ds = getDataset(scenario)

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <div className="h1">ナレッジ</div>
          <div className="muted">事故モードでは「初動」「症状の時間経過」「対外文面」が固定で見えるようにしています。</div>
        </div>
      </div>

      {ds.knowledge.map(k => (
        <div key={k.id} className="col-12">
          <div className="card">
            <div style={{fontSize:18,fontWeight:700}}>{k.title}</div>
            <div style={{marginTop:8}}>
              {(k.tags||[]).map(t => <span key={t} className="pill">{t}</span>)}
            </div>
            <div className="muted" style={{marginTop:10}}>{k.summary}</div>
            <div style={{marginTop:10,whiteSpace:'pre-wrap'}}>{k.body}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
