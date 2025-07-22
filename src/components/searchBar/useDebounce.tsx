import {useState,useEffect} from 'react'

interface debounceProps {
    value:string,
    delay:number
}

const useDebounce = ({value,delay}:debounceProps) => {
    const [debounceTerm,setDebounceTerm] = useState('')
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebounceTerm(value)
        },delay)

        return ()=> clearTimeout(timer)
    },[value,delay])

    return debounceTerm
}

export default useDebounce