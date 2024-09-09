import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';
type NewMovie = {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovie> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId]= useState('');
  const [touched, setTouched] = useState({
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const handleBlur = (fieldName: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  const newMovie: Movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  }

  onAdd(newMovie)

  setTitle('');
  setDescription('');
  setImgUrl('');
  setImdbUrl('');
  setImdbId('');
  setCount(count + 1);
  setTouched({
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });
}

const isFormValid =
  title.trim() !== '' &&
  imgUrl.trim() !== '' &&
  imdbUrl.trim() !== '' &&
  imdbId.trim() !== '';


    return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
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
        onBlur={() => handleBlur('imgUrl')}
        required
        showError={touched.imgUrl && !imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        onBlur={() => handleBlur('imdbUrl')}
        required
        showError={touched.imdbUrl && !imdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        onBlur={() => handleBlur('imdbId')}
        required
        showError={touched.imdbId && !imdbId}
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
