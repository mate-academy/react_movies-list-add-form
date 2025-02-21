import { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [count] = useState(0);
  const [value, setValue] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [isDisabled, setIsDisabled] = useState(false);

  type MovieFields = 'title' | 'description' | 'imgUrl' | 'imdbUrl' | 'imdbId';

  const handleChange = (name: MovieFields, newValue: string) => {
    setValue({ ...value, [name]: newValue });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isFormValid = (
      ['title', 'imgUrl', 'imdbUrl', 'imdbId'] as MovieFields[]
    ).every(key => value[key].trim() !== '');

    if (!isFormValid) {
      return;
    }

    onAdd(value);

    setValue({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  useEffect(() => {
    const hasEmptyRequiredField = Object.entries(value).some(
      ([key, text]) => key !== 'description' && text.trim() === '',
    );

    setIsDisabled(hasEmptyRequiredField);
  }, [value]);

  return (
    <form className="NewMovie" onSubmit={handleSubmit} key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={value.title}
        onChange={newValue => handleChange('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={value.description}
        onChange={newValue => handleChange('description', newValue)}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={value.imgUrl}
        onChange={newValue => handleChange('imgUrl', newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={value.imdbUrl}
        onChange={newValue => handleChange('imdbUrl', newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={value.imdbId}
        onChange={newValue => handleChange('imdbId', newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={isDisabled}
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
