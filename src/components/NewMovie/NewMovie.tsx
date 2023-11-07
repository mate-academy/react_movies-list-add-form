import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const EMPTY_VAL: Movie = {
    title: '',
    description: '',
    imdbUrl: '',
    imdbId: '',
    imgUrl: '',
  };

  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [formFieldsVal, setFormFieldsVal] = useState<Movie>({ ...EMPTY_VAL });

  const {
    title,
    description,
    imdbId,
    imgUrl,
    imdbUrl,
  } = formFieldsVal;

  const validateUrl = (url: string): boolean => {
    // eslint-disable-next-line
    const reg = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return reg.test(url.trim());
  };

  const validImgUrl = validateUrl(imgUrl);
  const validImdbUrl = validateUrl(imdbUrl);

  const handleChange = (value: string, name: string) => {
    setFormFieldsVal(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const reset = () => setFormFieldsVal({ ...EMPTY_VAL });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(formFieldsVal);
    setCount(prev => prev + 1);
    reset();
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
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChange}
        invalidVal={validImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChange}
        invalidVal={validImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!(title.trim() && imgUrl.trim()
              && imdbUrl.trim()
              && imdbId.trim())}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
