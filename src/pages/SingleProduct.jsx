import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { useCartContext } from "../context/CartContext";
import PageNavigation from "../components/PageNavigation";
import MyImage from "../components/MyImage";
import { Container } from "../styles/Container";
import FormatPrice from "../Helpers/FormatPrice";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import Star from "../components/Star";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";

import AddToCart from "../components/AddToCart";

const API = "https://dummyjson.com/products/";

const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    getSingleProduct(`${API}${id}`);
  }, []);

  const {
    title,
    description,
    category,
    price,
    rating,
    stock,
    brand,
    reviews,
    images,
  } = singleProduct;

  // console.log("single",singleProduct);

  // useEffect(() => {
  //   console.log(singleProduct); // Check if singleProduct is populated
  // }, [singleProduct]);

  if (isSingleLoading) {
    return (
      <Wrapper>
        <div className="page_loading">Loading.....</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <PageNavigation title={title} />
      <Container className="container">
        <div className="grid grid-two-column">
          {/* product Images  */}
          <div className="product_images">
            <MyImage imgs={images} />
          </div>

          {/* product data  */}
          <div className="product-data">
            <h2>{title}</h2>
            <Star stars={rating} reviews={reviews ? reviews.length : 0} />

            <p className="product-data-price">
              MRP:
              <del>
                <FormatPrice price={price + 10} />
              </del>
            </p>
            <p className="product-data-price product-data-real-price">
              Deal of the Day: <FormatPrice price={price} />
            </p>
            <p>{description}</p>
            <div className="product-data-warranty">
              {category === "groceries" ? (
                <div className="product-warranty-data">
                  <MdOutlineLocalGroceryStore className="warranty-icon" />
                  <p>Shop Today</p>
                </div>
              ) : (
                <div className="product-warranty-data">
                  <TbReplace className="warranty-icon" />
                  <p>30 Days replacement</p>
                </div>
              )}
              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Free Delivery</p>
              </div>

              {category === "groceries" ? (
                <div className="product-warranty-data">
                  <FiShoppingBag className="warranty-icon" />
                  <p>Fresh Delivery</p>
                </div>
              ) : (
                <div className="product-warranty-data">
                  <MdSecurity className="warranty-icon" />
                  <p>2 Year Warranty </p>
                </div>
              )}
            </div>

            <div className="product-data-info">
              <p>
                Available:
                <span> {stock > 0 ? "In Stock" : "Not Available"}</span>
              </p>
              <p>
                ID : <span> {id} </span>
              </p>
              {category !== "groceries" && (
                <p>
                  Brand :<span> {brand} </span>
                </p>
              )}
            </div>
            <hr />
            {stock > 0 && <AddToCart product={singleProduct} />}
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }

  .product_images {
    display: flex;
    align-items: center;
  }

  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page_loading {
    font-size: 3.2rem;
    height: 100vh; /*for full ht*/
    color: rgba(29, 29, 29, 0.8); /* Color for the loading text */
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    animation: blink 1s infinite; /* Optional animation */

    @keyframes blink {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleProduct;
