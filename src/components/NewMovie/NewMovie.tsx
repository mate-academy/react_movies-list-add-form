import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const {
    title, description, imgUrl, imdbUrl, imdbId,
  } = newMovie;

  const disabled = !(
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim()
  );

  const clear = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleInputChange
    = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
      setNewMovie({ ...newMovie, [field]: event.target.value });
    };

  const handleSubmitChange = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(newMovie);
    clear();
    setCount(count + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmitChange}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(e) => handleInputChange(e, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(e) => handleInputChange(e, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(e) => handleInputChange(e, 'imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(e) => handleInputChange(e, 'imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(e) => handleInputChange(e, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
