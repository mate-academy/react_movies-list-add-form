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
      title: movie.title.value,
      imdbId: movie.imdbId.value,
      imdbUrl: movie.imdbUrl.value,
      imgUrl: movie.imgUrl.value,
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

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
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
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={value => {
          setMovie(prev => {
            return {
              ...prev,
              title: { touched: prev.title.touched, value: value },
            };
          });
        }}
        required={true}
        changeTouched={changeTouched}
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={value => {
          setMovie(prev => {
            return {
              ...prev,
              description: { touched: prev.description.touched, value: value },
            };
          });
        }}
        changeTouched={changeTouched}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={value => {
          setMovie(prev => {
            return {
              ...prev,
              imgUrl: { touched: prev.imgUrl.touched, value: value },
            };
          });
        }}
        changeTouched={changeTouched}
        required={true}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={value => {
          setMovie(prev => {
            return {
              ...prev,
              imdbUrl: { touched: prev.imdbUrl.touched, value: value },
            };
          });
        }}
        changeTouched={changeTouched}
        required={true}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={value => {
          setMovie(prev => {
            return {
              ...prev,
              imdbId: { touched: prev.imdbId.touched, value: value },
            };
          });
        }}
        changeTouched={changeTouched}
        required={true}
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
