require('colors')

const { guardarDB, leerDB } = require('./helpers/archivo')
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer')
const Tareas = require('./models/tareas')

const main = async () => {
  let opt; let id = ''
  let ids = []
  const tareas = new Tareas()
  const tareasDB = leerDB()

  if (tareasDB) {
    tareas.cargarTareasFromArr(tareasDB)
  }

  do {
    opt = await inquirerMenu()

    switch (opt) {
      case '1':
        tareas.crearTarea(await leerInput('Descripción:'))
        break

      case '2':
        tareas.listadoCompleto()
        break

      case '3':
        tareas.listarPendientesCompletadas(true)
        break

      case '4':
        tareas.listarPendientesCompletadas(false)
        break
      case '5':
        ids = await mostrarListadoChecklist(tareas.listadoArr)
        tareas.toggleComepletadas(ids)
        break
      case '6':
        id = await listadoTareasBorrar(tareas.listadoArr)

        if (id !== '0') {
          if (await confirmar('¿Esta seguro?') === true) {
            tareas.borrarTarea(id)
            console.log('Tarea borrada'.red)
          }
        }
        break
    }

    guardarDB(tareas.listadoArr)

    await pausa()
  } while (opt !== '0')
}

main()
