import React, { FormEvent, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  // #region formStates
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [isImgUrlValid, setIsImgUrlValid] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [isImdbUrlValid, setIsImdbUrlValid] = useState(false);

  const [imdbId, setImdbId] = useState('');
  // #endregion

  // #region handles
  const inValidCheck = () =>
    !(
      title.trim() &&
      imgUrl.trim() &&
      imdbUrl.trim() &&
      imdbId.trim() &&
      isImgUrlValid &&
      isImdbUrlValid
    );

  const handleFormatCheck = (value: string) => {
    const pattern = new RegExp(
      '^((([A-Za-z]{3,9}:(?://)?)(?:[-;:&=+$,w]+@)?[A-Za-z0-9.-]' +
        '+|(?:www.|[-;:&=+$,w]+@)[A-Za-z0-9.-]+)((?:/[+~%/.w-_]*)?' +
        '??(?:[-+=&;%@,.w_]*)#?(?:[,.!/\\w]*))?)$/',
    );

    return pattern.test(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onAdd({
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
    setImdbId('');

    setCount(count + 1);
  };
  // #endregion

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        formalCheck={value => {
          setIsImgUrlValid(handleFormatCheck(value));

          return handleFormatCheck(value);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        formalCheck={value => {
          setIsImdbUrlValid(handleFormatCheck(value));

          return handleFormatCheck(value);
        }}
        required
      />

      <TextField
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
            disabled={inValidCheck()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
