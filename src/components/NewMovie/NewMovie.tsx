import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }: Props) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const imbdUrlIsVailid = pattern.test(movie.imdbUrl);
  const imgUrlIsVailid = pattern.test(movie.imgUrl);

  const handleDisable = !movie.title || !movie.imgUrl
    || !movie.imdbUrl || !movie.imdbId || !imbdUrlIsVailid || !imgUrlIsVailid;

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovie((prev) => (
      { ...prev, [event.target.name]: event.target.value }
    ));
  };

  const reset = () => {
    setMovie({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!imbdUrlIsVailid) {
      return;
    }

    if (!imgUrlIsVailid) {
      return;
    }

    setCount(count + 1);
    reset();

    onAdd(movie);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleInputs}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleInputs}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleInputs}
        pattern={pattern}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleInputs}
        pattern={pattern}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleInputs}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleSubmit}
            disabled={handleDisable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
