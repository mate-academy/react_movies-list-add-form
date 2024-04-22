import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

const DEFAULT_VALUES: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbId: '',
  imdbUrl: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movieData, setMovieData] = useState<Movie>(DEFAULT_VALUES);
  const { title, description, imgUrl, imdbUrl, imdbId } = movieData;
  const [count, setCount] = useState<number>(0);

  const handleChangeValues = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof Movie,
  ) => {
    setMovieData(item => ({
      ...item,
      [fieldName]: event.target.value,
    }));
  };

  const isFormValid =
    title.trim() && imgUrl.trim() && imdbId.trim() && imdbUrl.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(movieData);

    setMovieData(DEFAULT_VALUES);
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={e => handleChangeValues(e, 'title')}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={e => handleChangeValues(e, 'description')}
        required={false}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={e => handleChangeValues(e, 'imgUrl')}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={e => handleChangeValues(e, 'imdbUrl')}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={e => handleChangeValues(e, 'imdbId')}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
