import { useState, useEffect } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd:(movie:Movie)=> void
};

const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState(initialState);
  const [disabledButton, setDisabledButton] = useState(true);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = formData;

  useEffect(() => {
    const isDisabledButton = [title, imgUrl, imdbUrl, imdbId]
      .every(elem => elem.trim() !== '');

    setDisabledButton(isDisabledButton);
  }, [title, imgUrl, imdbUrl, imdbId]);

  const handleChange = (fieldName: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(movie);
    setFormData(initialState);
    setCount(prevState => prevState + 1);
  };

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

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => handleChange('imdbUrl', value)}
        required
      />

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
            disabled={!disabledButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
