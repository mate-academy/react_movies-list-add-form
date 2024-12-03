import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialForm: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [forms, setForms] = useState<Movie>(initialForm);

  const { title, description, imgUrl, imdbUrl, imdbId } = forms;

  const handleFormsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForms(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const reset = () => {
    setForms({ ...initialForm });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      ...forms,
    });

    setCount(prevCount => prevCount + 1);

    reset();
  };

  const isDisabled =
    !title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim();

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleFormsChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleFormsChange}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleFormsChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleFormsChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleFormsChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
