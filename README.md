# Movies list - Add Form

You have the `App` with the `MoviesList` and `NewMovie` components. Implement an ability
to add movies from [IMDB](https://www.imdb.com/).

Use `DevTools` -> `Network` -> `Img` to get the first image from a [movie page](https://www.imdb.com/title/tt1312171)

1. Use the fancy markup for all the inputs (see the `title`);
1. Keep `data-cy` attributes;
1. `NewMovie` should check if `title`, `imgUrl`, `imdbUrl`, `imdbId` are entered when an input looses focus (`onBlur`) an show an error and a red border if needed;
1. Errors may appear only after the field was touched;
1. The `description` is optional;
1. Disable the submit button until all the required fields are filled;
1. Clear the form after adding a new movie.

## (Optional) Advanced validation
1. `imgUrl`, `imdbUrl` - should be valid urls (you can use this regex)

```js
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
```

## Instructions

- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://<your_account>.github.io/react_movies-list-add-form/) and add it to the PR description.