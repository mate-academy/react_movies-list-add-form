/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const urlPattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const increaseCount = () => setCount(prev => prev + 1);

  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const setField = (newValue: string, field: keyof Movie) => {
    setNewMovie(prev => ({ ...prev, [field]: newValue }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !newMovie.title.trim() ||
      !newMovie.imdbId.trim() ||
      !urlPattern.test(newMovie.imdbUrl) ||
      !urlPattern.test(newMovie.imgUrl)
    ) {
      return; // there is never too much validation
    }

    onAdd(newMovie);
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    increaseCount();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      {Object.keys(newMovie).map(key => (
        <TextField
          key={key}
          name={key}
          label={key[0].toLocaleUpperCase() + key.substring(1)}
          value={newMovie[key as keyof Movie]}
          onChange={value => {
            setField(value, key as keyof Movie);
          }}
          required={key !== 'description'}
          validator={
            key.endsWith('Url')
              ? (newValue: string) =>
                newValue.trim() !== ''
                && urlPattern.test(newValue)
              : (newValue: string) => (newValue.trim() !== '')
          }
        />
      ))}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !newMovie.title.trim() ||
              !newMovie.imdbId.trim() ||
              !urlPattern.test(newMovie.imdbUrl) ||
              !urlPattern.test(newMovie.imgUrl)
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
