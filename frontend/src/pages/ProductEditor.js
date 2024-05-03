import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import useFetch from '../hooks/useFetch';
import CreateButton from '../hooks/useCreate';
import UpdateButton from '../hooks/useUpdate';

export default function ProductDetails() {
    const { id } = useParams();
    const isNewProduct = id === '-1';

    const { loading: loadingProduct, error: errorProduct, data: productData } = useFetch(`http://localhost:1337/api/product-collections/${id}`);
    const { loading: loadingAllProducts, error: errorAllProducts, data: allProductsData } = useFetch(`http://localhost:1337/api/product-collections`);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ammount, setAmmount] = useState(0);


    useEffect(() => {
        if (!isNewProduct && productData) {
            setName(productData.attributes.product_name);
            setDescription(productData.attributes.product_description);
            setAmmount(productData.attributes.product_ammount);
        }
    }, [isNewProduct, productData]);

    if (loadingProduct || loadingAllProducts) return <p>Loading...</p>;
    if (errorProduct || errorAllProducts) return <p>Error</p>;

    return (
        <div className='product-card'>
            <h2>Name of product:</h2>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />

            <div className='ammount-container'>
                <p>
                    In stock:
                    <input id="ammount" type="text" value={ammount} onChange={(e) => setAmmount(e.target.value)} />
                </p>
            </div>

            <h3>Description:</h3>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <br />
            <div className='buttons'>
                {isNewProduct ? (
                    <CreateButton
                        data={{
                            "data": {
                                "product_name": name,
                                "product_description": description,
                                "product_ammount": ammount
                            }
                        }}
                        onCreate={() => {
                            console.log("Creating new product");
                            window.location.href = "/";
                        }} />
                ) : (
                    <UpdateButton
                        id={id}
                        data={{
                            "data": {
                                "product_name": name,
                                "product_description": description,
                                "product_ammount": ammount
                            }
                        }}
                        onUpdate={() => {
                            console.log("Updating product with id:" + id);
                            window.location.href = "/";
                        }} />
                )}
                <Link className='add-button' to="/">Cancel</Link>
            </div>
        </div>
    );
}
