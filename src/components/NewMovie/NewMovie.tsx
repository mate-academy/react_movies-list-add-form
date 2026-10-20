import { useState } from 'react';
import { TextField } from '../TextField';
import type { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');
  const [imdb, setImdb] = useState('');
  const [id, setId] = useState('');

  const movie: Movie = {
    title: title,
    description: description,
    imgUrl: img,
    imdbUrl: imdb,
    imdbId: id,
  };


  const submitHandler: React.FormEventHandler = (event) => {
    event.preventDefault();
    onAdd(movie);
    setCount(prevCount => prevCount + 1);
    setTitle('');
    setDescription('');
    setImg('');
    setImdb('');
    setId('');
  }

  const canApply = (): boolean => {
    if (title.trim() !== '' && imdb.trim() !== '' && img.trim() !== '' && id.trim() !== '') {
      return true;
    }

    return false;
  };


  return (
    <form 
      className="NewMovie" 
      key={count}
      onSubmit={submitHandler}
    >
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
        value={imdb}
        onChange={setImdb}
        required
      />

      <TextField 
        name="imdbId" 
        label="Imdb ID" 
        value={id}
        onChange={setId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!canApply()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
