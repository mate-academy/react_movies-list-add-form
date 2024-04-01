import { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Types {
  onAdd: (movie: Movie) => void;
}

interface ValueType {
  value: string;
  touched: boolean;
}

export interface MovieCustom {
  title: ValueType;
  description: ValueType;
  imdbId: ValueType;
  imdbUrl: ValueType;
  imgUrl: ValueType;
}

interface MovieRequired {
  title: string;
  imdbId: string;
  imdbUrl: string;
  imgUrl: string;
}

export const NewMovie: React.FC<Types> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const [movie, setMovie] = useState<MovieCustom>({
    title: { value: '', touched: false },
    description: { value: '', touched: false },
    imdbId: { value: '', touched: false },
    imdbUrl: { value: '', touched: false },
    imgUrl: { value: '', touched: false },
  });

  const establishDisabled = () => {
    const checkMovie: MovieRequired = {
      title: movie.title.value.trim(),
      imdbId: movie.imdbId.value.trim(),
      imdbUrl: movie.imdbUrl.value.trim(),
      imgUrl: movie.imgUrl.value.trim(),
    };

    if (Object.values(checkMovie).includes('')) {
      return true;
    }

    return false;
  };

  const changeTouched = (key: keyof MovieCustom, touched: boolean) => {
    setMovie(prev => {
      return {
        ...prev,
        [key]: { value: movie[key].value, touched: touched },
      };
    });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({
      title: movie.title.value,
      description: movie.description.value,
      imdbId: movie.imdbId.value,
      imdbUrl: movie.imdbUrl.value,
      imgUrl: movie.imgUrl.value,
    });

    setMovie({
      title: { value: '', touched: false },
      description: { value: '', touched: false },
      imdbId: { value: '', touched: false },
      imdbUrl: { value: '', touched: false },
      imgUrl: { value: '', touched: false },
    });
  };

  const changeValue = (key: keyof MovieCustom, value: string) => {
    setMovie(prev => {
      return {
        ...prev,
        [key]: { touched: prev.title.touched, value: value },
      };
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={submit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={value => changeValue('title', value)}
        required
        changeTouched={changeTouched}
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={value => changeValue('description', value)}
        changeTouched={changeTouched}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={value => changeValue('imgUrl', value)}
        changeTouched={changeTouched}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={value => changeValue('imdbUrl', value)}
        changeTouched={changeTouched}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={value => changeValue('imdbId', value)}
        changeTouched={changeTouched}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={establishDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
