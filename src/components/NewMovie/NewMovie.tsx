import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (newMovie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imdbURL, setImdbURL] = useState('');
  const [imdbID, setImdbID] = useState('');

  const createdMovie: Movie = {
    title,
    description,
    imgUrl: imageURL,
    imdbUrl: imdbURL,
    imdbId: imdbID,
  };

  const fieldsAreFilled = title && imageURL && imdbURL && imdbID;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();
        onAdd(createdMovie);
        setTitle('');
        setDescription('');
        setImageURL('');
        setImdbURL('');
        setImdbID('');
        setCount(count + 1);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newTitle) => setTitle(newTitle)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newDescription) => setDescription(newDescription)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imageURL}
        onChange={(newImageUrl) => setImageURL(newImageUrl)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbURL}
        onChange={(newImdbURL) => setImdbURL(newImdbURL)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbID}
        onChange={(newImdbID) => setImdbID(newImdbID)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          {fieldsAreFilled && (
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
            >
              Add
            </button>
          )}
          {!fieldsAreFilled && (
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
              disabled
            >
              Add
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
