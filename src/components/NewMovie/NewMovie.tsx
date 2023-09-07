import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [linkImdbValidity, setLinkImdbValidity] = useState(false);
  const [linkImgValidity, setLinkImgValidity] = useState(false);
  const requiredCompleted
  = title && imgUrl && imdbUrl && imdbId && linkImdbValidity && linkImgValidity;

  const pattern = new RegExp(
    '^((([A-Za-z]{3,9}:(?://)?)|(?:www\\.|[-;:&=+$,\\w]+@))[A-Za-z0-9.-]+'
    + '((?:\\/[+~%\\/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?('
    + '?:[,.!/\\\\\\w]*))?)$',
  );

  const validationOfImgLink = (inputText: string) => {
    setLinkImgValidity(pattern.test(inputText));
  };

  const validationOfImdbLink = (inputText: string) => {
    setLinkImdbValidity(pattern.test(inputText));
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setLinkImdbValidity(false);
    setLinkImgValidity(false);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (!requiredCompleted) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    reset();
    setCount(count + 1);
  };

  const handleTitleChange
    = (inputText: string) => {
      setTitle(inputText);
    };

  const handleDescriptionChange
    = (inputText: string) => {
      setDescription(inputText);
    };

  const handleImgUrlChange
    = (inputText: string) => {
      setImgUrl(inputText);
      validationOfImgLink(inputText);
    };

  const handleImdbUrlChange
    = (inputText: string) => {
      setImdbUrl(inputText);
      validationOfImdbLink(inputText);
    };

  const handleImdbIdChange
    = (inputText: string) => {
      setImdbId(inputText);
    };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleAdd}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        linkValidity={linkImgValidity}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        linkValidity={linkImdbValidity}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!requiredCompleted}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
