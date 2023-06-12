import { FC, useState } from 'react';
import { ChangeEvent, TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const initialFormData = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = formData;

  const isFormValid = Boolean(
    title.trim()
    && imgUrl.trim()
    && imdbUrl.trim()
    && imdbId.trim(),
  );

  const clearFormData = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    onAdd(formData as Movie);

    setCount((curCount) => curCount + 1);

    clearFormData();
  };

  const handleChange = (event: ChangeEvent) => {
    const { newValue, newName } = event;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [newName]: newValue,
    }));
  };

  return (
    <form
      action="/api/movies"
      method="POST"
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
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
