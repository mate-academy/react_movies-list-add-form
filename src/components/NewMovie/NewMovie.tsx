import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

type ValidationErrors = {
  title?: string;
  imgUrl?: string;
  imdbUrl?: string;
  imdbId?: string;
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [count, setCount] = useState(0);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const validateFields = () => {
    const newErrors: ValidationErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!imgUrl.trim() || !pattern.test(imgUrl)) {
      newErrors.imgUrl = 'Valid Image URL is required';
    }

    if (!imdbUrl.trim() || !pattern.test(imdbUrl)) {
      newErrors.imdbUrl = 'Valid IMDB URL is required';
    }

    if (!imdbId.trim()) {
      newErrors.imdbId = 'IMDB ID is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateFields()) {
      const newMovie: Movie = { title, description, imgUrl, imdbUrl, imdbId };

      onAdd(newMovie);
      setCount(count + 1);
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
      setErrors({});
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />
      {errors.title && <p className="help is-danger">{errors.title}</p>}

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />
      {errors.imgUrl && <p className="help is-danger">{errors.imgUrl}</p>}

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />
      {errors.imdbUrl && <p className="help is-danger">{errors.imdbUrl}</p>}

      <TextField
        name="imdbId"
        label="IMDB ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />
      {errors.imdbId && <p className="help is-danger">{errors.imdbId}</p>}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !title.trim() ||
              !imgUrl.trim() ||
              !imdbUrl.trim() ||
              !imdbId.trim()
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
