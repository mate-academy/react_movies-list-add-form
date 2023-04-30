import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({
  onAdd,
}) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  const isFormValid = title && imgUrl && imdbUrl && imdbId;

  const updateNewMovie = (key: string, value: string) => {
    setNewMovie((currentMovie) => ({
      ...currentMovie,
      [key]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid) {
      onAdd(newMovie);
    }

    setCount((currentCount) => currentCount + 1);

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
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
        onChange={(newTitle) => updateNewMovie('title', newTitle)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newDescription) => updateNewMovie(
          'description', newDescription,
        )}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newImgUrl) => updateNewMovie('imgUrl', newImgUrl)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newImdbUrl) => updateNewMovie('imdbUrl', newImdbUrl)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newImdbId) => updateNewMovie('imdbId', newImdbId)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
