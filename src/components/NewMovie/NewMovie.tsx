import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [touchedFields, setTouchedFields] = useState<{
    [key: string]: boolean;
  }>({
    title: false,
    description: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const handleBlur = (field: string) => {
    setTouchedFields({
      ...touchedFields,
      [field]: true,
    });
  };

  const isFormValid = (): boolean => {
    return (
      title.trim() !== '' &&
      imgUrl.trim() !== '' &&
      imdbUrl.trim() !== '' &&
      imdbId.trim() !== ''
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    onAdd({ title, description, imgUrl, imdbUrl, imdbId });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setTouchedFields({
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });
  };

  const getFieldError = (field: string): string | undefined => {
    if (touchedFields[field] && !eval(field).trim()) {
      return 'This field is required';
    }

    return undefined;
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onBlur={() => handleBlur('title')}
        error={getFieldError('title')}
      />
      <TextField
        name="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        onBlur={() => handleBlur('description')}
        error={getFieldError('description')}
      />
      <TextField
        name="imgUrl"
        value={imgUrl}
        onChange={e => setImgUrl(e.target.value)}
        onBlur={() => handleBlur('imgUrl')}
        error={getFieldError('imgUrl')}
      />
      <TextField
        name="imdbUrl"
        value={imdbUrl}
        onChange={e => setImdbUrl(e.target.value)}
        onBlur={() => handleBlur('imdbUrl')}
        error={getFieldError('imdbUrl')}
      />
      <TextField
        name="imdbId"
        value={imdbId}
        onChange={e => setImdbId(e.target.value)}
        onBlur={() => handleBlur('imdbId')}
        error={getFieldError('imdbId')}
      />
      <button type="submit" data-cy="submit-button" disabled={!isFormValid()}>
        Add Movie
      </button>
    </form>
  );
};

export default NewMovie;
