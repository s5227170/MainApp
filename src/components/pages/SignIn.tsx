import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Button from '../UI/Button/Button';
import Message from '../UI/Message/Message';
import { signin, setError } from '../../store/actions/authActions';
import { RootState } from '../../store';
import classes from './stylesheets/SignIn.module.scss';
import InputV2 from '../UI/InputV2/InputV2';
import { setpage } from '../../store/actions/productActions';


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

    useEffect(() => {
        dispatch(setpage("SignIn"));
    }, []);

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
                    <InputV2
                        inputCasingStyle="input-create"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        placeholder="Email address"
                        content="Email address"
                    />
                    <InputV2
                        inputCasingStyle="input-create"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        placeholder="Password"
                        content="Password"
                    />
                    <p><NavLink to="/forgot-password">Forgot Password</NavLink></p>
                    <div className={classes.submit}>
                        <Button text={loading ? "Loading..." : "Sign In"} disabled={loading} />
                    </div>
                </form>
            </div>
        </section>
    );
}

export default SignIn;