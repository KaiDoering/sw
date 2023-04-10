[![build](https://github.com/KaiDoering/sw/actions/workflows/build.yaml/badge.svg)](https://github.com/KaiDoering/sw/actions/workflows/build.yaml)

# Encyclopedia Galactica

## Scripts for local development

### `npm run serve`

Serves application locally on localhost:8080. Auto reloads on file changes.

### `npm test`

Runs tests using Jest and React Testing Library. To collect coverage information use `npm run coverage`.

### `npm run build`

Creates the production build of the application. Source maps included.

### `npm run eslint`

Lint ts files using AirBnB config as base. Use `npm run eslint:fix` to fix autofixable issues.

### `npm run styleling`

Lints stylesheets using scss standard config. Use `npm run stylelint:fix` to fix autofixable issues.

## Docker

### `docker build -t sw:latest .`

Use this command to bundle the UI and build a simple static server using express.js.

### `docker run -p 8080:8080 sw:latest`

Run this command and visit localhost:8080 to view the page.

## Sidenote

swapi-ts library was used to fetch swapi data. This library has a bug, which creates broken urls, so a dirty hack was introduced in the entrypoint of this app.
A PR with a fix for this issue was created [here](https://github.com/amitmtrn/swapi-ts/pull/4)
