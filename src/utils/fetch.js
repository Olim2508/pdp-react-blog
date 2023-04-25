import {useEffect, useState} from "react";


const useGetRequest = ({url}) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController()

        const headers = { 'Content-Type': 'application/json' }
        fetch(url, {headers, signal: abortCont.signal})
            .then((res) => {
              if (res.status !== 200) {
                throw Error("could not fetch the data")
              }
              return res.json()
            })
            .then((data) => {
                setData(data)
                setIsLoading(false)
            })
            .catch((err) => {
                if (err.name === "AbortError") {
                    console.log('fetch aborted')
                } else {
                    setIsLoading(false)
                    setError(err.message)
                }
            })
        // cleanup function
        return () => abortCont.abort()
    }, [url])

    return {data, isLoading, error}
}

export default useGetRequest