# Helivox

The official website for Helivox

## Development Notes

- Contributing Members should submit [pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) with changes they've made. To learn more, go to the [github documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request?tool=webui)

**Todo:**
- Speed up image loading, especially on the achievements page
- When uploading images, do so in their own commit and remember that the images directory is in the .gitignore, or just give me the pictures
- Fix the UI for articles
- Delete and Edit functionality for articles (Need to add userID of person who made article entry for perms to edit and delete their own articles, admin can modify everything)
  change the placeholder for category to say (Highschool or College) and the note above to say that those are the only 2, but writing team can decide if they want more

## Steps to Deploy

```
gh repo clone 
cd helivox-angular
npm install firebase
npm i -g firebase-tools
ng build
firebase login /* should be with authorized email */
firebase init (HOSTING, GITHUB OPTIONAL)
firebase deploy
```

*Note for running firebase init*
- Select yes for single page app
- Select NO for overwrite index.html
- Type dist/helivox as the public directory

*all build files in dist folder*

After the initial setup - `ng build` for a local build, and `firebase deploy` to push to production

For hosting bugs, first check firebase.json and line 16 of angular.json - `"outputPath": "dist/helivox"`

___

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Note - I think this is broken and useless, to get this to work add "./src" or whatever the proper include path is im too lazy to do it to tsconfig.spec.json

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

