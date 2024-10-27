# README

WIP: Readme TBD

React setup locally:

`npm run dev`: start the react app
`npm run build`: compile the react code
`rails react:copy_assets`: copy the compiled react code for production (temporary hack)


**WIP local vs production URL**
locally, the frontend should be served from the running react app.
in production, the frontend is served from the compiled react code in the public index html

locally, the redirect in the public controller is not being hit when going directly to the root path. if going to any other path (like `/wins`), it _does_ redirect to the react app, and things can be done locally there.

So as a temporary hack, just be sure to use the react app (at localhost:3001) instead of localhost:3000, which points to the react code in production


**Managing react compiling locally and production**
- when react code is ready, `npm run build`
- this process is WIP and needs to be automated, but after developing locally, i have a rake task: `lib/tasks/copy_react_assets.rake` that will move the compiled react code into the public directory to be used in production.



This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
