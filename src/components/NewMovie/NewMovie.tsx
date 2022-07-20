import { useState } from 'react';

type Props = {
  addMovie: (movie: Movie) => void;
};

export const NewMovie: React.FC <Props> = ({ addMovie }) => {
  const [title, setTitile] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const newMovie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  return (
    <form
      className="NewMovie"
      onSubmit={(event) => {
        event.preventDefault();
        addMovie(newMovie);
        setTitile('');
        setDescription('');
        setImgUrl('');
        setImdbUrl('');
        setImdbId('');
      }}
    >
      <div className="column">
        <p className="subtitle is-5">Title:</p>
        <input
          type="text"
          data-cy="form-title"
          className="input is-info"
          placeholder="Enter the film name"
          value={title}
          onChange={(event) => setTitile(event.target.value)}
          required
        />
      </div>

      <div className="column">
        <p className="subtitle is-5">Description:</p>
        <textarea
          data-cy="form-description"
          placeholder="Enter the description"
          className="textarea is-info"
          value={description}
          rows={6}
          cols={30}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </div>

      <div className="column">
        <p className="subtitle is-5">Image link:</p>
        <input
          type="text"
          data-cy="form-imgUrl"
          className="input is-link"
          placeholder="https://m.media-amazon.com/images/M/... .jpg"
          value={imgUrl}
          onChange={(event) => setImgUrl(event.target.value)}
          required
        />
      </div>

      <div className="column">
        <p className="subtitle is-5">IMDB link:</p>
        <input
          type="text"
          data-cy="form-imdbUrl"
          className="input is-link"
          placeholder="https://www.imdb.com/title/..."
          value={imdbUrl}
          onChange={(event) => setImdbUrl(event.target.value)}
          required
        />
      </div>

      <div className="column">
        <p className="subtitle is-5">IMDB ID:</p>
        <input
          type="text"
          data-cy="form-imdbUrl"
          className="input is-info"
          placeholder="tt0000000"
          value={imdbId}
          onChange={(event) => setImdbId(event.target.value)}
          required
        />
      </div>

      <div className="column">
        <button
          type="submit"
          data-cy="form-submit-button"
          className="button is-success "
        >
          Add moviie
        </button>
      </div>
    </form>
  );
};
