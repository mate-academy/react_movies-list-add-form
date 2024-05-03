import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImageURL] = useState('');
  const [imdbUrl, setImbdURL] = useState('');
  const [imdbId, setImdbID] = useState('');

  const reset = () => {
    setTitle('');
    setDescription('');
    setImageURL('');
    setImbdURL('');
    setImdbID('');
    setCount(prevKey => prevKey + 1);
  };

  const handleAddMovie = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(count);
    reset();
  };

  const blockButton = () => {
    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return true;
    }

    return false;
  };

  return (
    <form className="NewMovie" onSubmit={handleAddMovie} key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={titleNew => {
          setTitle(titleNew.trimStart());
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={descriptionNew => {
          setDescription(descriptionNew.trimStart());
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={imgUrlNew => {
          setImageURL(imgUrlNew.trimStart());
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={imdbUrlNew => {
          setImbdURL(imdbUrlNew.trimStart());
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={imdbIdNew => {
          setImdbID(imdbIdNew.trimStart());
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={blockButton()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
