import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

// function to create a new post
export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  // form validation function
  const validateForm = () => {
    const { title, imgUrl, imdbUrl, imdbId } = movie;
    const areEmptyFields =
      title.trim() !== '' &&
      imgUrl.trim() !== '' &&
      imdbUrl.trim() !== '' &&
      imdbId.trim() !== '' &&
      pattern.test(imgUrl.trim()) === true &&
      pattern.test(imdbUrl.trim()) === true;

    setIsFormValid(areEmptyFields);
  };

  // function of various input fields
  const handleInputChange = (name: keyof Movie, value: string) => {
    setMovie(prevMovie => ({
      ...prevMovie,
      [name]: value,
    }));

    validateForm();
  };

  // url validation function
  const handleUrlChange = (value: string) => {
    return pattern.test(value.trim());
  };

  // the function of sending the form when the "Add" button is pressed
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(movie);
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setIsFormValid(false);
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>
      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange('title', event.target.value)
        }
        onBlur={validateForm}
        required
        otherFieldsChanged={!!(movie.imgUrl || movie.imdbUrl || movie.imdbId)}
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange('description', event.target.value)
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange('imgUrl', event.target.value)
        }
        onBlur={validateForm}
        required
        customValidation={handleUrlChange}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange('imdbUrl', event.target.value)
        }
        onBlur={validateForm}
        required
        customValidation={handleUrlChange}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange('imdbId', event.target.value)
        }
        onBlur={validateForm}
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
