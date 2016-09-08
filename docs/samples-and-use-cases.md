# HAG - Samples and Use Cases

## Using a background image

If you want to use a background image as part of a template; you can either host the file in `data`, e.g. in `data/images/` or in your `templates` directory.

In this example, we have an instruction to render a card image, using a background image saved in the `/data/images` folder

The instruction `instructions/render-cards.json`:
```json
[{
    "asset": "images/cards/contact/false-contact.png",
    "template": "/cards/event-contact.html",
    "renderer": {
        "type": "webshot",
        "size": {
            "width": 640,
            "height": 960
        }
    },
    "data": {
        "$ref": "data/contacts/false-contact.json"
    }
}]
```

The data `false-contact.json`:
```json
{
  "title": "False Contact",
  "instructions": ["As you approach the location of the blip, your scanner stops making noise.", "Must have been a false positive."],
  "background": "/data/images/false-contact.png",
  "theme": {
      "primaryCardColour": "#002C67",
      "secondaryCardColour": "#333333"
  },
  "asset-type": "contact",
  "asset-id": "false-contact"
}
```

The template `event-contact.html`:
```html
<html>

<head>
    <link href="https://fonts.googleapis.com/css?family=Droid+Sans" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="/templates/cards/cards.css" type="text/css">
    <style>
        box {
            border-color: {{theme.secondaryCardColour}};
        }
        table.grid {
            background-image: url('{{background}}');
            background-position: center center;
        }
        table.grid tr.top {
            background: {{theme.primaryCardColour}};
        }
        table.grid tr.middle {
        }
        label.title {
            color: white;
        }
    </style>
</head>

<body>
<renderframe>
    <box>
        <table class="grid">
            <tr class="top">
                <td>
                    <label class="title">{{title}}</label>
                </td>
            </tr>
            <tr class="middle">
                <td>&nbsp;</td>
            </tr>
            <tr class="bottom">
                <td>
                    <label class="instructions">{{#each instructions}}<p>{{this}}</p>{{/each}}</label>
                </td>
            </tr>
        </table>
    </box>
</renderframe>
</body>

</html>
```

Combine this all together using `hag generate`, and the line `background-image: url('{{background}}');` in `event-contact.html` is replaced with `/data/images/false-contact.png`, which is served up from the local file system. During this step webshot loads up a headless webbrowser pointing at the HTML/CSS template, and renders out `images/cards/contact/false-contact.png`
