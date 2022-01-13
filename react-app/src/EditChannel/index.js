import { editChannelOn } from "../store/showEditChannelForm"
import { useDispatch } from "react-redux"
import "./editChannel.css"

function EditChannel() {
    const dispatch = useDispatch()

    return (
        <div className="editChanel">
            <button
                onClick={e => {
                    e.stopPropagation()
                    dispatch(editChannelOn())
                }}
                // className="editChannelButton"
            >
                Edit
            </button>
        </div>
    )
}

export default EditChannel
