//assigns models to const variables

const Committee = require("./committee");
const Events = require("./event");
const Measures = require("./measure");
const School = require("./school");
const User = require("./user");
const Chat = require("./chat");
const Contact = require("./contactForm");

//exports variables for use in other files
module.exports = {
    Committee,
    Events,
    Measures,
    School,
    User,
    Chat,
    Contact
}
