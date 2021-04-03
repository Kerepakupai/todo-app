const Tarea = require('./tarea')

class Tareas {

  _listado = {}

  get listadoArr() {

    const listado = []
    Object.keys(this._listado).forEach( key => {
      listado.push( this._listado[key] )
    })

    return listado;
  }

  constructor() {
    this._listado = {}
  }

  borrarTarea(id) {
    if (this._listado[id]) {
      delete this._listado[id]
    }  
  }

  crearTarea( desc = '') {
    const tarea = new Tarea(desc)
    this._listado[tarea.id] = tarea
  }

  cargarTareasFromArr( tareas = [] ) {
    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea
    })
  }

  listadoCompleto() {
    console.log();
    this.listadoArr.forEach((tarea, index) => {
      console.log(`${((index + 1) + '.').green} ${tarea.desc} :: ${tarea.completadoEn ? tarea.completadoEn.green : 'Pendiente'.red}`);
    })
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
     const listadoFiltrado = completadas 
        ? this.listadoArr.filter(tarea => tarea.completadoEn !== null)
        : this.listadoArr.filter(tarea => tarea.completadoEn === null)    
    
    listadoFiltrado.forEach((tarea, index) => {
      console.log(`${((index + 1) + '.').green} ${tarea.desc} :: ${tarea.completadoEn ? tarea.completadoEn.blue : 'Pendiente'.red}`);
    })
  }

  toggleComepletadas( ids = [] ) {  
    ids.forEach( id => {
      const tarea = this._listado[id]
      if ( !tarea.completadoEn ) {
        tarea.completadoEn = new Date().toISOString()      
      }
    })

    this.listadoArr.forEach( tarea => {
      if( !ids.includes(tarea.id) ) {
        this._listado[tarea.id].completadoEn = null
      }
    })
  }

}


module.exports = Tareas;
