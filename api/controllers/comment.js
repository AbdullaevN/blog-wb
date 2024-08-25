import { db } from "../db.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"


export const addComment = (req, res) => {
    console.log('Add Comment Request:', req.body); // Log request body
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, 'jwtkey', (err, userInfo) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(403).json('Token is not valid');
        }

        const postId = req.params.postId;
        const content = req.body.content; // Use content from request body

        if (!content) {
            console.error('Content is missing in request body');
            return res.status(400).json("Content is required");
        }

        const q = "INSERT INTO comments (`postId`, `userId`, `content`) VALUES (?, ?, ?)";
        const values = [postId, userInfo.id, content];

        db.query(q, values, (err, data) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json(`Database error: ${err.message}`);
            }
            return res.status(200).json("Comment has been added");
        });
    });
};


export const getCommentsByPostId = (req, res) => {
    const postId = req.params.postId;
    const q = "SELECT c.id, c.content, c.createdAt, u.username, u.img AS userImg FROM comments c JOIN users u ON c.userId = u.id WHERE c.postId = ?";

    db.query(q, [postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const deleteComment = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, 'jwtkey', (err, userInfo) => {
        if (err) return res.status(403).json('Token is not valid');

        const commentId = req.params.id;
        const q = "DELETE FROM comments WHERE id = ? AND userId = ?";

        db.query(q, [commentId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows === 0) return res.status(403).json('You can delete only your comments');
            return res.status(200).json("Comment has been deleted");
        });
    });
};
