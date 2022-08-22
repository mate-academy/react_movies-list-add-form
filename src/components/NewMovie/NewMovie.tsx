import { FormEvent, useState } from 'react';
import { TextField } from '../TextField';

type Props = {
  onAdd: CallableFunction;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imbdURL, setImbdURL] = useState('');
  const [imbdId, setImbdId] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imageURL,
      imbdURL,
      imbdId,
    };

    onAdd(newMovie);

    setCount(counter => counter + 1);

    setTitle('');
    setDescription('');
    setImageURL('');
    setImbdURL('');
    setImbdId('');
  };

  const isValid = () => {
    if (!title.trim()
      || !imageURL.trim()
      || !imbdURL.trim()
      || !imbdId.trim()) {
      return true;
    }

    return false;
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">
        Add a movie
      </h2>

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
        value={imageURL}
        onChange={setImageURL}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imbdURL}
        onChange={setImbdURL}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imbdId}
        onChange={setImbdId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
