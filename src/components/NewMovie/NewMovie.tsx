import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface INewMovie {
  onAdd: (movie: Movie) => void;
}

interface MovieFields extends Movie {
  description: string;
}

export const NewMovie = ({ onAdd }: INewMovie) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [fields, setFields] = useState<MovieFields>({
    description: '',
    imdbId: '',
    imdbUrl: '',
    imgUrl: '',
    title: '',
  });

  const handeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd({ ...fields });
    setCount(count + 1);
  };

  const handleChange = (fieldKey: keyof MovieFields) => (value: string) => {
    setFields((s) => ({ ...s, [fieldKey]: value }));
  };

  const isFormInvalid = !fields.title
    || !fields.imgUrl
    || !fields.imdbUrl
    || !fields.imdbId;

  return (
    <form className="NewMovie" key={count} onSubmit={handeSubmit} method="POST">
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={fields.title}
        onChange={handleChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={fields.description}
        onChange={handleChange('description')}

      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={fields.imgUrl}
        onChange={handleChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={fields.imdbUrl}
        onChange={handleChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={fields.imdbId}
        onChange={handleChange('imdbId')}
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
