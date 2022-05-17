import { Layout } from 'react-admin';
import { MyAppBar } from './myAppBar';

export const AdminLayout = props => <Layout
    {...props}
    appBar={MyAppBar}
/>;
export const QRLayout = props => <Layout
    {...props}
    appBar={MyAppBar}
    sidebar={MyAppBar}
/>;