import { useState } from 'react';
import { Movie } from '../types/Movie';
import { TextField } from '../TextField/TextField';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [touchedFields, setTouchedFields] = useState({
    title: false,
    description: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const pattern = /^https:\/\/\S+$/;

  const handleBlur = (field: keyof typeof touchedFields) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
  };

  const isFormValid = (): boolean => {
    const trimmedTitle = title.trim();
    const trimmedImgUrl = imgUrl.trim();
    const trimmedImdbUrl = imdbUrl.trim();
    const trimmedImdbId = imdbId.trim();

    return (
      trimmedTitle &&
      pattern.test(trimmedImgUrl) &&
      pattern.test(trimmedImdbUrl) &&
      trimmedImdbId
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid()) return;

    onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });

    resetForm();
  };

  const resetForm = () => {
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

  return (
    <form className="new-movie" onSubmit={handleSubmit} data-cy="movie-form">
      <h2 className="new-movie__title">Add a new movie</h2>

      <TextField
        label="Title"
        name="title"
        value={title}
        onChange={setTitle}
        onBlur={() => handleBlur('title')}
        isTouched={touchedFields.title}
        required
        data-cy="movie-title"
      />

      <TextField
        label="Description"
        name="description"
        value={description}
        onChange={setDescription}
        onBlur={() => handleBlur('description')}
        isTouched={touchedFields.description}
        data-cy="movie-description"
      />

      <TextField
        label="Image URL"
        name="imgUrl"
        value={imgUrl}
        onChange={setImgUrl}
        onBlur={() => handleBlur('imgUrl')}
        isTouched={touchedFields.imgUrl}
        required
        customValidate={value => !pattern.test(value.trim())}
        errorMessage="Invalid URL"
        data-cy="movie-imgUrl"
      />

      <TextField
        label="IMDB URL"
        name="imdbUrl"
        value={imdbUrl}
        onChange={setImdbUrl}
        onBlur={() => handleBlur('imdbUrl')}
        isTouched={touchedFields.imdbUrl}
        required
        customValidate={value => !pattern.test(value.trim())}
        errorMessage="Invalid URL"
        data-cy="movie-imdbUrl"
      />

      <TextField
        label="IMDB ID"
        name="imdbId"
        value={imdbId}
        onChange={setImdbId}
        onBlur={() => handleBlur('imdbId')}
        isTouched={touchedFields.imdbId}
        required
        data-cy="movie-imdbId"
      />

      <button
        type="submit"
        className="new-movie__submit"
        disabled={!isFormValid()}
        data-cy="submit-button"
      >
        Add Movie
      </button>
    </form>
  );
};
