const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    database: 'cursos_db',
    port: 5432
})

async function nuevoCurso(curso) {
    try {
        const sqlQuery = {
            text: 'INSERT INTO cursos (nombre, nivel, fecha, duracionDias) VALUES ($1, $2, $3, $4) RETURNING *',
            values: [curso.nombre, curso.nivelTecnico, curso.fechaInicio, curso.duracion]
        }
        const result = await pool.query(sqlQuery)
        return result.rows

    } catch (error) {
        return error
    }
}

async function obtenerCursos() {
    try {
        const sqlquery = {
            text: "SELECT id, nombre, nivel, to_char(fecha,'yyyy-mm-dd') AS fecha, duraciondias FROM cursos"
        }
        const result = await pool.query(sqlquery)
        return result.rows
    } catch (error) {
        return error
    }
}

async function editarCurso(id, curso) {
    try {
        const sqlQuery = {
            text: 'UPDATE cursos SET nombre = $1, nivel = $2, fecha = $3, duraciondias = $4 WHERE id = $5 RETURNING *',
            values:[curso.nombre, curso.nivelTecnico, curso.fechaInicio, curso.duracion, id]
        }
        const result = await pool.query(sqlQuery)
        return result.rows
    } catch (error) {
        return error
    }
}

async function eliminarCurso(id) {
    try {
        const sqlQuery = {
            text: 'DELETE FROM cursos WHERE id = $1 RETURNING *',
            values: [id]
        }
        const result = await pool.query(sqlQuery)
        return result.rowCount

    } catch (error) {
        return error
    }
}

module.exports = { nuevoCurso, obtenerCursos, editarCurso, eliminarCurso }