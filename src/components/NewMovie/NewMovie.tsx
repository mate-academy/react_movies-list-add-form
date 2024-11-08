import React, { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onSubmit: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onSubmit }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

  const [count, setCount] = useState(0);
  const [titleChecker, setTitleChecker] = useState('');
  const [descriptionChecker, setDescriptionChecker] = useState('');
  const [imgUrlChecker, setImgUrlChecker] = useState('');
  const [imdbUrlChecker, setImdbUrlChecker] = useState('');
  const [imdbIdChecker, setImdbIdChecker] = useState('');

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (
      titleChecker.trim() &&
      imgUrlChecker.trim() &&
      imdbUrlChecker.trim() &&
      imdbIdChecker.trim()
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [titleChecker, imgUrlChecker, imdbUrlChecker, imdbIdChecker]);

  const handleTitleChecker = (title: string) => {
    setTitleChecker(title);
  };

  const handleDescriptionChecker = (description: string) => {
    setDescriptionChecker(description);
  };

  const handleImgUrlChecker = (imageUrl: string) => {
    setImgUrlChecker(imageUrl);
  };

  const handleImdbUrlChecker = (imdbUrl: string) => {
    setImdbUrlChecker(imdbUrl);
  };

  const handleImdbIdChange = (imdbId: string) => {
    setImdbIdChecker(imdbId);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title: titleChecker,
      imgUrl: imgUrlChecker,
      imdbUrl: imdbUrlChecker,
      imdbId: imdbIdChecker,
    };

    if (descriptionChecker.trim()) {
      newMovie.description = descriptionChecker.trim();
    }

    onSubmit(newMovie);

    setTitleChecker('');
    setDescriptionChecker('');
    setImgUrlChecker('');
    setImdbUrlChecker('');
    setImdbIdChecker('');

    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleChecker}
        onChange={handleTitleChecker}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionChecker}
        onChange={handleDescriptionChecker}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlChecker}
        onChange={handleImgUrlChecker}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlChecker}
        onChange={handleImdbUrlChecker}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdChecker}
        onChange={handleImdbIdChange}
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
