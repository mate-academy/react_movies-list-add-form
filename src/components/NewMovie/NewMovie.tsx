import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

const defaultValues = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type FormValues = typeof defaultValues;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [data, setData] = useState<FormValues>(defaultValues);
  const [isDisabled, setIsDisabled] = useState(true);
  const [count, setCount] = useState(0);

  const reset = () => {
    setData(defaultValues);
    setIsDisabled(true);
  };

  const handleChange = (name: keyof FormValues) => (value: string) => {
    setData(prevData => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      const isFormValid =
        updatedData.title &&
        updatedData.imgUrl &&
        updatedData.imdbUrl &&
        updatedData.imdbId;

      setIsDisabled(!isFormValid);

      return updatedData;
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!data.title || !data.imgUrl || !data.imdbUrl || !data.imdbId) {
      return;
    }

    setCount(currentCount => currentCount + 1);

    onAdd({
      title: data.title,
      description: data.description,
      imgUrl: data.imgUrl,
      imdbUrl: data.imdbUrl,
      imdbId: data.imdbId,
    });

    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={data.title}
        onChange={handleChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={data.description}
        onChange={handleChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={data.imgUrl}
        onChange={handleChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={data.imdbUrl}
        onChange={handleChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={data.imdbId}
        onChange={handleChange('imdbId')}
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
