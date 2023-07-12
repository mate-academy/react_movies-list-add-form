import { FC, FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setMovieTitle] = useState('');
  const [description, setMovieDescription] = useState('');
  const [imgUrl, setMovieImageUrl] = useState('');
  const [imdbUrl, setMovieImdbUrl] = useState('');
  const [imdbId, setMovieImdbId] = useState('');

  function resetMovieForms() {
    setMovieTitle('');
    setMovieDescription('');
    setMovieImageUrl('');
    setMovieImdbUrl('');
    setMovieImdbId('');
  }

  function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    resetMovieForms();
    setCount(prev => prev + 1);
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submitFormHandler}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => {
          setMovieTitle(value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => {
          setMovieDescription(value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => {
          setMovieImageUrl(value);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => {
          setMovieImdbUrl(value);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => {
          setMovieImdbId(value);
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
              !title.trim()
              || !imgUrl.trim()
              || !imdbUrl.trim()
              || !imdbId.trim()
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
