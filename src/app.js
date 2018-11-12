import { kuik } from './libkuik';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for post submit
ui.postSubmit.addEventListener('click', submitPost);

// Listen for delete button click
ui.posts.addEventListener('click', deletePost);

// Listen for edit state
ui.posts.addEventListener('click', enableEdit);

// Get posts
function getPosts() {
    kuik.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}

// Submit post
function submitPost() {
    const body = ui.bodyInput.value;

    const data = {
        body
    };

    // Create Post
    kuik.post('http://localhost:3000/posts', data)
        .then(() => {
            ui.clearFields();
            ui.showAlert('Post added', 'alert alert-success');
            getPosts();
        })
        .catch(err => console.log(err));
}

// Delete Post
function deletePost(e) {
    e.preventDefault();

    if (e.target.parentElement.classList.contains('delete')) {
        const id = e.target.parentElement.dataset.id;
        if (confirm('Are you sure?')) {
            kuik.delete(`http://localhost:3000/posts/${id}`)
                .then(() => {
                    getPosts();
                    ui.showAlert('Post Removed', 'alert alert-success');
                })
                .catch(err => console.log(err));
        }
    }

}

// Enable edit state
function enableEdit(e) {
    if (e.target.parentElement.classList.contains('edit')) {
        const id = e.target.parentElement.dataset.id;
        const body = e.target.parentElement.previousElementSibling.textContent;

        const data = {
            id,
            body
        };

        ui.fillForm(data);
    }
} 