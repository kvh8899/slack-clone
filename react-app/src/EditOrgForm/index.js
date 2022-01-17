import { editOrgOff } from "../store/showEditOrg"
import { removeWorkspace, editOrgThunk } from "../store/organizations"
import React, { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams ,useNavigate} from "react-router"
import { getOrg } from "../store/orgmainchat"
import './editOrgForm.css'

function EditOrgFrom() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const org = useSelector(state => state.orgmainchatReducer)
    const session = useSelector(state => state.session.user)
    const showForm = useSelector(state => state.editOrgFormReducer)

    const [orgName, setOrgName] = useState('')
    const [errors, setErrors] = useState([])

    const editOrg = async e => {
        const data = await dispatch(editOrgThunk(orgName, id))
        await dispatch(getOrg(id))
        console.log(org)
        if (data) {
            return setErrors(data)
        }
    }

    const handleDelete = async e => {
        e.preventDefault()
        e.stopPropagation()
        await dispatch(removeWorkspace(id))
        navigate('/organization')
    }

    return (
        <>
            { showForm && (
                <div
                    className="blackout"
                    onClick={e => {
                        dispatch(editOrgOff())
                    }}
                ></div>
            )}
            { showForm && (
                <form
                    className="channelForm"
                    onSubmit={async(e) => {
                        e.preventDefault()
                        if(orgName) {
                            dispatch(editOrgOff())
                            await editOrg()
                        }
                        setOrgName('')
                    }}
                >
                    <div className="form1">
                        <h2>Edit Workspace Name</h2>
                        <label>Workspace Name</label>
                        <input
                            placeholder={'# New Workspace Name'}
                            value={orgName}
                            onChange={e => {
                                setOrgName(e.target.value)
                            }}
                            required
                        ></input>
                        {/* <div>
                            <label>Add User</label>
                            <input></input>
                        </div> */}
                    </div>
                    <div id='channelButton'>
                            <div
                                className="delete"
                                id={id}
                                onClick={handleDelete}
                            >
                                Delete <i className="fas fa-trash-alt"></i>
                            </div>
                            <p
                                className="cancel"
                                onClick={e => {
                                    dispatch(editOrgOff())
                                    setOrgName('')
                                }}
                            >
                                Cancel
                            </p>
                            <button
                                className="submit" disabled={!orgName}
                            >
                                Submit
                            </button>
                    </div>
                </form>
            )}
        </>
    )
}

export default EditOrgFrom
