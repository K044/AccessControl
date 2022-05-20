import * as React from "react";
import { Admin, Resource } from 'react-admin';
import { Navbar } from '../components/Navbar'
import { UserList, UserEdit, RoleList, AttendanceList, AttendanceListStudent } from '../utils/adminList';
import { QRLayout } from '../utils/adminLayout'
import { Box } from '@chakra-ui/react'
import { authProvider, dataProvider } from '../utils/init-firebase'
import { useAuth } from "../contexts/AuthContext";


export default function AttendancePage() {
    const { userRole } = useAuth()
    console.log(userRole)
    if(userRole < 2) {
        return (
            <Box>
                <Navbar />
                <Admin layout={QRLayout} dataProvider={dataProvider}>
                <Resource name="attendance" list={AttendanceListStudent} />
                <Resource name="users" list={UserList} />
                </Admin>
            </Box>
        )
    }
    else {
        return (
            <Box>
                <Navbar />
                <Admin layout={QRLayout} dataProvider={dataProvider}>
                <Resource name="attendance" list={AttendanceList} />
                <Resource name="users" list={UserList} />
                </Admin>
            </Box>
        )
    }

        
}