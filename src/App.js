import * as React from "react";
import { Admin, Resource, EditGuesser } from 'react-admin';
import { UserList, UserEdit, RoleList } from './adminList';
import fakeDataProvider from 'ra-data-fakerest';
import AppRouter from './components/AppRouter'
import AuthContextProvider from './contexts/AuthContext'

const dataProvider = fakeDataProvider({
  users : [
    {
      id: 1,
      name: "Leanne",
      lastname: "Graham",
      email: "sincere@april.biz",
      role: 1
    },
    {
      id: 2,
      name: "Leanne",
      lastname: "Graham",
      email: "sincere@april.biz",
      role: 0
    }
  ],
  roles: [
    {
      name: "Unassigned"
    },
    {
      name: "Student"
    },
    {
      name: "Lecturer"
    },
    {
      name: "Admin"
    },
  ]
});

function App(props) {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  )
}

  //<Admin dataProvider={dataProvider}>
    //<Resource name="users" list={UserList} edit={UserEdit} />
    //<Resource name="roles" list={RoleList} />
  //</Admin>

export default App;