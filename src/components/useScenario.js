import { useEffect, useMemo, useState } from 'react'

const KEY = 'demo_scenario_mode'

export function useScenario(){
  const [scenario, setScenario] = useState('normal')

  useEffect(()=>{
    const v = localStorage.getItem(KEY)
    if (v === 'incident' || v === 'normal') setScenario(v)
  },[])

  useEffect(()=>{
    localStorage.setItem(KEY, scenario)
  },[scenario])

  const banner = useMemo(()=>{
    if (scenario === 'incident') return { kind:'incident', label:'Ransomware Incident モード' }
    return { kind:'normal', label:'Normal モード' }
  },[scenario])

  return { scenario, setScenario, banner }
}
