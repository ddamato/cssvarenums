# cssvarenums

[![npm version](https://img.shields.io/npm/v/cssvarenums.svg)](https://www.npmjs.com/package/cssvarenums)

A template tag function which extracts CSS Custom Properties as JavaScript enums

## Install

```sh
npm i -D cssvarenums
```

## Usage

The expected usage for this project is when constructing frontend components which have separate `.css` and `.js` files. The expectation is you import the `.css` file into the `.js` file, run the imported string through the template tag function and return enums to be used within the JavaScript that relate back to the CSS Custom Properties found within the imported CSS.

Observe the following simple web component
```css
:host {
  --toggle-handle-size: 1rem;
  --toggle-handle-color: #e0e0e0;
}

.toggle-handle {
  background-color: var(--toggle-handle-color);
  height: var(--toggle-handle-size);
  width: var(--toggle-handle-size);
}
```

Note: the following is not possible without a build step to import `.html` and `.css` files into a `.js` file. I recommend [`Rollup`](https://rollupjs.org) but there are other options.

```js
import html from './template.html';
import css from './styles.css';
import cssvarenums from 'cssvarenums';

class MyToggle extends HTMLElement {
  constructor() {
    super();
    // Returns an object with an overloaded .toString() method
    const resources = cssvarenums`<style>${css}</style>${html}`; 
    // This will call .toString(), providing the expected <style>...</style> string from above.
    this.attachShadow({ mode: 'open' }).innerHTML = resources;
  }

  set size(value) {
    // Parsing the string from before will result in SCREAMING_SNAKE_CASE enums of CSS Custom Properties
    this.style.setProperty(resources.TOGGLE_HANDLE_SIZE, value);
  }
}
```

