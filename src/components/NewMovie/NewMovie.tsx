import { useState } from 'react';
import './NewMovie.scss';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const newMovie = {
    title,
    description,
    imdbUrl,
    imdbId,
    imgUrl,
  };

  const validForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && description && imgUrl && imdbUrl && imdbId) {
      onAdd(newMovie);
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }
  };

  return (
    <form
      className="form"
      onSubmit={validForm}
    >
      <input
        type="text"
        placeholder="Enter movie title"
        className="form__title"
        value={title}
        data-cy="form-title"
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />

      <textarea
        name="description"
        id=""
        className="form__description"
        placeholder="Enter description"
        value={description}
        data-cy="form-description"
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter image URL"
        className="form__img"
        value={imgUrl}
        data-cy="form-imgUrl"
        onChange={(event) => {
          setImgUrl(event.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter Imdb URL"
        value={imdbUrl}
        className="form__imdbUrl"
        data-cy="form-imdbUrl"
        onChange={(event) => {
          setImdbUrl(event.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter Imdb ID"
        value={imdbId}
        className="form__imbId"
        data-cy="form-imdbId"
        onChange={(event) => {
          setImdbId(event.target.value);
        }}
      />

      <button
        type="submit"
        className="form__button"
        data-cy="form-submit-button"
      >
        Submit
      </button>
    </form>
  );
};
