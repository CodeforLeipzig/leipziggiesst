import { QueryFunction, useQuery } from 'react-query';
import { UserPosition, loadStatisticsData } from '../requests/loadStatisticsData';

const loadData: QueryFunction = async (): Promise<UserPosition[]> => {
  return await loadStatisticsData();
};

export const useStatisticsJson = (): {
  data: UserPosition[] | null;
  error: Error | null;
} => {
  const dataParams = 'statistics-json';
  const { data, error } = useQuery<unknown, Error, UserPosition[]>(
    dataParams,
    loadData,
    { staleTime: Infinity }
  );

  return {
    data: data || null,
    error: error || null,
  };
};
