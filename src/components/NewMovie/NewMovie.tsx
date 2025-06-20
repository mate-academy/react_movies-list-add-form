import React, { useState, useEffect } from 'react';
import { TextField } from '../TextField/TextField';

type NewMovieProps = {
  onAdd: (movie: {
    title: string;

  }) => void;
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [description, setDescription] = useState('');

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const requiredFieldsFilled =
      title.trim() !== '' &&
      imgUrl.trim() !== '' &&
      imdbUrl.trim() !== '' &&
      imdbId.trim() !== '';

    setIsSubmitDisabled(!requiredFieldsFilled);
  }, [title, imgUrl, imdbUrl, imdbId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitDisabled) {
      return;
    }

    const movieData = {
      title: title.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
      description: description.trim(),
    };

    onAdd(movieData);

    setTitle('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setDescription('');
    setFormKey(prev => prev + 1);
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) => (value: string) =>
      setter(value);

  const handleBlur = () => {};

  return (
    <form key={formKey} onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleChange(setTitle)}
        onBlur={handleBlur}
        required
      />
      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChange(setImgUrl)}
        onBlur={handleBlur}
        required
      />
      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={imdbUrl}
        onChange={handleChange(setImdbUrl)}
        onBlur={handleBlur}
        required
      />
      <TextField
        name="imdbId"
        label="IMDB ID"
        value={imdbId}
        onChange={handleChange(setImdbId)}
        onBlur={handleBlur}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChange(setDescription)}
        onBlur={handleBlur}
        required={false}
      />
      <button type="submit" data-cy="submit-button" disabled={isSubmitDisabled}>
        Add Movie
      </button>
    </form>
  );
};
