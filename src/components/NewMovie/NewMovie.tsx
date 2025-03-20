import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';

interface Props {
  onAdd: (newMovie: {
    title: string;
    description: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => void;
}

type Validation = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export const NewMovie: React.FC<Props> = props => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [titleBody, setTitleBody] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [onDisabledSubmit, setOnDisabledSubmit] = useState(true);

  const validateForm = () => {
    let isValid = true;

    setOnDisabledSubmit(!isValid);

    if (
      titleBody.trim() === '' ||
      imgUrl.trim() === '' ||
      imdbUrl.trim() === '' ||
      imdbId.trim() === ''
    ) {
      isValid = false;
    }

    setOnDisabledSubmit(!isValid);
  };

  const handleInputTitle = (newValue: string) => {
    setTitleBody(newValue);
    validateForm();
  };

  const handleInputDesc = (newValue: string) => {
    setDescription(newValue);
  };

  const handleInputImgUrl = (newValue: string) => {
    setImgUrl(newValue);
    validateForm();
  };

  const handleInputImdbUrl = (newValue: string) => {
    setImdbUrl(newValue);
    validateForm();
  };

  const handleInputImdbId = (newValue: string) => {
    setImdbId(newValue);
    validateForm();
  };

  const validationField = (validation: Validation) => {
    props.onAdd(validation);

    setTitleBody('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setCount(count + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newMovie = {
      title: titleBody,
      description: description,
      imgUrl: imgUrl,
      imdbUrl: imdbUrl,
      imdbId: imdbId,
    };

    validationField(newMovie);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleBody}
        onChange={handleInputTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleInputDesc}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleInputImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleInputImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleInputImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={onDisabledSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
