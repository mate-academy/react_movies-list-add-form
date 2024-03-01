import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movieInfo, setMovieInfo] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [count, setCount] = useState(0);

  // prettier-ignore
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  // prettier-ignore
  const isActive = !!movieInfo.title
    && !!movieInfo.imgUrl
    && !!movieInfo.imdbUrl
    && !!movieInfo.imdbId
    && !!pattern.test(movieInfo.imdbUrl)
    && !!pattern.test(movieInfo.imgUrl);

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCount(count + 1);

    onAdd(movieInfo);
    setMovieInfo({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleInput = (name: keyof Movie, value: string) => {
    setMovieInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleOnSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieInfo.title}
        required
        onChange={(value: string) => handleInput('title', value)}
      />

      <TextField
        name="description"
        label="Description"
        value={movieInfo.description}
        onChange={(value: string) => handleInput('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieInfo.imgUrl}
        required
        onChange={(value: string) => handleInput('imgUrl', value)}
        pattern={pattern}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieInfo.imdbUrl}
        required
        onChange={(value: string) => handleInput('imdbUrl', value)}
        pattern={pattern}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieInfo.imdbId}
        required
        onChange={(value: string) => handleInput('imdbId', value)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isActive}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
