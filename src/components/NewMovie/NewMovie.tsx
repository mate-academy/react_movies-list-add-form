import { FormEventHandler, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleTitle = (newValue: string) => {
    setTitle(newValue);
  };

  const handleDescription = (newValue: string) => {
    setDescription(newValue);
  };

  const handleImage = (newValue: string) => {
    setImage(newValue);
  };

  const handleImdbUrl = (newValue: string) => {
    setImdbUrl(newValue);
  };

  const handleImdbId = (newValue: string) => {
    setImdbId(newValue);
  };

  const isFormValid = () => {
    return title.trim() && image.trim() && imdbUrl.trim() && imdbId.trim();
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      onAdd({
        title,
        description,
        imgUrl: image,
        imdbUrl,
        imdbId,
      });
      setCount(count + 1);
      setTitle('');
      setDescription('');
      setImage('');
      setImdbUrl('');
      setImdbId('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={image}
        onChange={handleImage}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
