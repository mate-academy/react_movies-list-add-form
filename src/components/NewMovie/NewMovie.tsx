import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

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

  function isUrlValidate(url: string): boolean {
    const pattern = new RegExp(
      '^(' +
        '((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|' +
        '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
        '((?:\\/[+~%/.\\w-_]*)?\\??(?:' +
        '[-+=&;%@.,\\w_]*)#?(?:[,.!/\\\\\\w]*))?)' +
        ')$',
    );

    return pattern.test(url);
  }

  function handleOnChange(value: string, name: string) {
    setformData(currentFormData => ({
      ...currentFormData,
      [name]: value,
    }));
  }

  function handleSubmitForm(event: React.FormEvent) {
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

  const isDataValid =
    title.trim() &&
    imdbId.trim() &&
    isUrlValidate(imdbUrl) &&
    isUrlValidate(imgUrl);

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmitForm}>
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
      />
      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleOnChange}
        required
        error={!isUrlValidate(imgUrl) ? 'is invalid' : ''}
      />
      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleOnChange}
        required
        error={!isUrlValidate(imdbUrl) ? 'is invalid' : ''}
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
            disabled={!isDataValid}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
