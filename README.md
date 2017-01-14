# snabbdom-pragma
Well tested `NotReact.createElement` pragma although for snabbdom !

## In brief
The main goal of [`snabbdom-pragma`](/Swizz/snabbdom-pragma) is to handle the same api as [`React.createElement`](https://facebook.github.io/react/docs/react-api.html#createelement)
to allow [`snabbdom`](/snabbdom/snabbdom) users  
to take all benefits from transpiler which are looking for React [pragma compatibilities](#Compatibilities).

## Getting started

To use [`snabbdom-pragma`](/Swizz/snabbdom-pragma) you need to download it thanks to your favorite JS package manager.

```sh
yarn add snabbdom-pragma
```

```sh
npm install --save snabbdom-pragma
```

Then replace your transpiler pragma by `Snabbdom.createElement`.

Dont miss to import the `createElement` function into your code.

```js
import Snabbdom from 'snabbdom-pragma'
```

## Compatibilities

### Bublé
[`snabbdom-pragma`](/Swizz/snabbdom-pragma) is fully tested for [Bublé](https://buble.surge.sh/guide/)
```js
buble.transform(input, {
  jsx: 'Snabbdom.createElement'
})
```

### Babel
[`snabbdom-pragma`](/Swizz/snabbdom-pragma) is fully tested for [Babel](https://babeljs.io) with the
[transform-react-jsx](https://babeljs.io/docs/plugins/transform-react-jsx/) plugin enabled
```js
babel.transform(input, {
  plugins: ["transform-react-jsx", {
    pragma: 'Snabbdom.createElement'
  }]
});
```

## Misc

- [`snabbdom-pragma`](/Swizz/snabbdom-pragma) follows the [Compatible Versioning: major.minor only](https://github.com/staltz/comver) convention.
- [Release notes](https://github.com/Swizz/snabbdom-pragma/releases) are [Keep a Changelog](http://keepachangelog.com/en/0.3.0/) compliants.
