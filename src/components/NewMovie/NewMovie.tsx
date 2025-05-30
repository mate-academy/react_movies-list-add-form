import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const urlPattern = new RegExp(
  `
  ^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|
  (?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)
  ((?:\\/[+~%/\\.\\w-_]*)?\\??(?:[-+=&;%@.\\w_]*)#?(?:[,.!/\\\\\\w]*))?)$
`.replace(/\s+/g, ''),
);

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const isValid = () => {
    return (
      formData.title.trim().length > 0 &&
      formData.imgUrl.trim().length > 0 &&
      urlPattern.test(formData.imgUrl.trim()) &&
      formData.imdbUrl.trim().length > 0 &&
      urlPattern.test(formData.imdbUrl.trim()) &&
      formData.imdbId.trim().length > 0
    );
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValid()) {
      return;
    }

    const newMovie: Movie = {
      ...formData,
      title: formData.title.trim(),
      imgUrl: formData.imgUrl.trim(),
      imdbUrl: formData.imdbUrl.trim(),
      imdbId: formData.imdbId.trim(),
    };

    onAdd(newMovie);

    setFormData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(x => x + 1);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={newValue => handleChange('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={newValue => handleChange('description', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={newValue => handleChange('imgUrl', newValue)}
        required
        validate={(val: string) => urlPattern.test(val)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={newValue => handleChange('imdbUrl', newValue)}
        required
        validate={(val: string) => urlPattern.test(val)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={newValue => {
          setFormData({ ...formData, imdbId: newValue });
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
