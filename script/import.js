/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const parse = require('csv-parse')
// const fetch = require('node-fetch')

// const url =
//   'https://docs.google.com/spreadsheets/d/1ZBxkZEsfwDsUpyire4Xb16er36Covk7nhR8BN_LPodI/export?format=csv&id=1ZBxkZEsfwDsUpyire4Xb16er36Covk7nhR8BN_LPodI&gid=1078039113'

// fetch(url)
//   .then((res) => res.text())
//   .then(console.log)

const encodings = { A: '10', B: '11', C: '12', D: '13', E: '14', F: '15', G: '16' }

const parseScore = (textScore) => {
  let decoded = textScore
  Object.entries(encodings).find(([letter, replacement]) => {
    decoded = decoded.replace(letter, replacement)
  })
  return Number(decoded)
}

let records = []

function readRecord() {
  let record
  while ((record = this.read())) {
    records.push({
      name: record.Name,
      score: parseScore(record.Score),
      hardware: record['Emu/Cons'],
      playStyle: record['Tap/DAS'],
      proof: record.Proof,
    })
  }
}

function write(records) {
  fs.writeFileSync('data/leaderboard.json', JSON.stringify(records))
  console.log(`${records.length} records`)
}

fs.readFile('data/example.csv', 'utf8', function (err, data) {
  if (err) throw err

  parse(data, {
    columns: true,
    skip_empty_lines: true,
  })
    .on('readable', readRecord)
    .on('end', () => write(records))
})
