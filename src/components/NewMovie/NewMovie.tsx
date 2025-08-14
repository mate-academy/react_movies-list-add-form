import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onSubmit: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onSubmit }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  // const [touchedTitle, setTouchedTitle] = useState(false);
  const [description, setDescription] = useState('');
  // const [toucheDescription, setToucheDescription] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  // const [toucheImgUrl, setToucheImgUrl] = useState(false);
  const [imdbUrl, setImdbUrl] = useState('');
  // const [toucheImdbUrl, setToucheImdbUrl] = useState(false);
  const [imdbId, setimdbId] = useState('');
  // const [toucheImdbId, setToucheImdbId] = useState(false);

  const handlerOnTitle = (value: string) => {
    setTitle(value);
  };

  const handlerOnDescription = (value: string) => {
    setDescription(value);
  };

  const handlerOnImgUrl = (value: string) => {
    setImgUrl(value);
  };

  const handlerOnImdbUrl = (value: string) => {
    setImdbUrl(value);
  };

  const handlerOnImdbId = (value: string) => {
    setimdbId(value);
  };

  const notAllDataInput =
    !title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim();

  const handlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!notAllDataInput) {
      onSubmit({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setimdbId('');
      // setTouched(false);
      setCount(prev => prev + 1);
      // setTouchedTitle(false);
      // setToucheDescription(false);
      // setToucheImgUrl(false);
      // setToucheImdbUrl(false);
      // setToucheImdbId(false);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handlerSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handlerOnTitle}
        required
        // touched={touchedTitle}
        // setTouched={setTouchedTitle}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handlerOnDescription}
        // touched={toucheDescription}
        // setTouched={setToucheDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handlerOnImgUrl}
        required
        // touched={toucheImgUrl}
        // setTouched={setToucheImgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handlerOnImdbUrl}
        required
        // touched={toucheImdbUrl}
        // setTouched={setToucheImdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handlerOnImdbId}
        required
        // touched={toucheImdbId}
        // setTouched={setToucheImdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={notAllDataInput}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
