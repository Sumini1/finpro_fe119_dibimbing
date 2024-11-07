import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGetLoggedUser } from '../../../reducer/loggedUserSlice';

const LoggedUser = () => {
    const dispatch = useDispatch();
    const { data, isLoading, message } = useSelector((state) => state.loggedUser);

    useEffect(() => {
        dispatch(fetchGetLoggedUser());
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (message) {
        return <div>Error: {message}</div>;
    }
    return (
        <div>
            <h1>Halaman Logged User</h1>
            <img src={data.profilePictureUrl} alt={data.name} />
            <p>Name: {data.name}</p>
            <p>Email: {data.email}</p>
            <p>Role: {data.role}</p>
        </div>
    );
};

export default LoggedUser;