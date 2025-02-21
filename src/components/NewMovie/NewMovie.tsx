import React, { useState } from 'react';
import { TextField } from '../TextField';

// Тип для Movie
interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

const pattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie = ({ onAdd }: { onAdd: (newMovie: Movie) => void }) => {
  // Состояния для полей формы
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  // Объект ошибок
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Функция для валидации URL
  const validateUrl = (url: string) => pattern.test(url);

  // Функция обработки потери фокуса (onBlur)
  const handleBlur = (field: string) => {
    switch (field) {
      case 'imgUrl':
        if (!validateUrl(imgUrl)) {
          setErrors(prevErrors => ({
            ...prevErrors,
            imgUrlError: 'Неверный URL изображения',
          }));
        } else {
          setErrors(prevErrors => {
            const { imgUrlError, ...rest } = prevErrors;

            return rest;
          });
        }

        break;
      case 'imdbUrl':
        if (!validateUrl(imdbUrl)) {
          setErrors(prevErrors => ({
            ...prevErrors,
            imdbUrlError: 'Неверный URL IMDb',
          }));
        } else {
          setErrors(prevErrors => {
            const { imdbUrlError, ...rest } = prevErrors;

            return rest;
          });
        }

        break;
      case 'imdbId':
        if (!imdbId) {
          setErrors(prevErrors => ({
            ...prevErrors,
            imdbIdError: 'Необходимо указать IMDb ID',
          }));
        } else {
          setErrors(prevErrors => {
            const { imdbIdError, ...rest } = prevErrors;

            return rest;
          });
        }

        break;
      default:
        break;
    }
  };

  // Функция для проверки, валидна ли форма
  const isFormValid =
    title.trim() &&
    imgUrl.trim() &&
    imdbUrl.trim() &&
    imdbId.trim() &&
    Object.keys(errors).length === 0;

  // Функция для отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Проверка валидности формы
    if (isFormValid) {
      const newMovie: Movie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      // Передаем новый фильм в родительский компонент
      onAdd(newMovie);

      // Очищаем поля формы после добавления фильма
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
      setErrors({});
    }
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Добавить фильм</h2>

      <TextField
        name="title"
        label="Название"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onBlur={() => handleBlur('title')}
        required
        error={errors.title}
      />

      <TextField
        name="description"
        label="Описание"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <TextField
        name="imgUrl"
        label="URL изображения"
        value={imgUrl}
        onChange={e => setImgUrl(e.target.value)}
        onBlur={() => handleBlur('imgUrl')}
        required
        error={errors.imgUrlError}
      />

      <TextField
        name="imdbUrl"
        label="URL IMDb"
        value={imdbUrl}
        onChange={e => setImdbUrl(e.target.value)}
        onBlur={() => handleBlur('imdbUrl')}
        required
        error={errors.imdbUrlError}
      />

      <TextField
        name="imdbId"
        label="IMDb ID"
        value={imdbId}
        onChange={e => setImdbId(e.target.value)}
        onBlur={() => handleBlur('imdbId')}
        required
        error={errors.imdbIdError}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className="button is-link"
            disabled={!isFormValid}
          >
            Добавить
          </button>
        </div>
      </div>
    </form>
  );
};
