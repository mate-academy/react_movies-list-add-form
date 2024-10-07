import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });
  const [count, setCount] = useState(0);

  const handleBlur = (field: string, value: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: value.trim() === '',
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title && imgUrl && imdbUrl && imdbId) {
      onAdd({ title, imgUrl, imdbUrl, imdbId, description });
      setTitle('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
      setDescription('');
      setErrors({
        title: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
      });
      setCount(prevCount => prevCount + 1);
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
        onBlur={() => handleBlur('title', title)}
        required
      />
      {errors.title && <p className="help is-danger">Title is required</p>}

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
        onBlur={() => handleBlur('imgUrl', imgUrl)}
        required
      />
      {errors.imgUrl && <p className="help is-danger">Image URL is required</p>}

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        onBlur={() => handleBlur('imdbUrl', imdbUrl)}
        required
      />
      {errors.imdbUrl && <p className="help is-danger">IMDB URL is required</p>}

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        onBlur={() => handleBlur('imdbId', imdbId)}
        required
      />
      {errors.imdbId && <p className="help is-danger">IMDB ID is required</p>}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!title || !imgUrl || !imdbUrl || !imdbId}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
