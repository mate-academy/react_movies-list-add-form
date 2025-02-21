import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { isValidUrl } from '../../utils';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const initialMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [count, setCount] = useState(0);
  const [formData, setformData] = useState<Movie>(initialMovie);

  const { title, description, imgUrl, imdbUrl, imdbId } = formData;

  function handleOnChange(newValue: string, name: string) {
    setformData(currentFormData => ({
      ...currentFormData,
      [name]: newValue,
    }));
  }

  function submitForm(event: React.FormEvent) {
    event.preventDefault();

    onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });

    setCount(currentCount => currentCount + 1);
    setformData(initialMovie);
  }

  const isValidData =
    title.trim() && imdbId.trim() && isValidUrl(imdbUrl) && isValidUrl(imgUrl);

  return (
    <form className="NewMovie" key={count} onSubmit={submitForm}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleOnChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleOnChange}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleOnChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleOnChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleOnChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValidData}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
