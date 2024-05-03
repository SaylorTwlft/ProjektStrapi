import { useState } from "react";

export const useCreate = (uri) => {
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

            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    return { loading, error, createData };
}

export const CreateButton = ({ data, onCreate }) => {
    const { loading, error, createData } = useCreate('http://localhost:1337/api/product-collections');

    const handleCreate = async () => {
        try {
            await createData(data);
            onCreate();
        } catch (error) {
            console.error("Error creating data:", error);
        }
    };

    return (
        <button className="add-button" onClick={handleCreate} disabled={loading}>
            {loading ? "Saving..." : "Save"}
        </button>
    );
}

export default CreateButton;

