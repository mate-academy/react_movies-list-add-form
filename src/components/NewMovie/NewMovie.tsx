/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputImgUrl, setInputImgUrl] = useState('');
  const [inputImdbUrl, setInputImdbUrl] = useState('');
  const [inputImdbId, setInputImdbId] = useState('');

  const formValidation =
  inputTitle.trim() &&
  inputImdbId.trim() &&
  inputImgUrl.trim() &&
  inputImdbUrl.trim();


  const handleSubmit = (evnt: React.FormEvent) => {
    evnt.preventDefault();

    const newMovie: Movie = {
      title: inputTitle,
      description: inputDescription,
      imgUrl: inputImgUrl,
      imdbUrl: inputImdbUrl,
      imdbId: inputImdbId,
    };

    onAdd(newMovie);

    setInputTitle('');
    setInputDescription('');
    setInputImgUrl('');
    setInputImdbUrl('');
    setInputImdbId('');
  };




  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={inputTitle}
        onChange={newInputTitle => setInputTitle(newInputTitle)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={inputDescription}
        onChange={newInputDescription =>
          setInputDescription(newInputDescription)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputImgUrl}
        onChange={newInputImgUrl => setInputImgUrl(newInputImgUrl)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputImdbUrl}
        onChange={newInputImdbUrl => setInputImdbUrl(newInputImdbUrl)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputImdbId}
        onChange={newInputImdbId => setInputImdbId(newInputImdbId)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!formValidation}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
