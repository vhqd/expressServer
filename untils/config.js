const mongoose = require('mongoose');

const Mongoose = {
    url: 'mongodb://localhost:27017/euse',
    connect() {
        mongoose.connect(this.url, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.log('数据库连接失败');
                return;
            }
            console.log('数据库连接成功');
        })
    }
}

module.exports = {
    Mongoose
}