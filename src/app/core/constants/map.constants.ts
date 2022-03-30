import { Icon, icon } from "leaflet";

export const OSM_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export const MARKER_ICON: Icon = icon({
  iconSize: [ 25, 41 ],
  iconAnchor: [ 13, 41 ],
  iconUrl: 'leaflet/marker-icon.png',
  shadowUrl: 'leaflet/marker-shadow.png'
});