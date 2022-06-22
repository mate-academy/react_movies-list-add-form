import { FC, useState } from 'react';

type Props = {
  addMovie: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && description && imgUrl && imdbUrl && imdbId) {
      addMovie(movie);
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
    >
      <div>
        <div>
          <input
            type="text"
            value={title}
            placeholder="Put Title here"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>

        <div>
          <textarea
            value={description}
            placeholder="Write Description "
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>

        <div>
          <input
            type="text"
            value={imgUrl}
            placeholder="Image url"
            onChange={(event) => {
              setImgUrl(event.target.value);
            }}
          />
        </div>

        <div>
          <input
            type="text"
            value={imdbUrl}
            placeholder="Imdb url"
            onChange={(event) => {
              setImdbUrl(event.target.value);
            }}
          />
        </div>

        <div>
          <input
            type="text"
            value={imdbId}
            placeholder="Imdb Id"
            onChange={(event) => {
              setImdbId(event.target.value);
            }}
          />
        </div>

        <button
          type="submit"
        >
          Submit
        </button>
      </div>

    </form>
  );
};
