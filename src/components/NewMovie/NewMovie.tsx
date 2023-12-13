import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const initialValues = {
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
  const [textAtributes, setTextAtributes] = useState(initialValues);

  const incrementCounter = () => {
    setCount(current => current + 1);
  };

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = textAtributes;

  const isActive = title.trim() && imgUrl.trim()
    && imdbId.trim() && imdbUrl.trim();

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    incrementCounter();
    onAdd(textAtributes);
    setTextAtributes(initialValues);
  };

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setTextAtributes({ ...textAtributes, [name]: value });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={submitForm}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleInputChange}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleInputChange}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleInputChange}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isActive}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
