import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Message from '../UI/Message/Message';
import { signin, setError } from '../../store/actions/authActions';
import { RootState } from '../../store';
import classes from './stylesheets/SignIn.module.scss';


const SignIn: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        return () => {
            if(error) {
                dispatch(setError(''));
            }
        }
    }, [error, dispatch]);

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        dispatch(signin({email, password}, () => setLoading(false)));
    }

    return(
        <section className={classes.section}>
            <div>
                <h2>Sign in</h2>
                <form  onSubmit={submitHandler}>
                    {error && <Message type='danger' msg={error} />}
                    <Input
                    type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        placeholder="Email address"
                        label="Email address"
                    />
                    <Input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        placeholder="Password"
                        label="Password"
                    />
                    <p><NavLink to="/forgot-password">Forgot Password</NavLink></p>
                    <div className={classes.buttonContainer}>
                        <Button text={loading ? "Loading..." : "Sign In"} disabled={loading} />
                    </div>
                </form>
            </div>
        </section>
    );
}

export default SignIn;