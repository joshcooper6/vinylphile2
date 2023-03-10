import React, { useContext } from "react";
import AlbumContext from "../AlbumContext";

function ActiveAlbumModal(props) {
    const { activeAlbum, setActiveAlbum, addToCart } = useContext(AlbumContext);

    return (
        <div className={activeAlbum ? 'flex' : 'hidden'}>
            <h1>Testing</h1>
        </div>
    )
}

export default ActiveAlbumModal;