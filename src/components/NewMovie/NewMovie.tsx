import { useState } from 'react';

import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const newMovie = () => {
    addMovie({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form
      className="form-input"
      action="POST"
      onSubmit={(event) => {
        event.preventDefault();
        newMovie();
      }}
    >

      <label>
        Title
        : &nbsp;
        <input
          type="text"
          className="input"
          placeholder="Enter the title of the movie"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>

      <label>
        Description
        : &nbsp;
        <textarea
          placeholder="Describe the movie"
          className="input"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      <label>
        ImgUrl
        : &nbsp;
        <input
          type="text"
          className="input"
          placeholder="Enter the url images"
          value={imgUrl}
          onChange={(event) => setImgUrl(event.target.value)}
        />
      </label>

      <label>
        ImdbUrl
        : &nbsp;
        <input
          type="text"
          className="input"
          placeholder="Enter the url imdb-image"
          value={imdbUrl}
          onChange={(event) => setImdbUrl(event.target.value)}
        />
      </label>

      <label>
        ImdbId
        : &nbsp;
        <input
          type="text"
          className="input"
          placeholder="Enter movie id"
          value={imdbId}
          onChange={(event) => setImdbId(event.target.value)}
        />
      </label>

      <button
        type="submit"
        className="btn-submit"
      >
        Enter the movie
      </button>
    </form>
  );
};
