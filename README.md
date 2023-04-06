[![build](https://github.com/KaiDoering/sw/actions/workflows/build.yaml/badge.svg)](https://github.com/KaiDoering/sw/actions/workflows/build.yaml)

# Encyclopedia Galactica

## Scripts for local development

### `npm test`

Runs tests using Jest and React Testing Library. To collect coverage information use `npm run coverage`.

### `npm run build`

Creates the production build of the application. Source maps included.

## Docker

### `docker build -t sw:latest .`

Use this command to bundle the UI and build a simple static server using express.js.

### `docker run -p 8080:8080 sw:latest`

Run this command and visit localhost:8080 to view the page.
