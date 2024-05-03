import React from 'react'
import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom';

export default function Homepage() {

    const { loading, error, data } = useFetch('http://localhost:1337/api/product-collections');

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    console.log(data);

    return (
        <div>
            {data.data.map(product => (
                <div key={product.id} className='product-card'>
                    <h2>{product.attributes.product_name}</h2>
                    <div className='ammount'>In stock: {product.attributes.product_ammount}</div>

                    <small>Categories</small>


                    <h3>Description:</h3>
                    <p>{product.attributes.product_description.substring(0, 100)}...</p>

                    <Link to={`/details/${product.id}`}>Show details</Link>
                </div>
            ))}
        </div>
    )
}
