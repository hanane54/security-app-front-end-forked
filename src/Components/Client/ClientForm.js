import { useState } from "react";
import useHttp, { host } from "../../assets/requests";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import styles from "./ClientForm.module.css";
import { useNavigate } from "react-router-dom";

function ClientForm(props) {
  const [clientId, setClientId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [clientAge, setClientAge] = useState("");
  const [formError, setFormError] = useState("");

  const clientIdHandler = (event) => {
    setClientId(event.target.value);
  };

  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const ageHandler = (event) => {
    setClientAge(event.target.value);
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const { isLoading, sendRequest } = useHttp();

  const searchClient = () => {
    if (clientId) {
      props.search(clientId);
      sendRequest(
        {
          url: host + `/clients/${clientId}`,
          method: "get",
        },
        () => {}
      );
      setFormError("");
    } else {
      setFormError("* the client id must not be null");
    }
  };

  const addClient = () => {
    if (firstName && lastName && clientAge) {
      sendRequest(
        {
          url: host + `/clients`,
          method: "post",
          headers: {
            "Content-Type": "Application/json",
          },
          body: {
            first_name: firstName,
            last_name: lastName,
            age: clientAge,
          },
        },
        () => {}
      );
      setFormError("");
    } else {
      setFormError("* empty fields");
    }
  };

  const modifyClient = () => {
    if (clientId) {
      sendRequest(
        {
          url: host + `/clients/${clientId}`,
          method: "put",
          headers: {
            "content-Type": "application/json",
          },
          body: {
            first_name: firstName ? firstName : "",
            last_name: lastName ? lastName : "",
            age: +clientAge ? +clientAge : -1,
          },
        },
        (data) => {
          console.log(data);
        }
      );
      setFormError("");
    } else {
      setFormError("* empty fields");
    }
  };

  const deleteClient = () => {
    if (clientId) {
      sendRequest(
        {
          url: host + `/clients/${clientId}`,
          method: "delete",
        },
        (data) => {
          console.log(data);
        }
      );
      setFormError("");
    } else {
      setFormError("* the client id must not be null");
    }
  };

  let navigate = useNavigate(); 
  const routeChange = (event) =>{
    event.preventDefault(); 
    let path = `/emission`; 
    navigate(path);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    setClientAge("");
    setClientId("");
    setFirstName("");
    setLastName("");
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.inputs}>
        <label> Client Id</label>
        <input
          type="number"
          placeholder="2"
          onChange={clientIdHandler}
          value={clientId}
        />
        <Button onClick={searchClient}>search</Button>
      </div>
      <div className={styles.inputs}>
        <label>Last Name</label>
        <input
          type="text"
          placeholder="last name"
          onChange={lastNameHandler}
          value={lastName}
        />
      </div>
      <div className={styles.inputs}>
        <label>First Name</label>
        <input
          type="text"
          placeholder="first name"
          onChange={firstNameHandler}
          value={firstName}
        />
      </div>
      <div className={styles.inputs}>
        <label>Client Age</label>
        <input
          type="number"
          placeholder="22"
          onChange={ageHandler}
          value={clientAge}
          min={0}
          max={100}
        />
      </div>
      {formError && <p>{formError}</p>}
      {isLoading && <Spinner />}
      {/* {(!isLoading && !error) && <p>request succeeded</p>} */}
      <div className={styles.buttons}>
        <Button onClick={addClient}>Add client</Button>
        <Button onClick={modifyClient}>modify client</Button>
        <Button onClick={deleteClient}>delete client</Button>
        <Button
          onClick={() => {
            window.location.reload(false);
          }}
        >
          show all clients
        </Button>
        <Button onClick={routeChange}>Emission</Button>
      </div>
    </form>
  );
}
export default ClientForm;
