import React, { useState, useEffect } from 'react';
import axios from "axios";

const UserList = (props) => {

    const [posts, setPosts] = useState([]);


    const getUserData = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

        const data = await response.data;
        setPosts(data);


    }

    useEffect(() => {
        getUserData();
    }, []);


    const deleteData = (e) => {
        console.log(e.target.value)
        let index = parseInt(e.target.value);
        console.log(index);
        setPosts(posts.filter(post => post.id !== index))
        console.log(posts)
        e.preventDefault();
    }

    const removeElement = async (e) => {
        let index = parseInt(e.target.value);
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${index}`);
        const newPosts = posts.filter((post) => post.id !== index);
        setPosts(newPosts);
    }

    const editData = async (e) => {
        let index = parseInt(e.target.value);
        let element = posts.findIndex(post => index === post.id)
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${index}`, {
            body: prompt("Enter new body: "),
            title: prompt("Enter new title: ")


        });

        let Abody = response.data.body;
        let Atitle = response.data.title;

        if (Abody == null || Atitle == null || Abody == "" || Atitle == "") {
            alert("Please enter both title and body");
        }
        else {
            posts[element].body = Abody;
            posts[element].title = Atitle;
        }

        // const posts = posts.filter((post) => post !== "");
        setPosts(posts.filter((post) => post !== ""));
        // console.log(posts)
    }

    return (

        posts.map(posts => (
            <div key={posts.id} className="card" id="card">

                <h3 id="id">ID {posts.id}</h3>
                <h4 id="title">TITLE:   {posts.title}</h4>
                <h3>Body:</h3>
                <p id="body">{posts.body}</p>
                <button className="btn" value={posts.id} onClick={removeElement}>Delete</button>
                <button className="btn" value={posts.id} onClick={editData}>Edit</button>
            </div >
        ))
    );
}

export default UserList;