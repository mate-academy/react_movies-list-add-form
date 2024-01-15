import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [titleValue, setTitleValue] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrlValue, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  // const [hasReset, setHasReset] = useState(false);

  const able = titleValue.trim()
    && imgUrlValue.trim() && imdbUrl.trim()
    && imdbId.trim();

  const createMovie = (): Movie => {
    return {
      title: titleValue,
      description,
      imgUrl: imgUrlValue,
      imdbUrl,
      imdbId,
    };
  };

  const submitAddMovie = () => {
    const movie = createMovie();

    setTitleValue('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setCount((currentCount) => currentCount + 1);

    onAdd(movie);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => {
        event.preventDefault();
        submitAddMovie();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={(event) => {
          setTitleValue(event);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => {
          setDescription(event);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        onChange={(event) => {
          setImgUrl(event);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => {
          setImdbUrl(event);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event) => {
          setImdbId(event);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">

          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!able}
          >
            Add
          </button>

        </div>
      </div>
    </form>
  );
};
