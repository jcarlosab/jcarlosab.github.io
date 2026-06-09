import { createClient } from "@libsql/client"
import { getNameMonth } from "../utils/utils"

const { VITE_REACT_DATABASE_URL, VITE_REACT_AUTH_TOKEN } = import.meta.env

if (!VITE_REACT_DATABASE_URL || !VITE_REACT_AUTH_TOKEN) {
    throw new Error("Las variables de entorno necesarias no están definidas.")
}

const client = createClient({
    url: VITE_REACT_DATABASE_URL,
    authToken: VITE_REACT_AUTH_TOKEN,
})

const TABLE_NAME = "transacciones_v2"

const executeQuery = async (sql, args = []) => {
    try {
        const txn = await client.transaction("read")
        const rs = await txn.execute({ sql, args })
        return rs.rows
    } catch (error) {
        console.error("Error executing query:", error)
        throw new Error("Error al ejecutar la consulta.")
    }
}

export const getListAmount = async () => executeQuery(`SELECT id, fdate, month, year, category, amount FROM ${TABLE_NAME}`)

export const deleteAmount = async (id) => {
    try {
        const txn = await client.transaction("write")
        await txn.execute({
            sql: `DELETE FROM ${TABLE_NAME} WHERE id = ?`,
            args: [id],
        })
        await txn.commit()
    } catch (error) {
        console.error("Error deleting transaction:", error)
        throw new Error("Error al eliminar la transacción.")
    }
}

export const addAmount = async (data) => {
    if (
        !data ||
        !data.id ||
        !data.fdate ||
        (data.month === null || data.month === undefined || isNaN(data.month)) ||
        !data.year ||
        !data.category ||
        !data.amount
    ) {
        throw new Error("Datos incompletos para agregar una transacción.");
    }

    try {
        const txn = await client.transaction("write")
        await txn.execute({
            sql: `INSERT INTO ${TABLE_NAME} (id, fdate, month, year, category, amount) VALUES (?, ?, ?, ?, ?, ?)`,
            args: [data.id, data.fdate, data.month, data.year, data.category, data.amount],
        })
        await txn.commit()
    } catch (error) {
        console.error("Error adding transaction:", error)
        throw new Error("Error al agregar la transacción.")
    }
}

export const getListByCategory = async (category, monthIndex) => {
    const monthName = getNameMonth(monthIndex)
    return executeQuery(`SELECT id, fdate, month, year, category, amount FROM ${TABLE_NAME} WHERE category = ? AND month = ?`, [category, monthName])
}

export const getTotalAmountByCategory = async () => {
    return executeQuery(`
        SELECT
            year AS "Year",
            month AS "Month",
            COALESCE(SUM(CASE WHEN category = 'market' THEN amount END), 0) AS "Super",
            COALESCE(SUM(CASE WHEN category = 'fuel' THEN amount END), 0) AS "Gasoil",
            COALESCE(SUM(CASE WHEN category = 'others' THEN amount END), 0) AS "Otros",
            COALESCE(SUM(amount), 0) AS "Total"
        FROM ${TABLE_NAME}
        GROUP BY year, month
        ORDER BY year, month
    `)
}
