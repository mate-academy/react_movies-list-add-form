import React, { useState } from 'react';
import { TextField, pattern } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

type FillRequired = {
  title: boolean,
  imgUrl: boolean,
  imdbUrl: boolean,
  imdbId: boolean,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [textFieldsValue, setTextfieldValue] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = textFieldsValue;

  const fillRequired: FillRequired = {
    title: !!title.length,
    imgUrl: !!(pattern.test(imgUrl)),
    imdbUrl: !!(pattern.test(imdbUrl)),
    imdbId: !!imdbId.length,
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    setTextfieldValue({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    Object.values(fillRequired).forEach(el => !el);
    setCount(count + 1);
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
        onChange={
          value => setTextfieldValue({ ...textFieldsValue, title: value })
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={
          value => setTextfieldValue({ ...textFieldsValue, description: value })
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={
          value => setTextfieldValue({ ...textFieldsValue, imgUrl: value })
        }
        required
        validation
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={
          value => setTextfieldValue({ ...textFieldsValue, imdbUrl: value })
        }
        required
        validation
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={
          value => setTextfieldValue({ ...textFieldsValue, imdbId: value })
        }
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!Object.values(fillRequired).every(el => el === true)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
