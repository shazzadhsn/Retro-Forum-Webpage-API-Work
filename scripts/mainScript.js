// post container
const postContainer = document.getElementById("all-post-container");
// fetching all post list using api
const allPostFunc = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await(res.json());

    const allPosts = data.posts;
    
    
    for(post of allPosts) {
        listingFetchedPosts(post);
    }

}
let counter = 0;
const listingFetchedPosts = (post) => {
    const singlePost = document.createElement("div");
    singlePost.classList = `posts bg-[#F3F3F5] rounded-2xl flex flex-col items-center md:flex-row justify-evenly mb-10`;
    singlePost.innerHTML = `
        <div class="avatar avatar-online p-4 h-full">
            <div class="w-24 h-24 rounded-full">
                <img src="${post.image}" />
            </div>
        </div>
        <div class="post-text-content py-4 w-10/12">
            <span id="post-category">#${post.category}</span>
            <span id="author">Author: ${post.author.name}</span>
            <p id="post-title" class="my-2 text-xl font-bold">${post.title}</p>
            <p id="post-description" class="w-9/12">${post.description}</p>
            <hr class="border-t-2 border-dashed border-black-500 my-4 w-11/12">
            <div id="event-parent" class="flex items-center gap-5">
                <div class="flex gap-1">
                    <img src="./assets/icons/message.png" class="w-5" alt="">
                    <span>${post.comment_count}</span>
                </div>
                <div class="flex gap-1">
                    <img src="./assets/icons/view.png" class="w-5" alt="">
                    <span>${post.view_count}</span>
                </div>
                <div class="flex gap-1 flex items-center">
                    <img src="./assets/icons/clock.png" class="w-5 h-5 md:w-5" alt="">
                    <span>${post.posted_time} min</span>
                </div>
                <img id="seen-click" src="./assets/icons/mail.png" class="w-7" alt="">
            </div>
        </div>
    `;
    postContainer.appendChild(singlePost);
    const seenPost = singlePost.querySelector("#seen-click");
    seenPost.addEventListener("click", () => {
        counter++;
        const postCount = document.getElementById("post-count");
        postCount.innerText = counter;
        postDetails(post.title, post.view_count);
    })
    
}

const postDetails = (postTitle, postViewCount) => {
    const viewdPost = document.createElement("div");
    viewdPost.classList = `flex gap-5 p-4 bg-white rounded-xl justify-between mb-5`;
    viewdPost.innerHTML = `
        <p class="my-4">${postTitle}</p>
        <div class="my-4">
            <span><i class="fa-regular fa-eye"></i></span>
            <span id="viewd-count">${postViewCount}</span>
        </div>
    `
    const seenPost = document.getElementById("seen-post");
    seenPost.appendChild(viewdPost);
}

allPostFunc();

const searchBtnClicked = () => {
    const searchField = document.getElementById("search-field");
    const searchFieldVal = searchField.value;
    categoryPostFunc(searchFieldVal);
}

// category Post func
const categoryPostFunc = async(searchFieldVal) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchFieldVal}`)
    const data = await res.json();
    postContainer.innerHTML = ``;

    const categoryPosts = data.posts;
    for(post of categoryPosts) {
        listingFetchedPosts(post);
    }

}

// forum section creation
const forumContent = document.createElement("div");
forumContent.classList = `forum-content flex bg-[#12132D] justify-center items-center p-10 rounded-2xl flex-col md:flex-row`;
forumContent.innerHTML = `
    <div class="forum-left-content text-white">
        <h2 class="text-2xl md:text-3xl text-center font-black md:text-left">Join Our Forum</h2>
        <p class="forum-description text-center w-11/12 mx-auto mt-5 md:text-left md:mx-0">Share your favorite opinion and win and wp forum coffee mug! Yes, you can <br class="hidden md:block"> run unit tests and view the results directly within the app.</p>
        <button class="btn btn-active btn-primary bg-[#797DFC] text-white border-none rounded-3xl font-bold text-lg block mx-auto md:mx-0 mt-5">Registered Users</button>
    </div>
    <div class="forum-right-content flex justify-center items-center mt-10 md:mt-0">
        <img class="w-10/12" src="./assets/images/joinforum.png" alt="">
    </div>
`;
const forumContainer = document.getElementById("forum-container");
forumContainer.appendChild(forumContent);




