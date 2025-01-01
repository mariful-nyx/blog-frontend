"use client"

import { createContext, useState } from "react";

const GlobalContext = createContext()

const GlobalProvider = ({children}) => {
    const [openHeaderSidebar, setOpenHeaderSidebar] = useState(false)

    const toggleHeaderSidebar = () => {
        setOpenHeaderSidebar(!openHeaderSidebar)
    }
    return (
        <GlobalContext.Provider value={{
            openHeaderSidebar,
            toggleHeaderSidebar
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider