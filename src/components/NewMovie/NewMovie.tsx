import { useState } from 'react';
import { TextField } from '../TextField';
import { Inputs } from '../../types/Inputs';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void
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

  const handleOnSubmit = (event: React.FormEvent) => {
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
    setImdbId('');
    setImdbUrl('');

    setCount(currentCount => currentCount + 1);
  };

  const handleOnChange = (value: string, name: Inputs) => {
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
      case 'imdbId':
        setImdbId(value);
        break;
      case 'imdbUrl':
        setImdbUrl(value);
        break;
      default:
    }
  };

  const validation = () => {
    return !(!title || !imdbId || !imdbUrl || !imgUrl);
  };

  const isValid = validation();

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleOnSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={newTitle => handleOnChange(newTitle, 'title')}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newDesctiption => {
          handleOnChange(newDesctiption, 'description');
        }}
        required={false}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={newImgUrl => handleOnChange(newImgUrl, 'imgUrl')}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={newImdbUrl => handleOnChange(newImdbUrl, 'imdbUrl')}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={newImdId => handleOnChange(newImdId, 'imdbId')}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
