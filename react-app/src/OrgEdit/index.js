import React, { useState } from "react";
import { editOrgThunk } from '../store/organizations';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import './orgedit.css'

function OrgEdit({ setShowForm, setShowh2 }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [orgName, setOrgName] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        // const data = await dispatch(editOrgThunk(orgName));
        // if (data) {
        //     return setErrors(data);
        // }
        setShowForm(false)
        setShowh2(true)
    };

    return (
        <div>
            <div>
                <form className='editorgform' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder={"Name"}
                        required
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                    />
                    <button className="editbutton">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default OrgEdit;
