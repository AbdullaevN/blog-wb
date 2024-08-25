import { db } from '../db.js';

export const getUserById = (req, res) => {
    const userId = req.params.id;
    // const query = 'SELECT * FROM users WHERE id = ?';
    const query = 'SELECT id, username, email, img, createdAt FROM users WHERE id = ?';


    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(results[0]);
    });
};
//

export const updateUserById = (req, res) => {
    const userId = req.params.id;
    const { username, email, img } = req.body;

    // Check if all required fields are provided
    if (!username || !email) {
        return res.status(400).json({ message: 'Username and email are required' });
    }

    const query = 'UPDATE users SET username = ?, email = ?, img = ? WHERE id = ?';

    db.query(query, [username, email, img, userId], (err, results) => {
        if (err) {
            console.error('Error updating user data:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        res.status(200).json({ message: 'User updated successfully' });
    });
};



export const deleteUserById = (req,res) => {
    const userId = req.params.id
    const query = "DELETE FROM users WHERE id = ? "

    db.query(query, [userId], (err) => {
        if(err){
            console.error('Error deleting user: ', err)
            return res.status(500).json({message: 'server error'})
        }

        res.status(200).json({message: 'user deleted successfuly'})
    })
}