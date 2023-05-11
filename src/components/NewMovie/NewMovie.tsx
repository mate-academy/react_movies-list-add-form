/* eslint-disable max-len */
import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movies: Movie[]) => void
  movies : Movie[]
};

const inputs = ['title', 'description', 'imgUrl', 'imdbUrl', 'imdbId'];

const defaultMovie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd, movies }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>({ ...defaultMovie });

  const addHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onAdd([...movies, movie]);
    setMovie({ ...defaultMovie });
    setCount(movies.length);
  };

  function onChange(name: string, value: string) {
    setMovie({ ...movie, ...{ [name]: value } });
  }

  const validUrl = (url: string) => {
    const pattern = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/);

    return pattern.test(url);
  };

  const isValueEmpty = Object.entries(movie)
    .filter(item => item[0] !== 'description')
    .every(item => item[1] !== '');

  const renderInput = (inputName: string) => {
    return (
      <TextField
        key={inputName}
        name={inputName}
        label={inputName}
        value={movie[inputName]}
        required={inputName !== 'description'}
        isEqual={['imgUrl', 'imdbUrl'].includes(inputName) ? validUrl(movie[inputName]) : true}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onChange}
        count={count}
      />
    );
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      {inputs.map(input => renderInput(input))}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValueEmpty || !validUrl(movie.imdbUrl) || !validUrl(movie.imgUrl)}
            onClick={(e) => addHandler(e)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
