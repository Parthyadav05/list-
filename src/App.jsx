import { useState, useMemo } from 'react';
import CustomerTable from './components/CustomerTable';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';
import { generateCustomers } from './utils/dataGenerator';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import { useDebounce } from './hooks/useDebounce';
import './App.css';

const TOTAL_RECORDS = 1000000;

function App() {
  const [allCustomers] = useState(() => generateCustomers(TOTAL_RECORDS));
  const [searchInput, setSearchInput] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const debouncedSearch = useDebounce(searchInput, 250);

  const { visibleData, loadMore, hasMore, totalCount } = useInfiniteScroll(
    allCustomers,
    debouncedSearch,
    sortConfig
  );

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Customers List</h1>
        <p className="record-count">
          Showing {visibleData.length} of {totalCount.toLocaleString()} records
        </p>
      </header>

      <div className="controls">
        <SearchBar value={searchInput} onChange={setSearchInput} />
        <FilterDropdown />
      </div>

      <CustomerTable
        data={visibleData}
        onLoadMore={loadMore}
        hasMore={hasMore}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
    </div>
  );
}

export default App;
