import classNames from 'classnames';
import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isButtonDisabled = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = formValues;

    return !(title.trim() && imgUrl.trim()
      && imdbUrl.trim() && imdbId.trim());
  };

  const handleChange = (value: string, name: string) => {
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const reset = () => {
    setFormValues({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = ((event: React.FormEvent) => {
    event.preventDefault();

    onAdd(formValues);

    setCount(count + 1);
    reset();
  });

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
        value={formValues.title}
        onChange={(value) => handleChange(value, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formValues.description}
        onChange={(value) => handleChange(value, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formValues.imgUrl}
        onChange={(value) => handleChange(value, 'imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formValues.imdbUrl}
        onChange={(value) => handleChange(value, 'imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formValues.imdbId}
        onChange={(value) => handleChange(value, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className={classNames('button', 'is-link')}
            disabled={isButtonDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
