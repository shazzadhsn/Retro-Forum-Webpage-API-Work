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

const listingFetchedPosts = (post) => {
    const singlePost = document.createElement("div");
        singlePost.classList = `posts bg-[#F3F3F5] rounded-2xl flex flex-col items-center md:flex-row justify-evenly my-10`
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
                <p id="post-description">${post.description}</p>
                <hr class="border-t-2 border-dashed border-black-500 my-4">
                <div class="flex items-center gap-5">
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
                    <img src="./assets/icons/mail.png" class="w-7" alt="">
                </div>
            </div>
        `;

        postContainer.appendChild(singlePost);
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
