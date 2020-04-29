import { dsv as d3Dsv, easeCubic as d3EaseCubic, json as D3Json } from "d3";
import axios from "axios";
import history from "../../history";
import { createAPIUrl, fetchAPI, flatten, createGeojson } from "../utils";
import { FlyToInterpolator } from "react-map-gl";

export const loadTrees = (Store) => async () => {

  const limit = 25000;
  const iterator = 13;

  let promiseArray = [];

  for (let offset = 0; offset < iterator; offset++) {
    const currentOffset = offset * limit;
    const url = `https://tsb-tree-api-now-express-fabiandinklage.technologiestiftung1.now.sh/get-all-trees?offset=${currentOffset}&limit=${limit}`
    const f = axios.get(url)
    promiseArray.push(f);
  }

  Promise.all(promiseArray).then(function(values) {
    const fetched = values.map(d => d.data.watered);
    const flattened = fetched.flat(1);
    const geojson = createGeojson(flattened);
    Store.setState({ data: geojson, isLoading: false, });
  });
}

export const loadData = (Store) => async () => {
  Store.setState({ isLoading: true });
  let geojson = [];

  const dataUrl =
    "https://tsb-trees.s3.eu-central-1.amazonaws.com/weather_light.geojson";

  fetch(dataUrl)
    .then((res) => res.json())
    .then((r) => Store.setState({ rainGeojson: r }));

  const pumps_data = require("../../data/pumps.geojson");
  const pumps = fetch("../../data/pumps.geojson")
    .then(r => r.json())
    .then(r => Store.setState({ pumps: r }))
};

export const setAppState = (state, payload) => {
  return {
    AppState: payload,
  };
};

function setViewport(state, payload) {
  return {
    viewport: {
      latitude: payload[1],
      longitude: payload[0],
      zoom: 16,
      maxZoom: 19,
      transitionDuration: 1000,
      transitionEasing: d3EaseCubic,
      transitionInterpolator: new FlyToInterpolator(),
      minZoom: 9,
      pitch: 45,
      bearing: 0,
    },
  };
}

function setView(state, payload) {
  const viewPrevious = {
    maxZoom: 19,
    transitionDuration: 250,
    transitionEasing: d3EaseCubic,
    transitionInterpolator: new FlyToInterpolator(),
    minZoom: 9,
    pitch: 45,
    bearing: 0,
  };

  const newViewport = { ...viewPrevious, ...payload };
  return {
    viewport: newViewport,
  };
}

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
  }
}

export const getWateredTrees = (Store) => async () => {
  Store.setState({ isLoading: true });
  const url = createAPIUrl(Store.getState(), "/get-watered-trees");
  const res = await fetchAPI(url);

  return {
    wateredTrees: res.data.watered,
  };
};

export const getTree = (Store) => async (id) => {
  const url = createAPIUrl(Store.getState(), `/get-tree?id=${id}`);
  const urlWatered = createAPIUrl(
    Store.getState(),
    `/get-tree-last-watered?id=${id}`
  );

  const res = await fetchAPI(url);
  const resWatered = await fetchAPI(urlWatered);

  return {
    selectedTree: res,
    treeLastWatered: resWatered,
  };
};

export const removeSelectedTree = (state, payload) => {
  return {
    selectedTree: false,
    selectedTreeState: false,
  };
};

export const getTreeByAge = (Store) => async (state, start, end) => {
  Store.setState({ selectedTreeState: "LOADING" });
  const url = createAPIUrl(state, `/get-tree-by-age?start=${start}&end=${end}`);

  const res = await fetchAPI(url).then((r) => {
    Store.setState({
      selectedTreeState: "LOADED",
      selectedTrees: r.data,
    });
  });
};

export const toggleOverlay = (state, payload) => ({
  overlay: payload,
});

const setDetailRouteWithListPath = (state, treeId) => {
  const nextLocation = `/search?location=${treeId}`;
  history.push(nextLocation);
};

export default (Store) => ({
  loadData: loadData(Store),
  getWateredTrees: getWateredTrees(Store),
  getTree: getTree(Store),
  getTreeByAge: getTreeByAge(Store),
  setDetailRouteWithListPath,
  setViewport,
  setView,
  loadTrees: loadTrees(Store),
  removeSelectedTree,
  setAppState,
  toggleOverlay,
});