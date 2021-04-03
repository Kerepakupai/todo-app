const fs = require('fs')

const archivo = './db/data.json'

const guardarDB = (data) => {
  fs.writeFileSync(archivo, JSON.stringify(data))
}

const leerDB = () => {
  if (!fs.existsSync(archivo)) {
    return null
  }

  const datos = JSON.parse(fs.readFileSync(archivo, { encoding: 'utf-8' }))

  return datos
}

module.exports = {
  guardarDB,
  leerDB
}
