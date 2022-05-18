'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "LocationId" to table "locations"
 *
 **/

var info = {
    "revision": 5,
    "name": "add_unique_locationID",
    "created": "2022-05-18T01:56:21.651Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "locations",
        "LocationId",
        {
            "type": Sequelize.INTEGER,
            "field": "LocationId",
            "primaryKey": true,
            "autoIncrement": true,
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
