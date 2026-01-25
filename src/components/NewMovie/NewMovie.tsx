import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onSubmit: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [img, setImg] = useState('');
  const [imd, setImd] = useState('');
  const [imdId, setImdId] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [count, setCount] = useState(0);

  const isInvalid =
    !title.trim() || !img.trim() || !imd.trim() || !imdId.trim();

  const reset = () => {
    setTitle('');
    setDescr('');
    setImg('');
    setImd('');
    setImdId('');
    setSubmitted(false);
    setCount(prev => prev + 1);
  };

  const HandleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isInvalid) {
      setSubmitted(true);

      return;
    }

    if (!title || !img || !imd || !imdId) {
      setSubmitted(true);

      return;
    }

    onSubmit({
      title,
      description: descr.trim(),
      imgUrl: img,
      imdbUrl: imd,
      imdbId: imdId,
    });

    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={HandleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
        submitted={submitted}
      />

      <TextField
        name="description"
        label="Description"
        value={descr}
        onChange={setDescr}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={img}
        onChange={setImg}
        required
        submitted={submitted}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imd}
        onChange={setImd}
        required
        submitted={submitted}
      />

      <TextField
        name="imdbId"
        // label="Imdb ID"
        value={imdId}
        onChange={setImdId}
        required
        submitted={submitted}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isInvalid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
