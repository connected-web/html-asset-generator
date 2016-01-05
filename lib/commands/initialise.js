const read = require('promise-path').read;
const write = require('promise-path').write;

function reportSuccess(files) {
    return `Successfully created ${files.length} resources`;
}

function readSampleFiles(files) {
    return Promise.all([
        read(__dirname + '/../../fixtures/init/sample-instructions.json'),
        read(__dirname + '/../../fixtures/init/sample-html-template.hbs'),
        read(__dirname + '/../../fixtures/init/sample-text-template.hbs'),
        read(__dirname + '/../../fixtures/init/sample-data.json')
    ]);
}

function writeSampleFiles(files) {
    /* Spread the file data */
    var sampleInstructionsFile = files[0],
        sampleHtmlTemplateFile = files[1],
        sampleTextTemplateFile = files[2],
        sampleDataFile = files[3];

    return Promise.all([
        write(global.instructionsPath + '/example-instructions.json', sampleInstructionsFile),
        write(global.templatesPath + '/example-html-template.hbs', sampleHtmlTemplateFile),
        write(global.templatesPath + '/example-text-template.hbs', sampleTextTemplateFile),
        write(global.dataPath + '/example-data.json', sampleDataFile)
    ]);
}

function reportFailiure(ex) {
    throw {
        ex: ex,
        stack: ex.stack,
        message: 'Failed to complete work'
    }
}

function initialise() {
    return readSampleFiles()
        .then(writeSampleFiles)
        .then(reportSuccess)
        .catch(reportFailiure);
}

module.exports = initialise;
