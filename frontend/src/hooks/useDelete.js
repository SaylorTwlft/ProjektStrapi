import { useState } from "react";

export const useDelete = (uri) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const deleteData = async (id) => {
        setLoading(true);

        try {
            const res = await fetch(`${uri}/${id}`, {
                method: 'DELETE'
            });

            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    return { loading, error, deleteData };
}

const DeleteButton = ({ id, onDelete }) => {
    const { loading, error, deleteData } = useDelete(`http://localhost:1337/api/product-collections`);

    const handleDelete = async () => {
        try {
            await deleteData(id);
            onDelete();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    return (
        <button className="add-button" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
        </button>
    );
};

export default DeleteButton;
