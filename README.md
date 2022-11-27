# Movies list - Add Form

You have the `App` with the `MoviesList` and `NewMovie` form containing ready
to use `TextField` components. Learn how it works and implement an ability to
add movies from [IMDB](https://www.imdb.com/).

Use `DevTools` -> `Network` -> `Img` to get the first image from a
[movie page](https://www.imdb.com/title/tt1312171)

> Here is [the demo page](https://mate-academy.github.io/react_movies-list-add-form/)

1. `NewMovie` should check if `title`, `imgUrl`, `imdbUrl`, `imdbId` are
entered when an input looses focus (`onBlur`) and show an error and a red
border if needed (learn how it it implemented in the `TextField`);
2. The `description` is optional;
3. Disable the submit button until all the required fields are filled;
4. Clear the form after adding a new movie.
5. Errors should not be shown after clearing the form (change its key to
reinitialize the form);

## (Optional) Advanced validation
Implement the ability to add custom validation callback to the `TextField`.
Check if `imgUrl` and `imdbUrl` are valid URLs (you can use the next regex)

1. `NewMovie` має перевірити, чи є `title`, `imgUrl`, `imdbUrl`, `imdbId`
вводиться, коли введення втрачає фокус (`onBlur`) і показує помилку та червоний колір
рамка, якщо потрібна (дізнайтеся, як це реалізовано в `TextField`);
2. `description` необов'язковий;
3. Вимкніть кнопку відправки, доки не будуть заповнені всі необхідні поля;
4. Очистіть форму після додавання нового фільму.
5. Помилки не повинні відображатися після очищення форми (змініть її ключ на
повторно ініціалізувати форму);

## (Необов'язково) Розширена перевірка
Реалізуйте можливість додавати власний зворотний виклик перевірки до `TextField`.
Перевірте, чи `imgUrl` і `imdbUrl` є дійсними URL-адресами (ви можете використати наступний регулярний вираз)

```js
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
```

## Instructions

- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://<your_account>.github.io/react_movies-list-add-form/) and add it to the PR description.
