import { requests } from '../requestUtil';

export interface UserPosition {
  pos: number;
  username: string;
  liter: number;
}

export const loadStatisticsData = async (): Promise<UserPosition[]> => {
  return await requests<[]>(
    '/data/statistics.json'
  );
};
