import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Button, Col, Row } from "react-bootstrap";
import ProductCard from "../productCard/ProductCard";
import './Dashboard.css'
import NavBar from "../nav-footer/nav";
import Footer from "../nav-footer/footer";
const products = [
    // Bebidas
    {
        id: 1,
        productName: "Coca-Cola",
        productBrand: "Coca-Cola",
        productDetail: "Refresco de cola de 355 ml",
        productPrice: 1200,
        productImage: "https://http2.mlstatic.com/D_NQ_NP_914318-MLV45347421529_032021-O.webp",
        category: "Bebidas",
    },
    {
        id: 2,
        productName: "Pepsi",
        productBrand: "Pepsi",
        productDetail: "Refresco de cola de 355 ml",
        productPrice: 1100,
        productImage: "https://res.cloudinary.com/riqra/image/upload/v1682014535/sellers/merco-nuevo-leon/products/rh0exfu21r6ebt1dycbc.jpg",
        category: "Bebidas",
    },
    {
        id: 3,
        productName: "Sprite",
        productBrand: "Coca-Cola",
        productDetail: "Refresco sabor limón de 355 ml",
        productPrice: 1150,
        productImage: "https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750105530224L.jpg",
        category: "Bebidas",
    },
    {
        id: 4,
        productName: "Fanta Naranja",
        productBrand: "Coca-Cola",
        productDetail: "Refresco sabor naranja de 355 ml",
        productPrice: 1200,
        productImage: "https://www.distribuidoraniki.com.ar/database/articulos/fotos/335/Fanta%20Naranja%20Desc%20500cc%20pet__1.jpg",
        category: "Bebidas",
    },
    
    // Bebidas alcohólicas
    {
        id: 5,
        productName: "Corona",
        productBrand: "Grupo Modelo",
        productDetail: "Cerveza clara de 355 ml",
        productPrice: 1800,
        productImage: "https://http2.mlstatic.com/D_NQ_NP_815688-MLA44293782129_122020-O.webp",
        category: "Bebidas Alcohólicas",
    },
    {
        id: 6,
        productName: "Heineken",
        productBrand: "Heineken",
        productDetail: "Cerveza lager de 330 ml",
        productPrice: 2000,
        productImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfxcTiL32-FIWvby3Nfj9TeEtYmP5naoEqNg&s",
        category: "Bebidas Alcohólicas",
    },
    {
        id: 7,
        productName: "Bacardí Limón",
        productBrand: "Bacardí",
        productDetail: "Ron sabor limón de 355 ml",
        productPrice: 2500,
        productImage: "https://www.affinitydrinks.es/web/image/product.template/4428/image_1024?unique=e0fb397",
        category: "Bebidas Alcohólicas",
    },
    {
        id: 8,
        productName: "Jack Daniels",
        productBrand: "Jack Daniels",
        productDetail: "Whisky de 50 ml",
        productPrice: 3000,
        productImage: "https://http2.mlstatic.com/D_NQ_NP_620975-MLA77321417311_062024-O.webp",
        category: "Bebidas Alcohólicas",
    },
    
    // Caramelos
    {
        id: 9,
        productName: "M&M's",
        productBrand: "Mars",
        productDetail: "Dulces de chocolate de 100 g",
        productPrice: 1500,
        productImage: "https://acdn.mitiendanube.com/stores/001/132/452/products/mym-mani-d1fbe599c5870e506917134501908073-1024-1024.png",
        category: "Caramelos",
    },
    {
        id: 10,
        productName: "Skittles",
        productBrand: "Mars",
        productDetail: "Dulces de frutas de 100 g",
        productPrice: 1300,
        productImage: "https://acdn.mitiendanube.com/stores/001/132/452/products/skittles-rojo1-54fc637f2f4eda62ea16261104128364-1024-1024.jpg",
        category: "Caramelos",
    },
    {
        id: 11,
        productName: "Snickers",
        productBrand: "Mars",
        productDetail: "Barra de chocolate con maní de 50 g",
        productPrice: 1200,
        productImage: "https://http2.mlstatic.com/D_NQ_NP_688563-MLA49139368447_022022-O.webp",
        category: "Caramelos",
    },
    {
        id: 12,
        productName: "Fizz",
        productBrand: "Arcor",
        productDetail: "Caramelos acidos x5",
        productPrice: 500,
        productImage: "https://camoga.ar/media/catalog/product/cache/17183a23c5d57b885c9e1f3d66234d68/5/0/50010014_-_fizz_relleno_x48.jpg",
        category: "Caramelos",
    },
    {
        id: 13,
        productName: "Flynn Paff",
        productBrand: "Georgalos",
        productDetail: "Dulces de",
        productPrice: 200,
        productImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2Pze0pV1DWPFRBYbt4WvvzF-RzJXKXgRYRg&s",
        category: "Caramelos",
    },
    
    // Snacks
    {
        id: 14,
        productName: "Doritos",
        productBrand: "Frito-Lay",
        productDetail: "Botana de maíz con queso de 200 g",
        productPrice: 1800,
        productImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJlxjpsPbLtpSJUOIfhLRCADGuKQfM5TqKTA&s",
        category: "Snacks",
    },
    {
        id: 15,
        productName: "Cheetos",
        productBrand: "Frito-Lay",
        productDetail: "Botana de queso de 200 g",
        productPrice: 1500,
        productImage: "https://www.casa-segal.com/wp-content/uploads/2023/01/cheetos-queso-94-g-snacks-casa-segal-mendoza-ofertas-en-mendoza-casa-segal-min.jpg",
        category: "Snacks",
    },
    {
        id: 16,
        productName: "Lays",
        productBrand: "Frito-Lay",
        productDetail: "Papas fritas clásicas de 150 g",
        productPrice: 1400,
        productImage: "https://f2h.shop/media/catalog/product/cache/ab45d104292f1bb63d093e6be8310c97/l/a/lays_clasicas_150gx15_uy.png",
        category: "Snacks",
    },
    {
        id: 17,
        productName: "Pringles",
        productBrand: "Pringles",
        productDetail: "Papas fritas de diferentes sabores de 150 g",
        productPrice: 2000,
        productImage: "https://jumboargentina.vtexassets.com/arquivos/ids/800601/Papas-Fritas-Pringles-Original-X104gs-1-1000004.jpg?v=638355837787270000",
        category: "Snacks",
    },
    {
        id: 18,
        productName: "Saladix",
        productBrand: "Arcor",
        productDetail: "Galletitas saladas de diferentes sabores de 100 g",
        productPrice: 1000,
        productImage: "https://jumboargentina.vtexassets.com/arquivos/ids/766461/Galletitas-Saladix-Jam-n-100-Gr-Galletitas-Saladix-Jam-n-100-Gr-1-3368.jpg?v=638104413673200000",
        category: "Snacks",
    },
    
];

const Dashboard = () => {


    const navigate = useNavigate();

    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <>
            <NavBar />
            <div className="card-list">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        productName={product.productName}
                        productBrand={product.productBrand}
                        productDetail={product.productDetail}
                        productPrice={product.productPrice}
                        productImage={product.productImage}
                        onClick={() => handleCardClick(product.id)}
                    />
                ))}
            </div>
            <Footer />
        </>
    );
};

export { Dashboard, products };