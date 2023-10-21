import React, { useState } from 'react';
import cn from 'classnames';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
// import { use } from 'chai';
interface NewMovieProps {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleDescription = (newDescriprion: string) => {
    setDescription(newDescriprion);
  };

  const handleImgUrl = (newImgUrl: string) => {
    setImageUrl(newImgUrl);
  };

  const handleImdbUrl = (newImdbUrl: string) => {
    setImdbUrl(newImdbUrl);
  };

  const handleImdbId = (newImdbId: string) => {
    setImdbId(newImdbId);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !imgUrl || !imdbUrl || !imdbId || hasError) {
      setHasError(true);

      return;
    }

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    setTitle('');
    setDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbId('');
    setHasError(false);

    setCount(count + 1);
  };

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
        value={title}
        onFieldChange={handleTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onFieldChange={handleDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onFieldChange={handleImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onFieldChange={handleImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onFieldChange={handleImdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className={cn(
              'button', 'is-link',
              {
                'is-light':
                ![title, imgUrl, imdbUrl, imdbId].every((el) => !!el),
              },
            )}
            onClick={() => {}}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
