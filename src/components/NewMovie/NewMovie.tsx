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

  const handleOnChangeTitle = (value: string) => {
    setNewMovie({ ...newMovie, title: value });
  };

  const handleOnChangeDescription = (value: string) => {
    setNewMovie({ ...newMovie, description: value });
  };

  const handleOnChangeImgUrl = (value: string) => {
    setNewMovie({ ...newMovie, imgUrl: value });
  };

  const handleOnChangeImdbUrl = (value: string) => {
    setNewMovie({ ...newMovie, imdbUrl: value });
  };

  const handleOnChangeImdbId = (value: string) => {
    setNewMovie({ ...newMovie, imdbId: value });
  };

  const handleOnClickButton: React.MouseEventHandler = (e) => {
    e.preventDefault();
    onAdd(newMovie);
    setCount(state => state + 1);
    setNewMovie((prev) => {
      return {
        ...prev,
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      };
    });
  };

  const disabled = !newMovie.title.trim()
  || !newMovie.imgUrl.trim()
  || !newMovie.imdbUrl.trim()
  || !newMovie.imdbId.trim();

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handleOnChangeTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleOnChangeDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        required
        onChange={handleOnChangeImgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        required
        onChange={handleOnChangeImdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        required
        onChange={handleOnChangeImdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabled}
            onClick={handleOnClickButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
