import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';

export const deleteWatering = async ({
  token,
  wateringId,
}: {
  token: string;
  wateringId: string;
}): Promise<boolean> => {
  const urlWaterings = createAPIUrl(`/delete?queryType=watering-delete&uuid=${wateringId}`);
  await requests<string>(urlWaterings, { token });
  return true;
};
