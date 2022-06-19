import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (arg0: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialState: any = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [form, setForm] = useState({ ...initialState });

  const handleSubmit = () => {
    onAdd(form);
    setForm(initialState);
  };

  return (
    <>
      <h1>New Movie Form</h1>
      {Object.keys(initialState).map(key => (
        <input
          className="input"
          type="text"
          name={key}
          placeholder={`Movie ${key}`}
          value={form[key]}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e) => setForm((pre: any) => (
            { ...pre, [key]: e.target.value }))}
        />
      ))}
      <div>
        <button
          type="button"
          onClick={handleSubmit}
        >
          Add new Movie
        </button>
      </div>
    </>
  );
};
