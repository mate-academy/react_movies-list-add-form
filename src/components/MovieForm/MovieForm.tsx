import { FormState } from '../../types/FormState';
import { TextField } from '../TextField';

type Props = {
  updateField?: (field: string, newValue: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  isDisabled: boolean;
  count: number;
  formState: FormState;
};

export const MovieForm: React.FC<Props> = ({
  updateField,
  handleSubmit,
  isDisabled,
  count,
  formState,
}) => {
  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formState.title}
        onChange={updateField}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formState.description}
        onChange={updateField}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formState.imgUrl}
        onChange={updateField}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formState.imdbUrl}
        onChange={updateField}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formState.imdbId}
        onChange={updateField}
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
