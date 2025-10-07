import { useState } from 'react';

function FilterDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="filter-dropdown">
      <button className="filter-button" onClick={() => setIsOpen(!isOpen)}>
        Filters ▼
      </button>
      {isOpen && (
        <div className="filter-menu">
          <div className="filter-option">
            <input type="checkbox" id="score-high" />
            <label htmlFor="score-high">Score &gt; 50</label>
          </div>
          <div className="filter-option">
            <input type="checkbox" id="score-low" />
            <label htmlFor="score-low">Score &lt; 50</label>
          </div>
          <div className="filter-option">
            <input type="checkbox" id="recent" />
            <label htmlFor="recent">Recent Messages</label>
          </div>
          <div className="filter-option">
            <input type="checkbox" id="older" />
            <label htmlFor="older">Older Messages</label>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
