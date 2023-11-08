import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { pattern } from '../../helpers/regex';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialFormState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newMovieDetails, setNewMovieDetails] = useState(initialFormState);
  // const [isUrlInvalid, setIsUrlInvalid] = useState(false);

  const handleChange = (key: string, value: string) => {
    setNewMovieDetails(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const resetFields = () => {
    setNewMovieDetails(initialFormState);
  };

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovieDetails;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(newMovieDetails);
    resetFields();
    setCount(prevCount => prevCount + 1);
  };

  const validateUrl = (url: string): boolean => {
    return pattern.test(url);
  };

  const allFieldsAreValid = title.trim() && imdbId.trim()
      && validateUrl(imdbUrl) && validateUrl(imgUrl);

  const isSubmitDisabled = !title.trim()
  || !imdbId.trim()
  || !allFieldsAreValid;

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
        onChange={(value) => handleChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => handleChange('imgUrl', value)}
        required
      />
      {!validateUrl(imgUrl)
      && imgUrl !== ''
      && (
        <p className="errorMessage">
          {'Please enter a correct URL '}
          <i className="urlExample">
            http(s)://sub.domain.tld/
          </i>
        </p>
      )}
      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => handleChange('imdbUrl', value)}
        required
      />
      {!validateUrl(imdbUrl)
      && imdbUrl !== ''
      && (
        <p className="errorMessage">
          {'Please enter a correct URL '}
          <i className="urlExample">
            http(s)://sub.domain.tld/
          </i>
        </p>
      )}

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => handleChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
