import { useState } from 'react';
import { TextField } from '../TextField';

export const NewMovie = () => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const isFormValid = () => {
    return title && imgUrl && imdbUrl && imdbId && description;
  };

  const handleBlur = (field: string, value: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: !value.trim(),
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors = {
      title: !title,
      imgUrl: !imgUrl,
      imdbUrl: !imdbUrl,
      imdbId: !imdbId,
    };

    if (isFormValid()) {
      setTitle('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }

    if (!Object.values(newErrors).includes(true) && isFormValid()) {
      setTitle('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }

    setErrors(newErrors);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        onBlur={() => handleBlur('title', title)}
        required
        hasError={errors.title}
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
        onChange={setImgUrl}
        onBlur={() => handleBlur('imgUrl', imgUrl)}
        hasError={errors.imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        onBlur={() => handleBlur('imdbUrl', imdbUrl)}
        hasError={errors.imdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        onBlur={() => handleBlur('imdbId', imdbId)}
        hasError={errors.imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
