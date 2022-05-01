import * as React from "react";
import { SelectField, List, Datagrid, TextField, EmailField, Edit, SimpleForm, ReferenceInput, SelectInput, ReferenceField  } from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="lastname" />
            <EmailField source="email" />
            <SelectField source="role" choices={[
                { id: 0, name: 'Unassigned' },
                { id: 1, name: 'Student' },
                { id: 2, name: 'Lecturer' },
                { id: 3, name: 'Admin' },
            ]} />
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
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
        </Datagrid>
    </List>
);