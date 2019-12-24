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

const displayFile = async (startNumber, startDate = new Date(0), endDate = new Date()) => {
  const hostObject = {}
  const hoursObject = {}
  for (let i = startNumber; i < process.argv.length; i++) {
    const stream = fs.createReadStream(process.argv[i], 'utf8')
    const reader = readline.createInterface({ input: stream })

    for await (const data of reader) {
      const array = data.split(' ')
      const host = array[0]
      const dateArray = array[3].replace('[', '').split(/\/|:/)
      const time = new Date(dateArray[2], monthObject[dateArray[1]], dateArray[0], dateArray[3], dateArray[4], dateArray[5])
      const hour = time.getHours()
      if (startDate <= time && time <= endDate) {
        hostObject[host] = hostObject[host] ? hostObject[host] + 1 : 1
        hoursObject[hour] = hoursObject[hour] ? hoursObject[hour] + 1 : 1
      }
    }
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

if (process.argv[2] === '-t') {
  const startDate = new Date(process.argv[3])
  const endDate = new Date(process.argv[4])
  if ((startDate.toString() !== "Invalid Date") && (endDate.toString() !== "Invalid Date")) {
    displayFile(5, startDate, endDate)
  } else {
    console.log('Error: Invalid Date.')
  }
}else if (process.argv.length > 2) {
  displayFile(2)
} else {
  console.log('Usage: node index.js [options] [fileNames]')
  console.log('Options:')
  console.log('-t [dateString] [dateString]: Retrieve logs for a specified period.')
  console.log('Example1: node index.js sample1.txt sample2.txt sample3.txt')
  console.log('Example2: node index.js -t 2017/04/01 2017/04/30 sample4.txt sample5.txt')
}
