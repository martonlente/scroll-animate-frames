# Scroll animate frames
Scroll animate frames is a jQuery plugin, that animates frames on scroll, interactively playing an image sequence. The animation's frames are displayed accordingly as the user scrolls down or up, playing the animation forwards or backwards. The plugin is suitable to make image sequences interactive exported from videos, or rendered in 3D software like Blender. :movie_camera:

Scroll animate frames currently plays in full screen, where the HTML snippet is inserted into the DOM. The plugin scales images as large as possible within the full screen container without cropping or stretching them.

The plugin detects images' loading by default, and only starts playing if all images are loaded. Scroll animate frames supports all devices and screen sizes, and also handles window resize events.

## Version
0.1.1


## Installation
Install [jQuery](https://github.com/jquery/jquery) with one of the several options.

Include Scroll animate frames’ CSS and JS. Place the `<link>` tag in the `<head>` for CSS, and the `<script>` tag for JavaScript after jQuery, and before the closing `</body>`.

```html
<link href="css/style.css" rel="stylesheet">
```

```html
<script src="js/jquery.scroll-animate-frames"></script>
```

## Usage
Insert this HTML snippet into the DOM, where you want the animation to play in full screen on scroll.

```html
<div class="saf">
  <div class="saf-helper-placeholder"></div>
  <div class="saf-helper-imgs">
    <img alt="" class="saf-img" src="img/saf-img-1.jpg"/>
  </div>
</div>
```

The images' filenames must match the HTML snippet's formula – starting with the filename base like `saf-img`, followed by a dash `-` and ending with the images' frame number like `1` with no extra decimal places, but filename bases can be custom (see below). Custom image filename bases must match within the HTML and the JavaScript.

> Nesting the player in a non-full-width container is currently not not supported.

Initialize your player.

```javascript
$('.saf').saf();
```

### Options
| Name | Default | Description |
| --- | --- | --- |
| `fileName` | `saf-img` | Sets the filename base, without the counter |
| `imgCount` | `25` | Sets the frame range to be played |
| `speed` | `2` | Sets the play speed or scroll sensitivity, from `1` to `3`, the `1` being the slowest. |

Example usage:
```javascript
$('.saf').saf({
  fileName: 'custom-img', // Sets custom filename base
  imgCount: 100, // Sets custom frame range to be played
  speed: 3 // Sets maximum play speed
});
```

## Roadmap
- Add example interactive
- Add generate image alt tags
- Add automatic custom filename support
- Add option for custom player background
- Add option for custom player sizing
- Add style prefixes for better compatibility

## Contributing
Pull requests are not yet welcome. For support requests, please open an issue first to discuss what you would like to change.

## License
[Apache 2.0](https://github.com/martonlente/scroll-animate-frames/blob/main/LICENSE)
