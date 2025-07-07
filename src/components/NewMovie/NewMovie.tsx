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
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasImgUrlError, setHasImgUrlError] = useState(false);
  const [hasImdbUrlError, setHasImdbUrlError] = useState(false);
  const [hasImdbIdError, setHasImdbIdError] = useState(false);

  function handleInputContent(content: string, state: string = ''): void {
    switch (state) {
      case 'title':
        setTitle(content);
        setHasTitleError(false);
        break;
      case 'description':
        setDescription(content);
        break;
      case 'imgUrl':
        setImgUrl(content);
        setHasImgUrlError(false);
        break;
      case 'imdbUrl':
        setImdbUrl(content);
        setHasImdbUrlError(false);
        break;
      case 'imdbId':
        setImdbId(content);
        setHasImdbIdError(false);
        break;
    }
  }

  function handleButtonClick(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    setHasTitleError(!title);
    setHasImgUrlError(!imgUrl);
    setHasImdbUrlError(!imdbUrl);
    setHasImdbIdError(!imdbId);

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    onAdd({
      title: title,
      description: description,
      imgUrl: imgUrl,
      imdbUrl: imdbUrl,
      imdbId: imdbId,
    });

    setCount(count + 1);

    handleInputContent('', 'title');
    handleInputContent('', 'description');
    handleInputContent('', 'imgUrl');
    handleInputContent('', 'imdbUrl');
    handleInputContent('', 'imdbId');
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => handleButtonClick(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        value={title}
        label="Title"
        required
        onChange={handleInputContent}
        error={hasTitleError}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleInputContent}
      />

      <TextField
        name="imgUrl"
        value={imgUrl}
        label="Image URL"
        required
        onChange={handleInputContent}
        error={hasImgUrlError}
      />

      <TextField
        name="imdbUrl"
        value={imdbUrl}
        label="Imdb URL"
        required
        onChange={handleInputContent}
        error={hasImdbUrlError}
      />

      <TextField
        name="imdbId"
        value={imdbId}
        label="Imdb ID"
        required
        onChange={handleInputContent}
        error={hasImdbIdError}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={
              hasTitleError ||
              hasImgUrlError ||
              hasImdbUrlError ||
              hasImdbIdError ||
              !title ||
              !imgUrl ||
              !imdbUrl ||
              !imdbId
            }
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
