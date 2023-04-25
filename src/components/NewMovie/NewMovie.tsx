import { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });

  const {
    title,
    imgUrl,
    imdbUrl,
    imdbId,
    description,
  } = formData;

  const isDisabled = (
    title.trim()
    && imgUrl.trim()
    && imdbUrl.trim()
    && imdbId.trim()
  );

  const handleChange = (newValue: string, inputName: string) => {
    setFormData({
      ...formData,
      [inputName]: newValue,
    });
  };

  const clearForm = () => {
    setFormData({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    onAdd(
      formData,
    );

    setCount(prev => prev + 1);
    clearForm();
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
            disabled={!isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
