# Backend

Des-Cart is an purchase tracking and recommendations app created for EECE 4792 (Capstone Design 2) with Waleed Meleis in Spring 2021. This repo contains the backend.

To start, clone the repo and run `npm install`.

To run the project locally, use `nx serve backend` (which probably requires a `npm install -g nx`).

The project will be available at `localhost:3333`

There is probably some way to make a production build but I still need to figure that out.

Frontend repo is here - https://github.com/nickghughes/descart

Database repo is here - https://github.com/nickghughes/descart-db-data

#### Useful endpoints

- `/api/descart/purchases/:userId`, `GET`
  - For the purchase history page, get all purchases based on a userId
  - pagination TBD
- `/api/descart/purchasepreview/:purchaseId`, `GET`
  - For the purchase preview, get more information about a single purchase
- `/api/descart/productpreview/:productId`, `GET`
  - For a product preview, get the multiple places that sells the product and related info
- `/api/descart/discover/:userId`, `GET`
  - For the discover page, currently gets 50 random products and ignores the userId
  - Pagination/favorites is currently commented out but would look something like below
  - `/api/descart/discover/:userId?favorite=false&page=1`
- `/api/descart/autocomplete/store`, `GET`
  - Autocomplete results searching for store names
  - Requires body `{ query: "string" }`
- `/api/descart/autocomplete/product`, `GET`
  - Autocomplete results searching for product names
  - Requires body `{ query : "string" }`
- `/api/descart/purchase/:purchaseId`, `DELETE`
  - delete purchase with name and (probably ) cascade delete on purchaseproduct and purchasecustomproduct
- `/api/descart/purchase`, `POST`
  - create purchase given body below

```
{
    "user_id": 1,
    "store_id": 3,
    "price": "1431.53",
    "products": [
        {
            "name": "jackdaw;sldfjds",
            "price": "553.32",
            "quantity": 2
        },
        {
            "id": 1,
            "price": "299.99",
            "quantity": 1
        }
    ]
}
```

---

## Authorization info

### How to get use authorization

`POST localhost:3333/api/auth/login` with a body of `{"username": "Harrison", "password": "harrison@email"}`

The username is your display name and the password is your email. If there's a matching record in the database, then it returns a jwt with your old record attached. If there isn't a matching record in the database, then it creates a row with your username and email and returns a jwt with that information.

The jwt looks like:

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXNwbGF5TmFtZSI6IkhhcnJpc29uIiwiZW1haWwiOiJoYXJyaXNvbkBlbWFpbCIsInVzZXJJZCI6MSwiaWF0IjoxNjE0ODkzMjg4LCJleHAiOjE2MTQ4OTM0MDh9.VcXx7kovsN0mPk6gUx2SOyyeVn5Y15TDvGmTSQeuve4"
}
```

You can test your user creation by doing a `GET localhost:3333/api/auth/profile`.

The `Authorization` header needs to be included, with a value of `Bearer TOKEN` where TOKEN is the `eyJhb...e4` value from the jwt above.

### How to use this in a controller:

Import `UseGuards` from `@nestjs/common`, and import the `JwtAuthGuard` class in the `/auth` folder.

Annotate any controller function with `@UseGuards(JwtAuthGuard)`

Add a `@Request() req` to the parameters of a controller function, then access the user id with `req.user.userId`.

The result is that the controller function will require a valid token (will return `401 Unauthorized` otherwise) and you can access the user id from that token.

Obviously, any request to a protected endpoint now needs an `Authorization` header as described above.

<!---
This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@backend/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## ☁ Nx Cloud

### Computation Memoization in the Cloud

<p align="center"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
--->
