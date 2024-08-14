import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAddMovie: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAddMovie }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imdbUrl, setImdbUrl] = useState<string>('');
  const [imdbId, setImdbId] = useState<string>('');

  const [errs, setErrs] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleTitle = (newValue: string) => setTitle(newValue);
  const handleDescription = (newValue: string) => setDescription(newValue);
  const handleImgUrl = (newValue: string) => setImgUrl(newValue);
  const handleImdbUrl = (newValue: string) => setImdbUrl(newValue);
  const handleImdbId = (newValue: string) => setImdbId(newValue);

  const validate = () => {
    const newErrs = {
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    };

    if (!title.trim()) {
      newErrs.title = 'Title is required';
    }

    if (!imgUrl.trim()) {
      newErrs.imgUrl = 'Image URL is required';
    }

    if (!imdbUrl.trim()) {
      newErrs.imdbUrl = 'IMDB URL is required';
    }

    if (!imdbId.trim()) {
      newErrs.imdbId = 'IMDB ID is required';
    }

    setErrs(newErrs);

    return !Object.values(newErrs).some(err => err !== '');
  };

  const clearErrs = () => {
    setErrs({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const newMovie: Movie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      onAddMovie(newMovie);

      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');

      clearErrs();
    }
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitle}
        required
        onBlur={validate}
        error={errs.title}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrl}
        required
        onBlur={validate}
        error={errs.imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={imdbUrl}
        onChange={handleImdbUrl}
        required
        onBlur={validate}
        error={errs.imdbUrl}
      />

      <TextField
        name="imdbId"
        label="IMDB ID"
        value={imdbId}
        onChange={handleImdbId}
        required
        onBlur={validate}
        error={errs.imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
