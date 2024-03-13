import fs from 'fs'

export function writeJson(data: any, filePath: string) {
  const keyValueString = Object.entries(data)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')
  fs.writeFile(filePath, keyValueString, 'utf8', (err) => {
    if (err) {
      console.error('Error writing key-value pairs to file:', err)
      return
    }
    console.log('Key-value pairs have been written to file successfully.')
    return keyValueString
  })
}

export function readJson(filePath: string) {
  try {
    // Read the content of the text file synchronously
    const data = fs.readFileSync(filePath, 'utf8')

    const lines = data.trim().split('\n')
    const jsonObject: any = {}

    lines.forEach((line) => {
      const [key, value] = line.split(':').map((item) => item.trim())
      jsonObject[key] = value
    })
    console.log('Data from file:', jsonObject)

    return jsonObject
  } catch (err) {
    console.error('Error reading file:', err)
    return null
  }
}

export const readJsonA = readJson('data.txt')
export const readJsonB = readJson('data2.txt')

// const filePath = 'data.txt'
// const jsonObject = readJson(filePath)
// if (jsonObject !== null) {
//   console.log(jsonObject)
// }
