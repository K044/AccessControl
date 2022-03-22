import * as React from "react";
import { Admin, Resource } from 'react-admin';
import { UserList } from './adminList';
import fakeDataProvider from 'ra-data-fakerest';

const dataProvider = fakeDataProvider({
  users : [
    {
      id: 1,
      name: "Leanne",
      lastname: "Graham",
      email: "sincere@april.biz",
      role: "Unassigned"
    },
    {
      id: 2,
      name: "Leanne",
      lastname: "Graham",
      email: "sincere@april.biz",
      role: "Unassigned"
    }
  ]
});
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={UserList} />
  </Admin>
  );

export default App;