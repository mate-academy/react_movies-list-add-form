import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const {
    title, description, imdbUrl, imgUrl, imdbId,
  } = movie;
  const invalid = !title || !imgUrl || !imdbUrl || !imdbId;

  const resetForm = () => {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleChange = (label: string) => (value: string) => {
    setMovie((prevMovie) => {
      return {
        ...prevMovie,
        [label]: value,
      };
    });
  };

  const handleSubmit = () => {
    onAdd(movie);
    setCount(prevCount => prevCount + 1);
    resetForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChange('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={invalid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
