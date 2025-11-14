var siteTheme = gbifReactComponents.themeBuilder.extend({baseTheme: 'light', extendWith: {
  primary: themeStyle.colors.primary,
  fontSize: '16px'
}});
const publisherKeys = [
  'b32d3b6f-0ae7-4305-a20c-acfa59f66996',
  '091ce7dd-c13c-4aa0-946e-df8ad22b627a',
  '382dc140-b75c-4b3e-989e-8bbd2e4f5cc0',
  '9ec4b1f3-da61-423a-9162-ccce2eabdb03',
  '3ef8f405-8adc-457c-95d2-2a4610e6ba47',
  'a064f300-1bc8-41ea-9364-b864ef4e8938',
  '75690ef9-a4be-483d-b2df-f5a19bdd1f9e',
  'e034534f-2cc7-4026-957a-dd034629514f',
];

var siteConfig = {
  routes: {
    alwaysUseHrefs: false,
    enabledRoutes: ['occurrenceSearch', 'datasetSearch', 'datasetKey', 'literatureSearch', 'publisherKey', 'publisherSearch'],
  },
  dataset: {
    rootFilter: {
      publishingOrg: publisherKeys
    },
    excludedFilters: ['datasetType', 'hostingOrganizationKey', 'networkKey', 'publishingCountryCode', 'license', 'projectId', 'dwcaExtension'],
    highlightedFilters: ['q', 'anyPublisherKey']
  },
  occurrence: {
    excludedFilters: ['publishingCountryCode'],
    highlightedFilters: ['taxonKey', 'country', 'year', 'datasetKey', 'publishingOrg'],
    mapSettings: {
      lat: 0,
      lng: 0,
      zoom: 1
    },
    // all the columns that are available to the user. This array defines the order they appear in. By default all all column are available.
    availableTableColumns: ['features', 'country', 'stateProvince', 'locality', 'coordinates', 'year', 'eventDate', 'basisOfRecord', 'recordedBy', 'identifiedBy', 'recordNumber', 'catalogNumber', 'collectionCode', 'institutionCode', 'datasetName', 'publishingOrg'],
    defaultTableColumns: ['features', 'country', 'coordinates', 'year', 'catalogNumber', 'dataset'], // the columns showed by default. The order is not relevant, as it is defined in the list of available columns. The user can change what columns to show in the UI.
    // You probably need help to configure the scope - so just ask
    // for his demo site we only show Fungi (taxonKey=5). It use the predicate structure known from GBIF download API. 
    // See https://www.gbif.org/developer/occurrence (long page without enough anchors - search for "Occurrence Download Predicates")
    // The format is however slightly different, in that is use camelCase for keys instead of CONSTANT_CASE. 
    rootPredicate: { type: 'in', key: 'publishingOrg', values: publisherKeys }, 
    occurrenceSearchTabs: ['MAP', 'TABLE', 'DATASETS', 'CLUSTERS'] // what tabs should be shown
    // see https://hp-theme.gbif-staging.org/data-exploration-config for more options
  },
  publisher: {},
  literature: {
    rootFilter: {
      predicate: {
        type: 'and', predicates: [
          {
            type: 'in',
            key: 'publishingOrganizationKey',
            values: publisherKeys
          },
          {
            type: 'equals',
            key: 'relevance',
            value: 'GBIF_USED'
          },
          {
            type: 'equals',
            key: 'peerReview',
            value: 'true'
          }
        ]
      }
    }
  },
}
