import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  // eslint-disable-next-line max-len, prettier/prettier
  const formFilledOut = !newMovie.title.trim()  || !newMovie.imgUrl.trim() || !newMovie.imdbUrl.trim() || !newMovie.imdbId.trim();

  const handlerInput = (key: keyof Movie, newValue: string) => {
    setNewMovie({ ...newMovie, [key]: newValue });
  };

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setCount(oldCount => oldCount + 1);
    onAdd(newMovie);
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handlerSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={newValue => {
          handlerInput('title', newValue);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={newValue => {
          handlerInput('description', newValue);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={newValue => {
          handlerInput('imgUrl', newValue);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={newValue => {
          handlerInput('imdbUrl', newValue);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={newValue => {
          handlerInput('imdbId', newValue);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={formFilledOut}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
