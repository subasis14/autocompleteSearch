import React, { useState, useEffect } from "react";
import "./styles.css";
import { useFetchInstance } from "../hooks/useFetchInstance";
import { searchData } from "../State/SearchSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  AutoCompleteSearchDataProps,
  cardListItemProps,
  AuthorDataProps,
  RootState
} from "../types";

const AutoCompleteSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<AutoCompleteSearchDataProps[]>(
    []
  );
  const [selectedItem, setSelectedItem] = useState<cardListItemProps | null>(
    null
  );
  const [cardItem, setCardItem] = useState<cardListItemProps[]>([]);
  const { data, FetchApi } = useFetchInstance();
  const dispatch = useDispatch();
  const { payload } = useSelector((state:RootState) => state.search);

  const fetchSearchData = () => {
    FetchApi("http://localhost:3001/fetchData");
  };

  useEffect(() => {
    fetchSearchData();
  }, []);

  useEffect(() => {
    if (data) dispatch(searchData(data));
  }, [data]);

  const fetchSuggestions = (searchTerm: string) => {
    const mockSuggestions: AutoCompleteSearchDataProps[] = payload?.summaries;

    const filteredSuggestions: AutoCompleteSearchDataProps[] =
      mockSuggestions.filter((suggestion) =>
        suggestion?.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const uniqueSuggestions = filteredSuggestions.filter(suggestion => !cardItem?.some(item => item.id === suggestion.id));

    const sortedResults = uniqueSuggestions.sort((a, b) => {
      const indexA = a.summary.indexOf(searchTerm);
      const indexB = b.summary.indexOf(searchTerm);
      return indexB - indexA;
    });
    setSuggestions(sortedResults);
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target;

    if (value.trim()) {
      setSearchTerm(value);
      fetchSuggestions(value);
    } else {
      setSearchTerm("");
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (id: number, summary: string): void => {
    const book_title = summary.split(":")[0];
    const book_Summary = summary.split(":")[1];

    const boook_author = payload.authors.filter(
      (item: AuthorDataProps) => item.book_id === id
    )[0].author;

    setSelectedItem({
      id: id,
      book_title: book_title,
      book_summary: book_Summary,
      book_author: boook_author,
    });
  };

  const handleButtonClick = (): void => {
    if (selectedItem) {
      const { id, book_author, book_summary, book_title } = selectedItem;
      setCardItem((prevItems) => [
        ...prevItems,
        {
          id: id,
          book_title: book_title,
          book_summary: book_summary,
          book_author: book_author,
        },
      ]);
      setSuggestions([]);
      setSelectedItem(null);
    }
  };

  return (
    <div className="experienced-component">
      <div className="grid-container">
        {cardItem?.map((item: cardListItemProps, index: number) => {
          return (
            <>
              <div className="card" key={index}>
              <div style={{padding:'10px'}}><strong>{item.book_title}</strong></div>
                <div>{item.book_summary}</div>
                <div style={{padding:'10px'}}><strong>{item.book_author}</strong></div>
              </div>
            </>
          );
        })}
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul className="suggestions-list">
        {suggestions.map(
          (suggestion: AutoCompleteSearchDataProps, index: number) => (
            <li
              key={index}
              onClick={() =>
                handleSuggestionSelect(suggestion.id, suggestion.summary)
              }
            >
              {suggestion.summary}
            </li>
          )
        )}
      </ul>
      <button
        className="action-button"
        onClick={handleButtonClick}
        disabled={selectedItem ? Object.keys(selectedItem).length === 0 : true}
      >
        Submit
      </button>
    </div>
  );
};

export default AutoCompleteSearch;
