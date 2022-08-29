import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState([])
    const [error, setError] = useState([])

useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get(url);
            setData(res.data)
        } catch (err) {
            setError(err)
        }
        setLoading(false)
    };
    fetchData();
}, [url]);

const reFetch = async () => {
    try {
        const res = await axios.get(url);
        setData(res.data)
    } catch (err) {
        setError(err)
    }
    setLoading(false)
};

return {data, loading, error, reFetch };
};

export default useFetch;
