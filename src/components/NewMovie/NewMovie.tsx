import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { pattern } from '../../utils/validationPatterns';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [imdbIdValue, setImdbIdValueValue] = useState('');

  // eslint-disable-next-line max-len
  const isFieldFilled = titleValue.trim() && imgUrlValue.trim() && imdbIdValue.trim() && imdbUrlValue.trim();

  const isUrlValid = (urlValue: string) => {
    return pattern.test(urlValue);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event?.preventDefault();
    const areUrlsValid = isUrlValid(imgUrlValue) && isUrlValid(imdbUrlValue);

    if (isFieldFilled && areUrlsValid) {
      const newMovie: Movie = {
        title: titleValue,
        description: descriptionValue,
        imgUrl: imgUrlValue,
        imdbUrl: imdbUrlValue,
        imdbId: imdbIdValue,
      };

      onAdd(newMovie);

      setTitleValue('');
      setDescriptionValue('');
      setImgUrlValue('');
      setImdbUrlValue('');
      setImdbIdValueValue('');
      setCount(count + 1);
    }
  };

  const handleChange = (value: string, inputName: string) => {
    switch (inputName) {
      case 'title':
        setTitleValue(value);
        break;

      case 'description':
        setDescriptionValue(value);
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
        fieldValue={titleValue}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        fieldValue={descriptionValue}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        fieldValue={imgUrlValue}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        fieldValue={imdbUrlValue}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        fieldValue={imdbIdValue}
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
