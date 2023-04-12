import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  const [count, setCount] = useState<number>(0);

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const isUrlValid = (url: string): boolean => {
    return pattern.test(url);
  };

  const [formData, setFormData] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const checkForm = (formData.title.trim().length !== 0
    && formData.imgUrl
    && formData.imdbUrl
    && formData.imdbId.trim().length !== 0
    && isUrlValid(formData.imgUrl)
    && isUrlValid(formData.imdbUrl)
  );

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const newMovie = {
    title: formData.title,
    description: formData.description,
    imgUrl: formData.imgUrl,
    imdbUrl: formData.imdbUrl,
    imdbId: formData.imdbId,
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCount((current: number) => current + 1);
    onAdd(newMovie);
    resetForm();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const isSingleWord = /^\S+$/.test(value);

    if (isSingleWord) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value.trim(),
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={handleChange}
        isUrlValid={isUrlValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={handleChange}
        isUrlValid={isUrlValid}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!checkForm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
