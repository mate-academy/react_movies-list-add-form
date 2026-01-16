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
  const [errorURL, setErrorURL] = useState('');
  const [errorImdbUrl, setErrorImdbUrl] = useState('');

  const isValidUrl = (url: string, label: string) =>
    patternURL.test(url) ? '' : `${label} is not correct`;

  const isDisabled = !title || !imgUrl || !imdbUrl || !imdbId;

  const handlerOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const imgError = isValidUrl(imgUrl, 'Image URL');
    const imdbError = isValidUrl(imdbUrl, 'Imdb URL');

    if (imgError || imdbError) {
      setErrorURL(imgError);
      setErrorImdbUrl(imdbError);

      return;
    } else {
      const newMovie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

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
        onChange={val => setTitle(val.trim())}
        required
        count={count}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={val => setDescription(val.trim())}
        count={count}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        errorURL={errorURL}
        onChange={val => {
          setImgUrl(val.trim());
          setErrorURL('');
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
          setImdbUrl(val.trim());
          setErrorImdbUrl('');
        }}
        count={count}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={val => setImdbId(val.trim())}
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
