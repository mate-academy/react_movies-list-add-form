import { useEffect } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type OnAdd = (movie: Movie) => void;

type FormFields = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

const getUrlPattern = (fieldName: string) => ({
  // eslint-disable-next-line max-len
  value: /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/,
  message: `${fieldName} is not valid URL`,
});

export const NewMovie = ({ onAdd }: { onAdd: OnAdd }) => {
  const methods = useForm<FormFields>({ mode: 'onBlur' });
  const { handleSubmit, reset, formState } = methods;
  const isDisabledSubmit = !formState.isValid || !formState.isDirty;

  const onSubmit: SubmitHandler<FormFields> = (formFields) => {
    onAdd(formFields);
    reset();
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <FormProvider {...methods}>
      <form
        className="NewMovie"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="title">Add a movie</h2>

        <TextField
          name="title"
          label="Title"
          required
        />

        <TextField
          name="description"
          label="Description"
        />

        <TextField
          name="imgUrl"
          label="Image URL"
          required
          getPattern={getUrlPattern}
        />

        <TextField
          name="imdbUrl"
          label="Imdb URL"
          required
          getPattern={getUrlPattern}
        />

        <TextField
          name="imdbId"
          label="Imdb ID"
          required
        />

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              data-cy="submit-button"
              disabled={isDisabledSubmit}
              className="button is-link"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
