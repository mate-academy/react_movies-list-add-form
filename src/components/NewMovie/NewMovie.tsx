import React, { FormEvent, useState } from 'react';
import { TextField } from '../TextField';

type Props = {
  onAdd: CallableFunction;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imbdUrl, setImbdUrl] = useState('');
  const [imbdId, setImbdId] = useState('');

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImbdUrl('');
    setImbdId('');
  };

  const handlerOnSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imbdUrl,
      imbdId,
    };

    setCount(prevCount => (
      prevCount + 1
    ));
    onAdd(newMovie);
    clearForm();
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newTitle) => {
          setTitle(newTitle);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newDescription) => {
          setDescription(newDescription);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newImgUrl) => {
          setImgUrl(newImgUrl);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imbdUrl}
        onChange={(newImbdUrl) => {
          setImbdUrl(newImbdUrl);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imbdId}
        onChange={(NewImbdId) => {
          setImbdId(NewImbdId);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handlerOnSubmit}
            disabled={!(title && imbdId && imbdUrl && imgUrl).trim()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
