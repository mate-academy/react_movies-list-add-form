import { useState } from 'react';

import { TextField } from '../TextField';

import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movieTitle, setMovieTitle] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieImage, setMovieImage] = useState('');
  const [imdbLink, setImdbLink] = useState('');
  const [imdbIdentifier, setImdbIdentifier] = useState('');

  const validateRequiredFields = (): boolean => {
    const pattern =
      // eslint-disable-next-line
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (
      !movieTitle.trim() ||
      !imdbIdentifier.trim() ||
      !movieImage.trim() ||
      !imdbLink.trim()
    ) {
      return false;
    }

    if (!pattern.test(movieImage) || !pattern.test(imdbLink)) {
      return false;
    }

    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCount(count + 1);
    setMovieTitle('');
    setMovieDescription('');
    setMovieImage('');
    setImdbLink('');
    setImdbIdentifier('');

    onAdd({
      title: movieTitle,
      description: movieDescription,
      imgUrl: movieImage,
      imdbUrl: imdbLink,
      imdbId: imdbIdentifier,
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieTitle}
        onChange={title => setMovieTitle(title)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieDescription}
        onChange={description => setMovieDescription(description)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieImage}
        onChange={image => setMovieImage(image)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbLink}
        onChange={link => setImdbLink(link)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdentifier}
        onChange={id => setImdbIdentifier(id)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!validateRequiredFields()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
