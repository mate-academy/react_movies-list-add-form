import React, { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const pattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

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
  const [isImgUrlValid, setImgUrlValid] = useState(false);
  const [isImdbUrlValid, setImdbUrlValid] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

  const urlValidation = (
    url: string,
    urlSetter: (s: boolean) => void,
    message: string,
  ): string => {
    if (!pattern.test(url)) {
      urlSetter(false);

      return message;
    }

    urlSetter(true);

    return '';
  };

  const imgUrlValidation = () =>
    urlValidation(imgUrl, setImgUrlValid, 'Image URL is not valid');

  const imdbUrlValidation = () =>
    urlValidation(imdbUrl, setImdbUrlValid, 'Imdb URL is not valid');

  const isAddButtonDisabled = () => {
    return (
      !title.trim() ||
      !imgUrl.trim() ||
      !imdbUrl.trim() ||
      !imdbId.trim() ||
      !isImgUrlValid ||
      !isImdbUrlValid
    );
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={event => {
          setTitle(event);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={event => {
          setDescription(event);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={event => {
          setImgUrl(event.trim());
        }}
        additionalValidations={[imgUrlValidation]}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={event => {
          setImdbUrl(event.trim());
        }}
        additionalValidations={[imdbUrlValidation]}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={event => {
          setImdbId(event);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isAddButtonDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
