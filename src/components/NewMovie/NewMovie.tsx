import { FormEvent, useState } from 'react';

interface NewMovieProps {
  addMovie: (newMovie: Movie) => void;
}

export const NewMovie = ({ addMovie }: NewMovieProps) => {
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addMovie(newMovie);
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter a titile"
          value={newMovie.title}
          onChange={(e) => setNewMovie({
            ...newMovie,
            title: e.target.value,
          })}
        />
        <input
          type="text"
          placeholder="Enter a description"
          value={newMovie.description}
          onChange={(e) => setNewMovie({
            ...newMovie,
            description: e.target.value,
          })}
        />
        <input
          type="text"
          placeholder="Enter a imgUrl"
          value={newMovie.imgUrl}
          onChange={(e) => setNewMovie({
            ...newMovie,
            imgUrl: e.target.value,
          })}
        />
        <input
          type="text"
          placeholder="Enter a imdbUrl"
          value={newMovie.imdbUrl}
          onChange={(e) => setNewMovie({
            ...newMovie,
            imdbUrl: e.target.value,
          })}
        />
        <input
          type="text"
          placeholder="Enter a imdbId"
          value={newMovie.imdbId}
          onChange={(e) => setNewMovie({
            ...newMovie,
            imdbId: e.target.value,
          })}
        />
        <button
          type="submit"
        >
          Add New Film
        </button>
      </form>
    </>
  );
};
