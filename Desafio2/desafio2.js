// >> Consigna: Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar e implemente los siguientes métodos:
// >> Aspectos a incluir en el entregable: 
// El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
// Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
// Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con async/await y manejo de errores.
// Probar el módulo creando un contenedor de productos, que se guarde en el archivo: “productos.txt”
// Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para verificar el correcto funcionamiento del módulo construído. 
// El formato de cada producto será : 

const fs = require('fs');

let id = 1;

class Contenedor {
    constructor(name){

        fs.writeFileSync(`./${name}.txt`, JSON.stringify([]));
        this.fileJSON = fs.readFileSync(`./${name}.txt`, 'utf-8')
        this.file = JSON.parse(this.fileJSON)
        this.arr = this.file.length > 0 ? this.file : [];
        this.name = name        

    }
    async save(object){
        // save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        let id = 1
        let ids = []
        if(this.arr.length>0){
            this.arr.forEach((o)=>{
                ids.push(o.id)
            });
            id = Math.max(...ids) + 1             
        }
                  
        object.id = id
        this.arr.push(object)
        const arrJSON = JSON.stringify(this.arr)
        try{

            await fs.promises.writeFile(`./${this.name}.txt`, `${arrJSON}`)   
            
        }
        catch (err){
            console.log(err)
        }
        console.log("El id asignado es: "+id)

        
    }
    async getById(id){
        // getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
        
        try{
            await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
            .then(value => {
                const arr = JSON.parse(value)
                
                const object = arr.find(o=>o.id === id)

                console.log(object)
            })
                       
             
            
            .catch(err=>console.log(err))

        }
        catch (err){
            console.log(err)
        }



        
                        
    }
    async getAll(){
        // getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
        try{
            await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
            .then(value=>{
                console.log(JSON.parse(value)) 
            })
            .catch(err=>console.log(err))
        }
        catch (err){
            console.log(err)
        }
       
               
    }
    async deleteById(id){
        // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
        try {
            await fs.promises.readFile(`./${this.name}.txt`, 'utf-8')
            .then(value=>{
                const arr = JSON.parse(value)
                const arrFiltrado = this.arr.filter((o)=>o.id !== id)
                const arrJSON = JSON.stringify(arrFiltrado)
                return fs.promises.writeFile(`./${this.name}.txt`, `${arrJSON}`)
            })
        }
        catch (err){
            console.log(err)
        }
       
        
                    
       
    }
    async deleteAll(){
        // deleteAll(): void - Elimina todos los objetos presentes en el archivo.
        try{
            await fs.promises.writeFile(`./${this.name}.txt`, `${[]}`)
        }
        catch (err){
            console.log(err)
        }
        
     
    }
}

const productos = new Contenedor('productos')


const producto =  {
    title: 'cuaderno',
    price: 125,
    thumbnail: 'https://www.monoblock.tv/10911-thickbox_default/cuaderno-a4-cuadriculado-macanudo-composition.jpg'
}

const producto1 =  {
    title: 'lapicera',
    price: 60,
    thumbnail: 'https://argentinapilotshop.com.ar/1762-large_default/lapicera-boeing.jpg'
}

const producto2 =  {
    title: 'lapicera2',
    price: 55,
    thumbnail: 'https://argentinapilotshop.com.ar/1762-large_default/lapicera-boeing.jpg'
}
      
productos.save(producto) 
productos.save(producto1) 
productos.save(producto2)

productos.getById(2)

productos.getAll()

productos.deleteById(2);

productos.deleteAll();

