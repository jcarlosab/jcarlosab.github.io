export const formatterEuro = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
})

export const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
]

export const getNameMonth = (month) => {
  if (month < 0 || month >= months.length) {
    throw new Error("Mes no válido. Debe estar entre 0 y 11.");
  }
  return months[month]
}

export const groupByYear = (data) => {
  return Object.values(
    data.reduce((acc, item) => {
      const { Year, Month, Super, Gasoil, Otros, Total } = item;
      acc[Year] = acc[Year] || { Year, data: [] };
      acc[Year].data.push({ Month, Super, Gasoil, Otros, Total });
      return acc;
    }, {})
  )
}
