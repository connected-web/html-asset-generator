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
```npm install node-hag```

## Commands

After putting in lots of effort to make the CLI friendly, this looks a bit silly:
* TODO: Make this available as a clean command line interface.

1. Run `node node_modules/node-hag --help` to view up-to-date Help and Instructions
1. Run `node node_modules/node-hag init` to create an example project in the current working directory
1. Run `node node_modules/node-hag generate` to compiled the instructions and generate assets

## Changelog

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
