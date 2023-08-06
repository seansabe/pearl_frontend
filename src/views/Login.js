import '../css/login.css';
import LoginForm from '../components/LoginForm';

export default function Login() {
    return (
        <div className='login-container'>
            <LoginForm></LoginForm>
            <h1 className='logo'>Pearl</h1>
        </div>
    );
}