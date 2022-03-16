import React, { useState } from 'react';

type NewMovieProps = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<NewMovieProps> = ({
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const resetInputs = () => {
    setTitle('');
    setDescription('');
    setImdbId('');
    setImdbUrl('');
    setImgUrl('');
  };

  const onSubmitForm = (check: string[]) => {
    if (check.every(el => el)) {
      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      resetInputs();
    }
  };

  return (
    <form
      className="sidebar__form"
      onSubmit={(event) => {
        event.preventDefault();

        const check: string[] = [title, imdbId, imgUrl, imdbUrl];

        onSubmitForm(check);
      }}
    >
      Put the form here
      <input
        id="title"
        type="text"
        value={title}
        placeholder="title"
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <input
        id="description"
        type="text"
        value={description}
        placeholder="description"
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <input
        id="imgUrl"
        type="text"
        value={imgUrl}
        placeholder="imgUrl"
        onChange={(event) => {
          setImgUrl(event.target.value);
        }}
      />
      <input
        id="imdbUrl"
        type="text"
        value={imdbUrl}
        placeholder="imdbUrl"
        onChange={(event) => {
          setImdbUrl(event.target.value);
        }}
      />
      <input
        id="imdbId"
        type="text"
        value={imdbId}
        placeholder="imdbId"
        onChange={(event) => {
          setImdbId(event.target.value);
        }}
      />

      <button type="submit">
        submit
      </button>
    </form>
  );
};
