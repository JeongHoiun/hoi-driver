import { useEffect, useState } from 'react';

export default function About() {
    const [name, setName] = useState<string>();
    useEffect(() => {
        const fetchPhotos = async () => {
            const res = await fetch('/api/hello');
            const { name } = await res.json();
            setName(name);
        };
        fetchPhotos();
    }, []);
    return <div>{name}</div>;
}
