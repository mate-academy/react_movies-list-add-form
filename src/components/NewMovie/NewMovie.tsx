import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [onDisable, setOnDisable] = useState(true);
  // const [urlCorect, setUrlCorect] = useState(false);

  // const protocol = '([A-Za-z]{3,9}:(?://)?)';
  // const userInfo = '(?:[-;:&=+$,w]+@)?';
  // const domain = '[A-Za-z0-9.-]+';
  // const wwwOrEmail = '(?:www.|[-;:&=+$,w]+@)';
  // const path = '(?:/[+~%/.w-_]*)?';
  // const query = '(?:??(?:[-+=&;%@,.w_]*)#?(?:[,.!/\\w]*))?)';

  // const pattern = new RegExp(
  //   `^(${protocol}${userInfo}${domain}|${wwwOrEmail}${domain})${path}${query}`,
  // );

  const checkDisable = (movie: Movie) => {
    const fieldHasEmpty = Object.entries(movie).some(([key, value]) => {
      if (key === 'description') {
        return false;
      }

      return value.trim() === '';
    });

    setOnDisable(fieldHasEmpty);
  };

  // const urlValid = (url: string): boolean => {
  //   setUrlCorect(pattern.test(url));

  //   return !urlCorect;
  // };

  const handleChange = (field: keyof Movie, value: string) => {
    setNewMovie(prevMovie => {
      const updatedMovie = {
        ...prevMovie,
        [field]: value,
      };

      checkDisable(updatedMovie);

      return updatedMovie;
    });
  };

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setOnDisable(true);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // if (urlCorect) {
    //   return;
    // }

    onAdd(newMovie);
    reset();
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={value => handleChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={value => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        required
        // pattern={(value: string) => urlValid(value)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={value => handleChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={onDisable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
