import { FC, FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imbdUrl, setImbdUrl] = useState('');
  const [imbdId, setImbdId] = useState('');

  const isFormFull = title && imageUrl && imbdUrl && imbdId;

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setImbdUrl('');
    setImbdId('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormFull) {
      return;
    }

    const newMovieToPush: Movie = {
      title: title,
      description: description,
      imgUrl: imageUrl,
      imdbUrl: imbdUrl,
      imdbId: imbdId,
    };

    onAdd(newMovieToPush);
    setCount(current => current + 1);
    handleReset();
  };

  return (
    <form onSubmit={handleSubmit} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={event => setTitle(event)}
        required
      />

      <TextField
        onChange={event => setDescription(event)}
        required
        name="description"
        label="Description"
        value={description}
      />

      <TextField
        onChange={event => setImageUrl(event)}
        required
        name="imgUrl"
        label="Image URL"
        value={imageUrl}
      />

      <TextField
        onChange={event => setImbdUrl(event)}
        required
        name="imdbUrl"
        label="Imdb URL"
        value={imbdUrl}
      />

      <TextField
        onChange={event => setImbdId(event)}
        required
        name="imdbId"
        label="Imdb ID"
        value={imbdId}
      />

      <div className="field is-grouped">
        <div className="control">
          {isFormFull ? (
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
            >
              Add
            </button>
          ) : (
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
