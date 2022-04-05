# Movies list - Add Form
- Replace `<your_account>` with your Github username in the
  [DEMO LINK](https://DimaBrushnivskyi.github.io/react_movies-list-add-form/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)

## Task
1. Implement form inside `NewMovie` component.
2. Form state should be inside `NewMovie`.
3. Form should have next fields:
  - title
  - description
  - imgUrl
  - imdbUrl
  - imdbId
4. On form submit callback `onAdd` from props should be called with new film object. Also, form should be cleared. Page should not be reloaded.

## Advanced tasks (Add validation)
> Do it only if you understand everything

1. validate controls values on blur.
2. `title`, `imgUrl`, `imdbUrl`, `imdbId` should be required.
3. `imgUrl`, `imdbUrl` - should be valid urls (can use this regex `/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/`)
4. invalid control should have red border and error message below.
5. if form is invalid submit(and submit button) should be disabled.
6. (\*\*) show control as invalid only if control has been touched.
