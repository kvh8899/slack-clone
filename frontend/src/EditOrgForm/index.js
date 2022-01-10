import React, { useState } from "react";
import { editOrgThunk } from '../store/organizations';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";


function OrgEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [orgName, setOrgName] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const data = await dispatch(editOrgThunk(orgName));
        if (data) {
            return setErrors(data);
        }
        navigate('/organization');
    };

    return (
        <div>
            <div>
                <p> Edit your Organization.</p>
                <ul className="errors-container">
                    {errors.map((error, idx) => (
                        <li className='errors' key={idx}>{error}</li>
                    ))}
                </ul>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder={"Name"}
                        required
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                    />
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default OrgEdit;
