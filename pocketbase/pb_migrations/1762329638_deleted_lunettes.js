/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_427234108");

  return app.delete(collection);
}, (app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "_pb_users_auth_",
        "hidden": false,
        "id": "relation2375276105",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "user",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1819170229",
        "max": 0,
        "min": 0,
        "name": "nom",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "select416669013",
        "maxSelect": 1,
        "name": "materiau",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "acetate",
          "metal",
          "bois",
          "bio"
        ]
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1007519717",
        "max": 0,
        "min": 0,
        "name": "couleur",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "number2783314065",
        "max": null,
        "min": null,
        "name": "pont",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "number2058279951",
        "max": null,
        "min": null,
        "name": "verres",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "select3319812137",
        "maxSelect": 1,
        "name": "type_verre",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "transparent",
          "teinte",
          "polarise"
        ]
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3946899340",
        "max": 10000000000000,
        "min": 0,
        "name": "svg_data",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "number4159695454",
        "max": null,
        "min": null,
        "name": "prix",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_427234108",
    "indexes": [],
    "listRule": null,
    "name": "lunettes",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": null
  });

  return app.save(collection);
})
