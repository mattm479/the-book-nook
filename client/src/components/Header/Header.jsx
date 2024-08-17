import './style.css';
import SearchBar from '../SearchBar/searchBar';

function Header() {
  return (
    <header className="header">
    <div className="header-logo"></div>
    <div className="header-search">
      <SearchBar />
      </div>
  </header>
  );
}

export default Header;
