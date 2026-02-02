import normal from '../data/normal/dataset.json'
import incident from '../data/incident/dataset.json'
import infostealer from '../data/infostealer/dataset.json'
import vendor from '../data/vendor/dataset.json'

export function getDataset(scenario){
  if (scenario === 'incident') return incident
  if (scenario === 'infostealer') return infostealer
  if (scenario === 'vendor') return vendor
  return normal
}
