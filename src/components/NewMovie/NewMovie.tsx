import { useState } from "react";
import { Movie } from "../../types/Movie";
import { TextField } from "../TextField";

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imdbUrl, setImdbUrl] = useState("");
  const [imdbId, setImdbId] = useState("");

  const isValid = !title || !imgUrl || !imdbUrl || !imdbId;

  const resetAllState = (): void => {
    setTitle("");
    setDescription("");
    setImgUrl("");
    setImdbUrl("");
    setImdbId("");
  };

  const handleAddMovie = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    resetAllState();
    setCount((prevState) => prevState + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleAddMovie}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
