import { useState } from 'react';
import { TextField } from '../TextField';

type Post = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

type NewMovieProps = {
  onAdd: (newMovie: Post) => void;
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [formKey, setFormKey] = useState(0); // для перезапуску форми

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [description, setDescription] = useState('');
  const [hasDescriptionError, setHasDescriptionError] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  const [hasImgUrlError, setHasImgUrlError] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [hasImdbUrlError, setHasImdbUrlError] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const [hasImdbIdError, setHasImdbIdError] = useState(false);

  // Перевірка чи всі обов’язкові поля заповнені (trim враховано)
  const isFormValid =
    title.trim() !== '' &&
    imgUrl.trim() !== '' &&
    imdbUrl.trim() !== '' &&
    imdbId.trim() !== '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Перевіряємо обов’язкові поля, description - необов’язкове
    const hasErrors =
      !title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim();

    setHasTitleError(!title.trim());
    setHasImgUrlError(!imgUrl.trim());
    setHasImdbUrlError(!imdbUrl.trim());
    setHasImdbIdError(!imdbId.trim());

    // description помилка якщо хочеш, але за умовою не обов'язкова
    setHasDescriptionError(false);

    if (hasErrors) {
      return;
    }

    const newMovie: Post = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    onAdd(newMovie);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setHasTitleError(false);
    setHasDescriptionError(false);
    setHasImgUrlError(false);
    setHasImdbUrlError(false);
    setHasImdbIdError(false);
    setFormKey(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={value => setTitle(value)}
        onBlur={() => setHasTitleError(!title.trim())}
        required
        hasError={hasTitleError}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => setDescription(value)}
        onBlur={() => setHasDescriptionError(false)} // description не обов’язкове
        hasError={hasDescriptionError}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => setImgUrl(value)}
        onBlur={() => setHasImgUrlError(!imgUrl.trim())}
        required
        hasError={hasImgUrlError}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => setImdbUrl(value)}
        onBlur={() => setHasImdbUrlError(!imdbUrl.trim())}
        required
        hasError={hasImdbUrlError}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => setImdbId(value)}
        onBlur={() => setHasImdbIdError(!imdbId.trim())}
        required
        hasError={hasImdbIdError}
      />

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
