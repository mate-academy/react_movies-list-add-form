import { useState } from 'react';
import { TextField } from '../TextField';

export const NewMovie = () => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);

  const [formState, setFormState] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });

  const isValidUrl = (value: string) => {
    // eslint-disable-next-line
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(value);
  };

  const [hasTitleError, setHasTitleError] = useState(true);
  const [hasImgUrlError, setHasImgUrlError] = useState(true);
  const [hasImdbUrlError, setHasImdbUrlError] = useState(true);
  const [hasImdbIdError, setHasImdbIdError] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const areRequiredFieldsFilled = () => {
    return (
      formState.title.trim() !== ''
      && formState.imgUrl.trim() !== ''
      && formState.imdbUrl.trim() !== ''
      && formState.imdbId.trim() !== ''
    );
  };

  // const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   switch (name) {
  //     case 'title':
  //       setHasTitleError(value.trim() === '');
  //       break;
  //     case 'imgUrl':
  //       setHasImgUrlError(value.trim() === '');
  //       break;
  //     case 'imdbUrl':
  //       setHasImdbUrlError(value.trim() === '');
  //       break;
  //     case 'imdbId':
  //       setHasImdbIdError(value.trim() === '');
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!(hasTitleError
      || hasImgUrlError || hasImdbUrlError || hasImdbIdError)) {
      setFormState({
        title: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        description: '',
      });
    }

    setHasTitleError(false);
    setHasImgUrlError(false);
    setHasImdbUrlError(false);
    setHasImdbIdError(false);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formState.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formState.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formState.imgUrl}
        onChange={handleChange}
        customValidation={isValidUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formState.imdbUrl}
        onChange={handleChange}
        customValidation={isValidUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formState.imdbId}
        onChange={handleChange}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            disabled={!areRequiredFieldsFilled()}
            data-cy="submit-button"
            className="button is-link"
            onClick={() => {}}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
