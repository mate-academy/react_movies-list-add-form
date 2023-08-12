import React, { useState } from 'react';
import './NewMovie.scss';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  theme: string;
  onAdd: (movie: Movie) => void;
}

type PackMovie = (
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
) => {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

const packMovie: PackMovie = (
  title,
  description,
  imgUrl,
  imdbUrl,
  imdbId,
) => {
  return {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };
};

const handlerSubmit = (
  packedMovie: Movie,
  callback: (movie: Movie) => void,
  event: React.FormEvent,
  count: number,
  setCount: React.Dispatch<React.SetStateAction<number>>,
  clearFields: () => void,
): void => {
  event.preventDefault();
  setCount(count + 1);

  callback(packedMovie);
  clearFields();
};

export const NewMovie: React.FC<Props> = ({ theme, onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const checkFields = () => !(title && imgUrl && imdbUrl && imdbId);

  const clearFields = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        const packedMovie = packMovie(
          title,
          description,
          imgUrl,
          imdbUrl,
          imdbId,
        );

        handlerSubmit(
          packedMovie,
          onAdd,
          event,
          count,
          setCount,
          clearFields,
        );
      }}
    >
      <h2 className={`title title--${theme}`}>Add a movie</h2>

      <TextField
        theme={theme}
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        theme={theme}
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        theme={theme}
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        theme={theme}
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        theme={theme}
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={checkFields()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
