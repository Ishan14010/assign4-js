const apiUrl = 'https://jsonplaceholder.typicode.com';

// Use your GitHub personal access token (replace 'GITHUB_TOKEN' with your actual token)
const githubAccessToken = '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';

async function fetchPosts() {
    try {
        const response = await fetch(`${apiUrl}/posts`);
        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        const posts = await response.json();
        return posts;
    } catch (e) {
        console.error(e);
        return null;
    }
}

function listPosts(postContainerElementId) {
    const postContainerElement = document.getElementById(postContainerElementId);
    if (!postContainerElement) {
        return;
    }

    // Fetch posts and update the container
    fetchPosts()
        .then((posts) => {
            if (!posts) {
                postContainerElement.innerHTML = 'No posts fetched.';
                return;
            }
            
            // Add student information before posts
            const studentInfo = document.createElement('p');
            studentInfo.textContent = 'Student ID: 200518162, Name: Ishan Sharma';
            postContainerElement.parentNode.insertBefore(studentInfo, postContainerElement);

            // Add each post to the container
            for (const post of posts) {
                postContainerElement.appendChild(postElement(post));
            }
        })
        .catch((e) => {
            console.error(e);
        });
}

function postElement(post) {
    const anchorElement = document.createElement('a');
    anchorElement.setAttribute('href', `${apiUrl}/posts/${post.id}`);
    anchorElement.setAttribute('target', '_blank');
    anchorElement.innerText = capitalizeFirstLetter(post.title);

    const postTitleElement = document.createElement('h3');
    postTitleElement.appendChild(anchorElement);
    return postTitleElement; 
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// No need to call listPosts here
