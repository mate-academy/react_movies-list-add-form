import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isLinkValid = (link: string) => {
    // eslint-disable-next-line max-len
    const pattern = (/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/);

    return pattern.test(link);
  };

  const fieldsAreFilled = title.trim()
  && isLinkValid(imageUrl)
  && isLinkValid(imdbUrl)
  && imdbId.trim();

  const buttonDisabling = () => {
    if (fieldsAreFilled) {
      return false;
    }

    return true;
  };

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (fieldsAreFilled) {
      const newMovie: Movie = {
        title,
        description,
        imgUrl: imageUrl,
        imdbUrl,
        imdbId,
      };

      onAdd(newMovie);

      setTitle('');
      setDescription('');
      setImageUrl('');
      setImdbUrl('');
      setImdbId('');
      setCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => formSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(event.target.value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setDescription(event.target.value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imageUrl}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setImageUrl(event.target.value);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setImdbUrl(event.target.value);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setImdbId(event.target.value);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={buttonDisabling()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
