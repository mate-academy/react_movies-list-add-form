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

  const [errors, setErrors] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const handleBlur = (field: string, value: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: !value,
    }));
  };

  // const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitle(event.target.value);
  //   handleBlur('title', event.target.value);
  // };

  // const handleImgUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setImgUrl(event.target.value);
  //   handleBlur('imgUrl', event.target.value);
  // };

  // const handleImdbUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setImdbUrl(event.target.value);
  //   handleBlur('imdbUrl', event.target.value);
  // };

  // const handleImdbIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setImdbId(event.target.value);
  //   handleBlur('imdbId', event.target.value);
  // };

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();

  //   const newErrors = {
  //     title: !title,
  //     imgUrl: !imgUrl,
  //     imdbUrl: !imdbUrl,
  //     imdbId: !imdbId,
  //   };

  //   setErrors(newErrors);
  // };

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

      <TextField name="description" label="Description" value="" />

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
      />

      <div className="field is-grouped">
        <div className="control">
          <button
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
