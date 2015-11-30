const write = require('../path/write');

const sampleInstructionsFile = JSON.stringify([]);
const sampleTemplateFile = '{{title}} : {{theme.backgroundColor}}, {{theme.fontColor}}';
const sampleDataFile = JSON.stringify({
    title: 'Example Template',
    theme: {
        backgroundColor: '#E84',
        fontColor: '#222'
    }
});

function reportPlan() {
    console.log('Creating the following directories:');
    console.log('', 'Instructions', global.instructionsPath);
    console.log('', 'Templates', global.templatesPath);
    console.log('', 'Data', global.dataPath);
    console.log('', 'Output', global.outputPath)
}

function reportSuccess() {
    console.log('Created the following resources:');
    console.log('', global.instructionsPath + '/instructions-example.json');
    console.log('', global.templatesPath + '/template-example.hbs');
    console.log('', global.dataPath + '/data-example.json');
}

function initialise() {
    return Promise.all([
        write(global.instructionsPath + '/instructions-example.json', sampleInstructionsFile),
        write(global.templatesPath + '/template-example.hbs', sampleTemplateFile),
        write(global.dataPath + '/data-example.json', sampleDataFile)
    ]).then(reportSuccess);
}

module.exports = initialise;
