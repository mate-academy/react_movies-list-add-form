import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [addNewMovie, setAddNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isURLCorrect = (url: string) => {
    const pattern =
      // eslint-disable-next-line max-len
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(url);
  };

  const imgUrlInvalid =
    Boolean(addNewMovie.imgUrl.trim()) && !isURLCorrect(addNewMovie.imgUrl);
  const imbdUrlInvalid =
    Boolean(addNewMovie.imdbUrl.trim()) && !isURLCorrect(addNewMovie.imdbUrl);

  const isError =
    !addNewMovie.title.trim() ||
    !addNewMovie.imgUrl.trim() ||
    !addNewMovie.imdbUrl.trim() ||
    !addNewMovie.imdbId.trim();

  const handleChange = (name: string, value: string) => {
    setAddNewMovie(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isError) {
      return;
    }

    onAdd(addNewMovie);

    setAddNewMovie({
      title: '',
      description: '',
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
        value={addNewMovie.title}
        onChange={value => handleChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={addNewMovie.description}
        onChange={value => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={addNewMovie.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        urlInvalid={imgUrlInvalid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={addNewMovie.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        urlInvalid={imbdUrlInvalid}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={addNewMovie.imdbId}
        onChange={value => handleChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isError || imgUrlInvalid || imbdUrlInvalid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
