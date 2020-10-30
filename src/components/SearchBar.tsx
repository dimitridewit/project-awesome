import React, {
  FunctionComponent,
  useState,
  FormEvent,
  useEffect
} from "react";
import UseDebounce from "../hooks/UseDebounce";

type searchResult = {
  value: string;
  id: string;
};

const search = (query: string): Promise<searchResult[]> => {
  return new Promise<searchResult[]>(resolve => {
    setTimeout(() => {
      resolve([
        { value: "bananas", id: "123" },
        { value: "Darth Vader", id: "4546" },
        { value: "Guitars", id: "546745" },
        { value: "Gibson", id: "123367" }
      ]);
    }, 1000);
  });
};

const SearchBar: FunctionComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedQuery = UseDebounce(query, 500);

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log("GO SEARCH!");
  };

  useEffect(() => {
    if (debouncedQuery) {
      setIsSearching(true);

      search(debouncedQuery).then(results => {
        setIsSearching(false);
        // setResults(results) // fails on some typescript error
        console.log(results);
      });
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  return (
    <div className="SearchBar">
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          onChange={e => setQuery(e.currentTarget.value)}
          value={query}
        />
        <button type="submit">Search!</button>
      </form>
      {isSearching && <span>Searching...</span>}
      <div className="results"></div>
    </div>
  );
};

export default SearchBar;
