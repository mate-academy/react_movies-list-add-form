import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { isValidUrl } from '../../helpers/isValidUrl'

type Props = {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

  const formInputs: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  }

  const [count, setCount] = useState(0);
  const [inputs, setInputs] = useState<Movie>(formInputs);
  const isDisabled =
    !inputs.title.trim()
    || !inputs.imdbUrl.trim()
    || !inputs.imgUrl.trim()
    || !inputs.imdbId.trim()
    || !isValidUrl(inputs.imdbUrl)
    || !isValidUrl(inputs.imgUrl);



  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAdd(inputs);
    setCount(prevCount => prevCount + 1);
  };

  if (count > 0) {
    setInputs(formInputs);
    setCount(0);
  }


  const { title, description, imgUrl, imdbUrl, imdbId } = inputs;


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
        onChange={inputHandle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={inputHandle}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={inputHandle}
        isValid={isValidUrl(imgUrl)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={inputHandle}
        isValid={isValidUrl(imdbUrl)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={inputHandle}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
