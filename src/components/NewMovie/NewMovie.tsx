import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movies: Movie[]) => void
  movies : Movie[]
};

const defaultMovie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd, movies }) => {
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [movie, setMovie] = useState<Movie>({ ...defaultMovie });
  const inputs = ['title', 'description', 'imgUrl', 'imdbUrl', 'imdbId'];

  const addHendler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onAdd([...movies, movie]);
    setMovie({ ...defaultMovie });
    setCount(movies.length);
  };

  const renderInput = (inputName: string) => {
    return (
      <TextField
        key={inputName}
        name={inputName}
        label={inputName}
        value={movie}
        required={inputName !== 'description'}
        setDisabled={setDisabled}
        onChange={setMovie}
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
            disabled={disabled}
            onClick={(e) => addHendler(e)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
