import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

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

  function validateUrl(url: string) {
    // eslint-disable-next-line
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(url.trim());
  }

  const validImgUrl = validateUrl(imgUrl);
  const validImdbUrl = validateUrl(imdbUrl);

  const handleInputChange = (value: string, field: string) => {
    setFormInfo(prevInfo => ({ ...prevInfo, [field]: value }));
  };

  const clearForm = () => {
    setFormInfo({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(formInfo);
    setCount(prev => prev + 1);
    clearForm();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        placeholder="Enter Title"
        onChange={handleInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        placeholder="Enter Description"
        onChange={handleInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        invalidVal={validImgUrl}
        required
        placeholder="Enter Image URL"
        onChange={handleInputChange}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        invalidVal={validImdbUrl}
        required
        placeholder="Enter Imdb URL"
        onChange={handleInputChange}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        placeholder="Enter Image ID"
        onChange={handleInputChange}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!(title.trim() && imgUrl.trim()
              && imdbId.trim() && imdbId.trim()
            )}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
