import React, { useState } from 'react';

interface Props {
  onAddMovie: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = React.memo(({
  onAddMovie,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbIdb, setImdbIdb] = useState('');
  const [urlImdbTrueVal, setUrlImdbVal] = useState(false);
  const [urlImgTrueVal, setUrlImgVal] = useState(false);

  const urlValidation = (url: string) => {
    const regex = new RegExp(
      '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?',
    );

    return regex.test(url);
  };

  const changeUrlImdb = (value: string) => {
    const isTrueVal = !value || urlValidation(value);

    if (!isTrueVal) {
      return;
    }

    setImdbUrl(value);
    setUrlImdbVal(isTrueVal);
  };

  const changeUrlImg = (value: string) => {
    const isTrueVal = !value || urlValidation(value);

    if (!isTrueVal) {
      return;
    }

    setImgUrl(value);
    setUrlImgVal(isTrueVal);
  };

  const addNewMovie = () => {
    onAddMovie({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId: imdbIdb,
    });
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbIdb('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addNewMovie();

    resetForm();
  };

  return (
    <>
      <h2>
        Add new movie
      </h2>
      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={event => setTitle(event.target.value)}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        <input
          type="text"
          name="Image Url"
          placeholder="imgUrl"
          value={imgUrl}
          onChange={event => changeUrlImg(event.target.value)}
          required
        />
        {!urlImgTrueVal && (
          <div
            style={{
              color: 'red',
            }}
          >
            Url is not valid
          </div>
        )}
        <input
          type="text"
          name="Imdb Url"
          placeholder="imdbUrl"
          value={imdbUrl}
          onChange={event => changeUrlImdb(event.target.value)}
          required
        />
        {!urlImdbTrueVal && (
          <div
            style={{
              color: 'red',
            }}
          >
            Url is not valid
          </div>
        )}
        <input
          type="text"
          name="Imdb Id"
          placeholder="imdbId"
          value={imdbIdb}
          onChange={event => setImdbIdb(event.target.value)}
          required
        />
        <button
          type="submit"
          style={{
            display: 'block',
          }}
        >
          Add
        </button>
      </form>
    </>
  );
});
