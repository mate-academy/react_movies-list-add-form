# Movies list - Add Form

You have the `App` with the `MoviesList` and the `NewMovie` form containing ready-to-use `TextField` components. Learn how it works and implement an ability to
add movies from [IMDB](https://www.imdb.com/).

If you want to test your page you can get the first image from a [movie page](https://www.imdb.com/title/tt1312171) using `DevTools` -> `Network` -> `Img`

> Here is [the demo page](https://mate-academy.github.io/react_movies-list-add-form/)

1. The `NewMovie` component should verify that the `title`, `imgUrl`, `imdbUrl`, and `imdbId` fields are filled out when an input field loses focus (`onBlur`). If any of these fields are empty, it should display an error message and apply a red border to indicate the issue. This functionality is already implemented in the `TextField`, so you can refer to that for guidance on how it works. There is no need to implement this part in this task;
1. The `description` is optional;
1. Disable the submit button until all the required fields are filled (spaces should be trimmed);
1. Clear the form after adding a new movie.
1. Errors should not be shown after clearing the form (change its key to
reinitialize the form);

## (Optional) Advanced validation
Implement the ability to add custom validation callback to the `TextField`.
Check if `imgUrl` and `imdbUrl` are valid URLs (you can use the next regex)

```js
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
```

## Instructions
- Install Prettier Extention and use this [VSCode settings](https://mate-academy.github.io/fe-program/tools/vscode/settings.json) to enable format on save.
- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://DenisPitsul.github.io/react_movies-list-add-form/) and add it to the PR description.
