import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const pattern =
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.)))/;

  // const [disabled, setDisabled] = useState(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const validForms =
    title.trim() &&
    pattern.test(imgUrl.trim()) &&
    pattern.test(imdbUrl.trim()) &&
    imdbId.trim();

  // const disabledCheck = () => {
  //   if (validForms) {
  //     setDisabled(false);
  //   }
  // };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (validForms) {
      const movie = {
        title: title.trim(),
        description: description.trim(),
        imgUrl: imgUrl.trim(),
        imdbUrl: imdbUrl.trim(),
        imdbId: imdbId.trim(),
      };

      onAdd(movie);

      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
      // setDisabled(true);
      setCount(currentCount => currentCount + 1);

      return;
    }
    // else {
    //   setDisabled(true);

    //   return;
    // }
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={value => {
          setTitle(value);
          // disabledCheck();
        }}
        required
        // error={hasTitleError}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => {
          setDescription(value);
          // disabledCheck();
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => {
          setImgUrl(value);
          // disabledCheck();
        }}
        required
        // error={hasImgUrlError}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => {
          setImdbUrl(value);
          // disabledCheck();
        }}
        required
        // error={hasImdbUrlError}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => {
          setImdbId(value);
          // disabledCheck();
        }}
        required
        // error={hasImdbIdError}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!validForms}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
