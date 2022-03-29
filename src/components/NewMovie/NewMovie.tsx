import { FC, useState } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

const NewMovie: FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const handleOnBlur = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    const setters: { [key: string]: React.Dispatch<React.SetStateAction<string>> } = {
      title: setTitle,
      description: setDescription,
      imdbId: setImdbId,
      imdbUrl: setImdbUrl,
      imgUrl: setImgUrl,
    };

    if (Object.prototype.hasOwnProperty.call(setters, name)) {
      setters[name](value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title" className="form__label">
          Title
          <input
            onBlur={handleOnBlur}
            name="title"
            id="title"
            type="text"
            className="input input--outline"
            placeholder="title"
          />
        </label>

        <label htmlFor="description" className="form__label">
          Description
          <textarea
            onBlur={handleOnBlur}
            name="description"
            id="description"
            className="input input--outline input--textarea"
            placeholder="description"
          />
        </label>

        <label htmlFor="imgUrl" className="form__label">
          ImgUrl
          <input
            onBlur={handleOnBlur}
            name="imgUrl"
            id="imgUrl"
            type="text"
            className="input input--outline"
            placeholder="imgUrl"
          />
        </label>

        <label htmlFor="imdbUrl" className="form__label">
          ImdbUrl
          <input
            onBlur={handleOnBlur}
            name="imdbUrl"
            id="imdbUrl"
            type="text"
            className="input input--outline"
            placeholder="imdbUrl"
          />
        </label>

        <label htmlFor="imdbId" className="form__label">
          ImdbId
          <input
            onBlur={handleOnBlur}
            name="imdbId"
            id="imdbId"
            type="text"
            className="input input--outline"
            placeholder="imdbId"
          />
        </label>
      </div>

      <button
        type="submit"
        className="button button--size--full"
      >
        Add
      </button>
    </form>
  );
};

export { NewMovie };
