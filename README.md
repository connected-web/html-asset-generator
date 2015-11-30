# Generator
The generator processes `instructions` to `render` `assets` based on `templates` combined with `data`.

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
