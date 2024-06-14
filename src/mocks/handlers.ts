// src/mocks/handlers.js

import { rest } from 'msw';
import { defaultFakeUser } from '../utils/auth-mock/auth0';
interface Payload {
  data?: Record<string, any> | Record<string, any>[] | boolean | string;
  message?: string;
}

interface WateredTree {
  tree_id: string;
  time: string;
  uuid: string;
  amount: string;
  timestamp: string;
  username: string;
}
let location = '';
if (process.env.NODE_ENV === 'test') {
  location = '';
} else {
  if (process.env.NODE_ENV === 'development') {
    location = process.env.API_ENDPOINT_DEV ? process.env.API_ENDPOINT_DEV : '';
  } else if (process.env.NODE_ENV === 'production') {
    location = process.env.API_ENDPOINT_PROD
      ? process.env.API_ENDPOINT_PROD
      : '';
  } else {
    console.log('NODE_ENV is not defiend');
    location = '';
  }
}

let adoptedTreeIds: string[] = [];

const wateredAndAdopted: {
  tree_id: string;
  adopted: string;
  watered: string;
}[] = [];

const treesWatered: WateredTree[] = [];

/**
 * Extracts top level properties from an object or URLSearchParams. Only looks for strings. with a given key. All other types are ignored and returned as undefined
 *
 */
export function getProperty(
  item: Record<string, any> | URLSearchParams,
  key: string
): string {
  if (item instanceof URLSearchParams) {
    const res = item.get(key);
    return res ? res : '';
  }
  return typeof item[key] === 'string' ? item[key] : '';
}

export const handlers = [
  // Handles a POST /login request

  rest.post(`${location}/login`, async (_req, res, ctx) => {
    return res(ctx.status(201));
  }),

  rest.delete(`${location}/delete/:type`, (req, res, ctx) => {
    // console.log('intercepting DELETE requests');
    const json: Payload = {};
    let body: Record<string, any> = {};
    if (typeof req.body === 'string') {
      body = JSON.parse(req.body);
    } else {
      body = req.body ? req.body : {};
    }
    const { type } = req.params;
    if (!type) {
      return res(ctx.status(400), ctx.json({ message: 'type is undefined' }));
    }
    if (typeof type !== 'string') {
      return res(
        ctx.status(400),
        ctx.json({ message: 'type is not a string' })
      );
    }    
    // console.log(body);
    switch (type) {
      case 'unadopt': {
        // remove from adopted trees list
        // adoptedTreeIds[]
        // reduce adopted list by one
        //wateredAndAdopted
        // get a call to adopted
        // and is tree adopted
        break;
      }
      case undefined:
      case null: {
        console.log(' type is undefined or null');
        break;
      }
      default: {
        console.log('no default case for delete action defiend');
      }
    }
    return res(ctx.status(201), ctx.json(json));
  }),
  rest.post(`${location}/post/:type`, (req, res, ctx) => {
    let json: Payload = {};
    let body: Record<string, any> = {};
    if (typeof req.body === 'string') {
      body = JSON.parse(req.body);
    } else {
      body = req.body ? req.body : {};
    }
    const { type } = req.params;
    if (!type) {
      return res(ctx.status(400), ctx.json({ message: 'type is undefined' }));
    }
    if (typeof type !== 'string') {
      return res(
        ctx.status(400),
        ctx.json({ message: 'type is not a string' })
      );
    }
    switch (type) {
      case 'water': {
        treesWatered.push({
          tree_id: getProperty(body, 'tree_id'),
          time: new Date().toLocaleString(),
          timestamp: new Date().toLocaleString(),
          uuid: getProperty(body, 'uuid'),
          username: getProperty(body, 'username'),
          amount: body.amount ? body.amount : 0,
        });
        let found = false;
        for (let i = 0; i < wateredAndAdopted.length; i++) {
          if (body.tree_id === wateredAndAdopted[i].tree_id) {
            wateredAndAdopted[i].watered = `${
              parseInt(wateredAndAdopted[i].watered) + 1
            }`;
            found = true;
            break;
          }
        }
        if (found === false) {
          wateredAndAdopted.push({
            tree_id: body.tree_id,
            adopted: '0',
            watered: '1',
          });
        }
        json = { data: 'watered tree', message: `${type}` };
        break;
      }
      case 'adopt': {
        // console.log(`calling POST ${queryType}`);
        adoptedTreeIds = [...new Set([body.tree_id, ...adoptedTreeIds])];

        let found = false;
        for (let i = 0; i < wateredAndAdopted.length; i++) {
          if (body.tree_id === wateredAndAdopted[i].tree_id) {
            wateredAndAdopted[i].adopted = `${
              parseInt(wateredAndAdopted[i].adopted) + 1
            }`;
            found = true;
            break;
          }
        }
        if (found === false) {
          wateredAndAdopted.push({
            tree_id: body.tree_id,
            adopted: '1',
            watered: '0',
          });
        }
        json = { data: 'tree was adopted', message: `${type}` };
        break;
      }
      case undefined:
      case null: {
        console.error('type url param is not defiend');
        break;
      }
      default: {
        json = { data: [], message: `default case for post ${body}` };
      }
    }
    return res(ctx.status(201), ctx.json(json));
  }),

  // Handles a GET /user request

  rest.get(`${location}/`, async (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ foo: 'bar' }));
  }),

  rest.get(`${location}/get/:type`, async (req, res, ctx) => {
    let json: Payload = {};

    const { type } = req.params as Record<string, unknown>;
    if (!type) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'url param is missing' })
      );
    }
    if (typeof type === 'string') {
      return res(
        ctx.status(400),
        ctx.json({ message: 'url param is not a string' })
      );
    }
    switch (type) {
      case 'treeswateredbyuser': {
        json = { data: treesWatered, message: `${type}` };

        break;
      }
      case 'treesbyids': {
        const originalResponse = await ctx.fetch(req);
        json = { ...originalResponse };
        break;
      }
      case 'byid': {
        const originalResponse = await ctx.fetch(req);
        json = { ...originalResponse };
        if (process.env.NODE_ENV === 'test') {
          json = { data: [{ id: '_abc' }] };
        }
        break;
      }
      case 'adopted': {
        json = { data: [...adoptedTreeIds], message: `${type}` };
        break;
      }
      case 'istreeadopted': {
        const id = getProperty(req.url.searchParams, 'id');
        json = {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          data: adoptedTreeIds.includes(id) ? true : false,
          message: `${type}`,
        };
        break;
      }
      case 'wateredbyuser': {
        // const uuid = queries.get('uuid'); // if we need it
        json = { data: treesWatered, message: `${type}` };
        break;
      }
      case 'wateredandadopted': {
        json = { data: wateredAndAdopted, message: `${type}` };
        break;
      }
      case 'lastwatered': {
        const id = getProperty(req.url.searchParams, 'id');

        const lastWateredByUser = treesWatered.map(tree => {
          if (tree.tree_id === id) {
            return tree;
          } else {
            return;
          }
        });
        const lastWateredByUserFiltered = lastWateredByUser.filter(Boolean); // https://stackoverflow.com/a/281335/1770432
        json = { data: lastWateredByUserFiltered, message: `${type}` };
        break;
      }
      case 'watered': {
        const watered = treesWatered.map(tree => tree.tree_id);
        json = { data: { watered }, message: `${type}` };

        break;
      }
      default: {
        // console.log('UNHANDELED request to');
        // console.log(req.url.href);
        const originalResponse = await ctx.fetch(req);
        json = {
          data: [],
          url: req.url,
          message: `case ${type} with url "${req.url}" in default case. Not yet defined and passed through`,
          ...originalResponse,
        };
        // console.log('response is patched and gets passed through', json);
        break;
      }
    }

    return res(ctx.status(200), ctx.json(json));
  }),

  rest.get(
    'https://tsb-trees-api-user-management.now.sh/api/user',
    (req, res, ctx) => {

      const userid = getProperty(req.url.searchParams, 'id');
      const json: Payload = {
        data: {
          user_id: userid,
          email: defaultFakeUser.email,
          email_verified: true,
          name: defaultFakeUser.nickname,
          nickname: defaultFakeUser.nickname,
          username: defaultFakeUser.username,
        },
      };
      return res(ctx.status(200), ctx.json(json));
    }
  ),
];
