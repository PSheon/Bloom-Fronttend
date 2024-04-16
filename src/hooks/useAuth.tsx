// ** React Imports
import { useContext } from 'react'

// ** Context Imports
import { AuthContext } from 'src/context/AuthContext'

export const useAuth = () => useContext(AuthContext)
