import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieType = {
  onAdd: (m: Movie) => void,
};

export const NewMovie: FC<NewMovieType> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  let isDisabled = true;

  const handleInputTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleInputDescription = (newDescription: string) => {
    setDescription(newDescription);
  };

  const handleInputImgUrl = (newImgUrl: string) => {
    setImgUrl(newImgUrl);
  };

  const handleInputImdbUrl = (newImdUrl: string) => {
    setImdbUrl(newImdUrl);
  };

  const handleInputImdbId = (newId: string) => {
    setImdbId(newId);
  };

  const resetFormField = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handlerSubmit = () => {
    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(movie);
    setCount((prevCount) => prevCount + 1);
    resetFormField();
  };

  if (title && imgUrl && imdbUrl && imdbId) {
    isDisabled = false;
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handlerSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleInputTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleInputDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleInputImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleInputImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleInputImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
