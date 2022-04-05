import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Movie } from '../../types';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imdbUrl, setImdbUrl] = useState<string>('');
  const [imdbId, setImdbId] = useState<string>('');

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'imgUrl':
        setImgUrl(value);
        break;
      case 'imdbUrl':
        setImdbUrl(value);
        break;
      case 'imdbId':
        setImdbId(value);
        break;
      default:
        break;
    }
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMovie: Movie = {
      title, description, imgUrl, imdbUrl, imdbId,
    };

    onAdd(newMovie);
    clearForm();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="field">
        <div className="control">
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={changeHandler}
            autoComplete="off"
            className="input"
            required
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            type="text"
            name="description"
            placeholder="description"
            value={description}
            onChange={changeHandler}
            autoComplete="off"
            className="input"
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            type="text"
            name="imgUrl"
            placeholder="imgUrl"
            value={imgUrl}
            onChange={changeHandler}
            autoComplete="off"
            className="input"
            required
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            type="text"
            name="imdbUrl"
            placeholder="imdbUrl"
            value={imdbUrl}
            onChange={changeHandler}
            autoComplete="off"
            className="input"
            required
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            type="text"
            name="imdbId"
            placeholder="imdbId"
            value={imdbId}
            onChange={changeHandler}
            autoComplete="off"
            className="input"
            required
          />
        </div>
      </div>

      <button type="submit" className="button is-link is-light">
        add
      </button>
    </form>
  );
};
