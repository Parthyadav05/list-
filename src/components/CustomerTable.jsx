import { useEffect, useRef } from 'react';

function CustomerTable({ data, onLoadMore, hasMore, sortConfig, onSort }) {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, onLoadMore]);

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) return '⇅';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="table-container">
      <table className="customer-table">
        <thead>
          <tr>
            <th onClick={() => onSort('id')}>
              ID {getSortIcon('id')}
            </th>
            <th onClick={() => onSort('name')}>
              Name {getSortIcon('name')}
            </th>
            <th onClick={() => onSort('phone')}>
              Phone {getSortIcon('phone')}
            </th>
            <th onClick={() => onSort('email')}>
              Email {getSortIcon('email')}
            </th>
            <th onClick={() => onSort('score')}>
              Score {getSortIcon('score')}
            </th>
            <th onClick={() => onSort('lastMessageAt')}>
              Last Message {getSortIcon('lastMessageAt')}
            </th>
            <th onClick={() => onSort('addedBy')}>
              Added By {getSortIcon('addedBy')}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>
                <div className="customer-info">
                  <img src={customer.avatar} alt={customer.name} className="avatar" />
                  <span>{customer.name}</span>
                </div>
              </td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>
              <td>
                <span className="score-badge">{customer.score}</span>
              </td>
              <td>{formatDate(customer.lastMessageAt)}</td>
              <td>{customer.addedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasMore && <div ref={observerTarget} className="loading-indicator">Loading more...</div>}
    </div>
  );
}

export default CustomerTable;
