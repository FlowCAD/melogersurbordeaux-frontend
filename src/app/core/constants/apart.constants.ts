export const STATES = {
  new : { label: 'Nouveau', color: 'primary' } ,
  accepted: { label: 'A visiter', color: 'accent' } ,
  refused: { label: 'Refusé', color: 'grey' } ,
  selled: { label: 'Vendu', color: 'grey' }
};

export const STATES_ARRAY = [
  { value: 'new', label: 'Nouveau', color: 'primary' },
  { value: 'in-progress', label: 'A discuter', color: 'accent' },
  { value: 'accepted', label: 'A visiter', color: 'accent' },
  { value: 'refused', label: 'Refusé', color: 'grey' },
  { value: 'selled', label: 'Vendu', color: 'grey'}
];

export const DISTRICTS = [
  { index: 0, key: 'nansouty', value: 'Nansouty'},
  { index: 1, key: 'saint_genes', value: 'Saint Genès'},
  { index: 2, key: 'la_bastide', value: 'La Bastide'},
  { index: 3, key: 'saint_augustin', value: 'Saint Augustin'},
  { index: 4, key: 'saint_bruno_saint_victor', value: 'Saint-Bruno \/ Saint-Victor'},
  { index: 5, key: 'villa_primerose_parc_bordelais_cauderan', value: 'Villa Primerose \/ Parc Bordelais \/ Caudéran'},
  { index: 6, key: 'saint_seurin_fondaudege', value: 'Saint Seurin \/ Fondaudège'},
  { index: 7, key: 'hotel_de_ville_quinconces', value: 'Hotel de Ville \/ Quinconces (hypercentre)'},
  { index: 8, key: 'chartrons', value: 'Chartrons'},
  { index: 9, key: 'other', value: 'Autre'}
];