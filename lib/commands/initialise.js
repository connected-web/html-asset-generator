const path = require('path')
const read = require('promise-path').read
const write = require('promise-path').write

function reportSuccess (files) {
  return `Successfully created ${files.length} resources`
}

function readSampleFiles (files) {
  return Promise.all([
    read(path.join(__dirname, '../../fixtures/init/sample-instructions.json')),
    read(path.join(__dirname, '../../fixtures/init/sample-html-template.hbs')),
    read(path.join(__dirname, '../../fixtures/init/sample-text-template.hbs')),
    read(path.join(__dirname, '../../fixtures/init/sample-data.json')),
    read(path.join(__dirname, '../../fixtures/init/sample-number-list.json'))
  ])
}

function writeSampleFiles (files) {
  /* Spread the file data */
  const sampleInstructionsFile = files[0]
  const sampleHtmlTemplateFile = files[1]
  const sampleTextTemplateFile = files[2]
  const sampleDataFile = files[3]
  const sampleNumberListFile = files[4]

  return Promise.all([
    write(path.join(global.instructionsPath, 'example-instructions.json'), sampleInstructionsFile),
    write(path.join(global.templatesPath, 'example-html-template.hbs'), sampleHtmlTemplateFile),
    write(path.join(global.templatesPath, 'example-text-template.hbs'), sampleTextTemplateFile),
    write(path.join(global.dataPath, 'example-data.json'), sampleDataFile),
    write(path.join(global.dataPath, 'example-number-list.json'), sampleNumberListFile)
  ])
}

function reportFailiure (ex) {
  throw new Error({ ex: ex, stack: ex.stack, message: 'Failed to complete work' })
}

function initialise () {
  return readSampleFiles().then(writeSampleFiles).then(reportSuccess).catch(reportFailiure)
}

module.exports = initialise
