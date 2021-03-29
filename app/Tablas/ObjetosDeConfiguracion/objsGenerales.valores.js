(function () {
    angular.module('objsGenerales')
        .value('tblDatosCargados', {
            id: 'idTablaDatosCargados',
            paginacion: [10, 30, 50, 100],
            permisos: {agregar: false, borrar: false, modificar: false, consultar: true},
            modals: {agregar: '', borrar: '', modificar: ''},
            columnas: [
                {valor: 'matricula', tipo: 'string', descripcion: 'Matricula Alumno'},
                {valor: 'nombreAlumno', tipo: 'string', descripcion: 'Nombre Alumno'},
                {valor: 'indAsistencia', tipo: 'string', descripcion: '¿Asistio?', filtro: 'palomaotache'}
            ]
        })
        .value('tblDatosSeguimiento', {
            id: 'idTblDatosSeguimiento',
            paginacion: [10, 30, 50, 100],
            permisos: {agregar: false, borrar: false, modificar: false, consultar: true},
            modals: {agregar: '', borrar: '', modificar: ''},
            columnas: [
                {valor: 'matricula', tipo: 'string', descripcion: 'Matricula Alumno'},
                {valor: 'nombreAlumno', tipo: 'string', descripcion: 'Nombre Alumno'},
                {valor: 'fechaAsistencia', tipo: 'string', descripcion: 'Fecha Clase'},
                {valor: 'materia', tipo: 'string', descripcion: 'Materia', filtro: 'materia'},
                {valor: 'indAsistencia', tipo: 'string', descripcion: '¿Asistio?', filtro: 'palomaotache'}
            ]
        })
        .value('tblDatosJustificacion', {
            id: 'idTblDatosJustificacion',
            paginacion: [10, 30, 50, 100],
            permisos: {agregar: false, borrar: false, modificar: false, consultar: true},
            modals: {agregar: '', borrar: '', modificar: ''},
            columnas: [
                {valor: 'idJustificacion', tipo: 'string', descripcion: 'Identificador de Justificacíón'},
                {valor: 'materia', tipo: 'string', descripcion: 'Materia', filtro: 'materia'},
                {valor: 'fechaAsistencia', tipo: 'string', descripcion: 'Fecha Justificación'},
                {valor: 'motivo', tipo: 'string', descripcion: 'Motivo Falta'},
                {valor: 'autorizado', tipo: 'string', descripcion: '¿Autorizada?', filtro: 'palomaotache'}
            ]
        })
    ;
})();
