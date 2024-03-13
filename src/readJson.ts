import fs from 'fs'
const filePath = 'data.txt'

export function readJson() {
  try {
    // Read the content of the text file synchronously
    const data = fs.readFileSync(filePath, 'utf8')

    const lines = data.trim().split('\n')
    const jsonObject: any = {}

    lines.forEach((line) => {
      const [key, value] = line.split(':').map((item) => item.trim())
      jsonObject[key] = value
    })

    return jsonObject
  } catch (err) {
    console.error('Error reading file:', err)
    return null
  }
}

const jsonObject = readJson()
if (jsonObject !== null) {
  console.log(jsonObject)
}
