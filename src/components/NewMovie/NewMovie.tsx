import React, { useState } from 'react';
import { TextField } from '../TextField';

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

type Props = {
  onAdd: (moview: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
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

  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const isFormValid =
    newMovie.title.length > 0 &&
    newMovie.imgUrl.length > 0 &&
    pattern.test(newMovie.imgUrl) &&
    newMovie.imdbUrl.length > 0 &&
    pattern.test(newMovie.imdbUrl) &&
    newMovie.imdbId.length > 0;

  // const isValid = (): boolean => {
  //   let valid: boolean = false;
  //   const pattern =
  //     // eslint-disable-next-line max-len
  //     /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  //   for (const [key, value] of Object.entries(newMovie)) {
  //     console.log(value);
  //     if (key !== 'description' && value.trim().length > 0) {
  //       console.log(value);
  //       valid = true;
  //       if (key === 'imdbUrl') {
  //         valid = pattern.test(value);
  //       }

  //       if (key === 'imgUrl') {
  //         valid = pattern.test(value);
  //       }
  //     }
  //   }

  //   return valid;
  // };

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      onAdd(newMovie);
      setCount(count + 1);
      setNewMovie({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleAddMovie}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(newValue: string) =>
          setNewMovie({ ...newMovie, title: newValue })
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(newValue: string) =>
          setNewMovie({ ...newMovie, description: newValue })
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(newValue: string) =>
          setNewMovie({ ...newMovie, imgUrl: newValue })
        }
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(newValue: string) =>
          setNewMovie({ ...newMovie, imdbUrl: newValue })
        }
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(newValue: string) =>
          setNewMovie({ ...newMovie, imdbId: newValue })
        }
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            // disabled
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
