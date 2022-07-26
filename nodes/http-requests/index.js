// const { request } = require('undici');

const URL = 'https://jsonplaceholder.typicode.com/posts/1';

// const getPosts = async () => {
//   const response = await request(URL);
//   return response.body;
// }

// (async ()=>{
//     const posts = await getPosts();
//     console.log(posts);
// })();

const fetch = require('node-fetch');

const getPosts = async () => {
    const response = await fetch(URL);
    const posts = await response.json();
    return posts;
}

(async () => {
    const posts = await getPosts();
    console.log(posts);
})();