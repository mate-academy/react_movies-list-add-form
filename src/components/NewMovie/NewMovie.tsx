import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd(newFilm: Movie): void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState<Movie>({
    description: '',
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const hasWrongDate =
    formData.title.trim() === '' ||
    formData.imdbId.trim() === '' ||
    formData.imdbUrl.trim() === '' ||
    formData.imgUrl.trim() === '';

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const newFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(newFormData);
  };

  function resetForm() {
    setFormData({
      description: '',
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const addMovie: Movie = formData;

    resetForm();
    setCount(cur => cur + 1);

    onAdd(addMovie);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={onChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={onChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={onChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={onChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={onChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasWrongDate}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
