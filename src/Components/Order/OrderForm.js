import { useEffect, useState } from "react";
import useHttp, { host } from "../../assets/requests";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import styles from "./OrderForm.module.css";

function OrderForm(props) {
  const [orderId, setOrderId] = useState("");
  const [clientName, setClientName] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [formError, setFormError] = useState("");

  const orderIdHandler = (event) => {
    setOrderId(event.target.value);
  };
  const clientNameHandler = (event) => {
    setClientName(event.target.value);
  };
  const orderDateHandler = (event) => {
    setOrderDate(event.target.value);
  };

  const [clients, setClients] = useState([]);
  const { sendRequest: getAllClients } = useHttp();

  useEffect(() => {
    getAllClients(
      {
        url: host + `/clients`,
        method: "get",
      },
      (data) => {
        setClients(data);
      }
    );
  }, [getAllClients]);

  const { isLoading, sendRequest } = useHttp();

  const searchOrder = () => {
    if (orderId) {
      props.search(orderId);
      sendRequest(
        {
          url: host + `/orders/${orderId}`,
          method: "get",
        },
        () => {}
      );
      setFormError("");
    } else {
      setFormError("* the order id must not be null");
    }
  };

  const addOrder = () => {
    if (orderDate && clientName) {
      sendRequest(
        {
          url: host + `/orders`,
          method: "post",
          headers: {
            "Content-Type": "Application/json",
          },
          body: {
            order_date: orderDate,
            client: clients.filter(
              (client) =>
                client.first_name + " " + client.last_name === clientName
            )[0],
          },
        },
        () => {}
      );
      setFormError("");
    } else {
      setFormError("* empty fields");
    }
  };

  const modifyOrder = () => {
    if (orderId) {
      sendRequest(
        {
          url: host + `/orders/${orderId}`,
          method: "put",
          headers: {
            "content-Type": "application/json",
          },
          body: {
            order_date: orderDate && orderDate ,
            client: clients.filter(
              (client) =>
                client.first_name + " " + client.last_name === clientName
            )[0],
          },
        },
        () => {}
      );
      setFormError("");
    } else {
      setFormError("* empty fields");
    }
  };

  const deleteOrder = () => {
    if (orderId) {
      sendRequest(
        {
          url: host + `/orders/${orderId}`,
          method: "delete",
        },
        () => {}
      );
      setFormError("");
    } else {
      setFormError("* the client id must not be null");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setOrderDate("");
    setOrderId("");
    setClientName("");
  };

  return (
    <div className={styles.card}>
      <form onSubmit={submitHandler} className={styles.form}>
        <h1>Orders</h1>
        <div className={styles.inputs}>
          <label>Order id</label>
          <div className={styles.search}>
            <input type="number" onChange={orderIdHandler} value={orderId} />
            <Button onClick={searchOrder}>search</Button>
          </div>
        </div>
        <div className={styles.inputs}>
          <label>Order date</label>
          <input type="date" onChange={orderDateHandler} />
        </div>
        <div className={styles.inputs}>
          <label>client name</label>
          <select onChange={clientNameHandler} value={clientName}>
            <option></option>
            {clients.map((client) => (
              <option key={client.client_id}>
                {client.first_name + " " + client.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.buttons}>
          <Button
            onClick={() => {
              props.search("");
            }}
          >
            show orders
          </Button>
          <Button onClick={addOrder}>add order</Button>
        </div>
        <div className={styles.buttons}>
          <Button onClick={modifyOrder}>modify order</Button>
          <Button onClick={deleteOrder}>delete order</Button>
        </div>
        {isLoading && <Spinner />}
        {formError && <p>{formError}</p>}
      </form>
      <img src="/images/order.jpg" alt="order" />
    </div>
  );
}
export default OrderForm;
