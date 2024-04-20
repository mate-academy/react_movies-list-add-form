import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [movieFields, setMovieFields] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setMovieFields(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(movieFields);

    setMovieFields({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(num => num + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieFields.title}
        onChange={handleChange}
        required={true}
      />

      <TextField
        name="description"
        label="Description"
        value={movieFields.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieFields.imgUrl}
        onChange={handleChange}
        required={true}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieFields.imdbUrl}
        onChange={handleChange}
        required={true}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieFields.imdbId}
        onChange={handleChange}
        required={true}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !movieFields.title ||
              !movieFields.imgUrl ||
              !movieFields.imdbId ||
              !movieFields.imdbUrl
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
