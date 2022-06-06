const friend = require('./friends.models');

//Obtenemos todos los caracteres
const getAllfriends = async (req, res, next) => {
    try {
        const friends = await friend.find();
        return res.status(200).json(friends);
    } catch (error) {
        return next(error);
    }
}

//obtenemos un caracter por id
const getfriend = async (req, res, next) => {
    try {
        const {id} = req.params;
        const friend = await friend.findById(id).populate('race');  //Populamos por raza para recibir los atributos de la raza
        if(!friend){
            const error = new Error("No friend found by this id");
            error.status = 404;
            return next(error);       
        }
        return res.status(200).json(friend);
    } catch (error) {
        return next(error);
    }
}


//Creamos un nuevo caracter
const postNewfriend = async (req, res, next) => {
    try {
        const newfriend = new friend(req.body);   //Req.body coge los elementos del cuerpo del mensaje
        // newfriend.name = req.body.name;
        // newfriend.race = req.body.race;
        // newfriend.weapon = req.body.weapon;
        // newfriend.image = req.body.image;

       // if(req.file){        //PARA SUBIR UNA UNICA IMAGEN --> req.file
        //     newCharacter.image = req.file.path;         //Comprobamos si req.file está seteado y si es así obtenemos el archivo y lo asignamos a la imagen
        // }

        
        if(req.files.image){    //PARA SUBIR VARIAS IMAGENES --> req.files.NombreCampo
            newCharacter.image = req.files.image[0].path;         //Cogemos el valor de [0] del array req.files.NombreCampo
        }

        
        if(req.files.image2){
            newCharacter.image2 = req.files.image2[0].path;         //Comprobamos si req.file está seteado y si es así obtenemos el archivo y lo asignamos a la imagen
        }


        const friendDB = await newfriend.save();  //Guardamos el nuevo friend en BBDD
        return res.status(201).json(friendDB);
    } catch (error) {
        return next(error);
    }
}

//Actualizamos un caracter
const putfriend = async (req, res, next) => {
    try {
        const {id} = req.params;
        const putfriend = new friend(req.body);
        putfriend._id = id;
        const friendDB = await friend.findByIdAndUpdate(id, putfriend);
        if(!friendDB){
            const error = new Error("No friend found by this id");
            error.status = 404;
            return next(error);  
        }
        return res.status(200).json(friendDB);
    } catch (error) {
        return next(error);
    }

}

//Borramos un caracter
const deletefriend = async (req, res, next) => {
    try {
        const {id} = req.params;
        const friendDB = await friend.findByIdAndDelete(id);
        if(!friendDB){
            const error = new Error("No friend found by this id");
            error.status = 404;
            return next(error);  
        }
        if(characterDB.image){
            deleteFile(characterDB.image);
        }

        return res.status(200).json(friendDB);
    } catch (error) {
        return next(error);
    }
}


module.exports = {
    getAllfriends,
    getfriend,
    postNewfriend,
    putfriend,
    deletefriend
}
