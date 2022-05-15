import { React, useState } from 'react'
import axios from 'axios'
import './form.css'

function UpdateUser() {
    const [userinfo, setUserinfo] = useState({
        fname: undefined,
        Age: undefined,
        id: undefined,
        email: undefined
    })

    const handlechange = (event) => {
        const value = event.target.value
        setUserinfo({
            ...userinfo,
            [event.target.name]: value
        })
    }
    const handleupdate = async (id, event) => {
        event.preventDefault();
        try {
            const updateduser = await axios.patch("http://localhost:3002/create_user/" + id, {
                Name: userinfo.fname,
                Age: userinfo.Age,
                Email: userinfo.email
            })
            console.log(updateduser)
            if (updateduser.data.n===1) {
                alert("USER DETAILS UPDATED SUCCESSFULLY")
                // console.log(updateduser)
            }
            else{
                alert("INVALID USER ID PLEASE TRY AGAIN")
            }

        } catch (err) {
            console.log(err)

        }
    }
    return (
        <form onSubmit ={(e) => handleupdate(userinfo.id, e)} className="formstyle">
            <label className="labelstyle">ID</label>
            <input className="inputstyle" type="text" name="id" value={userinfo.id} onChange={handlechange} required></input>
            <label className="labelstyle">Name</label>
            <input className="inputstyle" type="text" name="fname" value={userinfo.fname} onChange={handlechange}></input>
            <label className="labelstyle">Age</label>
            <input className="inputstyle" type="text" name="Age" value={userinfo.Age} onChange={handlechange}></input>
            <label className="labelstyle">Email</label>
            <input className="inputstyle" type="text" name="email" value={userinfo.email} onChange={handlechange}></input>
            <button className="fill" type="submit">Submit</button>
        </form>
    )
}


export default UpdateUser