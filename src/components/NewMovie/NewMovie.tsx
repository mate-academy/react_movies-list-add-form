import { useState, useEffect } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  addMovie:(movie:Movie)=> void
};

export const NewMovie:React.FC<Props> = ({ addMovie }) => {
  const initialState = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [count] = useState(0);
  const [formData, setFormData] = useState(initialState);
  const [disabledButton, setdisabledButton] = useState(true);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = formData;

  useEffect(() => {
    // const isDisabledButton = !title && !imgUrl && !imdbUrl && !imdbId;
    // it doesn`t work

    // i think this wiil be okey
    const isDisabledButton = [title, imgUrl, imdbUrl, imdbId]
      .every(elem => elem !== '');

    setdisabledButton(isDisabledButton);
  }, [title, imgUrl, imdbUrl, imdbId]);

  const handleChange = (titleName: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [titleName]: value,
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

    addMovie(movie);
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
