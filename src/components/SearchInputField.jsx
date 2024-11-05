import React, {useState} from 'react';
import PropTypes from "prop-types";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid/index.js";

const SearchInputField = ({ handleSearch, placeHolderText }) => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
      <div className="flex border py-2 px-5 h-9 w-64 items-center gap-2 rounded-2xl">
        <div>
          <MagnifyingGlassIcon className="w-4 h-4" />
        </div>
        <div className="w-full">
          <form onSubmit={handleSearch}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeHolderText}
                className="focus:outline-none w-full"
            />
          </form>
        </div>
      </div>
  );
};

SearchInputField.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  placeHolderText: PropTypes.string,
}

export default SearchInputField;