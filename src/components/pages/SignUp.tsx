import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Message from '../UI/Message/Message';
import { signup, setError } from '../../store/actions/authActions';
import { RootState } from '../../store';
import classes from './stylesheets/SignUp.module.scss';

const SignUp: FC = () => {
    const [firstName, setFirstName] = useState('');
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
        dispatch(signup({email, password, firstName }, () => setLoading(false)));
    }

    return(
        <section className={classes.section}>
            <div>
                <h2>Sign up</h2>
                <form className={classes.form} onSubmit={submitHandler}>
                    {error && <Message type='danger' msg={error} />}
                    <Input
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.currentTarget.value)}
                        placeholder="First name"
                        label="First name"
                    />
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
                    <div className={classes.submit}>
                        <Button text={loading ? "Loading..." : "Sign up"} disabled={loading} />
                    </div>
                </form>
            </div>
        </section>
    );
}

export default SignUp;