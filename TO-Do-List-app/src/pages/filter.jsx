import React, { useState } from 'react';
import './filter.css';

const FiltersLabels = () => {
  const [filters, setFilters] = useState([
    { id: 1, name: 'aa', checked: false },
    { id: 2, name: 'dd', checked: false },
    { id: 3, name: 'sfvn', checked: false }
  ]);

  const [newFilterName, setNewFilterName] = useState('');
  const [showAddFilter, setShowAddFilter] = useState(false);

  const addFilter = () => {
    if (newFilterName.trim()) {
      setFilters([
        ...filters,
        {
          id: Date.now(),
          name: newFilterName,
          checked: false
        }
      ]);
      setNewFilterName('');
      setShowAddFilter(false);
    }
  };

  const toggleFilter = (id) => {
    setFilters(filters.map(filter => 
      filter.id === id ? { ...filter, checked: !filter.checked } : filter
    ));
  };

  return (
    <div className="filters-labels-container">
      <h1 className="filters-labels-title">Filters & Labels</h1>
      
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Filters</h2>
          <span className="usage-count">USED: {filters.length}/3</span>
        </div>
        
        <ul className="filter-list">
          {filters.map(filter => (
            <li key={filter.id} className="filter-item">
              <input 
                type="checkbox" 
                id={`filter-${filter.id}`}
                checked={filter.checked}
                onChange={() => toggleFilter(filter.id)}
              />
              <label htmlFor={`filter-${filter.id}`}>{filter.name}</label>
            </li>
          ))}
          
          {filters.length < 3 && (
            <li className="add-filter-item">
              {showAddFilter ? (
                <div className="add-filter-input">
                  <input
                    type="text"
                    value={newFilterName}
                    onChange={(e) => setNewFilterName(e.target.value)}
                    placeholder="Enter filter name"
                    autoFocus
                  />
                  <button onClick={addFilter} className="confirm-add">
                    Add
                  </button>
                  <button 
                    onClick={() => setShowAddFilter(false)} 
                    className="cancel-add"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowAddFilter(true)}
                  className="add-filter-button"
                >
                  + Add Filter
                </button>
              )}
            </li>
          )}
        </ul>
      </div>
      
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Labels</h2>
        </div>
        
        <ul className="label-list">
          <li className="label-item">
            <input type="checkbox" id="label1" />
            <label htmlFor="label1">read</label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FiltersLabels;