import React, { FC, useState } from "react";
import cn from "classnames";
import "./NewMovie.scss";

type Props = {
  addMovie: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState("");
  const [hasTitleError, setHasTitleError] = useState(false);

  const [description, setDescription] = useState("");
  const [hasDescrError, setHasDescrError] = useState(false);

  const [imgUrl, setImgUrl] = useState("");
  const [hasImgUrlError, setHasImgUrlError] = useState(false);

  const [imdbUrl, setImdbUrl] = useState("");
  const [hasImdbUrlError, setHasImdbUrlError] = useState(false);

  const [imdbId, setImdbId] = useState("");
  const [hasImdbIdError, setHasImdbIdError] = useState(false);

  const movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId
  };

  const validateInput = () => {
    if (!title) {
      setHasTitleError(true);
    }

    if (!imgUrl) {
      setHasImgUrlError(true);
    }

    if (!imdbUrl) {
      setHasImdbUrlError(true);
    }

    if (!imdbId) {
      setHasImdbIdError(true);
    }
  };

  const submitValidForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateInput();

    if (title && imgUrl && imdbUrl && imdbId) {
      addMovie(movie);
      setTitle("");
      setDescription("");
      setImgUrl("");
      setImdbUrl("");
      setImdbId("");
    }
  };

  return (
    <form onSubmit={submitValidForm} className="form-control">
      <label>
        Movie title:
        <input
          className={cn("border border-secondary", {
            "border border-danger border-3": hasTitleError
          })}
          type="text"
          placeholder="Movie title"
          data-cy="form-title"
          value={title}
          onChange={(event) => {
            setHasTitleError(false);
            setTitle(event.target.value);
          }}
        />
      </label>

      <br />
      <br />

      <label>
        Movie description:
        <textarea
          className={cn("border border-secondary", {
            "border border-danger border-3": hasDescrError
          })}
          placeholder="Movie description"
          data-cy="form-description"
          rows={3}
          cols={30}
          value={description}
          onChange={(event) => {
            setHasDescrError(false);
            setDescription(event.target.value);
          }}
        />
      </label>

      <br />
      <br />

      <label>
        Movie image url:
        <input
          className={cn("border border-secondary", {
            "border border-danger border-3": hasImgUrlError
          })}
          type="text"
          placeholder="Movie image url"
          data-cy="form-imgUrl"
          value={imgUrl}
          onChange={(event) => {
            setHasImgUrlError(false);
            setImgUrl(event.target.value);
          }}
        />
      </label>

      <br />
      <br />

      <label>
        Imdb url:
        <input
          className={cn("border border-secondary", {
            "border border-danger border-3": hasImdbUrlError
          })}
          type="text"
          placeholder="imdb url"
          data-cy="form-imdbUrl"
          value={imdbUrl}
          onChange={(event) => {
            setHasImdbUrlError(false);
            setImdbUrl(event.target.value);
          }}
        />
      </label>

      <br />
      <br />

      <label>
        Imdb ID:
        <input
          className={cn("border border-secondary", {
            "border border-danger border-3": hasImdbIdError
          })}
          type="text"
          placeholder="imdb ID"
          data-cy="form-imdbId"
          value={imdbId}
          onChange={(event) => {
            setHasImdbIdError(false);
            setImdbId(event.target.value);
          }}
        />
      </label>

      <br />
      <br />

      <button
        type="submit"
        data-cy="form-submit-button"
        className="btn btn-success"
      >
        Submit
      </button>
    </form>
  );
};
