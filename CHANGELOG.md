## Changelog
### v1.3.1
- Support JSON `$ref` fields in data when rendering instructions

### v1.3.0
- Updated webshot, yargs, and favicon to latest versions

### v1.2.1
- Update package dependencies to latest versions

### v1.2.0
- Added `json` renderer type that skips template and renders directly to file
- Added `{{json data}}` handlebars helper to render JSON out in other templates

### v1.1.8
- Added glob matcher to command line to limit which instructions are processed
- Added example commands to command line help

### v1.1.7
- Updated outdated packages to latest versions

### v1.1.6
- Fix issue with non-referenced data defaulting to duplicate `default` key
- Used `sha1` to generate a hash of the data to prevent duplicate renders

### v1.1.5
- Fix issue with completed instruction count after sequencing changes

### v1.1.4
- Added version information to command line help
- Added version command to command line interface

### v1.1.3
- Changed sequencing order so that instruction files are processed sequentially

### v1.1.2
- Removed `lib/path` methods, replaced with `promise-path` library

### v1.1.1
- Added static hosting for `/data`, `/instructions`, `/templates`, and `/output` when server runs
  - These are virtual paths based on local paths
  - Can be used to access local files from templates

- `/data/` in `{"$ref": "/data/path.json"}` will be mapped to the locally hosted data files
- Added tests for `API.host`

### v1.1.0
- Made the clean step on generate an option: `-c` or `--clean`
- Made tests more reliable

### v1.0.9
- Added tests for `API.defaultOptions`
- Renamed tests to `API.generate` and `API.init` to provide documentation
- Fix line ending in `bin/hag` to fix `env: node\r: No such file or directory` issue on UNIX systems

### v1.0.8 (Retracted)
- Added formal tests
- Fixed work count on completion
- Changed internal API logging to call `options.serverLog`, allowing for override

### v1.0.7
- Display help text for unrecognised command

### v1.0.6
- Refactored `generator.js` so library can be used as an API
  - `const hag = require('node-hag');
  - `const options = hag.defaultOptions;`
  - `hag.init(options)`
  - `hag.generate(options)`

- Added default options file
- Implemented `denodeify` for promise conversion, in place of `pcall`

### v1.0.5
- Attempting to fix install command for Mac

### v1.0.4
- Updated documentation

### v1.0.3
- Enabled global binary support on install, under the command alias `hag`

### v1.0.2
- Fixed Text renderer bug - non-passage of data

### v1.0.1
- First library release
- Supports `generator init`
- Supports `generator generate`
- Supports `generator --help`
- Supports image rendering based on HTML/CSS templates using `webshot`

### v1.0.0 (Retracted)
- Retracted, missing files in `npm` package
