'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "UserId" on table "locations"
 *
 **/

var info = {
    "revision": 6,
    "name": "add_unique_locationID_onlykey",
    "created": "2022-05-18T01:56:44.623Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "changeColumn",
    params: [
        "locations",
        "UserId",
        {
            "type": Sequelize.INTEGER,
            "field": "UserId",
            "allowNull": false
        }
    ]
}];

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
