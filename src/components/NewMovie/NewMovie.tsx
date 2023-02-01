import React, { FormEvent, useEffect, useState } from 'react';
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

  useEffect(() => {
    if (title.length
        && imgUrl.length
        && imdbUrl.length
        && imdbId.length
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

  const inputValidation = (newValue: string) => {
    // eslint-disable-next-line max-len
    // const pattern = /^'((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$',\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$'/;
    // const regex = new RegExp(pattern);
    //
    // if (newValue.match(regex)) {
    //   // eslint-disable-next-line no-console
    //   console.log(newValue);
    //
    //   return newValue;
    // }

    return newValue;
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
        onChange={(newValue) => {
          setImgUrl(inputValidation(newValue));
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={(newValue) => {
          setImdbUrl(inputValidation(newValue));
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
