export function buildSearchDocs(ds){
  const docs = []
  const push = (type, item) => {
    const text = [
      item.title, item.name, item.summary, item.body,
      ...(item.tags || []),
      item.phase,
      JSON.stringify(item.timeline || []),
      JSON.stringify(item.incident_flags || []),
    ].filter(Boolean).join(' ')
    docs.push({
      id: item.id,
      type,
      title: item.title || item.name || item.id,
      summary: item.summary || '',
      severity: item.severity || item.criticality || '',
      tags: item.tags || [],
      updated: item.updated || '',
      _text: text
    })
  }
  ;(ds.incidents||[]).forEach(x=>push('incident', x))
  ;(ds.alerts||[]).forEach(x=>push('alert', x))
  ;(ds.assets||[]).forEach(x=>push('asset', x))
  ;(ds.knowledge||[]).forEach(x=>push('knowledge', x))
  ;(ds.playbooks||[]).forEach(x=>push('playbook', x))
  ;(ds.comms||[]).forEach(x=>push('comms', x))
  return docs
}
