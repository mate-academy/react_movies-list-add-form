import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

/*eslint max-len: ["error", { "ignoreRegExpLiterals": true }]*/
const pattern =
  /^ ((([A - Za - z]{ 3, 9}:(?: \/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isImgUrlValid, setIsImgUrlValid] = useState(true);
  const [isImdbUrlValid, setIsImdbUrlValid] = useState(true);

  const ClearForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setIsActive(false);
    setCount(current => current + 1);
  };

  const handleChangedAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    ClearForm();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
  };

  const imgUrlValidation = (url: string) => pattern.test(url);
  const imdbUrlValidation = (url: string) => pattern.test(url);

  const disabledBTN = () =>
    !title.trim() ||
    !imgUrl.trim() ||
    !imdbUrl.trim() ||
    !imdbId.trim() ||
    !isImgUrlValid ||
    !isImdbUrlValid;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={newValue => handleChangedAdd(newValue)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        required={!isActive}
        onChange={newValue => setTitle(newValue)}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newValue => setDescription(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required={!isActive}
        onChange={newValue => {
          setImgUrl(newValue);
          setIsImgUrlValid(pattern.test(newValue));
        }}
        validate={imgUrlValidation}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required={!isActive}
        onChange={newValue => {
          setImdbUrl(newValue);
          setIsImdbUrlValid(pattern.test(newValue));
        }}
        validate={imdbUrlValidation}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required={!isActive}
        onChange={newValue => setImdbId(newValue)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabledBTN()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
