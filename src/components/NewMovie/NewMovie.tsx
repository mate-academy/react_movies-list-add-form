import { useState, FormEvent } from 'react';

import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type AddNewMovieProp = {
  onAdd: (param: Movie) => void;
};

export const NewMovie: React.FC<AddNewMovieProp> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, SetCount] = useState(0);
  const [newTitle, SetNewTitle] = useState('');
  const [newDescription, SetNewDescription] = useState('');
  const [newImgUrl, SetNewImgUrl] = useState('');
  const [newImdbUrl, SetNewImdbUrl] = useState('');
  const [newImdbId, SetNewImdbId] = useState('');

  const resetForm = () => {
    SetNewTitle('');
    SetNewDescription('');
    SetNewImgUrl('');
    SetNewImdbUrl('');
    SetNewImdbId('');
  };

  const submitDisabled = !newTitle.trim()
  || !newDescription.trim()
  || !newImgUrl.trim()
  || !newImdbUrl.trim()
  || !newImdbId.trim();

  const submitMovie = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    SetCount(count + 1);

    const newMovie = {
      title: newTitle,
      description: newDescription,
      imdbUrl: newImdbUrl,
      imgUrl: newImgUrl,
      imdbId: newImdbId,
    };

    onAdd(newMovie);
    resetForm();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={submitMovie}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newTitle}
        onChange={(event) => SetNewTitle(event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        required
        value={newDescription}
        onChange={(event) => SetNewDescription(event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        required
        value={newImgUrl}
        onChange={(event) => SetNewImgUrl(event)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        required
        value={newImdbUrl}
        onChange={(event) => SetNewImdbUrl(event)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        required
        value={newImdbId}
        onChange={(event) => SetNewImdbId(event)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={submitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
