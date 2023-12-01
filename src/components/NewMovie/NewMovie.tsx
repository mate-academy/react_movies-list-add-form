import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const initialMovieState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie:React.FC<NewMovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [isSubmitActive, setIsSubmitActive] = useState(false);
  const [movie, setMovie] = useState<Movie>(initialMovieState);

  const handleInputChange = (key: string, value: string) => {
    setMovie((prevState) => {
      const newMovie = {
        ...prevState,
        [key]: value,
      };

      const [title, , imgUrl, imdbUrl, imdbId]
        = [...Object.values(newMovie).map(entrie => entrie.trim())];

      if (title.length > 0
        && imgUrl.length > 0
        && imdbUrl.length > 0
        && imdbId.length > 0
      ) {
        setIsSubmitActive(true);
      } else {
        setIsSubmitActive(false);
      }

      return newMovie;
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(movie);
    setCount((currentCount: number) => currentCount + 1);
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
        value={movie.title}
        onChange={(value: string) => {
          handleInputChange('title', value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(value: string) => {
          handleInputChange('description', value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(value: string) => {
          handleInputChange('imgUrl', value);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(value: string) => {
          handleInputChange('imdbUrl', value);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(value: string) => {
          handleInputChange('imdbId', value);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isSubmitActive}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
