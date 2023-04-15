# Some Documentation for Backend

## Starting the apps
1. create .env from .env.example
2. npm install
3. migrate the db => npx db-migrate up
4. generate swagger json => npm run swagger
5. npm run dev

## Migrations
- migrations folder are in ./migrations
- command to run migrations : 
```bash
npx db-migrate up
```

- command to down the migrations :
```bash
npx db-migrate down
```
## Swagger
- this proj. using swagger-autogen, that means if you add params of an api request or return something as an object or something that has a type and then run script to generate swagger json it will automatically added to swagger ui.
- but it doesnt limited to code, you can also specify manually the params/result. check [this link](https://github.com/davibaltar/swagger-autogen/blob/master/README.md#parameters)
- the routes for swagger are : `/api-docs`
- command to regenerate swagger output
```
npm run swagger
```

## User Schema
- login by user, and password simple. and this proj. use jwt as a sessions
- if you want to add/modify attributes of users, 
    1. update db, add it in migrations/add-users-table-up.sql or create new migrations to update users and migrate it.
    2. add it in src/Models/User.ts
- by default of passport, user object are in req.user, if you code it in protectedRoutes.
- for role i dont plan to create a relations for it. so roles are hardcoded to backend. ill make sure to write a type for valid role.