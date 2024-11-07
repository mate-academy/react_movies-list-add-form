import { useState } from 'react';
import { TextField } from '../TextField';

type Move = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

interface Props {
  onAdd: (movie: Move) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitile] = useState('');
  const [imgUrl, setImg] = useState('');
  const [imdbUrl, setImdb] = useState('');
  const [imdbId, setId] = useState('');
  const [description, setDescription] = useState('');

  function getTitle(data: string) {
    setTitile(data);
  }

  function getDescription(data: string) {
    setDescription(data);
  }

  function getImg(data: string) {
    setImg(data);
  }

  function getImdb(data: string) {
    setImdb(data);
  }

  function getId(data: string) {
    setId(data);
  }

  const reset = () => {
    setTitile('');
    setImg('');
    setImdb('');
    setId('');
    setDescription('');
    setCount(0);
  };

  let checkFullForm = true;

  if (title && imgUrl && imdbUrl && description && imdbId) {
    checkFullForm = false;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({ title, imgUrl, imdbUrl, description, imdbId });
    setCount(prevCount => prevCount + 1);

    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={getTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={getDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={getImg}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={getImdb}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={getId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={checkFullForm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
