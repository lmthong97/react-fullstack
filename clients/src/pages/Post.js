import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext';


function Post() {
    let{id} = useParams();
    const [postObject, setPostObject]= useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const {authState} = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/ById/${id}`)
        .then((response) => {
          setPostObject(response.data);
        });

        axios.get(`http://localhost:3001/comments/${id}`)
        .then((response) => {
          setComments(response.data);
        });
    },[id]);

    const addComment = () => {
      axios.post('http://localhost:3001/comments',{ 
          commentBody: newComment, 
          PostId: id
        },{
            headers:{
                accessToken: localStorage.getItem('accessToken'),
            }
        })
        .then((response) => {
            if (response.data.error){
                alert(response.data.error)
            } else {

                const commentToAdd = {
                    commentBody: newComment,
                    username: response.data.username
                };
                setComments([...comments, commentToAdd])
                setNewComment("");
            }
        })
    }

    const deleteComment = (id) => {
        axios.delete(`http://localhost:3001/comments/${id}`,{
            headers: {                
                accessToken: localStorage.getItem('accessToken'),
            }
        })
        .then(() => {
            setComments(comments.filter((val) => {
              return val.id !== id;
            }));
        });
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-sm-6" >

                    <div className="card border-primary post-item">
                        <div className="card-header" >
                            <h4 className="card-title mt-2">{postObject.title}</h4>
                        </div>
                        <p className="card-text">{postObject.postText}</p>
                        <div className="card-footer">
                            <h3>{postObject.username}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6" >
                    
                    <div className="form-group mb-2">
                        <h4>Comments Here:</h4>
                        <input type="text"
                            className="form-control m-2" placeholder="Comment..." 
                            value={newComment}
                            onChange={(event) => {
                                setNewComment(event.target.value)
                            }} 
                        />
                        <button onClick={addComment} type="button" class="btn btn-primary">Add Comments</button>
                    </div>
                    
                    <div className="listOfComments">
                        {comments.map((comments, key)=>{
                            return <div className="comment-items"> 
                                        <label>{comments.username}</label>
                                        {authState.username=== comments.username && 
                                        <button 
                                            type="button" 
                                            class="btn btn-danger" 
                                            onClick = {() => {deleteComment(comments.id)}} 
                                        >X</button>}
                                        <h5 key={key} >{comments.commentBody}</h5>
                                    </div> 
                                
                        })}
                    </div>

                </div>
            </div>
            
            
        </div>
    )
}

export default Post
