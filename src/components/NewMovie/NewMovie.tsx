import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd(movie: Movie): void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formValues, setFormValues] = useState<Movie>({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });

  const noSpaces = (value: string) => {
    return value.trim() === '';
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      formValues.title
      && formValues.imgUrl
      && formValues.imdbUrl
      && formValues.imdbId
    ) {
      onAdd({
        title: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        description: '',
      });
      setFormValues({
        title: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        description: '',
      });
    }
  };

  const isFormInvalid
    = noSpaces(formValues.title)
    || noSpaces(formValues.imgUrl)
    || noSpaces(formValues.imdbUrl)
    || noSpaces(formValues.imdbId);

  return (
    <form
      key={formValues.title}
      className="NewMovie"
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formValues.title}
        onChange={(value) => setFormValues({ ...formValues, title: value })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formValues.description}
        onChange={(value) => setFormValues(
          { ...formValues, description: value },
        )}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formValues.imgUrl}
        onChange={(value) => setFormValues({ ...formValues, imgUrl: value })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formValues.imdbUrl}
        onChange={(value) => setFormValues({ ...formValues, imdbUrl: value })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formValues.imdbId}
        onChange={(value) => setFormValues({ ...formValues, imdbId: value })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isFormInvalid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
