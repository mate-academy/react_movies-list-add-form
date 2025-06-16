import { useState } from 'react';
import { TextField } from '../TextField';

export const NewMovie = () => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [form, setForm] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const hasError = Object.values(errors).some(error => error !== '');

  const requiredFieldsFilled =
    form.title.trim() !== '' &&
    form.imgUrl.trim() !== '' &&
    form.imdbUrl.trim() !== '' &&
    form.imdbId.trim() !== '';

  const disableSubmit = hasError || !requiredFieldsFilled;

  const handleChange = (name: string) => (value: string) => {
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));

    if (['title', 'imgUrl', 'imdbUrl', 'imdbId'].includes(name)) {
      setErrors(prev => ({
        ...prev,
        [name]: value.trim() === '' ? 'Поле обязательно' : '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (hasError || !requiredFieldsFilled) {
      setErrors(prev => ({
        ...prev,
        title: form.title.trim() === '' ? 'Поле обовязкове' : prev.title,
        imgUrl: form.imgUrl.trim() === '' ? 'Поле обовязкове' : prev.imgUrl,
        imdbUrl: form.imdbUrl.trim() === '' ? 'Поле обовязкове' : prev.imdbUrl,
        imdbId: form.imdbId.trim() === '' ? 'Поле обовязкове' : prev.imdbId,
      }));

      return;
    }

    setForm({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setErrors({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
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
            disabled={disableSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
