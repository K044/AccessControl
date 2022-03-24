import * as React from "react";
import { Admin, Resource } from 'react-admin';
import { Navbar } from '../components/Navbar'
import { UserList, UserEdit, RoleList } from '../adminList';
import fakeDataProvider from 'ra-data-fakerest';
import { FirebaseAuthProvider, FirebaseDataProvider } from "react-admin-firebase";
import { AdminLayout } from '../adminLayout'
import { Box } from '@chakra-ui/react'

const firebaseConfig = {
    apiKey: "AIzaSyCYc87fc9JCCY27dbGxYz0wfLNEUxxmx0Q",
    authDomain: "accesscontrol-1802c.firebaseapp.com",
    projectId: "accesscontrol-1802c",
    storageBucket: "accesscontrol-1802c.appspot.com",
    messagingSenderId: "1071945370796",
    appId: "1:1071945370796:web:6c65b880a574fa92e3a309"
  };

const authProvider = FirebaseAuthProvider(firebaseConfig);
//const dataProvider = FirebaseDataProvider(firebaseConfig);
const dataProvider = fakeDataProvider({
  users : [
    {
      id: 1,
      name: "Vardenis",
      lastname: "Pavardenis",
      email: "vardenispavardenis@gmail.com",
      role: 1
    },
    {
      id: 2,
      name: "Petras",
      lastname: "Petrauskas",
      email: "petraspetrauskas@gmail.com",
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

export default function AdminPage() {
return (
    <Box>
        <Navbar />
        <Admin layout={AdminLayout} dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="users" list={UserList} edit={UserEdit} />
        <Resource name="roles" list={RoleList} />
        </Admin>
    </Box>
        

)
}