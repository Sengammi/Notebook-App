import {useState, useEffect, useCallback} from "react";

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isReady, setIsReady] = useState(false)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem("userDate", JSON.stringify({
            userId: id,
            token: jwtToken
        }))
    }, [])

    const logout = () => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem("userDate")
    }

    useEffect(() =>{
        const data = JSON.parse(localStorage.getItem("userDate"))
        if (data && data.token) {
            login(data.token, data.userId)
        }
        setIsReady(true)
    },[login])

    return {login, logout, token, userId, isReady}
}