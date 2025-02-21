import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const urlPattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [touched, setTouched] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const isFormValid = () =>
    title.trim() &&
    imgUrl.trim() &&
    imdbUrl.trim() &&
    imdbId.trim() &&
    urlPattern.test(imgUrl) &&
    urlPattern.test(imdbUrl);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid()) {
      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      // Очищуємо форму після додавання
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
      setTouched({
        title: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
      });
    }
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        required
        onChange={setTitle}
        onBlur={() => handleBlur('title')}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        onChange={setImgUrl}
        onBlur={() => handleBlur('imgUrl')}
        validate={value => urlPattern.test(value)}
      />

      <TextField
        name="imdbUrl"
        label="IMDb URL"
        value={imdbUrl}
        required
        onChange={setImdbUrl}
        onBlur={() => handleBlur('imdbUrl')}
        validate={value => urlPattern.test(value)}
      />

      <TextField
        name="imdbId"
        label="IMDb ID"
        value={imdbId}
        required
        onChange={setImdbId}
        onBlur={() => handleBlur('imdbId')}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className="button is-link"
            data-cy="submit-button"
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
