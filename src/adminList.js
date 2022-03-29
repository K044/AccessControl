import * as React from "react";
import { List, Datagrid, TextField, EmailField, Edit, SimpleForm, ReferenceInput, SelectInput, ReferenceField  } from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="lastname" />
            <EmailField source="email" />
            <ReferenceField source="role" reference="roles">
                <TextField source="name" />
            </ReferenceField>
        </Datagrid>
    </List>
);

export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <ReferenceInput source="role" reference="roles">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const RoleList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
        </Datagrid>
    </List>
);