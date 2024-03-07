
import { render, fireEvent } from "@testing-library/react";
import AutoCompleteSearch from "./AutocompleteSearch";
import '@testing-library/jest-dom'

describe("AutoCompleteSearch component", () => {
  test("renders search input", () => {
    const { getByPlaceholderText } = render(<AutoCompleteSearch />);
    const searchInput = getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();
  });

  // test("updates search term on input change", () => {
  //   const { getByPlaceholderText } = render(<AutoCompleteSearch />);
  //   const searchInput = getByPlaceholderText("Search...");

  //   fireEvent.change(searchInput, { target: { value: "test" } });

  //   expect(searchInput?.value).toBe("test");
  // });

  // Add more tests for other UI elements and interactions
  
  test("displays suggestions on search", async () => {
    const { getByPlaceholderText, findByText } = render(<AutoCompleteSearch />);
    const searchInput = getByPlaceholderText("Search...");

    fireEvent.change(searchInput, { target: { value: "example" } });

    const suggestion = await findByText("Example suggestion");
    expect(suggestion).toBeInTheDocument();
  });

  // Add more tests for selecting suggestion, submitting, etc.
});
