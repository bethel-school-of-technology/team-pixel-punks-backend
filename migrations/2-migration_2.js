'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Deleted" to table "users"
 * addColumn "Admin" to table "users"
 *
 **/

var info = {
    "revision": 2,
    "name": "migration_2",
    "created": "2022-05-12T01:04:36.558Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "users",
            "Deleted",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted",
                "allowNull": true,
                "defaultValue": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "users",
            "Admin",
            {
                "type": Sequelize.BOOLEAN,
                "field": "Admin",
                "allowNull": true,
                "defaultValue": false
            }
        ]
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
