import React, { useState } from "react";
import memeURL from "../memeApi";
import 

    export function AddMemes({ setDisplayAddMemes, fetchMemes }) {
        const [caption, setCaption] = useState("");
        const [tags, setTags] = useState("");
        const [image, setImage] = useState("");

        const handleSubmit = async (ev) => {
            const itemData = {
                caption: caption,
                tags: tags,
                image: image,
            };
            event.preventDefault();
            console.log("meme submitted");
            const response = await fetch(`${memeURL}/memes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(itemData),
            });
            const data = await response.json();
            setDisplayAddPage(false);
            fetchItems(data);
        };
        const handleSubmitS = async (ev) => {
            const memeData = {
                name: name,
                image: image,
            };
            event.preventDefault();
            console.log("memedata submitted");
            const response = await fetch(`${memeURL}/memedata`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(memeData),
            });
            const data = await response.json();
            setDisplayAddPage(false);
            fetchMemes(data);
        };

        return (
            <>
                <h1>Add a Meme!</h1>
                <br></br>
                <form onSubmit={() => handleSubmitS()}>
                    <h2>Add MEME</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)} />
                    <input
                        type="text"
                        placeholder="Image"
                        value={image}
                        onChange={(ev) => setImage(ev.target.value)} />
                    <button type="submit"> Submit</button>
                </form>
                <br></br>
                <form onSubmit={() => handleSubmit()}>
                    <h2>Add MEME</h2>
                    <input
                        type="text"
                        placeholder="Caption"
                        value={title}
                        onChange={(ev) => setCaption(ev.target.value)} />
                    <input
                        type="text"
                        placeholder="Tags"
                        value={price}
                        onChange={(ev) => setTags(ev.target.value)} />

                    <input
                        type="text"
                        placeholder="Image"
                        value={image}
                        onChange={(ev) => setImage(ev.target.value)} />
                    <button type="submit"> Submit</button>
                </form>
            </>
        );
    }
