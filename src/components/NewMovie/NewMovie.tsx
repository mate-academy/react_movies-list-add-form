import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { patternURL } from '../../constants/constants';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [errorURL, setErrorURL] = useState(false);
  const [errorImdbUrl, setErrorImdbUrl] = useState(false);

  const isValidUrl = (url: string) => setErrorURL(!patternURL.test(url));
  const isValidImdbUrl = (url: string) =>
    setErrorImdbUrl(!patternURL.test(url));

  const isDisabled =
    !title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim();

  const handlerOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!patternURL.test(imgUrl) || !patternURL.test(imdbUrl)) {
      isValidUrl(imgUrl.trim());
      isValidImdbUrl(imdbUrl.trim());

      return;
    } else {
      const newMovie = { title, description, imgUrl, imdbUrl, imdbId };

      onAdd(newMovie);

      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
      setCount(count + 1);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handlerOnSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={val => setTitle(val)}
        required
        count={count}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={val => setDescription(val)}
        count={count}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        errorURL={errorURL}
        onChange={val => {
          setImgUrl(val);
          setErrorURL(false);
        }}
        count={count}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        errorImdbUrl={errorImdbUrl}
        onChange={val => {
          setImdbUrl(val);
          setErrorImdbUrl(false);
        }}
        count={count}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={val => setImdbId(val)}
        count={count}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
