# HAG - Output formats

HAG supports three types of output; text, JSON, and image (PNG).

## Text Renderer

HAG can generate any type of text template (assumes utf-8).

```json
{
  "asset": "example-text-asset.md",
  "template": "/example-text-template.hbs",
  "renderer": {
    "type": "text"
  },
  "data": {
    "$ref": "/data/example-data.json"
  }
}
```

## JSON Renderer

HAG makes a special case for JSON data so that it can be formatted nicely. Note: no template is required for the JSON renderer.

```json
{
  "asset": "example-json-asset.json",
  "renderer": {
    "type": "json",
    "spacing": "  "
  },
  "data": {
    "expected-output": {
      "$ref": "/data/example-data.json"
    }
  }
}
```

## Webshot Image Renderer (PNG)

HAG is primarily aimed at generating using images from HTML/CSS templates. It uses the `webshot` API which in turn runs on top of `phantom`.

Example using webshot render
```json
{
  "asset": "example-image-asset.png",
  "template": "/example-html-template.hbs",
  "renderer": {
    "type": "webshot",
    "size": {
      "width": 640,
      "height": 960
    }
  },
  "data": {
    "$ref": "/data/example-data.json"
  }
}
```
