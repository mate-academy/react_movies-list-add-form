import { useState } from 'react';
import { TextField } from '../TextField';

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const ifFormValid = () => {
    return (
      title.trim() !== '' &&
      image.trim() !== '' &&
      imdbUrl.trim() !== '' &&
      imdbId.trim() !== ''
    );
  };

  const handleTitleChange = (value: string) => {
    setTitle(value); // Тепер отримуємо тільки значення, а не event
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handleImageChange = (value: string) => {
    setImage(value);
  };

  const handleImdbUrlChange = (value: string) => {
    setImdbUrl(value);
  };

  const handleImdbIdChange = (value: string) => {
    setImdbId(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl: image,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImage('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={image}
        onChange={handleImageChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!ifFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
