/*eslint-disable*/
import React, { useState } from "react";
import { TextField } from "../TextField";
import { Movie } from "../../types/Movie";

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [titleField, setTitleField] = useState("");
  const [descrField, setDescrField] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imdbUrl, setImdbUrl] = useState("");
  const [imdbId, setImdbId] = useState("");

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const objToSend = {
      title: titleField,
      description: descrField,
      imgUrl,
      imdbId,
      imdbUrl,
    };

    onAdd(objToSend);
    setCount((prev) => (prev += 1));
    reset();
  };

  const reset = () => {
    setTitleField("");
    setDescrField("");
    setImgUrl("");
    setImdbUrl("");
    setImdbId("");
  };

  const disabled =
    !titleField.trim()
    || !imdbUrl.trim()
    || !imgUrl.trim()
    || !imdbId.trim();

  return (
    <form className="NewMovie" key={count} onSubmit={submitForm}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleField}
        onChange={setTitleField}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descrField}
        onChange={setDescrField}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
