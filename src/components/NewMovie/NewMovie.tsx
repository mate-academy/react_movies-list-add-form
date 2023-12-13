import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [objForm, setObjForm] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    description: '',
    imdbId: '',
  });

  const {
    title,
    imgUrl,
    imdbUrl,
    description,
    imdbId,
  } = objForm;

  const handleValueChange = (newValue: string, key: string) => {
    setObjForm({ ...objForm, [key]: newValue });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title,
      imgUrl,
      imdbUrl,
      description,
      imdbId,
    };

    onAdd(newMovie);

    setObjForm({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      description: '',
      imdbId: '',
    });
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newValue: string) => handleValueChange(newValue, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue: string) => {
          handleValueChange(newValue, 'description');
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newValue: string) => handleValueChange(newValue, 'imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newValue: string) => handleValueChange(newValue, 'imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newValue: string) => handleValueChange(newValue, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!title || !imgUrl || !imdbUrl || !imdbId}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
