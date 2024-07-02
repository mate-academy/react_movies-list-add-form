import { useState, ChangeEvent, FormEvent } from 'react';
import { TextField } from '../TextField/TextField';

type Props = {
  addMovie: (newMovie: Movie) => void;
};

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [formValues, setFormValues] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleFormValues = (name: keyof Movie, value: string) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const isValidFields = (): boolean => {
    const { title, description, imgUrl, imdbUrl, imdbId } = formValues;

    return (
      title.trim() !== '' &&
      description.trim() !== '' &&
      imgUrl.trim() !== '' &&
      imdbUrl.trim() !== '' &&
      imdbId.trim() !== ''
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidFields()) {
      addMovie(formValues);
      setFormValues({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
  };

  const handleChange = (
    name: keyof Movie,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    handleFormValues(name, e.target.value);
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formValues.title}
        onChange={e => handleChange('title', e)}
        data-cy="movie-title"
      />

      <TextField
        name="description"
        label="Description"
        value={formValues.description}
        onChange={e => handleChange('description', e)}
        data-cy="movie-description"
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formValues.imgUrl}
        onChange={e => handleChange('imgUrl', e)}
        data-cy="movie-imgUrl"
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formValues.imdbUrl}
        onChange={e => handleChange('imdbUrl', e)}
        data-cy="movie-imdbUrl"
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formValues.imdbId}
        data-cy="movie-imdbId"
        onChange={e => handleChange('imdbId', e)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValidFields()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
