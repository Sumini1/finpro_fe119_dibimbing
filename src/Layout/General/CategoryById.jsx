import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGetCategoryById } from '../../reducer/categoryByIdSlice';
import { useParams } from 'react-router-dom';

const CategoryById = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, isLoading, message } = useSelector((state) => state.categoryById);
    useEffect(() => {
        dispatch(fetchGetCategoryById(id));
    }, [id, dispatch]); 
    return (
        <div>
            <h1>Category with ID: {id}</h1>
            {isLoading && <p>Loading...</p>}
            {message && <p>Error: {message}</p>}
            {data ? (
                <>
                    <h2>Name : {data.name}</h2>
                    <img src={data.imageUrl} alt={data.name} />
                </>
            ) : (
                <p>No category found.</p>
            )}
            
        </div>
    );
};

export default CategoryById;