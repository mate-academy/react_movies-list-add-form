import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const urlPattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    count: 0,
  });

  const handleChange = (fieldName: string) => (newValue: string) => {
    setForm(prevForm => ({
      ...prevForm,
      [fieldName]: newValue,
    }));
  };

  const reset = () => {
    setForm({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      count: form.count + 1,
    });
  };

  const isValidUrl = (url: string) => urlPattern.test(url);

  return (
    <form
      className="NewMovie"
      key={form.count}
      onSubmit={event => {
        event.preventDefault();
        if (!isValidUrl(form.imgUrl) || !isValidUrl(form.imdbUrl)) {
          alert('Invalid URL format');

          return;
        }

        onAdd({
          title: form.title.trim(),
          description: form.description,
          imgUrl: form.imgUrl,
          imdbUrl: form.imdbUrl,
          imdbId: form.imdbId,
        });
        reset();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={handleChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={handleChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        onChange={handleChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        onChange={handleChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        onChange={handleChange('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !form.title.trim() ||
              !form.imgUrl ||
              !form.imdbUrl ||
              !form.imdbId
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
