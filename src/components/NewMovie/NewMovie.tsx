import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [isTitleValid, setIsTitleValid] = useState(false);

  const [description, setDescription] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [isImgUrlValid, setIsImgUrlValid] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [isImdbUrlValid, setIsImdbUrlValid] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const [isImdbIdValid, setIsImdbIdValid] = useState(false);

  const handleChangeTitle = (text: string) => {
    const newTitle = text.trim();

    setTitle(newTitle);

    setIsTitleValid(!!newTitle);
  };

  const handleChangeImgUrl = (text: string) => {
    const newImgUrl = text.trim();

    setImgUrl(newImgUrl);

    setIsImgUrlValid(!!newImgUrl);
  };

  const handleChangeImdbUrl = (text: string) => {
    const newImdbUrl = text.trim();

    setImdbUrl(newImdbUrl);

    setIsImdbUrlValid(!!newImdbUrl);
  };

  const handleChangeImdbId = (text: string) => {
    const newImdbId = text.trim();

    setImdbId(newImdbId);

    setIsImdbIdValid(!!newImdbId);
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setIsTitleValid(false);
    setIsImgUrlValid(false);
    setIsImdbUrlValid(false);
    setIsImdbIdValid(false);

    setCount(count + 1);
  };

  const disabled =
    !isTitleValid || !isImgUrlValid || !isImdbUrlValid || !isImdbIdValid;

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleClick}
      onReset={reset}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={text => {
          handleChangeTitle(text);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={text => {
          setDescription(text);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={text => {
          handleChangeImgUrl(text);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={text => {
          handleChangeImdbUrl(text);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChangeImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
