import { SyntheticEvent, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [validation, setValidation] = useState(true);
  const isEmpty = !!title && !!imgUrl && !!imdbUrl && !!imdbId;

  const urlRegex = new RegExp(`${
    /(?:(?:(https?|ftp):)?\/\/)/.source
  }${/(?:([^:\n\r]+):([^@\n\r]+)@)?/.source
  }${/(?:(?:www\.)?([^/\n\r]+))/.source
  }${/(\/[^?\n\r]+)?/.source
  }${/(\?[^#\n\r]*)?/.source
  }${/(#?[^\n\r]*)?/.source}`);

  const urlValidation = (value: string) => {
    if (!urlRegex.test(value)) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  };

  const handleAddMovie = (event: SyntheticEvent) => {
    event.preventDefault();

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    setCount(current => current + 1);
    onAdd(movie);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => handleAddMovie(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => {
          setTitle(value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => {
          setDescription(value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => {
          setImgUrl(value);
        }}
        onBlur={(value) => {
          urlValidation(value);
        }}
        validation={validation}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => {
          setImdbUrl(value);
        }}
        onBlur={(value) => {
          urlValidation(value);
        }}
        validation={validation}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => {
          setImdbId(value);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isEmpty === false}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
