import { useState } from "react";
import useHttp, { host,useHttpImages } from "../../assets/requests";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import styles from "./ClientForm.module.css";
import axios from 'axios';
 
import React,{Component} from 'react';
import ImageUploader from "./ImageUploader";

function ClientForm(props) {
  const [clientId, setClientId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [clientAge, setClientAge] = useState("");
  const [image,setImage] = useState(null);
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

  const imageHandler = (event) =>{
    setImage(event.target.files[0]);
    
    
  }
  
  // const onImageUpload = () =>{

    
    const { isLoading, sendRequest } = useHttpImages();
    const onImageUpload =(event)=>{
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => {
        setImage(reader.result);
        
      };

    }

  const searchClient = () => {
    if (clientId) {
      props.search(clientId);
      sendRequest(
        {
          url: host + `/clients/${clientId}`,
          method: "get",
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
  
  const addClient = () => {

    if (firstName && lastName && clientAge && image) {
    // const formData = new FormData();
    // formData.append("first_name",firstName);
    // formData.append("last_name",lastName);
    // formData.append("age",clientAge);
    // formData.append("image",image);
    // axios
    // .post(host + `/clients`, formData)
    // .then((res) => {
    //   alert("File Upload success");
    // })
    // .catch((err) => alert("File Upload Error"));

    const formData = new FormData();
    formData.append("first_name",firstName);
    formData.append("last_name",lastName);
    formData.append("age",clientAge);
    formData.append("image",image);
      sendRequest(
        {
          url: host + `/clients`,
          method: "post",
          headers: {
            "Content-Type": "Application/json",
          },
          body: formData
        },
        () => { }
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

  const submitHandler = (event) => {
    event.preventDefault();

    setClientAge("");
    setClientId("");
    setFirstName("");
    setLastName("");
    setImage(null);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}  enctype="multipart/form-data">
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
          placeholder="your last name"
          onChange={lastNameHandler}
          value={lastName}
        />
      </div>
      <div className={styles.inputs}>
        <label>First Name</label>
        <input
          type="text"
          placeholder="your first name"
          onChange={firstNameHandler}
          value={firstName}
        />
      </div>
      <div className={styles.inputs}>
        <label>Client Age</label>
        <input
          type="number"
          placeholder="your age"
          onChange={ageHandler}
          value={clientAge}
          min={0}
          max={100}
        />
      </div>

        <div className={styles.inputs}>
        <label>Upload image </label>
        <input type="file" name="image" onChange={imageHandler} value={image}  />
            <button onClick={onImageUpload}>Upload</button>
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
            props.search("");
          }}
        >
          show all clients
        </Button>
      </div>
    </form>
  );
}
export default ClientForm;
