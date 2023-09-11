import React, { ChangeEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void,
}

const DEFAULT_FIELDS = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({
  onAdd = () => { },
}) => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState(DEFAULT_FIELDS);
  const isAddButtonDisabled = !formData.title.trim()
    || !formData.imgUrl.trim()
    || !formData.imdbUrl.trim()
    || !formData.imdbId.trim();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData(currFields => ({
      ...currFields,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setFormData(DEFAULT_FIELDS);
    setCount(currCount => (currCount + 1));
    const newMovie = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      imgUrl: formData.imgUrl.trim(),
      imdbUrl: formData.imdbUrl.trim(),
      imdbId: formData.imdbId.trim(),
    };

    onAdd(newMovie);
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
        value={formData.title}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={handleInputChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isAddButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
