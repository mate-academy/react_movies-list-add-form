import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [formData, setFormData] = useState({
    description: '',
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isNotValid =
    !formData.title ||
    !formData.imgUrl ||
    !formData.imdbUrl ||
    !formData.imdbId;

  const handleReset = () => {
    setFormData({
      description: '',
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isNotValid) {
      return;
    }

    onAdd({
      title: formData.title,
      description: formData.description,
      imgUrl: formData.imgUrl,
      imdbUrl: formData.imdbUrl,
      imdbId: formData.imdbId,
    });

    setCount(current => current + 1);
    handleReset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={value =>
          setFormData(prevFormData => ({
            ...prevFormData,
            title: value,
          }))
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={value =>
          setFormData(prevFormData => ({
            ...prevFormData,
            description: value,
          }))
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={value =>
          setFormData(prevFormData => ({
            ...prevFormData,
            imgUrl: value,
          }))
        }
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={value =>
          setFormData(prevFormData => ({
            ...prevFormData,
            imdbUrl: value,
          }))
        }
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={value =>
          setFormData(prevFormData => ({
            ...prevFormData,
            imdbId: value,
          }))
        }
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isNotValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
