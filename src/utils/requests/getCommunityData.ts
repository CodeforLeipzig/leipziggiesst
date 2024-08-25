import { CommunityDataType } from '../../common/interfaces';
import { createAPIUrl } from '../createAPIUrl';
import { requests } from '../requestUtil';
import { decompress } from 'brotli-compress/js'

const decompressSync = (input) => {
  const compressedDataNonBase64 = Uint8Array.from(atob(input), c => c.charCodeAt(0));
  const decompressedData = decompress(compressedDataNonBase64);
  const decoder = new TextDecoder();
  return decoder.decode(decompressedData);
}

export const getCommunityData = async (): Promise<CommunityDataType> => {
  const fetchCommunityDataUrl = createAPIUrl(
    `/get?queryType=wateredandadopted-compressed`
  );

  const compressed = await requests<{
    data: string;
  }>(fetchCommunityDataUrl);
    
  const decompressedString = decompressSync(compressed.data);

  const defaultCommunityData: CommunityDataType = {
    communityFlagsMap: {},
    wateredTreesIds: [],
    adoptedTreesIds: [],
  };

  if (!decompressedString) return defaultCommunityData;

  const json = JSON.parse(decompressedString);
  if (!json) return defaultCommunityData;


  const newState = json.reduce(
    (acc: CommunityDataType, { tree_id: id, adopted, watered }) => {
      const item = acc[id];
      const isAdopted = item?.adopted || adopted !== '0';
      const wateredAmount = item?.watered || watered;
      return {
        communityFlagsMap: {
          ...acc.communityFlagsMap,
          [id]: { isAdopted, wateredAmount },
        },
        wateredTreesIds: wateredAmount > 0
          ? [...acc.wateredTreesIds, id]
          : acc.wateredTreesIds,
        adoptedTreesIds: isAdopted
          ? [...acc.adoptedTreesIds, id]
          : acc.adoptedTreesIds,
      };
    },
    defaultCommunityData
  );

  return newState;
};
