import React from 'react'
import { useParams, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch';

export default function ProductDetails() {

    const { id } = useParams();
    const { loading, error, data } = useFetch(`http://localhost:1337/api/product-collections/${id}`);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    console.log(data);

    return (
        <div className='product-card'>
            <h2>{data.attributes.product_name}</h2>
            <div className='ammount'>In stock: {data.attributes.product_ammount}</div>

            <h3>Description:</h3>
            <p>{data.attributes.product_description}</p>

            <div className='buttons'>
                <a className='add-button' href='/'>Back</a>
            </div>
        </div>
    )
}
