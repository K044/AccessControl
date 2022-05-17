import * as React from "react";
import { SelectField, List, Datagrid, TextField, EmailField, Edit, SimpleForm, ReferenceInput, SelectInput, UrlField  } from 'react-admin';
import { useAuth } from '../contexts/AuthContext'
import { ClipLoader } from 'react-spinners'
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 40vh auto;
  border-color: black;
`;
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
export const QRList = props => {
    const { currentUser, userRole } = useAuth()
    if(currentUser == null) {
        return (
            <ClipLoader color={"#ffffff"} loading={true} css={override} size={150} />
        )
    }
    else return (
    <List {...props} filter={{uid: currentUser.uid.toString()}}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="uid" />
            <TextField source="number" />
            <TextField source="faculty" />
            <UrlField source="view" />
            <UrlField source="link" />
        </Datagrid>
    </List>)
};