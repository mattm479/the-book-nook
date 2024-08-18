import './style.css';
import SearchBar from '../SearchBar/searchBar';

function Header() {
  return (
    <header className="header">
    <div style={{ margin: "0px auto" }}>
      <SearchBar />
      </div>
  </header>
  );
}

export default Header;
