import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd:(movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [isTitle, setTitle] = useState('');
  const [isDescription, setDescription] = useState('');
  const [isImgUrl, setImgUrl] = useState('');
  const [isImdbUrl, setImdbUrl] = useState('');
  const [isImdbId, setImdbId] = useState('');

  const isFieldsAreFill = !isTitle
  || !isImgUrl
  || !isImdbUrl
  || !isImdbId;

  function hendleSubmit(event
  : React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    const newMovie = {
      title: isTitle,
      description: isDescription,
      imgUrl: isImgUrl,
      imdbUrl: isImdbUrl,
      imdbId: isImdbId,
    };

    onAdd(newMovie);

    setCount(count + 1);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  }

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={isTitle}
        onChange={(text) => setTitle(text)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={isDescription}
        onChange={(text) => setDescription(text)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={isImgUrl}
        onChange={(text) => setImgUrl(text)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={isImdbUrl}
        onChange={(text) => setImdbUrl(text)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={isImdbId}
        onChange={(text) => setImdbId(text)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={(e) => hendleSubmit(e)}
            disabled={isFieldsAreFill}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
