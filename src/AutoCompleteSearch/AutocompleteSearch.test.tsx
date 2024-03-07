import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AutoCompleteSearch from "./AutocompleteSearch";

describe("AutoCompleteSearch", () => {
  it("renders without crashing", () => {
    render(<AutoCompleteSearch />);
  });

  it("displays search suggestions on typing", async () => {
    const { getByPlaceholderText, getByText } = render(<AutoCompleteSearch />);
    const searchInput = getByPlaceholderText("Search...");

    fireEvent.change(searchInput, { target: { value: "history" } });


    expect(getByText("The Book in Three Sentences")).toBeInTheDocument();
  });

  it("adds selected item to the card list on button click", () => {
    const { getByPlaceholderText, getByText } = render(<AutoCompleteSearch />);
    const searchInput = getByPlaceholderText("Search...");

    fireEvent.change(searchInput, { target: { value: "history" } });

    const suggestion = getByText("The Book in Three Sentences"); 
    fireEvent.click(suggestion);

    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

 
    expect(getByText("The Book in Three Sentences")).toBeInTheDocument();
  });
});
