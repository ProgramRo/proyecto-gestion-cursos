const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const { nuevoCurso, obtenerCursos, editarCurso, eliminarCurso } = require('./consultasCursos')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.send(fs.readFileSync('index.html', 'utf-8'))
})

app.get('/cursos', async (req, res) => {
    const respuesta = await obtenerCursos()
    res.send(respuesta)
})

app.post('/curso', async (req, res) => {
    const curso = req.body
    const respuesta = await nuevoCurso(curso)
    res.send(respuesta)
})

app.put('/curso/:id', async (req, res) => {
    const { id } = req.params
    const curso = req.body
    const respuesta = editarCurso(id, curso)
    res.send(respuesta)
})

app.delete('/curso/:id', async (req, res) => {
    const { id } = req.params
    const respuesta = await eliminarCurso(id)
    if (respuesta > 0) {
        res.send({
            message: `El curso ${respuesta.nombre} fue eliminado con exito`
        })
    } else {
        res.send({
            message: `El curso que desea eliminar no se encuentra registrado, favor revisar `
        })
    }
})

app.listen(3000, () => {
    console.log('Servidor Encendido en puerto 3000 http://localhost:3000')
})