import { kuik } from './libkuik';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for post submit
ui.postSubmit.addEventListener('click', submitPost);

// Listen for cancel
ui.postCancel.addEventListener('click', cancelEdit);

// Listen for delete button click
ui.posts.addEventListener('click', deletePost);

// Listen for edit state
ui.posts.addEventListener('click', enableEdit);

// Listen for input in body
ui.bodyInput.addEventListener('input', updateCharacterCount);

// Get posts
function getPosts() {
    kuik.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => console.log(err));
}

// Submit post
function submitPost() {
    const body = ui.bodyInput.value;
    const id = ui.idInput.value;

    if (body === '') {
        ui.showAlert('Please fill in the text!', 'alert alert-danger');
        return 1;
    }

    const data = {
        body
    };

    if (id === '') {
        // Create Post
        kuik.post('http://localhost:3000/posts', data)
            .then(() => {
                ui.clearFields();
                ui.showAlert('Post added', 'alert alert-success');
                getPosts();
            })
            .catch(err => console.log(err));
    } else {
        // Edit post
        kuik.put(`http://localhost:3000/posts/${id}`, data)
            .then(() => {
                ui.showAlert('Post updated', 'alert alert-success');
                ui.changeFormState('add');
                getPosts();
            })
            .catch(err => console.log(err));
    }
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

function updateCharacterCount() {
    const count = ui.bodyInput.value.length;
    ui.updateCharacterCountElement(count);
}

function cancelEdit() {
    ui.changeFormState('add');
}