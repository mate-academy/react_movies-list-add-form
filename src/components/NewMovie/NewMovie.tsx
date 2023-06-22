import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { Change } from '../../types/Change';
import { pattern } from '../../utils/pattern';

type Props = {
  onChange: (inputValues: Change) => void,
  formInputs: Movie,
  setFormInputs: React.Dispatch<React.SetStateAction<Movie>>,
  onAdd: (newMovie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({
  onChange,
  formInputs,
  setFormInputs,
  onAdd,
}) => {
  const [count, setCount] = useState(0);
  const checkButton = !formInputs.title
  || !formInputs.imdbId
  || !formInputs.imdbUrl
  || !formInputs.imgUrl
  || !formInputs.imdbUrl.match(pattern)
  || !formInputs.imgUrl.match(pattern);
  const handleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onAdd(formInputs);
    setCount(prevState => prevState + 1);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formInputs.title}
        onChange={onChange}
        setFormInputs={setFormInputs}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formInputs.description}
        onChange={onChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formInputs.imgUrl}
        onChange={onChange}
        pattern={pattern}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formInputs.imdbUrl}
        onChange={onChange}
        pattern={pattern}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formInputs.imdbId}
        onChange={onChange}
        setFormInputs={setFormInputs}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleButton}
            disabled={checkButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
