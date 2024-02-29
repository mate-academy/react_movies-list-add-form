import React, { useState } from 'react';

import cn from 'classnames';

import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const pattern =
    // eslint-disable-next-line
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const isFormFeeled =
    newMovie.title && newMovie.imgUrl && newMovie.imdbUrl && newMovie.imdbId;

  const sendMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(newMovie);
    setCount(prev => prev + 1);

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewMovie(prevMovie => ({ ...prevMovie, [name]: value }));
  };

  const classForMessage = cn({
    'dropdown-menu': true,
    'is-warning': true,
    'is-hidden': isFormFeeled,
  });

  return (
    <form className="NewMovie" key={count} onSubmit={sendMovie}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        pattern={pattern}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        pattern={pattern}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <div className="dropdown is-hoverable">
            <div className="dropdown-trigger">
              <button
                type="submit"
                data-cy="submit-button"
                className="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu4"
                disabled={!isFormFeeled}
              >
                <span>Add</span>
              </button>
            </div>

            <div className={classForMessage} id="dropdown-menu4" role="menu">
              <div className="dropdown-content message is-warning">
                <div className="dropdown-item">
                  <p>Feel all required fields</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
