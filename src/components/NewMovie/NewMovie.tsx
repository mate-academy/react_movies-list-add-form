import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie = ({ onAdd }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const submitNewMovie = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      title.trim() === '' ||
      imgUrl.trim() === '' ||
      imdbUrl.trim() === '' ||
      imdbId.trim() === ''
    ) {
      return;
    }

    const newMovie = {
      title: title,
      description: description,
      imgUrl: imgUrl,
      imdbUrl: imdbUrl,
      imdbId: imdbId,
    };

    onAdd(newMovie);
    setCount(count + 1);

    setTitle('');

    if (description !== '') {
      setDescription('');
    }

    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={submitNewMovie}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={movieTitle => {
          setTitle(movieTitle);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={movieDescription => {
          setDescription(movieDescription);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={movieImgUrl => {
          setImgUrl(movieImgUrl);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={movieImdbUrl => {
          setImdbUrl(movieImdbUrl);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={movieImdbId => {
          setImdbId(movieImdbId);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              title.trim() !== '' &&
              imgUrl.trim() !== '' &&
              imdbUrl.trim() !== '' &&
              imdbId.trim() !== ''
                ? false
                : true
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
