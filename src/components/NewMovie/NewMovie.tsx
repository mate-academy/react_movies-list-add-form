import classNames from 'classnames';
import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

/* eslint-disable */

const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

/* eslint-enable */

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [imgUrl, setImageUrl] = useState('');
  // const [imdbUrl, setImdbUrl] = useState('');
  // const [imdbId, setImdbId] = useState('');
  const [hasError, setHasError] = useState(false);

  const isValidLink = (link: string) => (pattern.test(link));

  const fullFields = newMovie.title.trim()
  && newMovie.imgUrl.trim()
  && newMovie.imdbUrl.trim()
  && newMovie.imdbId.trim()
  && isValidLink(newMovie.imgUrl)
  && isValidLink(newMovie.imdbUrl);

  const reset = () => {
    // setTitle('');
    // setDescription('');
    // setImageUrl('');
    // setImdbUrl('');
    // setImdbId('');
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setHasError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(count + 1);

    reset();
  };

  const handleChange = (e: ...) => {
    const {name, value} = e.target;
    setMovie((prevMovie) => ({...prevMovie, [name]: value}))
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
      onReset={reset}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        forChange={(value) => {
          setNewMovie(value);
          // setHasError(false);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        forChange={(value) => {
          setNewMovie(value);
          setHasError(true);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        forChange={(value) => {
          setNewMovie(value);
          setHasError(false);
        }}
        required
        isValidLink={isValidLink}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        forChange={(value) => {
          setNewMovie(value);
          setHasError(false);
        }}
        required
        isValidLink={isValidLink}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        forChange={(value) => {
          setNewMovie(value);
          setHasError(false);
        }}
        required
      />

      <div className={classNames('field', {
        'is-grouped': fullFields && !hasError,
      })}
      >
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!fullFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
