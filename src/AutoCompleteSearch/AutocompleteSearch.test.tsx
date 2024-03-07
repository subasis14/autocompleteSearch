
import { render, fireEvent } from "@testing-library/react";
import AutoCompleteSearch from "./AutocompleteSearch";
import '@testing-library/jest-dom'

describe("AutoCompleteSearch component", () => {
  test("renders search input", () => {
    const { getByPlaceholderText } = render(<AutoCompleteSearch />);
    const searchInput = getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();
  });

  test("displays suggestions on search", async () => {
    const { getByPlaceholderText, findByText } = render(<AutoCompleteSearch />);
    const searchInput = getByPlaceholderText("Search...");

    fireEvent.change(searchInput, { target: { value: "example" } });

    const suggestion = await findByText("Example suggestion");
    expect(suggestion).toBeInTheDocument();
  });
});
