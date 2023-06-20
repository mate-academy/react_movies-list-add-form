import { useState, useEffect } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd:(movie:Movie)=> void
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [disabledButton, setdisabledButton] = useState(true);

  useEffect(() => (
    setdisabledButton(title !== '' && imgUrl !== ''
    && imdbUrl !== '' && imdbId !== '')
  ), [title, imgUrl, imdbUrl, imdbId]);

  return (
    <form className="NewMovie" key={count}>
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
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!disabledButton}
            onClick={(event) => {
              event.preventDefault();
              const movie = {
                title,
                description,
                imgUrl,
                imdbUrl,
                imdbId,
              };

              onAdd(movie);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
