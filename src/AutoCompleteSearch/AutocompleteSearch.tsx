import React, { useState } from 'react';
import './styles.css'
const ExperiencedComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
console.log(selectedItem)
  // Function to fetch suggestions based on the search term
  const fetchSuggestions = async (searchTerm: string): Promise<void> => {
    // Implement your fetching logic here (e.g., fetching from an API)
    // For demonstration purposes, this function returns a hardcoded array
    const mockSuggestions: string[] = ['JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'Redux'];

    // Simulate an asynchronous delay (e.g., API request)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Filter suggestions based on the search term
    const filteredSuggestions: string[] = mockSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  // Function to handle search term change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setSearchTerm(value);
    fetchSuggestions(value);
  };

  // Function to handle suggestion selection
  const handleSuggestionSelect = (suggestion: string): void => {
    setSelectedItem(suggestion);
    setSearchTerm('');
    setSuggestions([]);
  };

  // Function to handle button click
  const handleButtonClick = (): void => {
    // Implement button click logic here
    console.log('Button clicked!');
  };

  return (
    <div className="experienced-component">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul className="suggestions-list">
        {suggestions.map((suggestion: string, index: number) => (
          <li key={index} onClick={() => handleSuggestionSelect(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
      <button className="action-button" onClick={handleButtonClick}>
        Action
      </button>
    </div>
  );
};

export default ExperiencedComponent;
