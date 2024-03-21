import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props>= ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCounter] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const requiredField = {
    title,
    imgUrl,
    imdbUrl,
    imdbId,
  }

  const isRequiered = (field: string) => {
    return Object.keys(requiredField).includes(field)
  }

  const isRequiredSetFilled = () => {
    return !Object.values(requiredField).some(str => {
      return str.trim() === ''
    })
  }

  const resetStateToDefault = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isRequiredSetFilled()) {
      return
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    })

    setCounter((curCount) => curCount + 1);

    resetStateToDefault()
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event) => setTitle(event)}
        required={isRequiered('title')}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => setDescription(event)}
        required={isRequiered('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event) => setImgUrl(event)}
        required={isRequiered('imgUrl')}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => setImdbUrl(event)}
        required={isRequiered('imdbUrl')}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event) => setImdbId(event)}
        required={isRequiered('imdbId')}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isRequiredSetFilled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
