# Snabbdom-pragma
Well tested `NotReact.createElement` pragma although for Snabbdom !

[![npm version](https://img.shields.io/npm/v/snabbdom-pragma.svg?style=flat-square)](https://www.npmjs.com/package/snabbdom-pragma)
[![mit license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/Swizz/snabbdom-pragma/blob/master/LICENSE.md)

Snabbdom-pragma is the favorite way to use the [Facebook JSX](https://facebook.github.io/jsx/) syntax with the virtual DOM library [Snabbdom](https://github.com/snabbdom/snabbdom). Based on many principles, snabbdom-pragma, aim to handle the same api as [React.createElement](https://facebook.github.io/react/docs/react-api.html#createelement) to take all benefits from the most used transpilers proven by the wider React community.

Snabbdom-pragma draws its strength thanks to the [Snabbdom](https://github.com/snabbdom/snabbdom), [Facebook JSX](https://facebook.github.io/jsx/), and [React.createElement](https://facebook.github.io/react/docs/react-api.html#createelement) specs with some grounded tests.

## Table of Contents

<details>
<summary>Table of Contents</summary>

  - [Overview](#snabbdom-pragma)
  - [Getting started](#getting-started)
  - [Usage](#usage)
    * [Bublé](#bublé)
    * [Babel](#babel)
    * [Traceur](#traceur)
  - [JSX Features](#jsx-features)
    * [Elements](#elements)
    * [Attributes](#attributes)
    * [SVG](#svg)
  - [Snabbdom Features](#snabbdom-features)
    * [Modules object](#modules-object)
    * [Modules attribute](#modules-object)
  - ['NotReact' Features](#notreact-features)
    * [Components](#components)
  - [Misc](#misc)
</details>

## Getting started

To use snabbdom-pragma you need to download it thanks to your favorite JS package manager.

```sh
yarn add snabbdom-pragma
```

```sh
npm install --save snabbdom-pragma
```

Then you can replace your transpiler pragma by `Snabbdom.createElement` and dont miss to import the `createElement` function into your code.

```js
import Snabbdom from 'snabbdom-pragma'
```

## Usage

### Bublé
snabbdom-pragma works fine and is fully tested for [Bublé](https://buble.surge.sh/guide/)
```js
buble.transform(input, {
  jsx: 'Snabbdom.createElement'
})
```

### Babel
snabbdom-pragma works fine and is fully tested for [Babel](https://babeljs.io) with the
[transform-react-jsx](https://babeljs.io/docs/plugins/transform-react-jsx/) plugin enabled
```js
babel.transform(input, {
  plugins: ["transform-react-jsx", {
    pragma: 'Snabbdom.createElement'
  }]
});
```

### Traceur
snabbdom-pragma works fine and is fully tested for [Traceur](https://github.com/google/traceur-compiler)
```js
traceur.compile(input, {
  jsx: 'Snabbdom.createElement'
});
```

## JSX Features
### Elements
### Attributes
### SVG
## Snabbdom Features
### Modules object
### Modules attribute
## 'NotReact' Features
### Components

## Misc

- snabbdom-pragma follows the [Compatible Versioning: major.minor only](https://github.com/staltz/comver) convention.
- [Release notes](https://github.com/Swizz/snabbdom-pragma/releases) are [Keep a Changelog](http://keepachangelog.com/en/0.3.0/) compliants.
- SVG capable thanks to @jvanbruegge PR#4
- Documentation styling stolen at the [fly js](https://github.com/flyjs/fly) project
