import React, { useState } from 'react';

type Props = {
  onAdd: (movie: Movie) => void,
  movies: Movie[],
};

export const NewMovie: React.FC<Props> = ({ onAdd, movies }) => {
  const [description, setdescription] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setimdbId] = useState('');
  const [title, settitle] = useState('');
  const [hastitleError, settitleError] = useState(false);
  const [hasdescriptionError, setdescriptionError] = useState(false);
  const [hasimdbUrlError, setimdbUrlError] = useState(false);
  const [hasimdbIdError, setimdbIdError] = useState(false);
  const [hasimgUrlError, setimgUrlError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    settitleError(!title);
    setdescriptionError(!description);
    setimgUrlError(!imgUrl);
    setimdbIdError(!imdbId);
    setimdbUrlError(!imdbUrl);

    if (!movies) {
      throw new Error("You got nothing to watch from storage");
      ////make a variable to show!!!!!!!!!!!!!!!!!!!!!!!!!!
    }

    if (!title || !description || !imgUrl || !imdbId || !imdbUrl) {
      return;
    }

    onAdd({
      title, description, imgUrl, imdbUrl, imdbId,
    });

    settitle('');
    setdescription('');
    setimgUrl('');
    setimdbUrl('');
    setimdbId('');
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <div>
        <label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={event => {
              settitle(event.target.value);
              settitleError(false);
            }}
          />
          {hastitleError && (<p>enter title!!</p>)}
          Title
        </label>
      </div>

      <div>
        <label>
          <input
            type="text"
            name="imgUrl"
            value={imgUrl}
            onChange={event => {
              setimgUrl(event.target.value);
              setimgUrlError(false);
            }}
          />
          imgUrl
        </label>
      </div>
      {hasimgUrlError && (<p>img needed</p>)}
      <div>
        <label>
          <input
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            onChange={event => {
              setimdbUrl(event.target.value);
              setimdbUrlError(false);
            }}
          />
          imdbUrl
        </label>
      </div>
      {hasimdbUrlError && (<p>imdb yok</p>)}
      <div>
        <label>
          <input
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={event => {
              setimdbId(event.target.value);
              setimdbIdError(false);
            }}
          />
          ID MOVIE
        </label>
      </div>
      {hasimdbIdError && (<p>id id id</p>)}
      <div>
        <textarea
          name="description"
          value={description}
          onChange={event => {
            setdescription(event.target.value);
            setdescriptionError(false);
          }}
        >
          Description
        </textarea>
      </div>
      {hasdescriptionError && (<p>where is descr</p>)}
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};
