import React from 'react'
import { useParams, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch';

export default function ProductDetails() {

    const { id } = useParams();
    const { loading, error, data } = useFetch(`http://localhost:1337/api/product-collections/${id}`);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    console.log(data);
    var ammount;

    if (id == -1) {
        ammount = 0;
        return (
            <div className='product-card'>
                <h2>Name of product:</h2>
                <input id="name" type="text" defaultValue="enter name" />

                <div className='ammount-container'>
                    <a className='sub' onClick={() => ammount--}>-</a>
                    <p id="ammount">In stock: {ammount}</p>
                    <a className='add' onClick={() => ammount++}>+</a>
                </div>

                <h3>Description:</h3>
                <textarea id="description" type="text" mul defaultValue="enter description" />
                <br />
                <div className='buttons'>
                    <a className='add-button' href='/'>Save</a>
                    <a className='add-button' href='/'>Cancel</a>
                </div>
            </div>
        )
    } else {
        ammount = data.attributes.product_ammount;
        return (
            <div className='product-card'>
                <h2>Name of product:</h2>
                <input id="name" type="text" defaultValue={data.attributes.product_name} />

                <div className='ammount-container'>
                    <a className='sub'>-</a>
                    <p id="ammount">In stock: {ammount}</p>
                    <a className='add'>+</a>
                </div>

                <h3>Description:</h3>
                <textarea id="description" defaultValue={data.attributes.product_description} />
                <br />
                <div className='buttons'>
                    <a className='add-button' href='/'>Save</a>
                    <a className='add-button' href='/'>Cancel</a>
                </div>
            </div>
        )
    }
}