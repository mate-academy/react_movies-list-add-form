import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

// Increase the count after successful form submission
// to reset touched status of all the `Field`s
const initialValue = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd:(movie:Movie) => void;
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [textAtributes, setTextAtributes] = useState(initialValue);

  const addOne = () => {
    setCount(current => current + 1);
  };

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = textAtributes;

  const disabled = title.trim() && imgUrl.trim()
    && imdbId.trim() && imdbUrl.trim();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    addOne();
    onAdd(textAtributes);
    setTextAtributes(initialValue);
  };

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setTextAtributes({ ...textAtributes, [name]: value });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={submit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChange}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChange}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChange}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!disabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
