import { useState, memo } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (newMovie: Movie) => void
};

export const NewMovie: React.FC<Props> = memo(({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const changeTitle = (value: string) => {
    let newTitle = value;

    while (newTitle.slice(0, 1) === ' ') {
      newTitle = newTitle.slice(1).replace(/\s/g, '');
    }

    setTitle(newTitle);
  };

  const changeDescription = (value: string) => {
    let newDescription = value;

    while (newDescription.slice(0, 1) === ' ') {
      newDescription = newDescription.slice(1).replace(/\s/g, '');
    }

    setDescription(newDescription);
  };

  const changeImgUrl = (value: string) => {
    let newimgUrl = value;

    while (newimgUrl.slice(0, 1) === ' ') {
      newimgUrl = newimgUrl.slice(1).replace(/\s/g, '');
    }

    setImgUrl(newimgUrl);
  };

  const changeImdbUrl = (value: string) => {
    let newImdbUrl = value;

    while (newImdbUrl.slice(0, 1) === ' ') {
      newImdbUrl = newImdbUrl.slice(1).replace(/\s/g, '');
    }

    setImdbUrl(newImdbUrl);
  };

  const changeImdbId = (value: string) => {
    let newImdbId = value;

    while (newImdbId.slice(0, 1) === ' ') {
      newImdbId = newImdbId.slice(1).replace(/\s/g, '');
    }

    setImdbId(newImdbId);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleFormSubmit = () => {
    onAdd(
      {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      },
    );

    resetForm();

    setCount(prevCount => prevCount + 1);
  };

  const isReadyToSubmit = title
    && imdbId
    && imdbUrl
    && imgUrl;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();
        handleFormSubmit();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={changeTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={changeDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={changeImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={changeImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={changeImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isReadyToSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
});
