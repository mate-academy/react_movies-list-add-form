/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

type Props = {
  handleOnAdd: (movie: Movie) => void
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

export const NewMovie: React.FC<Props> = ({ handleOnAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const nextForm = { ...formData };

    nextForm[event.target.name as keyof State] = event.target.value;
    setFormData(nextForm);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMovie: Movie = formData;

    handleOnAdd(newMovie);
    setFormData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="movie-form"
    >
      <label htmlFor="movie-title"> </label>
      <input
        type="text"
        id="movie-title"
        name="title"
        placeholder="Enter a movie title"
        value={formData.title}
        onChange={handleInputChange}
        className="movie-title"
      />
      <label htmlFor="movie-description"> </label>
      <input
        id="movie-description"
        name="description"
        placeholder="Enter a movie description"
        value={formData.description}
        onChange={handleInputChange}
        className="movie-description"
      />
      <label htmlFor="movie-imgUrl"> </label>
      <input
        type="text"
        id="movie-imgUrl"
        name="imgUrl"
        placeholder="Enter a movie image url"
        value={formData.imgUrl}
        onChange={handleInputChange}
        className="movie-imgUrl"
      />
      <label htmlFor="movie-imdbUrl"> </label>
      <input
        type="text"
        id="movie-imdbUrl"
        name="imdbUrl"
        placeholder="Enter a movie imdb url"
        value={formData.imdbUrl}
        onChange={handleInputChange}
        className="movie-imdbUrl"
      />
      <label htmlFor="movie-imdbId"> </label>
      <input
        type="text"
        id="movie-imdbId"
        name="imdbId"
        placeholder="Enter a movie imdb id"
        value={formData.imdbId}
        onChange={handleInputChange}
        className="movie-imdbId"
      />

      <button
        type="submit"
        name="submit"
        className="movie-button"
      >
        Add movie
      </button>
    </form>
  );
};
