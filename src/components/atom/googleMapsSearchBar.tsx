import React, { useState, useRef, useEffect } from 'react';
import { useLoadScript, Libraries } from '@react-google-maps/api';

interface SearchBarProps {
  onAddressSelected: (address: string) => void;
}

const libraries: Libraries = ['places'];

const GoogleMapsSearchBar: React.FC<SearchBarProps> = ({ onAddressSelected }) => {
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAyy8BzMlKKQCPsQRgvhMW4MxfjGuIEWUc',
    libraries,
  });

  useEffect(() => {
    if (isLoaded && !autocompleteService.current) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
    }
  }, [isLoaded]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (!autocompleteService.current || event.target.value === "") {
      setSuggestions([]);
      return;
    }

    autocompleteService.current.getPlacePredictions(
      { input: event.target.value },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setSuggestions(results);
        } else {
          setSuggestions([]);
        }
      }
    );
  };

  const handleSuggestionSelected = (suggestion: google.maps.places.AutocompletePrediction) => {
    setInputValue(suggestion.description);
    setSuggestions([]);
    onAddressSelected(suggestion.description);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search for places..."
        type="text"
      />
      <ul>
        {suggestions.map(suggestion => (
          <li key={suggestion.place_id} onClick={() => handleSuggestionSelected(suggestion)}>
            {suggestion.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleMapsSearchBar;
