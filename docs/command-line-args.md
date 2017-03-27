# HAG - Command line arguments

You can check these at any time by running `hag` or `hag help`.

Default:
```
HTML Asset Generator 1.3.1 (HAG)
Usage: node generator <command> <args>

Commands:
  generate [fileglob]  Generate assets based on instructions
  host                 Host the asset server without processing instructions
  init                 Create initial folders, templates, and instructions
  version              Reports the current version (1.3.1)

Options:
  -p, --port              Port number for local template server [default: 12020]
  -t, --templatesPath     Template directory              [default: "templates"]
  -o, --outputPath        Output directory for assets         [default: "build"]
  -i, --instructionsPath  Instructions matcher         [default: "instructions"]
  -c, --clean             Clean the output directory when generating assets
                                                                [default: false]
  -h, --help              Help and Instructions                        [boolean]

Examples:
  hag init
  hag generate
  hag generate **/*.json
  hag host
  hag version

HAG is available on an ISC License, created by John Beech aka Markavian, 2016
```

## Generate : `hag generate [fileglob]`

Generate assets based on instructions. The optional fileglob argument specifies a file or a file pattern for instructions to execute. By default hag runs against all `*.json` files in the `instructions` folder (see the `-i` option).

For further information on generate, see the guide : [instructions, data, and templates](instructions-data-templates.md).

Sample output:

```
Active command: generate
Render server running at http://localhost:12020
Fetching http://localhost:12020/instructions/example-instructions.json
Rendering http://localhost:12020/example-html-template.hbs to build/example-image-asset.png using /example-html-template.hbs/example-title/data
Rendering http://localhost:12020/example-text-template.hbs to build/example-text-asset.md using /example-text-template.hbs/example-title/data
Rendering data direct to build/example-json-asset.json
Served templates/example-text-template.hbs with data { title: 'Example Title',
  theme: { backgroundColor: '#E84', fontColor: '#222' },
  author: 'Connected Web' }
Served templates/example-html-template.hbs with data { title: 'Example Title',
  theme: { backgroundColor: '#E84', fontColor: '#222' },
  author: 'Connected Web' }
Completed work OK: 3, instructions total
```

## Host : `hag host`

This isn't very useful right now; when hag is generating it hosts a local webserver for webshot to access. This feature can enable you to debug and preview templates, but is probably a mystery on its own.

Sample output:
```
Active command: host
Render server running at http://localhost:12020
```

## Init : `hag init`

Init creates files for a sample project; allowing you to quickly setup a new render pipeline.

After running init for the first time; familiarise yourself with the files it creates, then run `hag generate` to render some output.

Sample output:
```
Active command: init
Successfully created 4 resources
```

## Version : `hag version`

Version reports the current version; that's all. Unlike the other commands, it doesn't output the active command at the top.

Sample output:
```
1.3.1
```
