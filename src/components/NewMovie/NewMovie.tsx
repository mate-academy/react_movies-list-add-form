import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd:(newMovie: Movie) => void;
}

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const emptyMovie: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [movieTitle, setMovieTitle] = useState(emptyMovie.title);
  const [movieDescription, setMovieDescription]
    = useState(emptyMovie.description);
  const [imgURL, setImgURL] = useState(emptyMovie.imgUrl);
  const [imdbURL, setImdbURL] = useState(emptyMovie.imdbUrl);
  const [imdbId, setImdbId] = useState(emptyMovie.imdbId);

  const canNotBeAdded = !movieTitle
  || !imgURL
  || !imdbId
  || !imdbURL;

  const resetFields = () => {
    setMovieTitle(emptyMovie.title);
    setMovieDescription(emptyMovie.description);
    setImgURL(emptyMovie.imgUrl);
    setImdbId(emptyMovie.imdbId);
    setImdbURL(emptyMovie.imdbUrl);
  };

  const submitForm = () => {
    onAdd({
      title: movieTitle,
      description: movieDescription,
      imgUrl: imgURL,
      imdbUrl: imdbURL,
      imdbId,
    });

    setCount(currentCount => currentCount + 1);

    resetFields();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submitForm}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieTitle}
        onChange={setMovieTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieDescription}
        onChange={setMovieDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgURL}
        onChange={setImgURL}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbURL}
        onChange={setImdbURL}
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
            disabled={canNotBeAdded}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
