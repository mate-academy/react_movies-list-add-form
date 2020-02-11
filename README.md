# Movies list - Add Form
- Replace `<your_account>` with your Github username in the
  [DEMO LINK](https://<your_account>.github.io/react_movies-list-add-form/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)

## Task
1. Implement form inside `NewMovie` component
1. Form state should be inside `NewMovie`
1. Form should have next fields:
    - title
    - description
    - imgUrl
    - imdbUrl
    - imdbId
1. On form submit callback `onAdd` from props should be called with new film object.
  Also, form should be cleared. Page should not be reloaded.
1. (\*) Add validation
    - validate controls values on blur
    - `title`, `imgUrl`, `imdbUrl`, `imdbId` should be required
    - `imgUrl`, `imdbUrl` - should be valid urls (can use this regex `/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/`)
    - invalid control should have red border and error message below
    - if form is invalid submit(and submit button) should be disabled
    - (\*\*) show control as invalid only if control has been touched
