import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [imgUrlisValid, setimgUrlisValid] = useState(false);
  const [imdbUrlisValid, setimdbUrlisValid] = useState(false);

  const requiredFields = [
    movie.title,
    movie.imgUrl,
    movie.imdbUrl,
    movie.imdbId,
  ];
  const validFields = [imgUrlisValid, imdbUrlisValid];

  function fieldsAreFilled(fields: string[]) {
    return fields.every(field => field.trim());
  }

  function fieldsAreValid(fields: boolean[]) {
    return fields.every(Boolean);
  }

  const fieldsAreCorrect =
    fieldsAreFilled(requiredFields) && fieldsAreValid(validFields);

  function reset() {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!fieldsAreCorrect) {
      return;
    }

    onAdd(movie);

    setCount(count + 1);

    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={newTitle =>
          setMovie(prevState => ({
            ...prevState,
            title: newTitle,
          }))
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={newDesc =>
          setMovie(prevState => ({
            ...prevState,
            description: newDesc,
          }))
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={newImgUrl =>
          setMovie(prevState => ({
            ...prevState,
            imgUrl: newImgUrl,
          }))
        }
        validator={(value, pattern) => {
          if (pattern.test(value)) {
            setimgUrlisValid(true);

            return true;
          }

          setimgUrlisValid(false);

          return false;
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={newImdbUrl =>
          setMovie(prevState => ({
            ...prevState,
            imdbUrl: newImdbUrl,
          }))
        }
        validator={(value, pattern) => {
          if (pattern.test(value)) {
            setimdbUrlisValid(true);

            return true;
          }

          setimdbUrlisValid(false);

          return false;
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={newImdbId =>
          setMovie(prevState => ({
            ...prevState,
            imdbId: newImdbId,
          }))
        }
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!fieldsAreCorrect}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
