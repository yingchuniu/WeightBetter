import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecentComments() {
    const [commentsData, setCommentsData] = useState({ comments: [], related_posts: [] });

    useEffect(() => {
        axios.get('/api/recent-comments')
            .then(response => {
                setCommentsData(response.data);
            });
    }, []);

    return (
        <div>
            <h2>最近留言</h2>
            <ul>
                {commentsData.comments.map((comment, index) => (
                    <li key={comment.id}>
                        <p>{comment.username}：{comment.content}</p>
                        <a href={`/blog/${commentsData.related_posts[index].id}`}>
                            相關文章：{commentsData.related_posts[index].title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecentComments;
