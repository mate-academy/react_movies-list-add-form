import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [errors, setErrors] = useState({
    title: '',
    imageUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const reset = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbId('');
    setErrors({
      title: '',
      imageUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const isFormValid = () =>
    title.trim() && imageUrl.trim() && imdbUrl.trim() && imdbId.trim();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      title: !title.trim() ? 'Title is required' : '',
      imageUrl: !imageUrl.trim() ? 'Image URL is required' : '',
      imdbUrl: !imdbUrl.trim() ? 'IMDB URL is required' : '',
      imdbId: !imdbId.trim() ? 'IMDB ID is required' : '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    const newMovie = {
      title,
      description,
      imgUrl: imageUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    reset();
    setCount(prevCount => prevCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={value => {
          setTitle(value);
          setErrors(prev => ({ ...prev, title: '' }));
        }}
        required
        error={errors.title}
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
        value={imageUrl}
        onChange={value => {
          setImageUrl(value);
          setErrors(prev => ({ ...prev, imageUrl: '' }));
        }}
        required
        error={errors.imageUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => {
          setImdbUrl(value);
          setErrors(prev => ({ ...prev, imdbUrl: '' }));
        }}
        required
        error={errors.imdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => {
          setImdbId(value);
          setErrors(prev => ({ ...prev, imdbId: '' }));
        }}
        required
        error={errors.imdbId}
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
