import React, { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

const initialFormState: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = (props) => {
  const {
    onAdd,
  } = props;
  const [count, setCount] = useState(0);
  const [formState, setFormState] = useState(initialFormState);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = formState;

  const allRequiredFieldsAreFilled = formState.title
  && formState.imgUrl && formState.imdbUrl && formState.imdbId;

  const clearForm = () => {
    setFormState(initialFormState);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (allRequiredFieldsAreFilled) {
      onAdd(formState);
      setCount(prevState => prevState + 1);
      clearForm();
    }
  };

  const handlerChange = (key: string, value: string) => {
    setFormState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submitHandler}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => handlerChange('title', value.trimStart())}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value => handlerChange('description', value.trimStart()))}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => handlerChange('imgUrl', value.trimStart())}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => handlerChange('imdbUrl', value.trimStart())}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => handlerChange('imdbId', value.trimStart())}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!allRequiredFieldsAreFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
