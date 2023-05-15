import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void,
}

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const defaultMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>({ ...defaultMovie });

  const {
    title,
    description,
    imgUrl,
    imdbId,
    imdbUrl,
  } = movie;

  const isValid = title.length && imgUrl.length
      && imdbUrl.length && imdbId.length;

  const submitMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const isValid = title.length && imgUrl.length
    //   && imdbUrl.length && imdbId.length;

    if (isValid) {
      onAdd(movie);
      setCount(prevCount => prevCount + 1);
      setMovie({ ...defaultMovie });
    }
  };

  const setTitle = (newTitle: string) => {
    setMovie({
      ...movie,
      title: newTitle,
    });
  };

  const setDescription = (newDescription: string) => {
    setMovie({
      ...movie,
      description: newDescription,
    });
  };

  const setImgUrl = (newImgUrl: string) => {
    setMovie({
      ...movie,
      imgUrl: newImgUrl,
    });
  };

  const setImdbUrl = (newImdbUrl: string) => {
    setMovie({
      ...movie,
      imdbUrl: newImdbUrl,
    });
  };

  const setImdbId = (newImdbId: string) => {
    setMovie({
      ...movie,
      imdbId: newImdbId,
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={submitMovie}>
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
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
