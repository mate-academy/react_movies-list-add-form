import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [imdbId, setImdbId] = useState('');
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [description, setDescription] = useState('');

  const isFieldForm =
    imdbId.trim() && title.trim() && imgUrl.trim() && imdbUrl.trim();

  const reset = () => {
    setImdbId('');
    setTitle('');
    setImgUrl('');
    setImdbUrl('');
    setDescription('');
  };

  const handlerSumbit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({ imdbId, title, imgUrl, imdbUrl, description });
    setCount(count + 1);
    reset();
  };

  return (
    <form onSubmit={handlerSumbit} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value: string) => {
          setTitle(value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        onChange={(value: string) => {
          setDescription(value);
        }}
        value={description}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        onChange={(value: string) => {
          setImgUrl(value);
        }}
        value={imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        onChange={(value: string) => {
          setImdbUrl(value);
        }}
        value={imdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        onChange={(value: string) => {
          setImdbId(value);
        }}
        value={imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isFieldForm ? false : true}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
