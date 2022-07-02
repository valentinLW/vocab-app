import { Redirect } from 'react-router-dom';

export function SignOut() {
    localStorage.clear();
    return (<Redirect to="/"/>)
}
