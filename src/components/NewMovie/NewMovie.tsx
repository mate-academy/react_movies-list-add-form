import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [movie, setMovie] = useState({
    count: 0,
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isButtonDisabled =
    !movie.title || !movie.imgUrl || !movie.imdbUrl || !movie.imdbId;

  const resetForm = () => {
    setMovie(prevNum => ({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      count: prevNum.count + 1,
    }));
  };

  const handleSubmit = (submit: React.FormEvent) => {
    submit.preventDefault();

    onAdd({
      title: movie.title,
      description: movie.description,
      imgUrl: movie.imgUrl,
      imdbUrl: movie.imdbUrl,
      imdbId: movie.imdbId,
    });

    resetForm();
  };

  return (
    <form className="NewMovie" key={movie.count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={newTitle => {
          setMovie(prev => ({ ...prev, title: newTitle }));
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={newDescription => {
          setMovie(prev => ({ ...prev, description: newDescription }));
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={newImgUrl => {
          setMovie(prev => ({ ...prev, imgUrl: newImgUrl }));
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={newImdbUrl => {
          setMovie(prev => ({ ...prev, imdbUrl: newImdbUrl }));
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={newImdbId => {
          setMovie(prev => ({ ...prev, imdbId: newImdbId }));
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
