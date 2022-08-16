import { FormEvent, useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTittle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const requiredControl = [title, imgUrl, imdbUrl, imdbId].length;

  const resetForm = () => {
    setCount(0);
    setTittle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  useEffect(() => {
    const fieldController = {
      title: { value: title, required: true },
      description: { value: description, required: false },
      imgUrl: { value: imgUrl, required: true },
      imdbUrl: { value: imdbUrl, required: true },
      imdbId: { value: imdbId, required: true },
    };

    setCount(Object.values(fieldController).filter(item => {
      return item.value && item.required;
    }).length);
  }, [title,
    description,
    imgUrl,
    imdbUrl,
    imdbId]);

  const handlerInput = (name: string, value: string) => {
    switch (name) {
      case 'title':
        setTittle(value);
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

  const handelSubmitForm = (event: FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    resetForm();
  };

  return (
    <form
      className="NewMovie"
      onSubmit={handelSubmitForm}
    >
      <h2 className="title">
        Add a movie
      </h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handlerInput}
        count={count}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handlerInput}
        count={count}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handlerInput}
        count={count}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handlerInput}
        count={count}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handlerInput}
        count={count}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={count < requiredControl}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
