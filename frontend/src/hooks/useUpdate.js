import { useState } from "react";

const useUpdate = (uri) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateData = async (id, data) => {
        setLoading(true);

        try {
            const res = await fetch(`${uri}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    return { loading, error, updateData };
}
const UpdateButton = ({ id, data, onUpdate }) => {
    const { loading, error, updateData } = useUpdate(`http://localhost:1337/api/product-collections`);

    const handleUpdate = async () => {
        try {
            await updateData(id, data);
            onUpdate();
        } catch (error) {
            console.error("Error creating data:", error);
        }
    };

    return (
        <button className="add-button" onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update"}
        </button>
    );
}
export default UpdateButton;
