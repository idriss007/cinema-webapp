import React, { createContext, useState } from "react";

const StatesContext = createContext();

export function StatesProvider({children}) {

    const [searchQuery, setSearchQuery] = useState("");

    const data = {
        searchQuery,
        setSearchQuery,
    };

    return (
        <StatesContext.Provider value={data} >
            {children}
        </StatesContext.Provider>
    );
}

export default StatesContext;