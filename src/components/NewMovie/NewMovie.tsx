import React, { useState } from "react";
import { TextField } from "../TextField";

interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

type Props = {
  onAddMovie: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAddMovie}) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState({
    title: true,
    description: false,
    imgUrl: true,
    imdbUrl: true,
    imdbId: true,
  })
  const [movie, addMovie] = useState({
    title: "",
    description: "",
    imgUrl: "",
    imdbUrl: "",
    imdbId: "",
  });

  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const checkValidUrl = (value: string) => {
    return pattern.test(value);
  }

  const handleChange = (section: string, value: string) => {
    if (value.trim().length < 0) {
      return
    } else {
      setIsDisabled((prev) => ({
        ...prev,
        [section]: false,
      }))
      addMovie((prevMovie) => ({
        ...prevMovie,
        [section]: value,
      }));
    }

  };

  const allFieldsComplete = Object.values(isDisabled).every((value) => !value);

  const handleSubmit = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();

    const urlsValid = checkValidUrl(movie.imgUrl) && checkValidUrl(movie.imdbUrl)

    if (!urlsValid) {
      alert("Please enter vallid urls")
    }

    if (allFieldsComplete && urlsValid) {
      const newMovie = {
        title: movie.title,
        description: movie.description,
        imgUrl: movie.imgUrl,
        imdbUrl: movie.imdbUrl,
        imdbId: movie.imdbId,
      };

      addMovie({
        title: "",
        description: "",
        imgUrl: "",
        imdbUrl: "",
        imdbId: "",
      });
      setCount(count + 1);
      onAddMovie(newMovie);
    } else {
      alert("Please fill in all fields")
    }

  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(value) => handleChange("title", value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(value) => handleChange("description", value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(value) => handleChange("imgUrl", value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(value) => handleChange("imdbUrl", value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(value) => handleChange("imdbId", value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleSubmit}
            disabled={!allFieldsComplete}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
