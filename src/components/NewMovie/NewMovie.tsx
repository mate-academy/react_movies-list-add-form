import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const defaultFormValues = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie
  = ({ onAdd }: { onAdd: (movie: Movie) => void }) => {
    const [count, setCount] = useState(0);
    const [formValues, setFormValues] = useState(defaultFormValues);

    const formReset = () => {
      setFormValues(defaultFormValues);
    };

    const isAddButtonDisabled = () => {
      const {
        title,
        imgUrl,
        imdbUrl,
        imdbId,
      } = formValues;

      return !(title.trim() && imgUrl.trim()
        && imdbUrl.trim() && imdbId.trim());
    };

    const handleSubmit = (): void => {
      onAdd(formValues);

      formReset();

      setCount((prevCount) => prevCount + 1);
    };

    const handleChange = (name: string, newValue: string) => {
      setFormValues((prevForm) => ({
        ...prevForm,
        [name]: newValue,
      }));
    };

    return (
      <form className="NewMovie" key={count} onSubmit={handleSubmit}>
        <h2 className="title">Add a movie</h2>

        <TextField
          name="title"
          label="Title"
          value={formValues.title}
          onChange={handleChange}
          required
        />

        <TextField
          name="description"
          label="Description"
          onChange={handleChange}
          value={formValues.description}
        />

        <TextField
          name="imgUrl"
          label="Image URL"
          value={formValues.imgUrl}
          onChange={handleChange}
          required
        />

        <TextField
          name="imdbUrl"
          label="Imdb URL"
          value={formValues.imdbUrl}
          onChange={handleChange}
          required
        />

        <TextField
          name="imdbId"
          label="Imdb ID"
          value={formValues.imdbId}
          onChange={handleChange}
          required
        />

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
              disabled={isAddButtonDisabled()}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    );
  };
