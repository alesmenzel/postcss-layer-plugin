# PostCSS layer plugin

PostCSS plugin that wraps the whole stylesheet in a specified @layer.

What are layers? - See https://developer.mozilla.org/en-US/docs/Web/CSS/@layer

## Installation

```sh
npm install --save-dev postcss postcss-focus
```

## Example

The following css

```css
.btn {
  padding: 12px;
  color: gray;
}

.btn-danger {
  padding: 12px;
  color: red;
}
```

will be converted to

```css
/* You can change the name of the layer in the plugin options */
@layer default {
  .btn {
    padding: 12px;
    color: gray;
  }

  .btn-danger {
    padding: 12px;
    color: red;
  }
}
```

## Usage

Add the plugin to your PostCSS plugin configuration.

If you are using webpack, it could look like this:

```js
import layer from '@alesmenzel/postcss-layer-plugin'

// your webpack config
return {
  // ...
  module: {
    rules: [
      {
        use: [
          {
            loader: 'css-loader',
            // css-loader options
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer(),
                  layer({
                    layerName: 'base', // Default name is "default".
                  }),
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
}
```
