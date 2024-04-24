import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  let [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title && imgUrl && imdbUrl && imdbId) {
      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });
      setCount(count + 1);
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }
  };

  const handleTitleChange = (newValue: string) => {
    setTitle(newValue);
  };

  const handleDescriptionChange = (newValue: string) => {
    setDescription(newValue);
  };
  const handleImageUrChange = (newValue: string) => {
    setImgUrl(newValue);
  };
  const handleImbdUrlChange = (newValue: string) => {
    setImdbUrl(newValue);
  };
  const handleImbdIDEChange = (newValue: string) => {
    setImdbId(newValue);
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
      />

      <TextField
        name="description"
        label="Description"
        onChange={handleDescriptionChange}
        value={description}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImageUrChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImbdUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImbdIDEChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!title || !imgUrl || !imdbUrl || !imdbId}
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
