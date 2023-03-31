import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieDescription, setNewMovieDescription] = useState('');
  const [newMovieImg, setNewMovieImg] = useState('');
  const [newMovieIMDBUrl, setNewMovieIMDBUrl] = useState('');
  const [newMovieIMDBId, setNewMovieIMDBId] = useState('');

  const requiredFields = [
    newMovieTitle,
    newMovieImg,
    newMovieIMDBUrl,
    newMovieIMDBId,
  ];

  const isRequiredFilled = (): boolean => {
    return requiredFields.every(Boolean);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCount(count + 1);

    if (!isRequiredFilled()) {
      return;
    }

    onAdd({
      title: newMovieTitle,
      description: newMovieDescription,
      imgUrl: newMovieImg,
      imdbUrl: newMovieIMDBUrl,
      imdbId: newMovieIMDBId,
    });

    setNewMovieTitle('');
    setNewMovieDescription('');
    setNewMovieImg('');
    setNewMovieIMDBUrl('');
    setNewMovieIMDBId('');
  };

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
        value={newMovieTitle}
        onChange={setNewMovieTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovieDescription}
        onChange={setNewMovieDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovieImg}
        onChange={setNewMovieImg}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovieIMDBUrl}
        onChange={setNewMovieIMDBUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovieIMDBId}
        onChange={setNewMovieIMDBId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isRequiredFilled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
