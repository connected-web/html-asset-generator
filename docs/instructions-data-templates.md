# HAG - Instructions, Data, and Templates

The generator processes `instructions` to `render` `assets` based on `templates` combined with `data`.

## Instructions

Instructions say what to render; they are the glue that join data, templates, and a renderer to produce some useful output.

## Data

Data is any amount of JSON data; objects, arrays, strings, numbers.

## Templates

Templates are text based `handlebars` templates that can process data and turn it into useful output.

## Render

When you run `hag generate`, the instructions are read, the data is fed into a template, and the template is then rendered and saved to an *output file* or *asset*.
