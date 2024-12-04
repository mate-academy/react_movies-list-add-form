import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isSubmitDisabled =
    !title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim();

  const sendData = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) {
      return;
    }

    onAdd({
      title: title.trim(),
      description: desc.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });

    setTitle('');
    setDesc('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={sendData}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={e => setTitle(e)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={desc}
        onChange={e => setDesc(e)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={e => setImgUrl(e)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={e => setImdbUrl(e)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={e => setImdbId(e)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
