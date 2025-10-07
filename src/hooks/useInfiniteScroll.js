import { useState, useEffect, useMemo, useCallback } from 'react';

const ROWS_PER_PAGE = 30;

export function useInfiniteScroll(allData, searchTerm, sortConfig) {
  const [displayedRows, setDisplayedRows] = useState(ROWS_PER_PAGE);

  const filteredAndSortedData = useMemo(() => {
    let result = [...allData];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(customer =>
        customer.name.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term) ||
        customer.phone.toLowerCase().includes(term)
      );
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        let comparison = 0;
        if (typeof aVal === 'string') {
          comparison = aVal.localeCompare(bVal);
        } else if (aVal instanceof Date || typeof aVal === 'string') {
          comparison = new Date(aVal) - new Date(bVal);
        } else {
          comparison = aVal - bVal;
        }

        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [allData, searchTerm, sortConfig]);

  const visibleData = useMemo(() => {
    return filteredAndSortedData.slice(0, displayedRows);
  }, [filteredAndSortedData, displayedRows]);

  const loadMore = useCallback(() => {
    setDisplayedRows(prev => Math.min(prev + ROWS_PER_PAGE, filteredAndSortedData.length));
  }, [filteredAndSortedData.length]);

  const hasMore = displayedRows < filteredAndSortedData.length;

  useEffect(() => {
    setDisplayedRows(ROWS_PER_PAGE);
  }, [searchTerm, sortConfig]);

  return { visibleData, loadMore, hasMore, totalCount: filteredAndSortedData.length };
}
