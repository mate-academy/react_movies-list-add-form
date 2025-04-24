import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Увеличьте счетчик после успешной отправки формы
  // сбросить статус для всех `Field`изменения
  const [count, setCount] = useState(0);

  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const getIsUrlValid = (url: string): boolean => {
    const pattern = new RegExp(
      '^((https?|ftp)://)?' +
        '([\\w.-]+)\\.([a-z\\.]{2,6})' +
        '([\\/\\w .-]*)*\\/?$',
      'i',
    );

    return pattern.test(url);
  };

  const getIsMovieComplete = (): boolean => {
    const { title, imgUrl, imdbUrl, imdbId } = movie;

    return (
      title.trim() !== '' &&
      imgUrl.trim() !== '' &&
      imdbUrl.trim() !== '' &&
      imdbId.trim() !== '' &&
      getIsUrlValid(imgUrl) &&
      getIsUrlValid(imdbUrl)
    );
  };

  const handlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!getIsMovieComplete()) {
      return;
    }

    onAdd(movie);
    setCount(prev => prev + 1);
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handlerSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(value: string) => setMovie({ ...movie, title: value })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(value: string) => setMovie({ ...movie, description: value })}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(value: string) => setMovie({ ...movie, imgUrl: value })}
        validate={getIsUrlValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(value: string) => setMovie({ ...movie, imdbUrl: value })}
        validate={getIsUrlValid}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(value: string) => setMovie({ ...movie, imdbId: value })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!getIsMovieComplete()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
