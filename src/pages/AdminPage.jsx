import * as React from "react";
import { Admin, Resource } from 'react-admin';
import { Navbar } from '../components/Navbar'
import { UserList, UserEdit, RoleList } from '../utils/adminList';
import { AdminLayout } from '../utils/adminLayout'
import { Box } from '@chakra-ui/react'
import { authProvider, dataProvider } from '../utils/init-firebase'


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