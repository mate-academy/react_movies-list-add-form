import React, { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredDescription, setEnteredDescription] = useState('');
  const [enteredImageUrl, setEnteredImageUrl] = useState('');
  const [enteredImdbUrl, setEnteredImdbUrl] = useState('');
  const [enteredImdbId, setEnteredImdbId] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);
  const [count, setCount] = useState(0);

  const handleSumbit = () => {
    const newEnteredMovie: Movie = {
      title: enteredTitle,
      description: enteredDescription,
      imgUrl: enteredImageUrl,
      imdbUrl: enteredImdbUrl,
      imdbId: enteredImdbId,
    };

    onAdd(newEnteredMovie);

    setEnteredTitle('');
    setEnteredDescription('');
    setEnteredImageUrl('');
    setEnteredImdbUrl('');
    setEnteredImdbId('');

    setCount((state) => state + 1);
  };

  const isValidUrl = (urlString: string) => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(urlString);
  };

  useEffect(() => {
    setFormIsValid(
      isValidUrl(enteredImageUrl)
      && isValidUrl(enteredImdbUrl)
      && enteredTitle.length > 0
      && enteredImdbId.length > 0
      ,
    );
  }, [enteredTitle, enteredImageUrl, enteredImdbUrl, enteredImdbId]);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();

        handleSumbit();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={enteredTitle}
        onChange={setEnteredTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={enteredDescription}
        onChange={setEnteredDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={enteredImageUrl}
        onChange={setEnteredImageUrl}
        required
        urlValidation={isValidUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={enteredImdbUrl}
        onChange={setEnteredImdbUrl}
        required
        urlValidation={isValidUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={enteredImdbId}
        onChange={setEnteredImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!formIsValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
