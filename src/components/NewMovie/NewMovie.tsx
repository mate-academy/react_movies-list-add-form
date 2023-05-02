import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [id, setId] = useState(0);
  const [movieFields, setMovieFields] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [fieldIsFilled, setFieldsState] = useState(false);

  const handleChange = (key: string, value: string) => {
    setMovieFields({
      ...movieFields,
      [key]: value,
    });

    const allFieldsFilled = Object
      .entries(movieFields)
      .every(([fieldKey, fieldValue]) => {
        return fieldKey === 'description' || fieldValue !== '';
      });

    setFieldsState(allFieldsFilled);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setId(current => current + 1);
    onAdd(movieFields);
    setMovieFields({
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
  } = movieFields;

  return (
    <form
      className="NewMovie"
      key={id}
      onSubmit={(handleSubmit)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChange}
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
