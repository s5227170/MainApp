import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Message from '../UI/Message/Message';
import { sendPasswordResetEmail, setError, setSuccess } from '../../store/actions/authActions';
import { RootState } from '../../store';
import classes from './stylesheets/ForgotPassword.module.scss';

const ForgotPassword: FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { error, success } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        return () => {
            if(error) {
                dispatch(setError(''));
            }
            if(success){
                dispatch(setSuccess(''));
            }
        }
    }, [error, dispatch, success]);

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await dispatch(sendPasswordResetEmail(email, "Email Sent!"));
        setLoading(false)
        }

    return(
        <section className={classes.section}>
            <div className={classes.container}>
                <h2>Reset password</h2>
                <form className={classes.form} onSubmit={submitHandler}>
                    {error && <Message type='danger' msg={error} />}
                    {success && <Message type='success' msg={success} />}
                    <Input
                    type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        placeholder="Email address"
                        label="Email address"
                    />
                    <Button text={loading ? "Loading..." : "Send password reset email"} className={classes.button} disabled={loading} />
                </form>
            </div>
        </section>
    );
}

export default ForgotPassword;