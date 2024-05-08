import React, { useState, useRef, useEffect } from 'react';

interface SearchBarProps {
  onAddressSelected: (address: string) => void;
}

const GoogleMapsSearchBar: React.FC<SearchBarProps> = ({ onAddressSelected }) => {
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const apiKey = "AIzaSyAyy8BzMlKKQCPsQRgvhMW4MxfjGuIEWUc";

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google) {
        console.log("Google Maps already loaded.");
        initializeAutocompleteService();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.onload = () => {
        console.log("Google Maps Script Loaded");
        initializeAutocompleteService();
      };
      document.head.appendChild(script);
    };

    const initializeAutocompleteService = () => {
      autocompleteService.current = new google.maps.places.AutocompleteService();
    };

    loadGoogleMapsScript();
  }, [apiKey]);

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
