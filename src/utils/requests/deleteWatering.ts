import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';

export const deleteWatering = async ({
  token,
  wateringId,
}: {
  token: string;
  wateringId: string;
}): Promise<boolean> => {
  const urlWaterings = createAPIUrl(`/delete`);
  await requests<undefined, { method: 'DELETE'; body: string }>(urlWaterings, {
    token,
    override: {
      method: 'DELETE',
      body: JSON.stringify({
        queryType: 'watering-delete',
        uuid: wateringId,
      }),
    },
  });
  return true;
};
