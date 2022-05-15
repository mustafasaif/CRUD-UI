import { React, useState } from 'react'
import axios from 'axios';
// import { isUndefined } from 'lodash';
import './form.css'

function Newuser() {
    const [state, setState] = useState({
        fname: '',
        age: '',
        email: ''
    })
    const [postdata, setPostdata] = useState(undefined)
    console.log(postdata)

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const post = await axios.post("http://localhost:3002/create_user", {
                Name: state.fname,
                Age: state.age,
                Email: state.email
            })
            // console.log(post)
            if (post.data.Name) {
                alert(" NEW USER CREATED SUCCESSFULLY " + post.data.Name + "  " + post.data.Age + "  " + post.data.Email)
                setPostdata(post.data)
            }
            else {  
                alert(post.data.message.errors.Email.message)
            }
        } catch (err) {
            console.error(err)
        }
    }
    const handleChange = (event) => {
        const value = event.target.value
        setState({
            ...state,
            [event.target.name]: value
        })
    }
    return (
        <div>
            <form onSubmit={handlesubmit} className="formstyle">
                <label className="labelstyle">Name</label>
                <input className="inputstyle" type="text" name="fname" value={state.fname} onChange={handleChange} required minlength="2" />
                <label className="labelstyle">Age</label>
                <input className="inputstyle" type="text" name="age" value={state.age} onChange={handleChange} required minlength="2" maxLength="2" />
                <label className="labelstyle">Email</label>
                <input className="inputstyle" type="email" name="email" value={state.email} onChange={handleChange} required />
                <button type="submit" className="fill" >Submit</button>
            </form>
            {/* {!isUndefined(postdata) &&
                <ul>
                    <li> {postdata.Name}</li>
                    <li>{postdata.Age}</li>
                </ul>} */}
        </div>
    )
}

export default Newuser;