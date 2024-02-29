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
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [description, setDescription] = useState('');

  const pattern =
    // eslint-disable-next-line
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const isFormFeeled = title && imgUrl && imdbUrl && imdbId;

  const sendMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    setCount(prev => prev + 1);
    setTitle('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setDescription('');
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
        value={title}
        onChange={newTitle => {
          setTitle(newTitle);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newItem => setDescription(newItem)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        pattern={pattern}
        onChange={newItem => {
          if (newItem) {
            setImgUrl(newItem);
          }
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        pattern={pattern}
        onChange={newItem => {
          if (newItem) {
            setImgUrl(newItem);
          }
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={newItem => setImdbId(newItem)}
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
