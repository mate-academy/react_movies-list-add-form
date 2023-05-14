import { useState, FormEvent } from 'react';
import { TextField } from '../TextField';

interface Props {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  isDisabled: boolean,
  touchedName: boolean,
  touchedImgUrl: boolean,
  touchedImdbUrl: boolean,
  touchedImdbId: boolean,
  setTitle: (newValue: string) => void,
  setDescription: (newValue: string) => void,
  setImgUrl: (newValue: string) => void,
  setImdbUrl: (newValue: string) => void,
  setimdbId: (newValue: string) => void,
  addOn: () => void,
  setIsDisabled: (newValue: boolean) => void,
  setTouchedName: (newValue: boolean) => void,
  setTouchedImgUrl: (newValue: boolean) => void,
  setTouchedImdbUrl: (newValue: boolean) => void,
  setTouchedImdbId: (newValue: boolean) => void,
}

export const NewMovie: React.FC<Props> = ({
  title,
  description,
  imgUrl,
  imdbUrl,
  imdbId,
  isDisabled,
  touchedName,
  touchedImgUrl,
  touchedImdbUrl,
  touchedImdbId,
  setTouchedImgUrl,
  setTouchedImdbUrl,
  setTouchedImdbId,
  setTouchedName,
  setIsDisabled,
  setTitle,
  setDescription,
  setImgUrl,
  setImdbUrl,
  setimdbId,
  addOn,
}) => {
  const [count] = useState(0);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      {}

      <TextField
        name="title"
        label="title"
        value={title}
        required
        setTitle={setTitle}
        setDescription={setDescription}
        setImgUrl={setImgUrl}
        setImdbUrl={setImdbUrl}
        setimdbId={setimdbId}
        setIsDisabled={setIsDisabled}
        setTouchedName={setTouchedName}
        setTouchedImgUrl={setTouchedImgUrl}
        setTouchedImdbId={setTouchedImdbId}
        setTouchedImdbUrl={setTouchedImdbUrl}
        touchedName={touchedName}
        touchedImgUrl={touchedImgUrl}
        touchedImdbUrl={touchedImdbUrl}
        touchedImdbId={touchedImdbId}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        setDescription={setDescription}
        setTitle={setTitle}
        setImgUrl={setImgUrl}
        setImdbUrl={setImdbUrl}
        setimdbId={setimdbId}
        setIsDisabled={setIsDisabled}
        setTouchedName={setTouchedName}
        setTouchedImgUrl={setTouchedImgUrl}
        setTouchedImdbUrl={setTouchedImdbUrl}
        setTouchedImdbId={setTouchedImdbId}
        touchedName={touchedName}
        touchedImgUrl={touchedImgUrl}
        touchedImdbUrl={touchedImdbUrl}
        touchedImdbId={touchedImdbId}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        setImgUrl={setImgUrl}
        setTitle={setTitle}
        setDescription={setDescription}
        setImdbUrl={setImdbUrl}
        setimdbId={setimdbId}
        setIsDisabled={setIsDisabled}
        setTouchedName={setTouchedName}
        setTouchedImgUrl={setTouchedImgUrl}
        setTouchedImdbUrl={setTouchedImdbUrl}
        setTouchedImdbId={setTouchedImdbId}
        touchedName={touchedName}
        touchedImgUrl={touchedImgUrl}
        touchedImdbUrl={touchedImdbUrl}
        touchedImdbId={touchedImdbId}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        setImdbUrl={setImdbUrl}
        setTitle={setTitle}
        setDescription={setDescription}
        setImgUrl={setImgUrl}
        setimdbId={setimdbId}
        setIsDisabled={setIsDisabled}
        setTouchedName={setTouchedName}
        setTouchedImgUrl={setTouchedImgUrl}
        setTouchedImdbId={setTouchedImdbId}
        setTouchedImdbUrl={setTouchedImdbUrl}
        touchedName={touchedName}
        touchedImgUrl={touchedImgUrl}
        touchedImdbUrl={touchedImdbUrl}
        touchedImdbId={touchedImdbId}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        setimdbId={setimdbId}
        required
        setTitle={setTitle}
        setDescription={setDescription}
        setImgUrl={setImgUrl}
        setImdbUrl={setImdbUrl}
        setIsDisabled={setIsDisabled}
        setTouchedName={setTouchedName}
        setTouchedImgUrl={setTouchedImgUrl}
        setTouchedImdbUrl={setTouchedImdbUrl}
        setTouchedImdbId={setTouchedImdbId}
        touchedName={touchedName}
        touchedImgUrl={touchedImgUrl}
        touchedImdbUrl={touchedImdbUrl}
        touchedImdbId={touchedImdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={isDisabled}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={() => addOn()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
