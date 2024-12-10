import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isFormValid =
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

  const handleBlur = (field: string, value: string) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: value.trim() === '' ? `${field} is required` : '',
    }));
  };

  const handleTitleChange = (newTitle: string) => setTitle(newTitle);
  const handleDescriptionChange = (newDescription: string) =>
    setDescription(newDescription);
  const handleImgUrlChange = (newImgUrl: string) => setImgUrl(newImgUrl);
  const handleImdbUrlChange = (newImdbUrl: string) => setImdbUrl(newImdbUrl);
  const handleImdbIdChange = (newImdbId: string) => setImdbId(newImdbId);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setErrors({});
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCount(count + 1);

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    resetForm();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        onBlur={() => handleBlur('title', title)}
        required
      />
      {errors.title && <p className="error">{errors.title}</p>}

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        onBlur={() => handleBlur('imgUrl', imgUrl)}
        required
      />
      {errors.imgUrl && <p className="error">{errors.imgUrl}</p>}

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        onBlur={() => handleBlur('imdbUrl', imdbUrl)}
        required
      />
      {errors.imdbUrl && <p className="error">{errors.imdbUrl}</p>}

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        onBlur={() => handleBlur('imdbId', imdbId)}
        required
      />
      {errors.imdbId && <p className="error">{errors.imdbId}</p>}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
