const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search Products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;