import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [imgUrlHasMistake, setImgUrlHasMistake] = useState(false);
  const [imdbUrlHasMistake, setImdbUrlHasMistake] = useState(false);

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const checkUrl = () => {
    const pattern
    // eslint-disable-next-line max-len
    = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    setImgUrlHasMistake(!pattern.test(newMovie.imgUrl));
    setImdbUrlHasMistake(!pattern.test(newMovie.imdbUrl));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (imgUrlHasMistake || imdbUrlHasMistake) {
      return;
    }

    onAdd(newMovie);
    reset();
    setCount(currentCount => currentCount + 1);
  };

  const isDisabled = !newMovie.title || !newMovie.imgUrl || !newMovie.imdbUrl
  || !newMovie.imdbId || imgUrlHasMistake || imdbUrlHasMistake;

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
        value={newMovie.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(event) => {
          handleChange(event);
          setImgUrlHasMistake(false);
        }}
        urlMistake={imgUrlHasMistake}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(event) => {
          handleChange(event);
          setImdbUrlHasMistake(false);
        }}
        urlMistake={imdbUrlHasMistake}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={checkUrl}
            disabled={!!isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
