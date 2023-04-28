import { FC, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setIncrementCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');
  const [imdGetUrl, setImdGetUrl] = useState('');
  const [imdGetId, setImdGetId] = useState('');

  const addNewFilm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newMovie: Movie = {
      title,
      description,
      imgUrl: img,
      imdbUrl: imdGetUrl,
      imdbId: imdGetId,
    };

    onAdd(newMovie);
    setTitle('');
    setDescription('');
    setImg('');
    setImdGetUrl('');
    setImdGetId('');
    setIncrementCount((prevcount) => prevcount + 1);
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
        value={img}
        onChange={setImg}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdGetUrl}
        onChange={setImdGetUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdGetId}
        onChange={setImdGetId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!title || !img || !imdGetUrl || !imdGetId}
            onClick={addNewFilm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
