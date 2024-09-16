import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};
export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [description, setDescription] = useState('');

  const isFormValid = () => {
    return title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors = {
      title: !title.trim(),
      imgUrl: !imgUrl.trim(),
      imdbUrl: !imdbUrl.trim(),
      imdbId: !imdbId.trim(),
    };

    if (isFormValid()) {
      setTitle('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }

    if (!Object.values(newErrors).includes(true) && isFormValid()) {
      const newMovie: Movie = {
        title: title.trim(),
        imgUrl: imgUrl.trim(),
        imdbUrl: imdbUrl.trim(),
        imdbId: imdbId.trim(),
        description: description.trim(),
      };

      onAdd(newMovie);
      setTitle('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>
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
        value={imgUrl}
        onChange={setImgUrl}
        required
      />
      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />
      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
