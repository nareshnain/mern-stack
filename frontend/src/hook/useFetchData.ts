import { useState, useEffect } from 'react';
import { API_URL } from '../constant/default_data';

export const useFetchData = (url: string) => {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}${url}`);
            const data = await response.json();
            setData(data);
        } catch (err: any) {
            setError(err);
        } finally {
            setLoader(false);
        }
    };
    fetchData();
  }, [url]);

  return {data, loader, error};
}
