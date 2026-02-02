import normal from '../data/normal/dataset.json'
import incident from '../data/incident/dataset.json'

export function getDataset(scenario){
  return scenario === 'incident' ? incident : normal
}
