# ProBono API

[![Greenkeeper badge](https://badges.greenkeeper.io/probono-dev/api.svg)](https://greenkeeper.io/)

## About

This project uses `prisma` for managing database queries and `nexus` with `graphql-yoga` for exposing an API.

## Updating a Prisma Instance

ProBono Prisma servers run on free tier Heroku instances. Sometimes the guys at Prisma come up with new versions for Prisma server, which is usually ideal to update to. To do this, the following steps have to be taken:

You can easily verify your current Prisma version in Prisma Dashboard:

![server status](/.github/img/prisma1.png "Server Outdated")

1. run `docker pull prismagraphql/prisma:${PRISMA_VERSION}-heroku`
2. find the id of the pulled image with `docker images | grep prismagraphql/prisma:${PRISMA_VERSION}-heroku`
3. run `docker tag <id of pulled image> registry.heroku.com/${HEROKU_APP_NAME}/web`
4. at this point make sure you are logged into Heroku (run `heroku container:login`)
5. run `docker push registry.heroku.com/${HEROKU_APP_NAME}/web`
6. release the image to Heroku with `heroku container:release web --app=${HEROKU_APP_NAME}`

Once you complete these steps your app will be redeployed. You may see this:

![server status](/.github/img/prisma2.png "Server Down")

Once the new instance restarts it should have the updated version:

![server status](/.github/img/prisma3.png "Server Updated")

## Contributing

Before you contribute, please read the [Contribution Guidelines](/CONTRIBUTING.md).

You should clone the repository and create your own fork of it, make your changes and submit a pull-request. Your changes will be reviewed and if they're suitable they'll be merged on development branch. Make sure you create new pull requests against `development` branch.
