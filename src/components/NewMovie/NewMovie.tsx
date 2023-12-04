import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [inputs, setInputs] = useState<Movie>({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });

  const reset = () => {
    setInputs({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(inputs);
    setCount(count + 1);

    reset();
  };

  const handleInputChange = (inputName: string) => {
    return (value: string) => setInputs({
      ...inputs,
      [inputName]: value,
    });
  };

  const canSubmit = inputs.title.trim() !== ''
    && inputs.imgUrl.trim() !== ''
    && inputs.imdbUrl.trim() !== ''
    && inputs.imdbId.trim() !== '';

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
        value={inputs.title}
        onChange={handleInputChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={inputs.description}
        onChange={handleInputChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputs.imgUrl}
        onChange={handleInputChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputs.imdbUrl}
        onChange={handleInputChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputs.imdbId}
        onChange={handleInputChange('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!canSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
