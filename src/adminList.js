import * as React from "react";
import { List, Datagrid, TextField, EmailField, SelectField  } from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="lastname" />
            <EmailField source="email" />
            <TextField source="role" />
        </Datagrid>
    </List>
);