// nav section
const navBar = document.getElementById("nav-bar");
navBar.innerHTML = `
    <img id="nav-logo" class="nav-logo mb-4" src="./assets/images/logo.png" alt="Retro Logo">
    <div id="nav-other-content" class="nav-other-content items-center flex items-center md:inline-block">
        <button id="home-btn" class="btn btn-circle mx-2"><img src="./assets/icons/home.png" class="w-6" alt="Home Icon"></button>
        <button id="edit-btn" class="btn btn-circle mx-2"><img src="./assets/icons/edit.png" class="w-6" alt="Home Icon"></button>
        <button id="add-friend-btn" class="btn btn-circle mx-2"><img src="./assets/icons/add-friend.png" class="w-6" alt="Home Icon"></button>
        <button id="flag-btn" class="btn btn-circle mx-2"><img src="./assets/icons/flag.png" class="w-6" alt="Home Icon"></button>
        <button class="btn btn-active btn-primary bg-[#797DFC] text-white border-none rounded-3xl font-bold text-lg">Sign In</button>
    </div>
`;

// Hero Section
const heroSection = document.getElementById("hero-section");
heroSection.classList = `hero-section container px-5 sm:px-10 bg-[#12132D] rounded-3xl flex flex-col lg:flex-row items-center justify-around mt-10`;
heroSection.innerHTML = `
    <div class="hero-left-part">
        <h1 id="hero-heading" class="hero-heading text-white font-black text-4xl text-center md:text-left md:text-5xl py-5 md:py-10">Welcome to the <br>ReTro Forum</h1>
        <p id="hero-description" class="hero-description text-white text-center md:text-left font-medium mb-5 md:mb-10">Share your favorite opinion and win and wp<br>forum coffee mug!</p>
        <div id="searh-input" class="pb-10 flex justify-evenly gap-5 flex-col md:flex-row">
            <input id="search-field" type="text" placeholder="Search here anything" class="hero-search-bar rounded-4xl bg-white py-4 pl-8 md:pr-60 md:py-4 font-medium border-none">
            <button onclick="searchBtnClicked()" id="search-btn" class="search-btn bg-[#797DFC] px-8 py-4 font-bold rounded-4xl text-white">Search</button>
        </div>
    </div>
    <div class="hero-right-part text-black bg-white p-5 mb-5 w-10/12 lg:w-3/12 h-42 rounded-2xl flex items-center justify-center">
        <div id="hero-right-text-content" class="w-12/12">
            <div id="registered-users" class="w-9/12 flex justify-between mx-auto my-2 font-bold">
                <p>Registered Users</p> <p>01</p>
            </div>
            <div id="forum" class="w-9/12 flex justify-between mx-auto my-2 font-bold">
                <p>Forum</p> <p>05</p>
            </div>
            <div id="topic" class="w-9/12 flex justify-between mx-auto my-2 font-bold">
                <p>Topic</p> <p>01</p>
            </div>
            <div id="replies" class="w-9/12 flex justify-between mx-auto my-2 font-bold">
                <p>Replies</p> <p>01</p>
            </div>
        </div>
    </div>
`;

// Let's Discuss Section
const letsDiscus = document.getElementById("lets-discuss");
letsDiscus.classList = `lets-discuss mt-10 md:mt-15`;
letsDiscus.innerHTML = `
    <h2 class="text-center text-3xl md:text-4xl font-black">Let's Discuss</h2>
    <p class="text-center mt-2 md:mt-5 w-9/12 mx-auto">Yes, you can run unit tests and view the results directly within the app. The<br>integrated testing features allow for a streamlined.</p>
`;
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

const latestPost = document.getElementById("latest-post");
latestPost.innerHTML = `
    <h2 class="text-center text-3xl md:text-4xl font-black">Latest Post</h2>
    <p class="text-center mt-2 md:mt-5 w-9/12 mx-auto">Yes, you can run unit tests and view the results directly within the app. The<br>integrated testing features allow for a streamlined.</p>
`;


// Latest Post Dynamic Section
const latestPostCreation = (post) => {
    const latestPostCard = document.createElement("div");
    latestPostCard.classList = `latest-post-card bg-white border-gray-300 border-2 rounded-2xl p-5 my-5`;
    latestPostCard.innerHTML = `
        <div class="latest-post-image mb-5">
            <img class="rounded-2xl" src="${post.cover_image}" alt="">
        </div>
        <div class="flex items-center gap-2 mb-3">
            <i class="fa-regular fa-calendar text-black font-medium"></i>
            <p>${post?.author?.posted_date || "No Date Available"}</p>
        </div>
        <h3 class="font-bold text-xl W-10/12 mb-2">${post.title}</h3>
        <p class="h-24 mb-2">${post.description}</p>
        <div class="flex items-center gap-3">
            <div class="avatar">
                <div class="w-12 rounded-full">
                    <img src="${post.profile_image}" />
                </div>
            </div>
            <div>
                <p id="name" class="font-bold text-lg">${post.author.name}</p>
                <p id="designation">${post?.author?.designation || "Designation Unknown"}</p>
            </div>
        </div>
    `;

    const latestPostContent = document.getElementById("latest-post-content");
    latestPostContent.appendChild(latestPostCard);
}

const latestPostFetch = async() => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    console.log(data);
    for(post of data) {
        latestPostCreation(post);
    }
}

latestPostFetch();

// Footer Section
const footer = document.getElementById("footer");
footer.innerHTML = `
    <section id="footer-section" class="footer-section w-9/12 md:w-4/12 text-center mx-auto">
        <img src="./assets/images/logo.png" class="block mx-auto" alt="">
        <p class="footer-description my-5">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC</p>
        <div class="icons flex gap-5 text-xl justify-center mx-auto">
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-facebook-f"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-github"></i>
        </div>
    </section>
    <hr class="w-9/12 md:w-6/12 mx-auto mt-5">
    <p class="text-[#95a5a6] text-center mt-5">2017, All Rights Reserved.</p>
`;