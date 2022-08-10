import { FormEvent, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (newValue: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imdb, setImbd] = useState('');
  const [imdbid, setImbdId] = useState('');

  const hasAllFilledInputs = () => {
    return ((title.trim() === '')
      || (image.trim() === '')
      || (imdb.trim() === '')
      || (imdbid.trim() === ''));
  };

  const handleTitle = (arg: string) => {
    setTitle(arg);
  };

  const handleDescription = (arg: string) => {
    setDescription(arg);
  };

  const handleImage = (arg: string) => {
    setImage(arg);
  };

  const handleImbd = (arg: string) => {
    setImbd(arg);
  };

  const handleImbdId = (arg: string) => {
    setImbdId(arg);
  };

  const addMovie = (movie: Movie) => {
    onAdd(movie);
    setTitle('');
    setDescription('');
    setImage('');
    setImbd('');
    setImbdId('');
    setCount(count + 1);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasTitle = (title !== '');
    const hasImage = (image !== '');
    const hasImbd = (imdb !== '');
    const hasImbdId = (imdbid !== '');

    if (hasTitle && hasImage && hasImbd && hasImbdId) {
      const movie = {
        title,
        description,
        imgUrl: image,
        imdbUrl: imdb,
        imdbId: imdbid,
      };

      addMovie(movie);
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
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
        value={imdb}
        onChange={handleImbd}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbid}
        onChange={handleImbdId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              hasAllFilledInputs()
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
