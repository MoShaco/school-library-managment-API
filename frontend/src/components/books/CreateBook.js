'use client';

export default function CreateBook() {
    const categories = ["Drama", "Action"];

    const CreateBookRequest = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries());
        
        // Check user input
        if (data.author === "" || data.publish === "" || data.title === "" || !data.category) {
            alert('Please fill in all the required entries!');
            return;
        }

        // Check Points range
        let points = data.points
        if (points < 1 || points > 5) {
            alert('Points must be between 1 and 5');
            return;
        }

        // Check image extension
        let filename = data.image.name;
        let extension = filename.split('.').pop();
        let acceptedExtensions = ['png', 'jpg', 'jpeg', 'bmp'];
        if (!acceptedExtensions.includes(extension)) {
            alert('Only png, jpg, jpeg, and bmp extensions allowed!');
            return;
        }
        
        // Send fetch request to server
        fetch('/api/create_books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success', data);
        })
        .catch((err) => console.log('Error:', err));
    }

    return (
        <div className="create-book">
            <form method="post" onSubmit={(e) => CreateBookRequest(e)}>
                <input type="text" name="title" placeholder="Title..." required />
                <input type="text" name="author" placeholder="Author..." required />
                <input type="date" name="publish_date" placeholder="Author..." required />
                <select name="category" defaultValue="" required>
                    <option value="" disabled>Category</option>
                {categories.map(category => (
                    <option key={category}>{category}</option>
                ))}
                </select>
                <textarea name="description" />
                <input type="number" name="points" placeholder="Points 1 - 5..." min="1" max="5" required />
                <input type="file" name="image" />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};