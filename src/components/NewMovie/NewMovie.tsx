import { useState } from 'react';
import { TextField } from '../TextField';

const defaultValues = {
  title: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

function validateField(field: string): string {
  return field.trim() === '' ? 'This field is required' : '';
}

function validateForm(fields: Record<string, string>) {
  return {
    title: validateField(fields.title),
    imgUrl: validateField(fields.imgUrl),
    imdbUrl: validateField(fields.imdbUrl),
    imdbId: validateField(fields.imdbId),
  };
}

export const NewMovie = () => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [errors, setErrors] = useState(defaultValues);

  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [description, setDescription] = useState('');

  const isFormComplete =
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    if (name !== 'description') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(value),
      }));
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = validateForm({ title, imgUrl, imdbUrl, imdbId });

    setErrors(newErrors);

    if (Object.values(newErrors).some((error: string) => error !== '')) {
      return;
    }

    setCount((prev: number) => prev + 1);
    setTitle('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setDescription('');
    setErrors(defaultValues);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  function handleImgUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImgUrl(event.target.value);
  }

  function handleImdbUrlChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImdbUrl(event.target.value);
  }

  function handleImdbIdChange(event: React.ChangeEvent<HTMLInputElement>) {
    setImdbId(event.target.value);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        onBlur={handleBlur}
        required
        error={errors.title}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
        onBlur={handleBlur}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        onBlur={handleBlur}
        required
        error={errors.imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        onBlur={handleBlur}
        required
        error={errors.imdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        onBlur={handleBlur}
        required
        error={errors.imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormComplete}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
