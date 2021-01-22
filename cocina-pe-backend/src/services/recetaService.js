const {Receta} = require('../models/Platillo');
// const {Usuario} = require('../models/Platillo');

exports.agregarReceta = async (params) => {
    const receta = new Receta(params)
    // const nombre = params.nombre
    // let existeReceta;
    // try{
    //      existeReceta = await Receta.findOne({nombre: nombre});
    // }catch(error){
    //     console.log('Error: ', error.message);
    //     return error
    // }
    // if(existeReceta){
    //     return true
    // }
    try{
        await receta.save()
        return receta
    }catch(error){
        console.log('Error: ', error.message);
        return error
    }
}

exports.listarRecetas = async () => {
    let recetaDB
    try{
        recetaDB = await Receta.find().populate({
            path: "recetaDB",
            model: "Usuario",
            select: {
                '_id': 1,
                'apellido_paterno': 1,
                'nombres': 1,
            }
        }).populate({
            path: "platillo",
            model: "Platillo",
            select: {
                '_id': 1,
                'categoria': 1,
                'nombre': 1,
            }
        })
        return recetaDB
    }catch(error){
        console.log('Error: ', error.message)
        return error
    }
}

exports.obtenerRecetaPorNombre = async (nombre) => {
    let recetaDB
    try{
        recetaDB = await Receta.find({nombre: { $regex: nombre }}).populate({
            path: "recetaDB",
            model: "Usuario",
            select: {
                '_id': 1,
                'apellido_paterno': 1,
                'nombres': 1,
            }
        }).populate({
            path: "platillo",
            model: "Platillo",
            select: {
                '_id': 1,
                'categoria': 1,
                'nombre': 1,
            }
        })
        return recetaDB
    }catch(error){
        console.log('Error: ', error.message)
        return error
    }
}

exports.obtenerRecetaPorIngredientesId = async (params) => {
    // let recetaDB
    // try{
    //     recetaDB = await Receta.find({nombre: { $regex: nombre }}).populate({
    //         path: "recetaDB",
    //         model: "Usuario",
    //         select: {
    //             '_id': 1,
    //             'apellido_paterno': 1,
    //             'nombres': 1,
    //         }
    //     }).populate({
    //         path: "platillo",
    //         model: "Platillo",
    //         select: {
    //             '_id': 1,
    //             'categoria': 1,
    //             'nombre': 1,
    //         }
    //     })
    //     return recetaDB
    // }catch(error){
    //     console.log('Error: ', error.message)
    //     return error
    // }
    

    const ingredientes_array = params.ingredientes_array;
    const cantidad = ingredientes_array.length;
    let recetaDB
    try{
        recetaDB = await Usuario.find().populate({
            path: "recetaDB",
            model: "Usuario",
            select: {
                '_id': 1,
                'apellido_paterno': 1,
                'nombres': 1,
            }
        }).populate({
            path: "platillo",
            model: "Platillo",
            select: {
                '_id': 1,
                'categoria': 1,
                'nombre': 1,
            }
        })
        const array = []
        recetaDB.map((receta) => {
            let contador = 0;
            receta.ingredientes.map(ingrediente => {
                ingredientes_array.map(i => {
                    if(i == ingrediente.id){ //por ID
                        contador++
                    }
                })
            })
            if(contador == cantidad){
                array.push(receta)
            }
        })
        return array;
    }catch(error){
        console.log('Error: ', error.message)
        return error
    }
}

// exports.obtenerPlatilloPorTipo = async (tipo) => {
//     let recetaDB
//     try{
//         recetaDB = await Receta.find({tipo_ingrediente: tipo})
//         return recetaDB
//     }catch(error){
//         console.log('Error: ', error.message)
//         return error
//     }
// }

exports.obtenerReceta = async (id) => {
    let recetaDB;
    try{
        recetaDB = await Receta.findOne({_id: id}).populate({
            path: "recetaDB",
            model: "Usuario",
            select: {
                '_id': 1,
                'apellido_paterno': 1,
                'nombres': 1,
            }
        }).populate({
            path: "platillo",
            model: "Platillo",
            select: {
                '_id': 1,
                'categoria': 1,
                'nombre': 1,
            }
        });
        if(!recetaDB){
            return false
        }else {
            return recetaDB
        }
    }catch(error){
        console.log('Error: ', error.message)
        return error
    }
}

exports.modificarReceta = async (params, id) => {
    // const nombre = params.nombre
    // let existeReceta
    // try{
    //     existeReceta = await Receta.findOne({nombre: nombre});
    // }catch(error){
    //     console.log('Error: ', error.message);
    //     return error   
    // }
    // if(existeReceta){
    //     if(existeReceta._id != id){
    //         return true
    //     }
    // }
    try{
        const updated = await Receta.findByIdAndUpdate(id, params);
        if(updated){
            return updated
        }else{
            return false
        }
    }catch(error){
        console.log('Error: ', error.message);
        return error
    } 
}