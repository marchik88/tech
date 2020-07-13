# PROJECT

## Before start

```
    npm i -g yarn
    npm i -g pm2
```

## Frontend

- Common - general UI, config and utils
- Modules - main app logic
- Plugins - additional third party libs
- Next.js framework
- Rematch models for Redux wrap
- Controllers - api requests
- Services - other tools and utils wrappers

## How to develop

```
    cd ./web
    yarn
    yarn run dev
```

## How to build

```
    cd ./web
    yarn run build
```

## Backend

- src - main app logic modules
- Nest.js framework
- Mongo DB database
- Fastify Adapter
- Passport-jwt auth

## How to develop

```
    cd ./api
    yarn
    yarn run start:dev
```

## How to deploy production

```
    pm2 start ecosystem.config.js
```

# Alternative develop command to start both directories with "concurrently"

```
    cd ./
    yarn
    yarn run dev
```
