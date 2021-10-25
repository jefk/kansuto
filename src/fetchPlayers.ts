import neatCsv from 'neat-csv'
import { Player } from './types'

const url =
  'https://docs.google.com/spreadsheets/d/1ZBxkZEsfwDsUpyire4Xb16er36Covk7nhR8BN_LPodI/export?format=csv&id=1ZBxkZEsfwDsUpyire4Xb16er36Covk7nhR8BN_LPodI&gid=1078039113'

const encodings = { A: '10', B: '11', C: '12', D: '13', E: '14', F: '15', G: '16' }

const fetchPlayers = async () => {
  const records = await fetch(url)
    .then((res) => res.text())
    .then(neatCsv)

  console.log(`Fetched ${records.length} players from spreadsheet`)

  return records
    .filter((record) => record.Name)
    .map((record) => {
      return {
        name: record.Name,
        score: parseScore(record.Score),
        hardware: record['Platform'],
        playStyle: record['Style'],
        proof: record.Proof,
      } as Player
    })
}

const parseScore = (textScore) => {
  let decoded = textScore
  Object.entries(encodings).find(([letter, replacement]) => {
    decoded = decoded.replace(letter, replacement)
  })
  return Number(decoded)
}

export default fetchPlayers
