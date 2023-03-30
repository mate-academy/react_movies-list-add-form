import React, { useState, useEffect, FormEvent } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, increaseCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (title.length
      && imgUrl.length
      && imdbUrl.length
      && imdbId.length
      && isVerified
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  });

  const clearData = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    increaseCount(prevState => prevState + 1);
    setIsDisabled(true);
  };

  const handlerOnSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (title !== ' ') {
      onAdd(newMovie);
    }

    clearData();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        handlerOnSubmit(event);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newValue) => {
          setTitle(newValue);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue) => {
          setDescription(newValue);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        isValid
        onChange={(newValue, verified) => {
          setIsVerified(verified);
          setImgUrl(newValue);
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        isValid
        onChange={(newValue, veriied) => {
          setIsVerified(veriied);
          setImdbUrl(newValue);
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={(newValue) => {
          setImdbId(newValue);
        }}
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
