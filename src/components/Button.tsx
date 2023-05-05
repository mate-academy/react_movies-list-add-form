import { FC } from 'react';
import { useFormikContext } from 'formik';
import { Movie } from '../types/Movie';

export const Button: FC = () => {
  const ctx = useFormikContext<Movie>();

  return (
    <div className="field is-grouped">
      <div className="control">
        <button
          type="submit"
          data-cy="submit-button"
          className="button is-link"
          disabled={!(ctx.dirty && ctx.isValid)}
        >
          Add
        </button>
      </div>
    </div>
  );
};
