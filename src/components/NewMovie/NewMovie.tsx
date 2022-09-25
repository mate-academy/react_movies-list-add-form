import { useState } from 'react';
import { TextField } from '../TextField';

type Movie = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

type Props = {
  onAdd: (arg: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [isRequiared] = useState({
    title: true,
    description: false,
    imgUrl: true,
    imdbUrl: true,
    imdbId: true,
  });

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCount(count + 1);

    onAdd(movie);
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const isButtonDisabled = !movie.title || !movie.imdbId
  || !movie.imdbUrl || !movie.imgUrl;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => submitHandler(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(val) => setMovie(prev => ({
          ...prev,
          title: val,
        }))}
        required={isRequiared.title}
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(val) => setMovie(prev => ({
          ...prev,
          description: val,
        }))}
        required={isRequiared.description}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(val) => setMovie(prev => ({
          ...prev,
          imgUrl: val,
        }))}
        required={isRequiared.imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(val) => setMovie(prev => ({
          ...prev,
          imdbUrl: val,
        }))}
        required={isRequiared.imdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(val) => setMovie(prev => ({
          ...prev,
          imdbId: val,
        }))}
        required={isRequiared.imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
