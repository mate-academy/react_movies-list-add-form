import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  addMovie: (movie: Movie) => void
};
export const NewMovie:React.FC<Props> = ({ addMovie }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [img, setImg] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [imdbIdValue, setImdbIdValue] = useState('');

  const buttonDisablet = () => {
    if (nameValue && imdbIdValue && img && imdbUrlValue) {
      return false;
    }

    return true;
  };

  const resetFild = () => {
    setDescriptionValue('');
    setImdbIdValue('');
    setImdbUrlValue('');
    setImg('');
    setNameValue('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addMovie({
      title: nameValue,
      description: descriptionValue,
      imgUrl: img,
      imdbUrl: imdbUrlValue,
      imdbId: imdbIdValue,
    });
    setCount(count + 1);
    resetFild();
  };

  return (
    <form
      className="NewMovie"
      onSubmit={handleSubmit}
      key={count}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={nameValue}
        onChange={(name) => {
          setNameValue(name);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={(description) => {
          setDescriptionValue(description);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={img}
        onChange={(image) => {
          setImg(image);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={(imdburl) => {
          setImdbUrlValue(imdburl);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={(imdbid) => {
          setImdbIdValue(imdbid);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={buttonDisablet()}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
