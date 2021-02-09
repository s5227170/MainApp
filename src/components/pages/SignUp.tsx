import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../UI/Button/Button';
import Message from '../UI/Message/Message';
import { signup, setError } from '../../store/actions/authActions';
import { RootState } from '../../store';
import classes from './stylesheets/SignUp.module.scss';
import InputV2 from '../UI/InputV2/InputV2';
import { setpage } from '../../store/actions/productActions';

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

    useEffect(() => {
        dispatch(setpage("SignUp"));
    }, []);

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
                    <InputV2
                        inputCasingStyle="input-create"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.currentTarget.value)}
                        placeholder="First name"
                        content="First name"
                    />
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
                    <div className={classes.submit}>
                        <Button text={loading ? "Loading..." : "Sign up"} disabled={loading} />
                    </div>
                </form>
            </div>
        </section>
    );
}

export default SignUp;