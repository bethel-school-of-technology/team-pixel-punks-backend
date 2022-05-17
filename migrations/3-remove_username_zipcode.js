'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "Zipcode" from table "users"
 * removeColumn "Username" from table "users"
 *
 **/

var info = {
    "revision": 3,
    "name": "remove_username_zipcode",
    "created": "2022-05-17T18:16:20.729Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["users", "Zipcode"]
    },
    {
        fn: "removeColumn",
        params: ["users", "Username"]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
