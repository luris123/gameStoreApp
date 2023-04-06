import { createContext, useState } from "react";

const ProductCartContext = createContext({});

export const ProductContext = ({ children }) => {
    const [ product, setProduct ] = useState([]);

    return (
        <ProductCartContext.Provider value={{product, setProduct}}>
            {children}
        </ProductCartContext.Provider>
    )
}

export default ProductCartContext;



