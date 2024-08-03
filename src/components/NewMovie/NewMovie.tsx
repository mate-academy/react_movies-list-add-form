import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export const NewMovie = ({
  setNewMovies,
}: {
  setNewMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (newValue: string, name: string) => {
    setFormState(prevState => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const AddMovie = () => {
    setNewMovies(prevMovies => [...prevMovies, formState]);

    setFormState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(count + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    AddMovie();
  };

  const emptyField =
    !formState.title.trim() ||
    !formState.imdbId.trim() ||
    !formState.imdbUrl.trim() ||
    !formState.imgUrl.trim();

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formState.title}
        onChange={value => handleChange(value, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formState.description}
        onChange={value => handleChange(value, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formState.imgUrl}
        onChange={value => handleChange(value, 'imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formState.imdbUrl}
        onChange={value => handleChange(value, 'imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formState.imdbId}
        onChange={value => handleChange(value, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={emptyField}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
