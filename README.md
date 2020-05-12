# ChabFitnessTracker

## About
This is a fitness tracker that uses a formula from a company workout competition. It is best used on mobile.

Built with Angular 9 and Material.

## Running

`git clone https://github.com/alexaylwin/ChabFitnessTracker.git`

`cd ChabFitnessTracker`

`npm i`

`ng serve --open`

## Hosting

It can be hosted on any webserver, to build for production:

`npm run build:prod`

Expected path is `/chab-fitness/`

## Adding New Exercises

Exercises can be extended/modified in the [exercise model](src/app/models/exercise.ts)

## Technical Notes

- Workouts are 'saved' in local storage - if the user wipes local storage, workouts will be lost
- There is no server-side component or syncing
