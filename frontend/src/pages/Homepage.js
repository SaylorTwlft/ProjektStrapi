import React from 'react'
import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom';
import DeleteButton from '../hooks/useDelete'

export const count = 0;

export default function Homepage() {

    const { loading, error, data } = useFetch('http://localhost:1337/api/product-collections');


    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>


    console.log(data);

    return (
        <div>
            <a className='add-button' href='/edit/-1'>Add new</a>
            {data.map(product => (
                <div key={product.id} className='product-card'>
                    <h2>{product.attributes.product_name}</h2>
                    <div className='ammount-container'>
                        <p>In stock: {product.attributes.product_ammount}</p>
                    </div>

                    <h3>Description:</h3>
                    <p>{product.attributes.product_description.substring(0, 100)}...</p>

                    <Link to={`/details/${product.id}`}>Show details</Link>
                    <br />
                    <div className='buttons'>
                        <a className='add-button' href={`/edit/${product.id}`}>Edit</a>
                        <DeleteButton id={product.id} onDelete={() => {
                            console.log("Deleting product with id:" + product.id);
                            window.location.reload(false);
                        }} />
                    </div>
                </div>
            ))}
        </div>
    )
}
