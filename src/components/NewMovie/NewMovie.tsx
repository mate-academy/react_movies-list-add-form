import React, { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [disableAdd, setDisableAdd] = useState(true);
  const reset = () => {
    setTitle('');
    setDescription('');
    setImdbId('');
    setImdbUrl('');
    setImgUrl('');
  };

  useEffect(() => {
    if (title && imdbUrl && imdbId && imgUrl) {
      setDisableAdd(false);
    }
  }, [title, imdbUrl, imgUrl, imdbId]);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !imdbUrl || !imdbId || !imgUrl) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    setCount(count + 1);
    reset();
  };

  const handleChangeTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleChangeDescription = (newDescription: string) => {
    setDescription(newDescription);
  };

  const handleChangeImgUrl = (newImgUrl: string) => {
    setImgUrl(newImgUrl);
  };

  const handleChangeImdbUrl = (newUrl: string) => {
    setImdbUrl(newUrl);
  };

  const handleChangeImdbId = (newImdbId: string) => {
    setImdbId(newImdbId);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleChangeTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChangeDescription}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChangeImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChangeImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChangeImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={Boolean(disableAdd)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
