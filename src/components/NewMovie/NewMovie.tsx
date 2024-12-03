import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd = () => {} }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imbdUrl, setImbdUrl] = useState('');
  const [imbdId, setImbdId] = useState('');

  const allFieldEmpty =
    !title.trim() || !imgUrl.trim() || !imbdUrl.trim() || !imbdId.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newMovie: Movie = {
      title: title,
      description: description,
      imgUrl: imgUrl,
      imdbUrl: imbdUrl,
      imdbId: imbdId,
    };

    onAdd(newMovie);
    setCount(oldCount => oldCount + 1);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImbdUrl('');
    setImbdId('');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={newValue => setTitle(newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newValue => setDescription(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        onChange={newValue => setImgUrl(newValue)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imbdUrl}
        required
        onChange={newValue => setImbdUrl(newValue)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imbdId}
        required
        onChange={newValue => setImbdId(newValue)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={allFieldEmpty}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
