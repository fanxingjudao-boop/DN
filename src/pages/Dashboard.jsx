import React from 'react'
import { Link } from 'react-router-dom'
import { getDataset } from '../components/data.js'

export default function Dashboard({ scenario }){
  const ds = getDataset(scenario)
  const kpi = ds.kpi

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <div className="h1">ダッシュボード</div>
          <div className="grid">
            <div className="col-4">
              <div className="muted">出荷</div>
              <div className="kpi">{kpi.ship}</div>
            </div>
            <div className="col-4">
              <div className="muted">受注遅延</div>
              <div className="kpi">{kpi.order_delay}</div>
            </div>
            <div className="col-4">
              <div className="muted">アラート状況</div>
              <div className="kpi">{kpi.alerts}</div>
            </div>
          </div>
          <div style={{marginTop:12}} className="muted">
            右上のシナリオ切替で「平常」⇔「事故」を切り替えられます。
          </div>
        </div>
      </div>

      <div className="col-6">
        <div className="card">
          <div className="h1">注目アラート</div>
          <table className="table">
            <thead>
              <tr><th>重要度</th><th>タイトル</th><th>タグ</th></tr>
            </thead>
            <tbody>
              {ds.alerts.map(a => (
                <tr key={a.id}>
                  <td>{a.severity}</td>
                  <td>{a.title}</td>
                  <td>{(a.tags||[]).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="col-6">
        <div className="card">
          <div className="h1">インシデント</div>
          {ds.incidents.length === 0 ? <div className="muted">なし</div> : (
            <table className="table">
              <thead>
                <tr><th>重大度</th><th>タイトル</th><th>更新日</th></tr>
              </thead>
              <tbody>
                {ds.incidents.map(i => (
                  <tr key={i.id}>
                    <td>{i.severity}</td>
                    <td><Link to={`/incident/${i.id}`}>{i.title}</Link></td>
                    <td>{i.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
