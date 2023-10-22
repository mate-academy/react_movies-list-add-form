import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [checkEmail, setCheckEmail] = useState(true);
  const [submitData, setSubmitData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !submitData?.title
      || !submitData?.imgUrl
      || !submitData?.imdbUrl
      || !submitData.imdbId
      || checkEmail
    ) {
      return;
    }

    onAdd(submitData);
    setCount(count + 1);
  };

  const onFormDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitData({ ...submitData, [event.target.name]: event.target.value });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={onFormSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={submitData.title}
        onChange={onFormDataChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={submitData.description}
        onChange={onFormDataChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={submitData.imgUrl}
        onChange={onFormDataChange}
        required
        checkIsValid={setCheckEmail}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={submitData.imdbUrl}
        onChange={onFormDataChange}
        required
        checkIsValid={setCheckEmail}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={submitData.imdbId}
        onChange={onFormDataChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !submitData?.title
              || !submitData?.imgUrl
              || !submitData?.imdbUrl
              || !submitData.imdbId
              || checkEmail
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
