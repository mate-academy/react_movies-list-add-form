import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const InitialFormInfo: Movie = {
    title: '',
    description: '',
    imdbUrl: '',
    imdbId: '',
    imgUrl: '',
  };

  const [formInfo, setFormInfo] = useState<Movie>(InitialFormInfo);
  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = formInfo;

  const validateUrl = (url: string): boolean => {
    // eslint-disable-next-line
    const regExUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return regExUrl.test(url.trim());
  };

  const validImgUrl = validateUrl(imgUrl);
  const validImdbUrl = validateUrl(imdbUrl);

  const handleInputChange = (value: string, field: string) => {
    setFormInfo(prevInfo => ({ ...prevInfo, [field]: value }));
  };

  const clearForm = () => {
    setFormInfo(InitialFormInfo);
  };

  const handleDataForm = (event: React.FormEvent) => {
    event.preventDefault();

    const data = { ...formInfo };

    onAdd(data);
    clearForm();
    setCount(prevCount => prevCount + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleDataForm}
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
        regEx={validImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleInputChange}
        regEx={validImdbUrl}
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
            disabled={
              !title.trim()
              || !imdbId.trim()
              || !imdbUrl.trim()
              || !imgUrl.trim()
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
