import './style.css';

function Header() {
  return (
    <header className="header">
    <div className="header-logo"></div>
    <div className="header-search">
        <input
          type="text"
          placeholder="Search for books..."
          className="search-input"
        />
        <button className="search-button">
          Search
        </button>
      </div>
  </header>
  );
}

export default Header;
