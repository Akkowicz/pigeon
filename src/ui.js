class UI {
    constructor() {
        this.posts = document.querySelector('#posts');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.container = document.querySelector('.postsContainer');
        this.forState = 'add';
    }

    showPosts(posts) {
        let output = '';
        posts.forEach((post) => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="fa fa-remove"></i>
                        </a>

                    </div>
                </div>
            `;
        });
        
        this.posts.innerHTML = output;
    }

    showAlert(message, className) {
        this.clearAlert();
        // Create element
        const div = document.createElement('div');
        // Add classes
        div.className = className;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Append to the DOM
        this.container.insertBefore(div, this.posts);

        // Remove after some time
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
        
    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearFields() {
        this.bodyInput.value = '';
    }

    fillForm(data) {
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;
    }
}

export const ui = new UI;