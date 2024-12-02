import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const ifFormReadyToAdd = title && imgUrl && imdbId && imdbUrl;

  const setTitleChange = (value: string) => {
    setTitle(value);
  };

  const setDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const setImgUrlChange = (value: string) => {
    setImgUrl(value);
  };

  const setImdbUrlChange = (value: string) => {
    setImdbUrl(value);
  };

  const setImdbIdChange = (value: string) => {
    setImdbId(value);
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handlerCreateMovie = (event: React.FormEvent) => {
    event.preventDefault();

    if (!ifFormReadyToAdd) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    reset();
  };

  return (
    <form className="NewMovie" onSubmit={handlerCreateMovie}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitleChange}
        required={!title}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrlChange}
        required={!imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrlChange}
        required={!imdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbIdChange}
        required={!imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!ifFormReadyToAdd}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
