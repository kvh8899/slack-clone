import { editChannelOff } from "../store/showEditChannelForm"
import { editChannelThunk } from "../store/channels"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { useParams ,useNavigate} from "react-router"
import "./editChannelForm.css"

function EditChannelForm() {
    const dispatch = useDispatch()
    const { channelId } = useParams()
    const showForm = useSelector(state => state.editChannelFormReducer)

    const [channelName, setChannelName] = useState('')

    const editChannel = async e => {
        await dispatch(editChannelThunk(channelName, channelId))
    }

    return (
        <>
            { showForm && (
                <div
                    className="blackout"
                    onClick={e => {
                        dispatch(editChannelOff())
                    }}
                ></div>
            )}
            { showForm && (
                <form
                    className="channelForm"
                    onSubmit={async(e) => {
                        e.preventDefault()
                        if(channelName) {
                            dispatch(editChannelOff())
                            await editChannel()
                        }
                        setChannelName('')
                    }}
                >
                    <div className="form1">
                        <h2>Edit Text Channel</h2>
                        <label>Channel Name</label>
                        <input
                            placeholder={'# New Channel Name'}
                            value={channelName}
                            onChange={e => {
                                setChannelName(e.target.value)
                            }}
                            required
                        ></input>
                    </div>
                    <div id="channelButton">
                        <p
                            className="cancel"
                            onClick={e => {
                                dispatch(editChannelOff())
                                setChannelName('')
                            }}
                        >
                            Cancel
                        </p>
                        <button
                            className="submit" disabled={!channelName}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </>
    )
}

export default EditChannelForm
