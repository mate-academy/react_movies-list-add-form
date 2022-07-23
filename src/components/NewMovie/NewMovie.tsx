import { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [imdbIdValue, setImdbIdValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  // const [numOfInputs, setNumOfInputs] = useState(0);
  // const [validInputs, setValidInputs] = useState(0);

  // const countInputs = () => {
  //   setNumOfInputs(prevState => prevState + 1);
  // };

  // const countValidInputs = (hasError: boolean) => {
  //   if (!hasError) {
  //     setValidInputs(prevState => prevState + 1);
  //   }
  // };

  useEffect(() => {
    if (titleValue
      && imgUrlValue
      && imdbUrlValue
      && imdbIdValue) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  });

  const newMovie = {
    title: titleValue,
    description: descriptionValue,
    imgUrl: imgUrlValue,
    imdbUrl: imdbUrlValue,
    imdbId: imdbIdValue,
  };

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    onAdd(newMovie);
    setCount(state => state + 1);

    setTitleValue('');
    setDescriptionValue('');
    setImgUrlValue('');
    setImdbUrlValue('');
    setImdbIdValue('');
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => onSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={setTitleValue}
        // countOnMount={countInputs}
        // isValid={countValidInputs}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={setDescriptionValue}
      // countOnMount={countInputs}
      // isValid={countValidInputs}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        onChange={setImgUrlValue}
        // countOnMount={countInputs}
        // isValid={countValidInputs}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={setImdbUrlValue}
        // countOnMount={countInputs}
        // isValid={countValidInputs}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={setImdbIdValue}
        // countOnMount={countInputs}
        // isValid={countValidInputs}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
