import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const [descritpionValue, setDescritpionValue] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [imdbIdValue, setImdbIdValueValue] = useState('');

  // eslint-disable-next-line max-len
  const isFieldFilled = titleValue && imgUrlValue && imdbIdValue && imdbUrlValue;

  const handleSubmit = () => {
    if (isFieldFilled) {
      const newMovie: Movie = {
        title: titleValue,
        description: descritpionValue,
        imgUrl: imgUrlValue,
        imdbUrl: imdbUrlValue,
        imdbId: imdbIdValue,
      };

      onAdd(newMovie);

      setTitleValue('');
      setDescritpionValue('');
      setImgUrlValue('');
      setImdbUrlValue('');
      setImdbIdValueValue('');
      setCount(count + 1);
    }
  };

  const handleChange = (value: string, value1: string) => {
    switch (value1) {
      case 'title':
        setTitleValue(value);
        break;

      case 'description':
        setDescritpionValue(value);
        break;

      case 'imgUrl': {
        setImgUrlValue(value);
        break;
      }

      case 'imdbUrl': {
        setImdbUrlValue(value);
        break;
      }

      case 'imdbId':
        setImdbIdValueValue(value);
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
        value={titleValue}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descritpionValue}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFieldFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
