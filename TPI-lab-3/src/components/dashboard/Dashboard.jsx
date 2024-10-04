import { useState } from "react";

const products = [
    {
        id: 1,
        productName: "Goma de borrar",
        productBrand: "FaberCastell",
        productDetail: "... goma de borrar buena",
        productPrice: 100,
        prductImage:
            "https://images.cdn3.buscalibre.com/fit-in/360x360/61/8d/618d227e8967274cd9589a549adff52d.jpg",
    },
    {
        id: 2,
        productName: "Goma de borrar2",
        productBrand: "FaberCastell2",
        productDetail: "2... goma de borrar buena",
        productPrice: 102,
        prductImage:
            "https://images.cdn3.buscalibre.com/fit-in/360x360/61/8d/618d227e8967274cd9589a549adff52d.jpg",
    },
];
const Dashboard = () => {

    return (
        <>
            <h2>Productos</h2>
            <p>info de cada producto!</p>

        </>
    );
};
export default Dashboard;