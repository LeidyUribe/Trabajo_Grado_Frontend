import { Button } from "@material-ui/core";

export const BASE_URL = process.env.REACT_APP_API;

export const enumTypesLocalStorage = {
  sessionToken: '__session__',
};

const Paths = {
  LOGIN: '/',
  HOME: '/home',
  USERS: '/users',
  EXTRAS: '/extras',
  INFORMES: '/informes',
  IMPORT: '/import'
};

export default Paths;

export const headersAtention = [
  {
    name: 'Nombre',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Descripción',
    selector: 'description',
    sortable: true,
  },
  
]