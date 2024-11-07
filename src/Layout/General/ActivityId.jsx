import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGetActivityById } from '../../reducer/activityIdSlice';

const ActivityId = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data, isLoading, message } = useSelector((state) => state.activityId);
    useEffect(() => {
        dispatch(fetchGetActivityById(id));
    }, [id, dispatch]);
    return (
        <div>
            <h1>Activity with ID: {id}</h1>
            {isLoading && <p>Loading...</p>}
            {message && <p>Error: {message}</p>}
            {data ? (
                <>
                    <h2>Name : {data.category.name}</h2>
                    <img src={data.category.imageUrl} alt={data.category.name} />
                </>
            ) : (
                <p>No activity found.</p>
            )}
            
        </div>
    );
};

export default ActivityId;