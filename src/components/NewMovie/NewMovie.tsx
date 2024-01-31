import React, { useState } from "react";
import { TextField } from "../TextField";
import { Movie } from "../../types/Movie";

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialMovieState = {
  title: "",
  description: "",
  imgUrl: "",
  imdbUrl: "",
  imdbId: "",
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  // const [title, setTitle] = useState(EMPTY);
  // const [description, setDescription] = useState(EMPTY);
  // const [imgUrl, setImgUrl] = useState(EMPTY);
  // const [imdbUrl, setImdbUrl] = useState(EMPTY);
  // const [imdbId, setImdbId] = useState(EMPTY);

  // const activeButton
  //   = !!title.trim() && !!imgUrl.trim() && !!imdbUrl.trim() && !!imdbId.trim();

  const [movie, setMovie] = useState<Movie>(initialMovieState);

  // const activeButton = !!Object.values(movie).every((value) => value.trim());

  const activeButton
    = !!movie.title.trim()
    && !!movie.imgUrl.trim()
    && !!movie.imdbUrl.trim()
    && !!movie.imdbId.trim();

  const resetForm = () => {
    setMovie(initialMovieState);
  };

  const handleInputChange = (key: string, value: string) => {
    setMovie((prevInputs) => ({ ...prevInputs, [key]: value }));
  };

  const handleAddClick = () => {
    onAdd(movie);
    resetForm();
    setCount((currentCount) => currentCount + 1);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleInputChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!activeButton}
            onClick={handleAddClick}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
