import React, { useState } from "react";
import { useAuthContext } from './useAuthContext'


export const useLogin = () => {
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async(email, password) => {
        setIsLoading(true)
        setError(null)

        // const json = await axios.post("/api/auth/signin", 
        //     { email, password }, 
        //     { headers: { "Content-Type": "application/json" } }
        // );
        const res = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password})
        })
        const json = await res.json()
        if(!res.ok){
            setIsLoading(false)
            setError(json.error) 
        }

        if(res.ok){
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(res))

            // update the auth context
            dispatch({type: 'LOGIN', payload: res})

            // update loading state
            setIsLoading(false)
        }
    }
    return { login, isLoading, error }
}


export const useRegister = () => {
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    
    const register = async (fullName, email, phone, password) => {
        setIsLoading(true)
        setError(null)
        const res = await fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({fullName, email, phone, password})
        })
        const json = await res.json()

        if(!res.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(res.ok){
            // save user to localStorage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({ type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }
    return {  register, isLoading, error }
 }