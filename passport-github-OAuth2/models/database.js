const mongoose = require('mongoose');

const localSchema = mongoose.Schema({
    username: String,
    password: String,
    addAt: {
        type: Date,
        default: Date.now
    }
});

const githubSchema = mongoose.Schema({
    githubId: String,
    addAt: {
        type: Date,
        default: Date.now
    }
});

const LocalSchema = mongoose.model('localschema', localSchema);
const GitHubSchema = mongoose.model('githubschema', githubSchema);

module.exports = { LocalSchema, GitHubSchema }