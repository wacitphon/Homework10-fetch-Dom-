// fetch('https://jsonplaceholder.typicode.com/users')
// .then( resp =>{
//     console.log(resp)
//     return resp.json()
// }).then(data => {
//    console.log(data)
//    console.log(typeof data) 
//    console.log(data[0])  
//    console.log(data[0].name)   
// })

const userList = document.getElementById('userList');
const userContainer = document.getElementById('userContainer');
const postInfo = document.getElementById('postInfo');

function makeElement(tag, attr_n, attr_v, content) {
    let output = document.createElement(tag);
    (!!attr_n) && output.setAttribute(attr_n, attr_v);
    output.innerHTML = content;
    return output;
}

fetch('https://jsonplaceholder.typicode.com/users')
    .then(resp => resp.json())
    .then(data => {
        for (let user of data) {
            const li = makeElement('li', 'data-user-id', user.id, `${user.name} / ${user.email}`);
            userList.append(li);

            li.addEventListener('click', () => {
                userContainer.innerHTML = '';
                userContainer.append(
                    makeElement('div', 'class', 'user-container', `
                        <h2>User Information</h2>
                        <div class="user-details">
                            <p><strong>Name:</strong> ${user.name}</p>
                            <p><strong>Email:</strong> ${user.email}</p>
                        </div>
                    `)
                );

                fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
                    .then(resp => resp.json())
                    .then(posts => {
                        postInfo.innerHTML = '';
                        postInfo.append(
                            makeElement('h2', '', '', 'User Posts'),
                            makeElement('div', 'class', 'post-list', posts.map(post =>
                                `<div>
                                    <strong>${post.title}</strong>
                                    <p>${post.body}</p>
                                </div>`
                            ).join(''))
                        );
                    });
            });
        }
    });

  // let li = makeElement('li',) 

//  // fetch('https://jsonplaceholder.typicode.com/users')
// // .then( resp =>{
// //     console.log(resp)
// //     return resp.json()
// // }).then(data => {
// //    console.log(data)
// //    console.log(typeof data) 
// //    console.log(data[0])  
// //    console.log(data[0].name)   
// // })
