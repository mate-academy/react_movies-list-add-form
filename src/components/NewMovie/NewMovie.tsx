import { FC, FormEvent, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (newMovie: Movie) => void
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isDataPrepared = !!title
    && !!imgUrl
    && !!imdbUrl
    && !!imdbId;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (isDataPrepared) {
      onAdd(newMovie);
      setCount(0);
    }
  };

  const getValueFromInput = (newValue: string, inputName: keyof Movie) => {
    switch (inputName) {
      case 'title':
        setTitle(newValue);
        break;

      case 'description':
        setDescription(newValue);
        break;

      case 'imgUrl':
        setImgUrl(newValue);
        break;

      case 'imdbUrl':
        setImdbUrl(newValue);
        break;

      case 'imdbId':
        setImdbId(newValue);
        break;

      default:
        break;
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={
          (newValue: string, name: keyof Movie) => {
            getValueFromInput(newValue, name);
          }
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={
          (newValue: string, name: keyof Movie) => {
            getValueFromInput(newValue, name);
          }
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={
          (newValue: string, name: keyof Movie) => {
            getValueFromInput(newValue, name);
          }
        }
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={
          (newValue: string, name: keyof Movie) => {
            getValueFromInput(newValue, name);
          }
        }
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={
          (newValue: string, name: keyof Movie) => {
            getValueFromInput(newValue, name);
          }
        }
        required
      />

      <div className="field is-grouped">
        <div
          className="control"
        >
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDataPrepared === false}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
