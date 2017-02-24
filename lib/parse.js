import args from 'args'
import translate from 'email-lang'
import fs from 'fs'
import path from 'path'

args
  .option('file', 'The file containing the email text you want to parse', 'email.txt')
  .option('dir', 'The directory containing the email text files you want to parse', 'emails-directory')
  .option('out-file', 'The output file in which you want the emails to be parsed', 'emails.json')

const flags = args.parse(process.argv)
if (flags.file) {
  console.log(`Parsing file ${flags.file}`)
  try {
    let emails = translate(fs.readFileSync(flags.file, 'utf8'))
    fs.writeFileSync(flags.outFile, JSON.stringify(emails, null, 2), 'utf8')
  } catch (err) {
    console.error(err)
    process.exit(2)
  }
} else if (flags.dir) {
  console.log(`Parsing files from directory ${flags.dir}`)
  let allFiles = fs.readdirSync(flags.dir)
  let files = allFiles.filter((f) => f.match('.txt$'))
  let emails = []
  files.map((f) => {
    try {
      let e = translate(fs.readFileSync(path.join(flags.dir, f), 'utf8'))
      emails = emails.concat(e)
    } catch (err) {
      console.error(err)
      process.exit(2)
    }
  })
  if (emails.length > 0) {
    fs.writeFileSync(flags.outFile, JSON.stringify(emails, null, 2), 'utf8')
  }
} else {
  console.error(`At least one between 'file' or 'dir' needs to be specified`)
  process.exit(1)
}

console.log(`Parsed emails have been saved in ${flags.outFile}`)
process.exit(0)
