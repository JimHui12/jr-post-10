require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

const post = [];
let currentId = 1;

app.get('/v1/posts', (req, res ) => {
    res.json(post);
});

app.get('/v1/posts/:id', (req, res ) => {
    //获取Id
    const {id} = req.params;

    // 在Post 数组找对应的Post
    const post = post.find(i => {
        return i.id === Number(id);
    });

    if(!post) {
        return res.sendStatus(404);
    }

    return res.json(post);
});

// 更新某个Post
app.put('/v1/posts/:id', (req, res)  => {
    // 获得id
    const {id} = req.params;

    // 获取post内容
    const {author, content} = req.body;

    // 找出这个Post
    const post = posts.findIndex(i => i.id ===Number(id));

    // 处理post找不到
    if(!post) {
        return res.sendStatus(404);
    }

    // 取代之前的
    post.author = author;
    post.content = content;

    //返回更新完的
    return res.json(post);
});

app.post('/v1/posts', (req, res)  => {
    
    const {author, content} = req.body;

    //赋予ID
    const newPost = {author, content, id: currentId++};

    // 添加到Posts里
    posts.push(newPost);

    // 返回添加的内容
    return res.json(newPost);
});

app.delete('/v1/posts/:id', (req, res)  => {
    // 获取Id
    const {id} = req.params;

    // 通过Id找到某个Post的Index
    const postIndex = posts.findIndex(i => i.id ===Number(id));

    // 如果Id找不到
    if(postIndex === -1) {
        return res.sendStatus(404);
    }

    // 把这个Post删掉
    const deletedPost = posts.splice(postIndex, 1);

    // 返回200
    return res.json(deletedPost);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`    )
});