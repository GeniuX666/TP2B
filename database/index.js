var MongoClient = require('mongodb').MongoClient;
var uriDatabase = "mongodb://admin:asdasd@clusterdev-shard-00-00-f2avg.mongodb.net:27017,clusterdev-shard-00-01-f2avg.mongodb.net:27017,clusterdev-shard-00-02-f2avg.mongodb.net:27017/test?ssl=true&replicaSet=ClusterDev-shard-0&authSource=admin&retryWrites=true&w=majority";
const chalk = require('chalk');
const client = new MongoClient(uriDatabase, { useNewUrlParser: true, useUnifiedTopology: true });

async function CRUDPromise() {
    return new Promise((resolve, reject) => {
        client.connect((error, result) => 
        {
            if (!error) {
                console.log(chalk.green("Conexión exitosa"));
                const collectionInventors = result.db('sample_betp2').collection('inventors');

                const inventor = {
                    first: "Richard",
                    last: "Ruben",
                    year: 666
                }

                //Insert
                collectionInventors.insertOne(inventor, (error, result) => {
                    if (!error) 
                    {
                        console.log(chalk.green("Inventor insertado correctamente.", result));
                        //Update
                        collectionInventors.updateOne({ "first": "Richard","last": "Ruben"  }, { $set: {"year" : 2020} }, (error, result) => {
                            if (!error) {
                                console.log(chalk.green("Inventor actualizado correctamente.", result));
                                //Delete
                                collectionInventors.deleteMany({ "first": "Richard","last": "Ruben"  }, (error, result) => {
                                    if (!error) {
                                        console.log(chalk.green("Inventor eliminado correctamente.", result));
                                    } else {
                                        console.log(chalk.red("Error al eliminar.", error));
                                    }
                                });

                            } else 
                            {
                                console.log(chalk.red("Error al actualizar.", error));
                            }
                        });
                        
                    } 
                    else 
                    {
                        console.log(chalk.red("Error al insertar.", error));
                    }
                });

            } else {
                console.log(chalk.red(error));
            }
        });
    })
}             

async function CRUD() {
    console.log('llamanding...');
    const result = await CRUDPromise()
    console.log(result)
    client.close()
}

CRUD();