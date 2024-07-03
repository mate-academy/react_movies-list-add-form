import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
interface NewMovieProps {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  const [imdbId, updateImdbId] = useState('');
  const [description, updateDescription] = useState('');
  const [count, updateCount] = useState(0);
  const [imdbUrl, updateImdbUrl] = useState('');
  const [title, updateTitle] = useState('');
  const [imgUrl, updateImgUrl] = useState('');

  const isButtonDisabled =
    !title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim();

  const Submit = function (event: React.FormEvent) {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    updateCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={Submit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={updateTitle}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={updateDescription}
      />
      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={updateImgUrl}
        required
      />
      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={updateImdbUrl}
        required
      />
      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={updateImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={isButtonDisabled}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
