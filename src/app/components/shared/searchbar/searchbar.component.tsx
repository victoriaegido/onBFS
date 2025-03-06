import React from "react";
import "./searchBar.component.scss";

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    iconSrc?: string;
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
                className="search-input"
            />
            {iconSrc && (
                <img src={iconSrc} alt="Buscar" className="search-icon" />
            )}
        </div>
    );
};

export default SearchBar;
