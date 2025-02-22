import { useState } from "react";
import { TextField } from "../TextField";
import { Movie } from "../../types/Movie";

type AddMovie = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<AddMovie> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  // let [movie, setMovie] = useState<Movie>();

  const [movieTitle, setMovieTitle] = useState("");
  // let [hasTitleError, setHasTitleError] = useState(false);

  const [movieDescription, setMovieDescription] = useState("");
  // let [hasDescriptionError, setHasDescriptionError] = useState(false);

  const [movieImgUrl, setMovieImgUrl] = useState("");
  // let [hasImgUrlError, setHasImgUrlError] = useState(false);

  const [movieImdbUrl, setMovieImdbUrl] = useState("");
  // let [hasImdbUrlError, setHasImdbUrlError] = useState(false);

  const [movieImdbId, setMovieImdbId] = useState("");

  // let [hasImdbIdError, setHasImdbIdError] = useState(false);
  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieTitle}
        onChange={setMovieTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        onChange={setMovieDescription}
        value={movieDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        onChange={setMovieImgUrl}
        value={movieImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        onChange={setMovieImdbUrl}
        value={movieImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        onChange={setMovieImdbId}
        value={movieImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !movieImgUrl.trim() ||
              !movieImdbUrl.trim() ||
              !movieImdbId.trim() ||
              !movieTitle.trim()
            }
            onClick={(event) => {
              event.preventDefault();
              onAdd({
                title: movieTitle,
                description: movieDescription,
                imgUrl: movieImgUrl,
                imdbUrl: movieImdbUrl,
                imdbId: movieImdbId,
              });
              setMovieDescription("");
              setMovieTitle("");
              setMovieImdbId("");
              setMovieImgUrl("");
              setMovieImdbUrl("");
              setCount((currentCount) => currentCount + 1);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
