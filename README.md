# tunity-backend-challenge

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 14 or higher

# Getting started

- Clone the repository

```
git clone https://github.com/dfelix/tunity-backend-challenge.git
```

- Install dependencies

```
cd tunity-backend-challenge
npm install
```

- Build and run the project

```
npm start
```

Navigate to `http://localhost:3000`

## Project Structure

The folder structure of this app is explained below:

| Name                       | Description                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------- |
| **src**/index.ts           | Entry point to express app                                                                        |
| **src**/site-map-parser.js | SiteMapParser. Handles request, url validation and returns a clean array with links under baseURL |
| package.json               | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)  | tsconfig.json | Config settings for compiling source code only written in TypeScript |

## Building the project

### Running the build

All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script      | Description                                     |
| --------------- | ----------------------------------------------- |
| `start`         | Runs full build and runs node on dist/index.js. |
| `npm start:dev` | Runs on development mode                        |

## API Call

Local:

```bash
curl --location --request GET 'http://127.0.0.1:3000?url=https://www.w3schools.com/'
```

Response:

```json
[
    {
        "name": "Videos NEW",
        "url": "https://www.w3schools.com/videos/index.php"
    },
    {
        "name": "Website NEW",
        "url": "https://www.w3schools.com/spaces"
    },
    {
        "name": "Paid Courses",
        "url": "https://www.w3schools.com/cert/default.asp"
    },
    ...
]
```

## Testing

No tests were created.
TODO?

# Common Issues
