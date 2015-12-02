# Node HAG - The HTML Asset Generator
The generator processes `instructions` to `render` `assets` based on `templates` combined with `data`.

Supports rendering of HTML to Images using `webshot`, and creation of text based assets such as JSON, CSS, and HTML using Handlebar templates.

## Key terms
- Instruction - a JSON block that specifies what to render
- Asset - a useful item to be generated, such as an image, HTML, text, or JSON file
- Template - a cookie-cutter layouts that can be fed with data
- Renderer - the method used to combine the template, with the data, and then save it out as an asset
- Data  - JSON data that can be fed into templates to create an asset

## Project structure
- `generator.js` - the entry point to run the generator
- `build` - the target directory for produced assets
- `templates` - a folder of usable templates
- `templates/template-name` - an individual template
- `instructions` - a folder full of data to be rendered

## Installation
```npm install node-hag -g```

## Getting started

1. Run `hag --help` to view up-to-date Help and Instructions
1. Run `hag init` to create an example project in the current working directory
1. Run `hag generate` to compiled the instructions and generate assets

If that all worked as expected, take a closer look at the `instructions` folder, and the resulting `build` folder to see the generated assets.

## Changelog

### v1.0.8
* Added formal tests
* Fixed work count on completion
* Changed internal API logging to call `options.serverLog`, allowing for override

### v1.0.7
* Display help text for unrecognised command

### v1.0.6
* Refactored `generator.js` so library can be used as an API
  * `const hag = require('node-hag');
  * `const options = hag.defaultOptions;`
  * `hag.init(options)`
  * `hag.generate(options)`
* Added default options file
* Implemented `denodeify` for promise conversion, in place of `pcall`

### v1.0.5
* Attempting to fix install command for Mac

### v1.0.4
* Updated documentation

### v1.0.3
* Enabled global binary support on install, under the command alias `hag`

### v1.0.2
* Fixed Text renderer bug - non-passage of data

### v1.0.1
* First library release
* Supports `generator init`
* Supports `generator generate`
* Supports `generator --help`
* Supports image rendering based on HTML/CSS templates using `webshot`

### v1.0.0 (Retracted)
* Retracted, missing files in `npm` package
