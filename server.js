const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// 模拟数据库数据
const users = [
    { id: 1, username: 'admin', password: '123456', email: 'admin@example.com' },
    { id: 2, username: 'user', password: '123456', email: 'user@example.com' }
];

const destinations = [
    {
        id: 1,
        name: '故宫',
        location: '北京',
        type: '历史文化',
        rating: '4.9',
        image: 'image/故宫.jpg',
        shortDescription: '明清两代的皇家宫殿，世界文化遗产',
        fullDescription: '故宫是中国明清两代的皇家宫殿，旧称紫禁城，位于北京中轴线的中心...',
        attractions: ['太和殿', '乾清宫', '御花园', '午门', '珍宝馆'],
        bestTime: '春秋两季，气候宜人，游客相对较少'
    },
    {
        id: 2,
        name: '长城',
        location: '北京',
        type: '历史遗迹',
        rating: '4.8',
        image: 'image/长城.jpg',
        shortDescription: '世界七大奇迹之一，中华民族的象征',
        fullDescription: '长城是中国古代的军事防御工事...',
        attractions: ['八达岭长城', '慕田峪长城', '金山岭长城'],
        bestTime: '春秋两季，天气适宜，风景优美'
    }
];

// API路由

// 获取所有景点
app.get('/api/destinations', (req, res) => {
    res.json(destinations);
});

// 获取单个景点
app.get('/api/destinations/:id', (req, res) => {
    const destination = destinations.find(d => d.id === parseInt(req.params.id));
    if (destination) {
        res.json(destination);
    } else {
        res.status(404).json({ message: '景点未找到' });
    }
});

// 搜索景点
app.get('/api/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const results = destinations.filter(dest => 
        dest.name.toLowerCase().includes(query) ||
        dest.location.toLowerCase().includes(query) ||
        dest.shortDescription.toLowerCase().includes(query)
    );
    res.json(results);
});

// 用户登录
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        res.json({ 
            success: true, 
            user: { id: user.id, username: user.username, email: user.email }
        });
    } else {
        res.status(401).json({ success: false, message: '用户名或密码错误' });
    }
});

// 用户注册
app.post('/api/register', (req, res) => {
    const { username, password, email } = req.body;
    
    // 检查用户是否已存在
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ success: false, message: '用户名已存在' });
    }
    
    const newUser = {
        id: users.length + 1,
        username,
        password,
        email
    };
    
    users.push(newUser);
    res.json({ 
        success: true, 
        user: { id: newUser.id, username: newUser.username, email: newUser.email }
    });
});

// 获取用户收藏
app.get('/api/favorites/:userId', (req, res) => {
    // 模拟数据，实际应从数据库获取
    const favorites = [];
    res.json(favorites);
});

// 添加收藏
app.post('/api/favorites', (req, res) => {
    const { userId, destinationId } = req.body;
    // 实际应保存到数据库
    res.json({ success: true, message: '收藏成功' });
});

// 删除收藏
app.delete('/api/favorites/:userId/:destinationId', (req, res) => {
    const { userId, destinationId } = req.params;
    // 实际应从数据库删除
    res.json({ success: true, message: '取消收藏成功' });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log('前端页面访问地址: http://localhost:3000');
});

module.exports = app;