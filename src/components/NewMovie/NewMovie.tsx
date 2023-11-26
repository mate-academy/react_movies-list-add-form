import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const InitialFormInfo: Movie = {
    title: '',
    description: '',
    imdbUrl: '',
    imdbId: '',
    imgUrl: '',
  };

  const [count, setCount] = useState(0);
  const [formInfo, setFormInfo] = useState<Movie>(InitialFormInfo);

  const {
    title,
    description,
    imdbId,
    imgUrl,
    imdbUrl,
  } = formInfo;

  const validateUrl = (url: string): boolean => {
    // eslint-disable-next-line
    const reg = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return reg.test(url.trim());
  };

  const validImgUrl = validateUrl(imgUrl);
  const validImdbUrl = validateUrl(imdbUrl);

  const handleInputChange = (value: string, field: string) => {
    setFormInfo(prevInfo => ({ ...prevInfo, [field]: value }));
  };

  const clearForm = () => {
    setFormInfo(InitialFormInfo);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(formInfo);
    setCount(prev => prev + 1);
    clearForm();
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
        onChange={handleInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleInputChange}
        invalidVal={validImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleInputChange}
        invalidVal={validImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleInputChange}
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
