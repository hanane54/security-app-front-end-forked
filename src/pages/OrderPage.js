import { useState } from "react";
import { Link } from "react-router-dom";
import OrderForm from "../Components/Order/OrderForm";
import OrderList from "../Components/Order/OrderList";
import styles from "./OrderPage.module.css";

function OrderPage() {
  const [searchedOrderId, setSearchedOrderId] = useState();
  const searchHandler = (id) => {
    setSearchedOrderId(id);
  };
  return (
    <div className={styles.orders}>
      <h1>this is the orders page</h1>
      <OrderForm search={searchHandler} />
      <h1>searched Orders</h1>
      <OrderList orderId={searchedOrderId} />
      <Link className={styles.link} to="/">
        Home
      </Link>
    </div>
  );
}
export default OrderPage;
