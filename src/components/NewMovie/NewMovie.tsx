import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
  //getMaxId: (movies: Movie[]) => number | (() => number);
  movies: Movie[];
  errorMessage: string;
  titleErrorMessage: string;
};
function getMaxId(movies: Movie[]) {
  return Math.max(...movies.map(m => movies.indexOf(m)));
}

export const NewMovie: React.FC<Props> = ({ onAdd, movies }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

  const [count, setCount] = useState(getMaxId(movies) + 1);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState('');
  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const reset = () => {
    setTitle('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setDescription('');
    setTitleErrorMessage('');
    setErrorMessage('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const movie = {
      title: title,
      description: description,
      imgUrl: imgUrl,
      imdbUrl: imdbUrl,
      imdbId: imdbId,
      count: count,
    };

    //if (!title || !imdbUrl || !imgUrl) {
    // return;
    //}
    if (!title) {
      setTitleErrorMessage('should have some text');
    } else if (title.length < 5) {
      setTitleErrorMessage('should have at least 5 chars');
    }

    if (!pattern.test(imgUrl) || !pattern.test(imdbUrl)) {
      setErrorMessage('not valid');

      return;
    }

    if (!title || !imdbUrl || !imgUrl || title.length < 5) {
      return;
    }

    onAdd(movie);
    setCount(currentCount => currentCount + 1);
    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
        errorMessage={titleErrorMessage}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
        errorMessage=""
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
        errorMessage={errorMessage}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        errorMessage={errorMessage}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        errorMessage=""
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
