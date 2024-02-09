import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (count: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  let isDisabled = true;

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  if (newMovie.title.trim() && newMovie.imgUrl.trim()
    && newMovie.imdbUrl.trim() && newMovie.imdbId.trim()) {
    isDisabled = false;
  }

  // const handleChange = (e: ...) => {
  //   const {name, value} = e.target;
  //   setMovie((prevMovie) => ({...prevMovie, [name]: value}))
  // }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // const {name, value} = event.currentTarget;
    // setNewMovie((prevMovie) => ({...prevMovie, [name]: value}))

    if (!newMovie.title || !newMovie.imgUrl
      || !newMovie.imdbUrl || !newMovie.imdbId) {
      return;
    }

    onAdd(newMovie);

    setCount(currentCount => currentCount + 1);

    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(e) => {
        setCount(count + 1);
        handleSubmit(e);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(value) => setNewMovie({ ...newMovie, title: value })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(value) => setNewMovie({ ...newMovie, description: value })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(value) => setNewMovie({ ...newMovie, imgUrl: value })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(value) => setNewMovie({ ...newMovie, imdbUrl: value })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(value) => setNewMovie({ ...newMovie, imdbId: value })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
