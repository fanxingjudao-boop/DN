import React from 'react'
import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Search from './pages/Search.jsx'
import IncidentDetail from './pages/IncidentDetail.jsx'
import Knowledge from './pages/Knowledge.jsx'
import Playbooks from './pages/Playbooks.jsx'
import { useScenario } from './components/useScenario.js'

export default function App(){
  const { scenario, setScenario, banner } = useScenario()

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="row">
            <div className={banner.kind === 'incident' ? 'badge danger' : 'badge'}>
              <strong>統合支援デモ</strong>
              <span className="muted">|</span>
              <span>{banner.label}</span>
            </div>

            <div className="spacer" />

            <div className="row nav">
              <NavLink to="/dashboard" className={({isActive}) => isActive ? 'active' : ''}>Dashboard</NavLink>
              <NavLink to="/search" className={({isActive}) => isActive ? 'active' : ''}>Search</NavLink>
              <NavLink to="/knowledge" className={({isActive}) => isActive ? 'active' : ''}>Knowledge</NavLink>
              <NavLink to="/playbooks" className={({isActive}) => isActive ? 'active' : ''}>Playbooks</NavLink>
            </div>

            <div className="spacer" />

            <label className="muted">シナリオ</label>
            <select
              className="btn"
              value={scenario}
              onChange={(e)=>setScenario(e.target.value)}
              style={{padding:'8px 10px'}}
            >
              <option value="normal">Normal</option>
              <option value="incident">Ransomware Incident</option>
              <option value="infostealer">情報窃取（静かに進行）</option>
              <option value="vendor">委託先起点（サプライチェーン）</option>
            </select>
          </div>
          {banner.kind === 'incident' && (
            <div style={{marginTop:12}} className="card">
              <div className="row">
                <strong>重大インシデント進行中（S1）</strong>
                <span className="muted">影響: 出荷 / 受注 / ファイル共有</span>
                <span className="spacer" />
                <span className="pill">復旧進捗: 35%</span>
                <span className="pill">影響範囲: 広</span>
                <span className="pill">漏えい懸念: 評価中</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard scenario={scenario} />} />
          <Route path="/search" element={<Search scenario={scenario} />} />
          <Route path="/incident/:id" element={<IncidentDetail scenario={scenario} />} />
          <Route path="/knowledge" element={<Knowledge scenario={scenario} />} />
          <Route path="/playbooks" element={<Playbooks scenario={scenario} />} />
          <Route path="*" element={<div className="card">Not Found</div>} />
        </Routes>
      </div>
    </>
  )
}
