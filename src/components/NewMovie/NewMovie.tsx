import { useState, FormEvent } from 'react';

import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const disabled = !(title)
  && !(imgUrl)
  && !(imdbUrl)
  && !(imdbId);

  const [count, setCount] = useState(0);

  const titleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const descriptionChange = (newDescription: string) => {
    setDescription(newDescription);
  };

  const imgUrlChange = (newImgUrl: string) => {
    setImgUrl(newImgUrl);
  };

  const imdbUrlChange = (newImdbUrl: string) => {
    setImdbUrl(newImdbUrl);
  };

  const imdbIdChange = (newImdbId: string) => {
    setImdbId(newImdbId);
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbUrl('');
    setCount(previousCount => previousCount + 1);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim()) {
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
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => onSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={titleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={descriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={imgUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={imdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={imdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
