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

  const requiredFields = [title, imgUrl, imdbUrl, imdbId].every((el) => !!el);

  const reset = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    reset();

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
        onFieldChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onFieldChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onFieldChange={setImageUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onFieldChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onFieldChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!requiredFields}
            type="submit"
            data-cy="submit-button"
            className={cn(
              'button', 'is-link',
              {
                'is-light': !requiredFields,
              },
            )}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
