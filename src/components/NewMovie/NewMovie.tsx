import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
// eslint-disable-next-line max-len, prettier/prettier, @typescript-eslint/no-unused-vars
// const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
type Props = {
  onAdd: (movie: Movie) => void;
};
// const isValid = (url: string) => {
//   return pattern.test(url);
// };
export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const buttonStatus = !title || !imgUrl || !imdbUrl || !imdbId;

  // const [error, setError] = useState(false);

  // const handleValidation = (inputValue: string) => {
  //   if (!isValid(inputValue)) {
  //     setError(true);
  //   } else {
  //     setError(false);
  //   }
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const inputValue = e.target.value;

  //   handleValidation(inputValue);
  //   onchange(inputValue);
  // };
  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={buttonStatus}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
