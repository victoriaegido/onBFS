import React from "react";
import "./searchBar.component.scss";

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    iconSrc?: React.ReactElement;
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchTerm,
    onSearchChange,
    iconSrc,
}) => {
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Buscar por título"
                value={searchTerm}
                onChange={onSearchChange}
                className="search-container__input"
            />
            <button className="search-container__icon">
                {iconSrc}
            </button>
        </div>
    );
};

export default SearchBar;
