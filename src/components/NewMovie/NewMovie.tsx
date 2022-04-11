import { useState, memo, FormEvent } from 'react';
import './NewMovie.scss';

interface Props {
  onAdd: (movie: Movie) => void,
}

export const NewMovie: React.FC<Props> = memo(({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    resetForm();
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="title"
        className="form__field"
        placeholder="Title"
        value={title}
        onChange={(event) => (
          setTitle(event.target.value)
        )}
      />

      <input
        type="text"
        id="description"
        className="form__field"
        placeholder="Description"
        value={description}
        onChange={(event) => (
          setDescription(event.target.value)
        )}
      />

      <input
        type="text"
        id="imgUrl"
        className="form__field"
        placeholder="ImgUrl"
        value={imgUrl}
        onChange={(event => (
          setImgUrl(event.target.value)
        ))}
      />
      <input
        type="text"
        id="imdbUrl"
        className="form__field"
        placeholder="ImdbUrl"
        value={imdbUrl}
        onChange={(event => (
          setImdbUrl(event.target.value)
        ))}
      />
      <input
        type="text"
        id="imdbId"
        className="form__field"
        placeholder="ImdbId"
        value={imdbId}
        onChange={(event => (
          setImdbId(event.target.value)
        ))}
      />

      <button
        type="submit"
        className="form__submit"
      >
        Add
      </button>
    </form>
  );
});
