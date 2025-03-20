import { useState } from 'react';
import { TextField } from '../TextField';

import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [titleText, setTitleText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [imgUrlText, setImgUrlText] = useState('');
  const [imdbUrlText, setImdbUrlText] = useState('');
  const [imdbIdText, setImdbIdText] = useState('');

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  function updateDisableSubmitState() {
    if (
      titleText.trim() &&
      imgUrlText.trim() &&
      imdbIdText.trim() &&
      imdbUrlText.trim()
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitDisabled) {
      return;
    }

    setCount(count + 1);

    onAdd({
      title: titleText,
      description: descriptionText,
      imgUrl: imgUrlText,
      imdbUrl: imdbUrlText,
      imdbId: imdbIdText,
    });

    setTitleText('');
    setDescriptionText('');
    setImgUrlText('');
    setImdbUrlText('');
    setImdbIdText('');

    setIsSubmitDisabled(true);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleText}
        onChange={text => {
          setTitleText(text);
          updateDisableSubmitState();
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionText}
        onChange={text => {
          setDescriptionText(text);
          updateDisableSubmitState();
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlText}
        onChange={text => {
          setImgUrlText(text);
          updateDisableSubmitState();
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlText}
        onChange={text => {
          setImdbUrlText(text);
          updateDisableSubmitState();
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdText}
        onChange={text => {
          setImdbIdText(text);
          updateDisableSubmitState();
        }}
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
