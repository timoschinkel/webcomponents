# Webcomponents

An experiment in webcomponents. In this repository I want to answer the following questions:
- What is the best usecase for webcomponents?
- Should an abstraction be needed?
- How will forms and form components work within webcomponents.

The purpose of this repository is two fold; a playground to try things, and it is a reference - both for myself and for others. The format I am using in this repository is almost blog-like; I try to explain separate steps, and refer to code on this repository.

A working demo of the code in this repository can be found on [https://timoschinkel.github.io/webcomponents/](https://timoschinkel.github.io/webcomponents/).

## Development
Webcomponents are a JavaScript specification, so the main language for this repository is JavaScript. Usage of [nvm](https://github.com/nvm-sh/nvm) is advised. I personally prefer TypeScript, and therefore the webcomponents are written using TypeScript.

To run the project locally, you install the correct version of NodeJS:

```bash
nvm i
```

You install all dependencies:

```bash
npm ci
```

And you start the development server:

```bash
npm run start
```

## Resources
- https://www.webcomponents.org/
- https://css-tricks.com/styling-a-web-component/ - A great overview about styling a webcomponent
