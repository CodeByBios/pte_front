// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export const API_ENDPOINT_UTILISATEUR = 'http://localhost:8080/pte/utilisateurs';
export const API_ENDPOINT_NIVEAU = 'http://localhost:8080/pte/v1/niveaux';
export const API_ENDPOINT_TYPE_QUESTION = 'http://localhost:8080/pte/v1/typesquestions';
export const API_ENDPOINT_LANGAGE = 'http://localhost:8080/pte/v1/langages';
export const API_ENDPOINT_QUESTION = 'http://localhost:8080/pte/v1/questions';
