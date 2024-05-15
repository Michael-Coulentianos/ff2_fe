import { useEffect } from 'react';

async function fetchData(fetchFunction, setData) {
  try {
    const data = await fetchFunction();
    setData(data);
  } catch (error) {
    console.error(`Error fetching data from ${fetchFunction.name}:`, error);
  }
}

function useFetchData(fetchFunction, setData) {
  useEffect(() => {
    fetchData(fetchFunction, setData);
  }, [fetchFunction, setData]);
}

export { useFetchData, fetchData };
