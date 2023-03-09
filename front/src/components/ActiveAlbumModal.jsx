import React, { useContext } from "react";
import { AlbumContext } from "../App";

function ActiveAlbumModal(props) {
    const {activeAlbum, setActiveAlbum} = useContext(AlbumContext);

    return (
        <h1>Testing</h1>
    )
}

export default ActiveAlbumModal;