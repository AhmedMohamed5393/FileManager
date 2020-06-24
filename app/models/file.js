var mongoose = require('mongoose'),
    db       = mongoose.connection,
    file     = mongoose.Schema({
        filename: {
            type: String,
            required: true
        },
        contentType: {
            type: String,
            required: true
        },
        saveDate: {
            type: Date,
            required: true
        }
    }),
    File     = mongoose.model('File', file, 'file');
db.once('open' , () => { console.log('connection is succeeded with file') });
db.on('error' , console.error.bind(console, 'connection is failed with file'));
module.exports = File;