import { useEffect } from 'react';

async function fetchData<T>(
  fetchFunction: (...args: any[]) => Promise<T>,
  setData: React.Dispatch<React.SetStateAction<T>>,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  params: any[] = []
): Promise<void> {
  if (setIsLoading) setIsLoading(true);
  try {
    const data = await fetchFunction(...params);
    setData(data);
  } catch (error) {
    console.error(`Error fetching data from ${fetchFunction.name}:`, error);
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
}

function useFetchData<T>(
  fetchFunction: (...args: any[]) => Promise<T>,
  setData: React.Dispatch<React.SetStateAction<T>>,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  params: any[] = []
): void {
  useEffect(() => {
    fetchData(fetchFunction, setData, setIsLoading, params);
  }, [fetchFunction, setData, setIsLoading, ...params]);
}

export { useFetchData, fetchData };
