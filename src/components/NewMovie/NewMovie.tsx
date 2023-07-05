import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

const clearMovieForm = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movieForm, setMovieForm] = useState(clearMovieForm);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = movieForm;

  const submitDisabled = !title.trim() || !imgUrl.trim()
    || !imdbUrl.trim() || !imdbId.trim();

  const clearForm = () => {
    setMovieForm(clearMovieForm);
  };

  const addNewMovie = (event: React.FormEvent<Element>) => {
    event.preventDefault();
    event.stopPropagation();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    setCount((prevCount) => prevCount + 1);
    clearForm();
  };

  const onChangeHandler = (value: string, field: string) => {
    setMovieForm((prevMovieForm) => ({ ...prevMovieForm, [field]: value }));
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => onChangeHandler(value, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => onChangeHandler(value, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => onChangeHandler(value, 'imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => onChangeHandler(value, 'imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => onChangeHandler(value, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={submitDisabled}
            onClick={addNewMovie}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
