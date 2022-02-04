const cssvarenums = require('../index.js');
const { expect } = require('chai');

describe('cssvarenums', function () {
  
  it('should export as a function', function () {
    expect(cssvarenums).to.be.a('function');
  });

  it('should return an object', function () {
    const result = cssvarenums`<div>hello world</div>`;
    expect(result).to.be.an('object');
    expect(result.toString).to.be.a('function');
  });

  it('should return the given string', function () {
    const result = cssvarenums`<div>hello world</div>`;
    expect(`${result}`).to.equal('<div>hello world</div>')
  });

  it('should return string with expressions', function () {
    const exp = 'hello world';
    const result = cssvarenums`<div>${exp}</div>`;
    expect(`${result}`).to.equal('<div>hello world</div>');
  });

  it('should find variable assignments in given string', function () {
    const result = cssvarenums`<div style="--my-var-1:red">hello world</div>`;
    expect(result.MY_VAR_1).to.equal('--my-var-1');
  });

  it('should find variable usage in given string', function () {
    const result = cssvarenums`<div style="color: var(--my-var-1, red)">hello world</div>`;
    expect(result.MY_VAR_1).to.equal('--my-var-1');
  });

  it('should find variable assignments in given expression', function () {
    const css = `:host { --my-var-1: red }`;
    const result = cssvarenums`<style>${css}</style>`;
    expect(`${result}`).to.equal('<style>:host { --my-var-1: red }</style>');
    expect(result.MY_VAR_1).to.equal('--my-var-1');
  });

  it('should allow object destructuring', function () {
    const css = `:host { --my-var-1: red }`;
    const { MY_VAR_1, ...rest } = cssvarenums`<style>${css}</style>`;
    expect(`${rest}`).to.equal('<style>:host { --my-var-1: red }</style>');
    expect(MY_VAR_1).to.equal('--my-var-1');
  });

  it('should find variable usage in given expression', function () {
    const css = `:host { color: var(--my-var-1, red); }`;
    const result = cssvarenums`<style>${css}</style>`;
    expect(`${result}`).to.equal('<style>:host { color: var(--my-var-1, red); }</style>');
    expect(result.MY_VAR_1).to.equal('--my-var-1');
  });

  it('should find multiple variables in given expression', function () {
    const css = `
      :host { 
        --my-var-1: red; 
        --my-var-2: blue; 
        --my-var-3: var(--my-var-1, orange);
        color: var(--my-var-3, white);
        transform: rotate(--my-var-4);
      }
    `;
    const result = cssvarenums`<style>${css}</style>`;
    expect(`${result}`).to.equal('<style>' + css + '</style>');
    expect(result.MY_VAR_1).to.equal('--my-var-1');
    expect(result.MY_VAR_2).to.equal('--my-var-2');
    expect(result.MY_VAR_3).to.equal('--my-var-3');
    expect(result.MY_VAR_4).to.equal('--my-var-4');
  });

});

