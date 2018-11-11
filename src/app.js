import { kuik } from './libkuik';
import { ui } from './ui';
import { getPriority } from 'os';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for post submit
ui.postSubmit.addEventListener('click', submitPost);

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
        .then(data => {
            ui.showAlert('Post added', 'alert alert-success');
            getPosts();
        })
        .catch(err => console.log(err));
}