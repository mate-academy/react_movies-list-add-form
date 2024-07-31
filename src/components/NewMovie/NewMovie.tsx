import { useState, FC } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  moviesFromServer: Movie[];
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieDescription, setNewMovieDescription] = useState('');
  const [newMovieImageUrl, setNewMovieImageUrl] = useState('');
  const [newMovieImdbUrl, setNewMovieImdbUrl] = useState('');
  const [newMovieImdbId, setNewMovieImdbId] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = () => {
    const isFormValid =
      newMovieTitle.trim() &&
      newMovieImageUrl.trim() &&
      newMovieImdbUrl.trim() &&
      newMovieImdbId.trim();

    setIsButtonDisabled(!isFormValid);
  };

  const handleTitleChange = (value: string) => {
    setNewMovieTitle(value);
    handleInputChange();
  };

  const handleImageUrlChange = (value: string) => {
    setNewMovieImageUrl(value);
    handleInputChange();
  };

  const handleImdbUrlChange = (value: string) => {
    setNewMovieImdbUrl(value);
    handleInputChange();
  };

  const handleImdbIdChange = (value: string) => {
    setNewMovieImdbId(value);
    handleInputChange();
  };

  const handleAddButtonClick = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title: newMovieTitle,
      description: newMovieDescription,
      imgUrl: newMovieImageUrl,
      imdbUrl: newMovieImdbUrl,
      imdbId: newMovieImdbId,
    };

    onAdd(newMovie);

    setNewMovieTitle('');
    setNewMovieDescription('');
    setNewMovieImageUrl('');
    setNewMovieImdbUrl('');
    setNewMovieImdbId('');
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovieTitle}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovieDescription}
        onChange={(value: string) => setNewMovieDescription(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovieImageUrl}
        onChange={handleImageUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovieImdbUrl}
        onChange={handleImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovieImdbId}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
            onClick={handleAddButtonClick}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
