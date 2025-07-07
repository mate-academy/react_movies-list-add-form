import { useState } from 'react';
import { TextField } from '../TextField';

export const NewMovie = () => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  function handleInputContent (content: string, state: string = ''): void {
    switch (state) {
      case 'title':
        setTitle(content);
        break;
      case 'description':
        setDescription(content);
        break;
      case 'imgUrl':
        setImgUrl(content);
        break;
      case 'imdbUrl':
        setImdbUrl(content);
        break;
      case 'imdbId':
        setImdbId(content);
        break;
    }
  }

  function handleButtonClick (event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (title && description && imgUrl && imdbUrl && imdbId) {
      handleInputContent('', 'title');
      handleInputContent('', 'description');
      handleInputContent('', 'imgUrl');
      handleInputContent('', 'imdbUrl');
      handleInputContent('', 'imdbId');
      setCount(count + 1);
    } else {

    }
  }

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        value={title}
        label="Title"
        required
        onChange={handleInputContent}
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
      />

      <TextField
        name="imdbUrl"
        value={imdbUrl}
        label="Imdb URL"
        required
        onChange={handleInputContent}
      />

      <TextField
        name="imdbId"
        value={imdbId}
        label="Imdb ID"
        required
        onChange={handleInputContent}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={(event) => handleButtonClick(event)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
