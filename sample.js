// import fs from 'fs'
// import readline from 'readline'

const fs = require('fs')
const readline = require('readline')

const monthObject = {
  'Jan': 0,
  'Feb': 1,
  'Mar': 2,
  'Apr': 3,
  'May': 4,
  'Jun': 5,
  'Jul': 6,
  'Aug': 7,
  'Sep': 8,
  'Oct': 9,
  'Nov': 10,
  'Dec': 11,
}

const displayFile = async (file) => {
  const stream = fs.createReadStream(file, 'utf8')
  const reader = readline.createInterface({ input: stream })
  const hostObject = {}
  const hoursObject = {}

  for await (const data of reader) {
    const array = data.split(' ')
    const host = array[0]
    const dateArray = array[3].replace('[', '').split(/\/|:/)
    const time = new Date(dateArray[2], monthObject[dateArray[1]], dateArray[0], dateArray[3], dateArray[4], dateArray[5])
    const hour = time.getHours()
    hostObject[host] = hostObject[host] ? hostObject[host] + 1 : 1
    hoursObject[hour] = hoursObject[hour] ? hoursObject[hour] + 1 : 1
  }
  console.log('- リモートホスト別のアクセス件数 -')
  Object.keys(hostObject).sort((a, b) => hostObject[b] - hostObject[a]).map(key => {
    console.log(`${key} : ${hostObject[key]}`)
  })
  console.log('- 時間帯別のアクセス件数 -')
  Object.keys(hoursObject).sort((a, b) => a - b).map(key => {
    console.log(`${key}:00 ~ ${key}:59 : ${hoursObject[key]}`)
  })
}

displayFile('./sample_log')
