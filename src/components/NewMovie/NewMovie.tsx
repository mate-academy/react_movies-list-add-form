import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onSubmit: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onSubmit }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const onSubmitEvent = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={newValue => {
          setTitle(newValue);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value=""
        onChange={() => {
          setDescription(`${description}`);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value=""
        onChange={() => {
          setImgUrl(`${imgUrl}`);
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value=""
        onChange={() => {
          setImdbUrl(`${imdbUrl}`);
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value=""
        onChange={() => {
          setImdbId(`${imdbId}`);
        }}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={onSubmitEvent}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
