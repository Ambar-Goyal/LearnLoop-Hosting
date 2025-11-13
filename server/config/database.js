console.log('🎯🎯🎯 DATABASE.JS - BRAND NEW VERSION 🎯🎯🎯');
console.log('🎯 LOADED AT: ' + new Date().toISOString());
console.log('🎯 THIS IS DEFINITELY THE NEW FILE 🎯');

const mongoose = require('mongoose');

exports.connect = () => {
    console.log('🔄 ATTEMPTING DATABASE CONNECTION...');
    
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('✅✅✅ DATABASE CONNECTED SUCCESSFULLY ✅✅✅');
    })
    .catch((error) => {
        console.log('❌ DATABASE CONNECTION FAILED');
        console.log(error);
        process.exit(1);
    });
};