import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const initialMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [movie, setMovie] = useState(initialMovie);
  const { title, description, imgUrl, imdbUrl, imdbId } = movie;

  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const validImdbUrl = pattern.test(imdbUrl);
  const validImgUrl = pattern.test(imgUrl);

  const isButtonDisabled =
    !title.trim() ||
    !imgUrl.trim() ||
    !imdbUrl.trim() ||
    !imdbId.trim() ||
    !validImdbUrl ||
    !validImgUrl;

  const reset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    setCount(c => c + 1);

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => reset(e)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={event => setMovie({ ...movie, title: event })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={event => setMovie({ ...movie, description: event })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        onChange={event => setMovie({ ...movie, imgUrl: event })}
        validURL={validImgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={event => setMovie({ ...movie, imdbUrl: event })}
        validURL={validImdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={event => setMovie({ ...movie, imdbId: event })}
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
