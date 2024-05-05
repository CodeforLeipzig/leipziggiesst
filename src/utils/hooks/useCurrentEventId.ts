import { useLocation } from 'react-router';

const parseEventIdParam = (path: string): string | null => {
  const [location, waterSourceId] = path
    .replace(/\?.*$/g, '')
    .split('/')
    .filter((text: string) => Boolean(text));
  return (location === 'event' && waterSourceId) || null;
};

export const useCurrentEventId = (): string | null => {
  const { pathname } = useLocation();
  return parseEventIdParam(pathname);
};
