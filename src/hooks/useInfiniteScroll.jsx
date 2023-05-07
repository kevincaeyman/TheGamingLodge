import axios from 'axios';
import {useState, useEffect, useCallback} from 'react';

const useInfiniteScroll = (callback) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(`https://api.rawg.io/api/games?key=659e6634546b40f1aa9371bd8ab9e73e&page=${page}&page_size=20`);
      const data = response.data.results;
      callback(data);
      setHasMore(data.length > 0);
      setPage(prevPage => prevPage + 1);
    } catch (err) {
      console.log(err);
      setError(true);
    }
    setLoading(false);
  }, [callback, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, error, hasMore };
};

export default useInfiniteScroll;
