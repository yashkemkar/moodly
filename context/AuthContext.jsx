'use client'
import { auth, db } from "@/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getDoc } from "firebase/firestore"
import React, { useContext, useState, useEffect } from "react"


const AuthContext = React.createContext()

// No input function, just called to provide Authorisation
export function useAuth() {
    return useContext(AuthContext)
}

// Wrapper function to wrap our entire application (either in Authorised state or Not Authorised state). Children get parsed in as props - where the children will be the whole app - so AuthContext can be accessed globally.
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [userDataObj, setUserDataObj] = useState({})
    const [loading, setLoading] = useState(true)

    // Auth Handlers
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        setUserDataObj({})
        setCurrentUser(null)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                // Set the user to our local context state
                setLoading(true)
                setCurrentUser(user)
                if (!user) {return}
                console.log('Fetching user data!')
                // if user exists, fetch data from firestore db
                const docRef= doc(db, 'users',user.uid)
                const docSnap = await getDoc(docRef)
                let firebaseData = {}
                // fetch document only if it exists
                if(docSnap.exists()) {
                    console.log('Found user data!')
                    firebaseData=docSnap.data()
                    console.log('firebaseData')
                }
                setUserDataObj(firebaseData)
            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        })
        return unsubscribe
    }, [])

    // user information and user data will be within the value object - passed on as a property of the AuthProvider wrapper function.
    const value = {
        currentUser,
        userDataObj,
        signup,
        logout,
        login ,
        loading  
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}