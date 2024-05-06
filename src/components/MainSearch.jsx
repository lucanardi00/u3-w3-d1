import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs } from '../store/jobsSlice';

const MainSearch = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector(state => state.jobs);
  const [query, setQuery] = React.useState('');

  const handleChange = e => setQuery(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(fetchJobs(query));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {jobs.map(job => <li key={job._id}>{job.title}</li>)}
      </ul>
    </div>
  );
};

export default MainSearch;