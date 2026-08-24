import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [imdbIdValue, setImdbIdValue] = useState('');

  const [isDisabledSend, setIsDisabledSend] = useState(true);

 
  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const checkForm = () => {
    if (
      titleValue.trim() &&
      imgUrlValue.trim() &&
      imdbIdValue.trim() &&
      imdbUrlValue.trim() &&
      pattern.test(imgUrlValue.trim()) &&
      pattern.test(imdbUrlValue.trim())
    ) {
      setIsDisabledSend(false);
    } else {
      setIsDisabledSend(true);
    }
  };

  const resetForm = () => {
    setTitleValue('');
    setDescriptionValue('');
    setImgUrlValue('');
    setImdbUrlValue('');
    setImdbIdValue('');
    setIsDisabledSend(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isDisabledSend) {
      onAdd({
        title: titleValue,
        description: descriptionValue,
        imgUrl: imgUrlValue,
        imdbId: imdbIdValue,
        imdbUrl: imdbUrlValue,
      });

      resetForm();
      setCount(count + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={val => {
          setTitleValue(val);
          checkForm();
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={val => {
          setDescriptionValue(val);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        pattern={pattern}
        onChange={val => {
          setImgUrlValue(val);
          checkForm();
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        pattern={pattern}
        onChange={val => {
          setImdbUrlValue(val);
          checkForm();
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={val => {
          setImdbIdValue(val);
          checkForm();
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabledSend}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
