import React from 'react';
import { TextareaShape } from './TextareaShape';

export const Textarea = ({ value, handleChange }) => (
  <p>
    <label>
      <textarea
        className="App__textarea"
        placeholder="write description here"
        name="description"
        type="text"
        value={value}
        onChange={handleChange}
      />
    </label>
  </p>
);

Textarea.propTypes = TextareaShape;
