
import express from 'express'
import {Book} from '../models/bookModel.js'
const router = express.Router()


//Agregar un libro a la base de datos

router.post('/', async (req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: 'Se requiere enviar todos los elementos como titulo, autor y año de publicacion'
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook)
        return res.status(201).send(book)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
        
    }
})


//Obtener todos los libros de la base de datos

router.get("/", async (req, res)=>{
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
} )


//Obtener un solo libro de la base de datos por el ID

router.get('/:id', async (req,res) =>{
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})


//Actualizacion por ID

router.put('/:id', async (req,res)=>{

    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: 'Se requiere enviar todos los elementos como titulo, autor y año de publicacion'
            })
        }
        
        const {id} = req.params

        const result = await Book.findByIdAndUpdate(id, req.body)
        if(!result){
            return res.status(400).json({message:"Libro no encontrado"})
        }
        return res.status(200).send({message: "libro actualizado"})        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
        
    }

})

//Eliminar un libro
router.delete('/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message: "libro no encontrado"})
        }

        return res.status(200).send({message: 'Libro eliminado con exito'})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

export default router;