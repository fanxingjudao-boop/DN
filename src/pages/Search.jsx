import React, { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { Link } from 'react-router-dom'
import { getDataset } from '../components/data.js'
import { buildSearchDocs } from '../components/searchIndex.js'

const TYPES = [
  { id:'all', label:'すべて' },
  { id:'incident', label:'インシデント' },
  { id:'alert', label:'アラート' },
  { id:'asset', label:'資産' },
  { id:'knowledge', label:'ナレッジ' },
  { id:'playbook', label:'プレイブック' },
  { id:'comms', label:'通知文面' },
]

export default function Search({ scenario }){
  const ds = getDataset(scenario)
  const docs = useMemo(()=>buildSearchDocs(ds),[ds])
  const fuse = useMemo(()=>new Fuse(docs, {
    keys: ['title','summary','tags','_text'],
    threshold: 0.35,
    ignoreLocation: true,
  }),[docs])

  const [q, setQ] = useState('')
  const [type, setType] = useState('all')

  const results = useMemo(()=>{
    const base = q.trim() ? fuse.search(q).map(r=>r.item) : docs
    return type === 'all' ? base : base.filter(x=>x.type===type)
  },[q,type,docs,fuse])

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <div className="h1">検索</div>
          <div className="row" style={{alignItems:'stretch'}}>
            <input className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder="例: 暗号化 / バックアップ / AD / 出荷停止 / MFA" />
            <select className="btn" value={type} onChange={e=>setType(e.target.value)}>
              {TYPES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
          <div className="muted" style={{marginTop:10}}>{results.length} 件</div>
        </div>
      </div>

      <div className="col-12">
        <div className="card">
          <table className="table">
            <thead>
              <tr><th>種別</th><th>タイトル</th><th>概要</th><th>タグ</th></tr>
            </thead>
            <tbody>
              {results.map(r => (
                <tr key={r.type+':'+r.id}>
                  <td>{r.type}</td>
                  <td>
                    {r.type === 'incident' ? <Link to={`/incident/${r.id}`}>{r.title}</Link> : r.title}
                  </td>
                  <td className="muted">{r.summary}</td>
                  <td>{(r.tags||[]).slice(0,5).map(t=><span key={t} className="pill">{t}</span>)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
