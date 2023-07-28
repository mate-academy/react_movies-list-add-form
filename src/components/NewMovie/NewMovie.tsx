import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialMovieState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState(initialMovieState);
  const [validImg, setValidImg] = useState(true);
  const [validImdb, setValidImdb] = useState(true);

  const handleTextField = (field: string) => (value: string) => {
    setMovie((prevMovie) => ({ ...prevMovie, [field]: value }));
  };

  const isDisabled = () => {
    return !(movie.title && movie.imgUrl && movie.imdbUrl
      && movie.imdbId && validImg && validImdb);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = movie.title.trim();
    const trimmedDescription = movie.description.trim();

    onAdd({
      title: trimmedTitle,
      description: trimmedDescription,
      imgUrl: movie.imgUrl,
      imdbUrl: movie.imdbUrl,
      imdbId: movie.imdbId,
    });

    setMovie(initialMovieState);
    setValidImg(true);
    setValidImdb(true);
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        setValidImg={setValidImg}
        setValidImdb={setValidImdb}
        onChange={handleTextField('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        setValidImg={setValidImg}
        setValidImdb={setValidImdb}
        onChange={handleTextField('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        setValidImg={setValidImg}
        setValidImdb={setValidImdb}
        onChange={handleTextField('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        setValidImg={setValidImg}
        setValidImdb={setValidImdb}
        onChange={handleTextField('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        setValidImg={setValidImg}
        setValidImdb={setValidImdb}
        onChange={handleTextField('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
