import './Header.scss';

interface Props {
  changeTheme: () => void;
  theme: string;
}

export const Header: React.FC<Props> = ({ changeTheme, theme }) => {
  return (
    <header className={`header header--${theme}`}>
      <span className={`logo logo--${theme}`}>MoviesHub</span>
      <button
        className={`change-theme-btn change-theme-btn--${theme}`}
        type="button"
        onClick={changeTheme}
      >
        THEME
      </button>
    </header>
  );
};
