import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import styles from "./Employee.module.css";
import { DisplayEmployees } from './DisplayEmployees';

export const Employee = () => {

  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(true)
  const [firstname, setfirstname] = useState("")
  const [lastname, setlastname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [address, setaddress] = useState("")
  const [city, setcity] = useState("")
  const [country, setcountry] = useState("")

  const [data, setData] = useState([]);

  useEffect(() => {
    getEmployees()
  }, [])
  /* HERE WHEN USER CLICK ON SUMBIT DETAILS BUTTON, THE EMPLOYEE DETAILS ARE STORED IN DB.JSON */
  const handleSubmit = (e) => {

    e.preventDefault()
    if (firstname == "" || lastname == "" || email == "" || phone == "" || password == "" || city == "" || country == "" || address == "") {
      alert("field can not be Empty")
    }
    else if (password.length < 6) {
      alert(
        "Password length must be above 6"
      )
    }
    else if (phone.length !== 10) {
      alert("Please enter a valid mobile number")

    }
    else {
      if(email.split("@")[1]=="gmail.com"){
        fetch(`http://localhost:3001/Employees`, {
        method: "POST",
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          phone: phone,
          password: password,
          address: address,
          city: city,
          country: country,
        }),
        headers: {
          "content-Type": "application/json"
        }
      }).then(getEmployees).then(UpdateEmployees)
      }
      else{
        alert("email is not valid")
      }
    }
  

  }

  

  /* HERE I AM GETTING THE EMPLOYEE DETAILS FROM THE DB.JSON */
  const getEmployees = () => {
    fetch(`http://localhost:3001/Employees`)
      .then(x => x.json())
      .then(res => setData(res))
      .then(() => { setLoading(false) })
      .catch(err => {
        console.log(err.message)
      })
  }
  /*HERE UPDATING THE EMPLOYEE DETAILS */
  const UpdateEmployees = () => {
    fetch(`http://localhost:3001/Employees?firstname=${firstname}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: firstname,
      })
    }).then(response => response.json())
      .then(data => {
        if (data.firstname === firstname) {
          alert("The User Already Exist, Do you Want to Upadated the user")
        }
      })
  }
  return (loading ? "....loading please wait" : <div>
    <div id={styles.FormLayout}>
      {/* HERE IS THE FORM */}
      <form onSubmit={handleSubmit}>
        <div className={styles.textfieldstyles}>
          <TextField id="outlined-First Name" style={{ margin: "20px 0px 20px 0px" }} onChange={(e) => { setfirstname(e.target.value); }} label="first name" variant="outlined" />
          <TextField id="outlined-Last Name" style={{ margin: "20px 0px 20px 0px" }} onChange={(e) => { setlastname(e.target.value); }} label="lastname" variant="outlined" />
          <TextField id="outlined-Email" style={{ margin: "20px 0px 20px 0px" }} onChange={(e) => { setemail(e.target.value); }} label="Email" variant="outlined" />
          <TextField id="outlined-Password" style={{ margin: "20px 0px 20px 0px" }} onChange={(e) => { setpassword(e.target.value); }} label="password" variant="outlined" />
          <TextField id="outlined-Phone" style={{ margin: "20px 0px 20px 0px" }} onChange={(e) => { setPhone(e.target.value); }} label="Phone" variant="outlined" />
          <TextField id="outlined-Address" style={{ margin: "20px 0px 20px 0px" }} onChange={(e) => { setaddress(e.target.value); }} label="address" variant="outlined" />
          <TextField id="outlined-city" style={{ margin: "20px 0px 20px 0px" }} onChange={(e) => { setcity(e.target.value); }} label="city" variant="outlined" />
          <TextField id="outlined-country" style={{ margin: "20px 0px 20px 0px" }} onChange={(e) => { setcountry(e.target.value); }} label="country" variant="outlined" />

        </div>

        <Button variant="contained" type="submit" className={styles.submitBtn}>Submit Details</Button>
      </form>
    </div>
    <h1 className={styles.EmployeeDetailsHeading}>Employees Details</h1>
    <div className={styles.DisplayEmployeePropTags}>
      <DisplayEmployees data={data} />
    </div>
  </div>)
}