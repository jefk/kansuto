import neatCsv from 'neat-csv'
import { Player } from './types'

const url =
  'https://docs.google.com/spreadsheets/d/1ZBxkZEsfwDsUpyire4Xb16er36Covk7nhR8BN_LPodI/export?format=csv&id=1ZBxkZEsfwDsUpyire4Xb16er36Covk7nhR8BN_LPodI&gid=1078039113'

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

const decodeSortaHex = (str: string, index: number) => {
  if (!str.charAt(index).match(/[A-Z]/)) {
    return str.charAt(index)
  }
  return str.charCodeAt(index) - 55
}

const parseScore = (textScore: string) => {
  const upper = textScore.toUpperCase()
  const decoded = Array(upper.length)
    .fill(0)
    .map((_, i) => decodeSortaHex(upper, i))
    .join('')

  return Number(decoded)
}

export default fetchPlayers
