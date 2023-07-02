// EnCommande,
//         EnMaintenance,
//         EnUtilisation,
//         Retire,
//         Dispose
export enum Etat {
  'In Stock' = 0,
  'In Order' = 1,
  'In Maintenance' = 2,
  'In Use' = 3,
  'Retired' = 4,
  'Disposed' = 5
}

// 'In Stock': 'primary',
//   'In Order': 'warning',
//   'In Maintenance': 'error',
//   'In Use': 'success',
//   'Retired': 'info',
//   'Dispose': 'secondary'
export const EtatColor = {
  [Etat['In Stock']]: 'primary',
  [Etat['In Order']]: 'warning',
  [Etat['In Maintenance']]: 'error',
  [Etat['In Use']]: 'success',
  [Etat['Retired']]: 'info',
  [Etat['Disposed']]: 'secondary'
}
