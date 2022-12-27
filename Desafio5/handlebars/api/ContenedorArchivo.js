
const fs = require ('fs');

class ContenedorArchivo {

    static archivosAbiertos = 0;

    constructor (fileName) {
        this.fileName = fileName

        ContenedorArchivo.archivosAbiertos = ++ContenedorArchivo.archivosAbiertos;
    }

    save = async (product) => {        
        const fileData = fs.readFileSync(`./${this.fileName}.txt`, 'utf-8');  // Copio contenido archivo.
        const fileDataJson = JSON.parse(fileData);                            // Convierto el string en formato JSON Array.
        const objet = fileDataJson[( fileDataJson.length - 1)];               // Obtengo el ultimo elemento.
        const newID = objet.id + 1;                                           // Genero un nuevo ID sumando 1 al ultimo ID existente.
        const newProduct = {'id':newID, ...product};                          // Armo el nuevo objeto producto uniendo el nuevo ID.
        fileDataJson.push(newProduct);                                        // Agrego al final el nuevo objeto.
        const fileDataString = JSON.stringify(fileDataJson);                  // Convierto el string a texto.
        
        // Sobreescribo el archivo con el nuevo contenido.
        try {
            await fs.promises.writeFile(`./${this.fileName}.txt`, fileDataString);
        } catch (err) {
            console.error(err);
        }
        return (newID);
    }

    getRandom() {
        const fileData = fs.readFileSync(`./${this.fileName}.txt`, 'utf-8');
        const fileDataJson = JSON.parse(fileData);
        const cantidad = fileDataJson.length;
        const product = this.getById(this.randomIdNumber(1,cantidad));
        return product;
    }

    randomIdNumber(min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    getById(idNumber) {
        const fileData = fs.readFileSync(`./${this.fileName}.txt`, 'utf-8');
        const fileDataJson = JSON.parse(fileData);
        let objectId = null;
        objectId = fileDataJson.find(element => element.id == idNumber);
        return objectId;
    }

    getAll () {
        const fileData = fs.readFileSync(`./${this.fileName}.txt`, 'utf-8');
        return (JSON.parse(fileData));
    }

    deleteById = async (idNumber) => {
        const fileData = fs.readFileSync(`./${this.fileName}.txt`, 'utf-8');
        const fileDataJson = JSON.parse(fileData);
        const indexObjet = fileDataJson.findIndex(element => element.id == idNumber);
        if ( indexObjet != -1 ) {
            fileDataJson.splice(indexObjet, 1);
            const fileDataString = JSON.stringify(fileDataJson);
            try {
                await fs.promises.writeFile(`./${this.fileName}.txt`, fileDataString);
            } catch (err) {
                console.error(err);
            }
        }
    }

    deleteAll = async () => {        
        let emptyArray = [];
        try {
            await fs.promises.writeFile(`./${this.fileName}.txt`, JSON.stringify(emptyArray));
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = ContenedorArchivo; // Exportacion del modulo de este archivo para ser usado en otros sitios.