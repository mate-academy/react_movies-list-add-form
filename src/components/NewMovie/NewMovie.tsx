import { useState } from 'react';
import { TextField } from '../TextField';

export const NewMovie = () => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

  const [isFormValid, setIsFormValid] = useState(false);

  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isImageURLValid, setIsImageURLValid] = useState(false);
  const [isImdbURLValid, setIsImdbURLValid] = useState(false);
  const [isImdbIDValid, setIsImdbIDValid] = useState(false);

  if (isTitleValid && isImageURLValid && isImdbURLValid && isImdbIDValid) {
    setIsFormValid(true);
  }

  // if (isTitleValid && isImageURLValid && isImdbURLValid && isImdbIDValid) {
  //   setIsFormValid(true);
  // }

  const [count, setCount] = useState(0);
  // const [count] = useState(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCount(count + 1);

    // if (!change) {

    // }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value=""
        // onChange={() => {}}
        setIsFormValid={setIsTitleValid}
        // isFormValid={isFormValid}
        // setIsFormValid={setIsFormValid}
        required
      />

      <TextField
        name="description"
        label="Description"
        value=""
        // setIsFormValid={setIsFormValid}
        // setIsFormValid={setIsFormValid}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value=""
        required
        // isFormValid={isFormValid}
        setIsFormValid={setIsImageURLValid}
        // setIsFormValid={setIsFormValid}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value=""
        required
        // isFormValid={isFormValid}
        setIsFormValid={setIsImdbURLValid}
        // setIsFormValid={setIsFormValid}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value=""
        required
        // isFormValid={isFormValid}
        setIsFormValid={setIsImdbIDValid}
        // setIsFormValid={setIsFormValid}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!isFormValid}
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
