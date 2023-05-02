import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (newMovie: Movie) => void,
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [fieldIsFilled, setFieldsIsFilled] = useState(false);

  const handleFieldChange = (key: string, value: string) => {
    setMovie({
      ...movie,
      [key]: value,
    });

    const allFieldsFilled = Object
      .entries(movie)
      .every(([fieldKey, fieldValue]) => {
        return fieldKey === 'description' || fieldValue !== '';
      });

    setFieldsIsFilled(allFieldsFilled);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCount(current => current + 1);
    onAdd(movie);
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = movie;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(handleSubmit)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleFieldChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleFieldChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleFieldChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleFieldChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleFieldChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!fieldIsFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
