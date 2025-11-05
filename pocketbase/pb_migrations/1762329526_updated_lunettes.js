/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_427234108")

  // add field
  collection.fields.addAt(1, new Field({
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
  }))

  // add field
  collection.fields.addAt(2, new Field({
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
  }))

  // add field
  collection.fields.addAt(3, new Field({
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
  }))

  // add field
  collection.fields.addAt(4, new Field({
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
  }))

  // add field
  collection.fields.addAt(5, new Field({
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
  }))

  // add field
  collection.fields.addAt(6, new Field({
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
  }))

  // add field
  collection.fields.addAt(7, new Field({
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
  }))

  // add field
  collection.fields.addAt(8, new Field({
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
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_427234108")

  // remove field
  collection.fields.removeById("relation2375276105")

  // remove field
  collection.fields.removeById("text1819170229")

  // remove field
  collection.fields.removeById("select416669013")

  // remove field
  collection.fields.removeById("text1007519717")

  // remove field
  collection.fields.removeById("number2783314065")

  // remove field
  collection.fields.removeById("number2058279951")

  // remove field
  collection.fields.removeById("select3319812137")

  // remove field
  collection.fields.removeById("text3946899340")

  return app.save(collection)
})
