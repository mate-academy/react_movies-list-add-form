import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);

  const [titleBody, setTitleBody] = useState('');
  const [descriptionBody, setDescriptionBody] = useState('');
  const [imgUrlBody, setImgUrlBody] = useState('');
  const [imdbUrlBody, setImdbUrlBody] = useState('');
  const [imdbIdBody, setImdbIdBody] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !titleBody &&
      !descriptionBody &&
      !imgUrlBody &&
      !imdbUrlBody &&
      !imdbIdBody
    ) {
      return;
    }

    onAdd({
      title: titleBody,
      description: descriptionBody,
      imgUrl: imgUrlBody,
      imdbUrl: imdbUrlBody,
      imdbId: imdbIdBody,
    });

    setTitleBody('');
    setDescriptionBody('');
    setImgUrlBody('');
    setImdbUrlBody('');
    setImdbIdBody('');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleBody}
        onChange={setTitleBody}
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionBody}
        onChange={setDescriptionBody}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlBody}
        onChange={setImgUrlBody}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlBody}
        onChange={setImdbUrlBody}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdBody}
        onChange={setImdbIdBody}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !(
                titleBody.trim() &&
                imgUrlBody.trim() &&
                imdbUrlBody.trim() &&
                imdbIdBody.trim()
              )
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
