import { useEffect, useRef, useState } from "react"


export const useFetch = ( url ) => {

    //Persiste un objeto mutable el cual va a persistir durante todo el tiempo
    //de vida del componente
    const isMounted = useRef(true);
    const [state, setState] = useState({data: null, loading: true, error: null});

    useEffect(() => {
       return () => {
           isMounted.current = false;
       };
    }, []);

    useEffect(() => {

        setState({ data: null, loading:true, error: null });
        
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                //Con esto se corrige el error del que se llame el setState
                //luego de que el componente se desmonto
                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    });
                }
            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                });
            });

    }, [url])

    return state;
    
}
