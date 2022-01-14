import { editChannelOn } from "../store/showEditChannelForm"
import { useDispatch } from "react-redux"
import "./editChannel.css"

function EditChannel() {
    const dispatch = useDispatch()

    return (
        <div className="editChannel">
            <button
                onClick={e => {
                    e.stopPropagation()
                    dispatch(editChannelOn())
                }}
                className="unselect"
            >
                Edit
            </button>
        </div>
    )
}

export default EditChannel
