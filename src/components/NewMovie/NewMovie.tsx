import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: ({
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  }: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  // const [titleError, setTitleError] = useState(false);
  // const [imgUrlError, setImgUrlError] = useState(false);
  // const [imdbUrlError, setImdbUrlError] = useState(false);
  // const [imdbIdError, setImdbIdError] = useState(false);

  // const handleBlur = (field: string) => {
  //  switch (field) {
  //    case 'title':
  //      setTitleError(!title);
  //      break;
  //    case 'imgUrl':
  //      setImgUrlError(!imgUrl);
  //      break;
  //    case 'imdbUrl':
  //      setImdbUrlError(!imdbUrl);
  //      break;
  //    case 'imdbId':
  //      setImdbIdError(!imdbId);
  //      break;
  //    default:
  //      break;
  //  }
  // };

  const resetFormValues = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    setCount(prevCount => prevCount + 1);
    resetFormValues();
  };

  const isButtonEnabled = title.trim() && imdbUrl.trim()
  && imgUrl.trim() && imdbId.trim();

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
        value={title}
        onChange={setTitle}
        required
        // onBlur={() => handleBlur('title')}
        // error={titleError}
        // helperText={titleError ? 'Title is required' : ''}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
        // onBlur={() => handleBlur('imgUrl')}
        // error={imgUrlError}
        // helperText={imgUrlError ? 'ImgUrl is required' : ''}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        // onBlur={() => handleBlur('imdbUrl')}
        // error={imgUrlError}
        // helperText={imdbUrlError ? 'ImdbUrl is required' : ''}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
        // onBlur={() => handleBlur('imdbId')}
        // error={imgUrlError}
        // helperText={imdbIdError ? 'ImdbId is required' : ''}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isButtonEnabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
