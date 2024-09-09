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
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [touched, setTouched] = useState({
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const handleChange = (field: keyof typeof movie) => (value: string) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      [field]: value,
    }));
  };

  const handleBlur = (fieldName: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie: Movie = {
      title: movie.title,
      description: movie.description,
      imgUrl: movie.imgUrl,
      imdbUrl: movie.imdbUrl,
      imdbId: movie.imdbId,
    };

    onAdd(newMovie);

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setCount(count + 1);
    setTouched({
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });
  };

  const isFormValid =
    movie.title.trim() !== '' &&
    movie.imgUrl.trim() !== '' &&
    movie.imdbUrl.trim() !== '' &&
    movie.imdbId.trim() !== '';

    return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleChange('imgUrl')}
        onBlur={() => handleBlur('imgUrl')}
        required
        showError={touched.imgUrl && !movie.imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleChange('imdbUrl')}
        onBlur={() => handleBlur('imdbUrl')}
        required
        showError={touched.imdbUrl && !movie.imdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleChange('imdbId')}
        onBlur={() => handleBlur('imdbId')}
        required
        showError={touched.imdbId && !movie.imdbId}
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
