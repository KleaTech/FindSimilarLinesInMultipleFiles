import * as fs from 'fs'
import * as path from 'path'

const directory = process.argv[2]
if (!directory) throw "usage: index.js <directoryName>"
fs.accessSync(directory)
const files = fs.readdirSync(directory).map(f => path.join(directory, f))

let intersection
for (const file of files) {
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)
    if (!intersection) intersection = lines
    intersection = intersection.filter(v => lines.includes(v))
}

const output = intersection.join('\r\n')
fs.writeFileSync('output.txt', output)
