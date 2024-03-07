import React, { useState, useEffect } from "react";
import "./styles.css";
import { useFetchInstance } from "../hooks/useFetchInstance";
import { searchData } from "../State/SearchSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  AutoCompleteSearchDataProps,
  SuggestionListItemProps,
  AuthorDataProps,
} from "../types";

const ExperiencedComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<AutoCompleteSearchDataProps[]>(
    []
  );
  const [selectedItem, setSelectedItem] = useState<SuggestionListItemProps>({});
  const [isDisabled, setIsDisabled] = useState(true);

  const [cardItem, setCardItem] = useState<SuggestionListItemProps[]>([]);
  const { data, FetchApi } = useFetchInstance();
  const dispatch = useDispatch();
  const { payload } = useSelector((state) => state.search);

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

    const sortedResults = filteredSuggestions.sort((a, b) => {
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

  const handleSuggestionSelect = (id: string, summary: string): void => {
    const book_title = summary.split(":")[0];
    const book_Summary = summary.split(":")[1];

    const boook_author = payload.authors.filter(
      (item: AuthorDataProps) => item.book_id === id
    )[0].author;

    setSelectedItem({
      book_title: book_title,
      book_summary: book_Summary,
      book_author: boook_author,
    });
  };

  const handleButtonClick = (): void => {
    const { book_author, book_summary, book_title } = selectedItem;
    setCardItem((prevItems) => [
      ...prevItems,
      {
        book_title: book_title,
        book_summary: book_summary,
        book_author: book_author,
      },
    ]);
    setSuggestions([]);
    setSelectedItem({});
  };
 
  return (
    <div className="experienced-component">
      <div className="grid-container">
        {cardItem?.map((item: SuggestionListItemProps, index: number) => {
          return (
            <>
              <div className="card" key={index}>
                {item.book_title}
                <div>{item.book_summary}</div>
                <div>{item.book_author}</div>
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
        disabled={Object.keys(selectedItem).length === 0}
      >
        Submit
      </button>
    </div>
  );
};

export default ExperiencedComponent;
