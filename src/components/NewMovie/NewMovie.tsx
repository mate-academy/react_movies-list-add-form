import { FormEvent, useCallback, useState } from "react";
import { TextField } from "../TextField";
import { Movie } from "../../types/Movie";

interface FromValue {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  [key: string]: string;
}

const formDefaultValue: FromValue = {
  title: "",
  description: "",
  imgUrl: "",
  imdbUrl: "",
  imdbId: "",
};

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formValue, setFormValue] = useState<FromValue>(formDefaultValue);
  const [addButtonDiasbled, setAddButtonDisabled] = useState(true);

  const { title, description, imgUrl, imdbUrl, imdbId } = formValue;

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    setFormValue(formDefaultValue);

    onAdd(newMovie);
    setAddButtonDisabled(true);
    setCount(count + 1);
  }, [formValue]);

  const setAddButtonState = useCallback(() => {
    setFormValue((prevState) => {
      const isAnyRequiredFieldEmpty = Object.entries(prevState).some(
        ([key, value]) => {
          return value === formDefaultValue[key] && key !== "description";
        }
      );
      setAddButtonDisabled(isAnyRequiredFieldEmpty);
      return prevState;
    });
  }, []);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => handleSubmit(event)}
      method="GET"
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newTitle) => {
          setFormValue((prevState) => ({ ...prevState, title: newTitle }));

          setAddButtonState();
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newDescription) => {
          setFormValue((prevState) => ({
            ...prevState,
            description: newDescription,
          }));
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newImgUrl) => {
          setFormValue((prevState) => ({ ...prevState, imgUrl: newImgUrl }));
          setAddButtonState();
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newImdbUrl) => {
          setFormValue((prevState) => ({ ...prevState, imdbUrl: newImdbUrl }));

          setAddButtonState();
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newImdbId) => {
          setFormValue((prevState) => ({ ...prevState, imdbId: newImdbId }));
          setAddButtonState();
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={addButtonDiasbled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
