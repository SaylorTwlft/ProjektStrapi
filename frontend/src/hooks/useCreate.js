import { useState } from "react";

const useCreate = (uri) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const createData = async (data) => {
        setLoading(true);

        try {
            const res = await fetch(uri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Handle response if needed

            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    return { loading, error, createData };
}

const CreateButton = ({ id, onCreate }) => {
    const { loading, error, createData } = useCreate('http://localhost:1337/api/product-collections');
}

export default CreateButton;

