import React, { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [description, setDescription] = useState('');
  const [hasDescriptionError, setHasDesctiptionError] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  const [hasImageUrlError, setHasImageUrlError] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [hasImdbUrlError, setHasImdbUrlError] = useState(false);

  const [imdbId, setImdbID] = useState('');
  const [hasImdbIDError, setHasImdbIDError] = useState(false);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    const allFieldsFilled =
      title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

    setIsSubmitDisabled(!allFieldsFilled);
  }, [title, imgUrl, imdbId, imdbUrl]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setHasTitleError(false);
  };

  const handleDesctiptionChange = (value: string) => {
    setDescription(value);
    setHasDesctiptionError(false);
  };

  const handleImageUrlChange = (value: string) => {
    setImgUrl(value);
    setHasImageUrlError(false);
  };

  const handleImdbUrlChange = (value: string) => {
    setImdbUrl(value);
    setHasImdbUrlError(false);
  };

  const handleImdbIDChange = (value: string) => {
    setImdbID(value);
    setHasImdbIDError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasImageUrlError(!imgUrl);
    setHasImdbUrlError(!imdbUrl);
    setHasImdbIDError(!imdbId);

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbID('');
    setCount(prevCount => prevCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
        error={hasTitleError}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDesctiptionChange}
        required
        error={hasDescriptionError}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImageUrlChange}
        required
        error={hasImageUrlError}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        required
        error={hasImdbUrlError}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIDChange}
        required
        error={hasImdbIDError}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
