import { useState } from "react";
import { onAction } from "../store/showForm";
import { useDispatch, useSelector } from "react-redux";
import "./search.css";
import { useNavigate } from "react-router";
import SingleMember from "../SingleMember";

function Search() {
    const dispatch = useDispatch();
    const { search } = window.location
    const query = new URLSearchParams(search).get('s')
    const members = useSelector((state) => state.orgmainchatReducer.members);
    const id = useSelector((state) => state.orgmainchatReducer.id);
    const [searchQuery, setSearchQuery] = useState(query || '');
    const history = useNavigate();

    const filterMembers = (members, query) => {
        if (!query) {
            return members;
        }

        return members.filter((member) => {
            const memberName = member.username.toLowerCase();
            return memberName.includes(query.toLowerCase());
        });
    };
    const onSubmit = e => {
        // e.preventDefault()
        // history.push(`/organizations/${id}/?s=${searchQuery}`)
    };

    const filteredMembers = filterMembers(members, searchQuery)
    return (
        <>
            <input
                value={searchQuery}
                onInput={e => setSearchQuery(e.target.value)}
                className="searchbar"
                type="text"
                id="header-search"
                placeholder="Search Users"
                name="s"
                autoComplete="off"
            />
            {searchQuery.length > 0 && <ul >
                {searchQuery.length > 0 && (filteredMembers.map(member => {
                    return (
                        <>
                            < li key={member.id} >
                                <SingleMember username={member.username} />
                            </li>
                            <li>user1</li>
                            <li>user2</li>
                            <li>user3</li>
                            <li>user3</li>
                            <li>user3</li>
                            <li>user3</li>
                        </>
                    )
                })
                )}
            </ul>
            }
        </>
    );
}

export default Search;
