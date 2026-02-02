import { useEffect, useMemo, useState } from 'react'

const KEY = 'demo_scenario_mode'
const ALLOWED = ['normal','incident','infostealer','vendor']

export function useScenario(){
  const [scenario, setScenario] = useState('normal')

  useEffect(()=>{
    const v = localStorage.getItem(KEY)
    if (ALLOWED.includes(v)) setScenario(v)
  },[])

  useEffect(()=>{
    localStorage.setItem(KEY, scenario)
  },[scenario])

  const banner = useMemo(()=>{
    switch(scenario){
      case 'incident': return { kind:'incident', label:'Ransomware Incident モード' }
      case 'infostealer': return { kind:'incident', label:'情報窃取（静かに進行）モード' }
      case 'vendor': return { kind:'incident', label:'委託先起点（サプライチェーン）モード' }
      default: return { kind:'normal', label:'Normal モード' }
    }
  },[scenario])

  return { scenario, setScenario, banner }
}
