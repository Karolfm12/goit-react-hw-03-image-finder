const Header = props => {
  const { handleSubmit, handleOnChange } = props;
  return (
    <>
      <header className="searchbar">
        <form className="form" onSubmit={handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            onChange={handleOnChange}
          />
        </form>
      </header>
    </>
  );
};

export default Header;
