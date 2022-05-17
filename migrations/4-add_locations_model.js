'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "locations", deps: []
 *
 **/

var info = {
    "revision": 4,
    "name": "add_locations_model",
    "created": "2022-05-17T18:38:31.933Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "locations",
        {
            "UserId": {
                "type": Sequelize.INTEGER,
                "field": "UserId",
                "primaryKey": true,
                "allowNull": false
            },
            "Zipcode": {
                "type": Sequelize.INTEGER,
                "field": "Zipcode",
                "allowNull": false
            },
            "Latitude": {
                "type": Sequelize.STRING,
                "field": "Latitude",
                "allowNull": true
            },
            "Longitude": {
                "type": Sequelize.STRING,
                "field": "Longitude",
                "allowNull": true
            },
            "Deleted": {
                "type": Sequelize.BOOLEAN,
                "field": "Deleted",
                "allowNull": true
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt"
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt"
            }
        },
        {}
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
