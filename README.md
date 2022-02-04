# cssvarenums

[![npm version](https://img.shields.io/npm/v/cssvarenums.svg)](https://www.npmjs.com/package/cssvarenums)

A template tag function which extracts CSS Custom Properties as JavaScript enums

## Install

```sh
npm i -D cssvarenums
```

## Usage

The expected usage for this project is when constructing frontend components which have separate `.css` and `.js` files. The expectation is you import the `.css` file into the `.js` file, run the imported string through the template tag function and return enums to be used within the JavaScript that relate back to the CSS Custom Properties found within the imported CSS.

Observe the following simple web component `.css` contents.
```css
:host {
  --toggle-handle-size: 1rem;
}

.toggle-handle {
  height: var(--toggle-handle-size);
  width: var(--toggle-handle-size);
}
```

Note: the following `.js` file is not possible without a build step to import `.html` and `.css` files as text. Additionally, this is prepared as a CommonJS export. Tooling is required to complete the ESM export shown below. I recommend [`rollup`](https://rollupjs.org) for both requirements but there are other options.

```js
import html from './template.html';
import css from './styles.css';
import cssvarenums from 'cssvarenums';

// Returns an object with an overloaded .toString() method
const { 
  TOGGLE_HANDLE_SIZE, 
  ...innerHTML
} = cssvarenums`<style>${css}</style>${html}`; 

class MyToggle extends HTMLElement {
  constructor() {
    super();  
    // This will call .toString(), returning the expected <style>...</style> string from above.
    this.attachShadow({ mode: 'open' }).innerHTML = innerHTML;
  }

  set size(value) {
    // Parsing the string from before will result in SCREAMING_SNAKE_CASE enums of CSS Custom Properties
    this.style.setProperty(TOGGLE_HANDLE_SIZE, value);
  }
}
```

