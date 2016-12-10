# HTML Asset Generator (HAG)
The generator processes `instructions` to `render` `assets` based on `templates` combined with `data`.

Supports rendering of HTML to Images using `webshot`, and creation of text based assets such as JSON, CSS, and HTML using Handlebar templates.

[![Dependency Status](https://david-dm.org/connected-web/node-hag.svg)](https://david-dm.org/connected-web/node-hag)

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
`npm install node-hag -g`

## Getting started
1. Run `hag --help` to view up-to-date Help and Instructions
2. Run `hag init` to create an example project in the current working directory
3. Run `hag generate` to compiled the instructions and generate assets

If that all worked as expected, take a closer look at the `instructions` folder, and the resulting `build` folder to see the generated assets.

## Guides
- [Command line arguments](docs/command-line-args.md)
- [Instructions, data, and templates](docs/instructions-data-templates.md)
- [Output formats; text, json, image](docs/output-formats.md)
- [Samples and use cases](docs/samples-and-use-cases.md)


## Changelog

See: [CHANGELOG.md](CHANGELOG.md)
