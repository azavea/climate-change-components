# Climate Change Components

This project houses components, services and models for accessing the Azavea Climate API in an Angular 8+ project.

## Build

First run `yarn install` to install dependencies.

Run `yarn run build:library` to build the project. The build artifacts will be stored in the `lib-dist/` directory. Use the `npm pack` to produce a tarball that can be installed using `npm install` or published with `npm publish`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Publishing new versions

Publishing a new version to NPM is handled by Travis CI when tags are pushed to Github.

Make sure to update the version number in `package.json` before creating a new tag.

Update the [CHANGELOG](./CHANGELOG.md) when publishing a new release.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
