import React, { useState } from 'react';

interface Props {
  onAdd: (movie: Movie) => void
  movies: Movie[]
}
const err = {
  titleError: false,
  descriptionError: false,
  imgUrlError: false,
  imdbUrlError: false,
};

export const NewMovie: React.FC<Props> = ({ onAdd, movies }) => {
  const [title, setTitel] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [errors, setError] = useState(err);

  const getRandomID = (movieList: Movie[]): string => {
    const key = movieList[0].imdbId.slice(0, -4);
    const id = key + Math.ceil(Math.random() * (10000 - 1000) + 1000);

    if (movies.some(movie => movie.imdbId === id)) {
      return getRandomID(movieList);
    }

    return id;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title === '') {
      setError((prev) => {
        return {
          ...prev,
          titleError: true,
        };
      });

      return;
    }

    if (description === '') {
      setError((prev) => {
        return {
          ...prev,
          descriptionError: true,
        };
      });

      return;
    }

    if (imgUrl === '') {
      setError((prev) => {
        return {
          ...prev,
          imgUrlError: true,
        };
      });

      return;
    }

    if (imdbUrl === '') {
      setError((prev) => {
        return {
          ...prev,
          imdbUrlError: true,
        };
      });

      return;
    }

    const movie:Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId: getRandomID(movies),
    };

    onAdd(movie);

    setTitel('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setError({
      titleError: false,
      descriptionError: false,
      imgUrlError: false,
      imdbUrlError: false,
    });
  };

  return (
    <form
      action="POST"
      onSubmit={handleSubmit}
      className="form"
    >
      <label>
        <h2>Title</h2>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitel(event.target.value)}
          placeholder=""
        />
        {errors.titleError && (<p>field is required</p>)}
      </label>

      <label>
        <h2>Description</h2>
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        {errors.descriptionError && (<p>field is required</p>)}
      </label>

      <label>
        <h2>Img Url</h2>
        <input
          type="text"
          value={imgUrl}
          onChange={(event) => setImgUrl(event.target.value)}
        />
        {errors.descriptionError && (<p>field is required</p>)}
      </label>
      <label>
        <h2>IMBD Url</h2>
        <input
          type="text"
          value={imdbUrl}
          onChange={(event) => setImdbUrl(event.target.value)}
        />
        {errors.descriptionError && (<p>field is required</p>)}
      </label>
      <br />

      <button className="button is-dark" type="submit">Add</button>
    </form>
  );
};
