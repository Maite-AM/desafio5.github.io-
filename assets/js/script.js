//Tareas iniciales
const tareas = [
    { id: 1, descripcion: 'Ir al supermercado', completado: true },
    { id: 2, descripcion: 'Estudiar para la prueba', completado: false },
    { id: 3, descripcion: 'Ir al gimnasio', completado: false }
];

//Elementos funcionales "To do list"
const inputTarea = document.getElementById('nuevaTarea');
const btnAgregar = document.getElementById('agregarTarea');
const listaTareas = document.getElementById('listaTareas');
const sumaTareas = document.getElementById('sumaTareas');
const sumaRealizadas = document.getElementById('sumaRealizadas');

//Renderizar tareas
function renderizarTareas() {
    
    listaTareas.innerHTML = '';

    tareas.forEach(tarea => {
        const tareaDiv = document.createElement('div');
        tareaDiv.classList.add('tarea', tarea.completado ? 'alert-success' : 'alert-warning');
        tareaDiv.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <p>ID: <strong>${tarea.id}</strong> - ${tarea.descripcion}</p>
                <div>
                    <input type="checkbox" ${tarea.completado ? 'checked' : ''} onclick="toggleCompletado(${tarea.id})">
                    <span class="delete-btn text-danger ms-2" role="button" onclick="eliminarTarea(${tarea.id})">&times;</span>
                </div>
            </div>
        `;
        listaTareas.appendChild(tareaDiv);
    });

    //Contador
    sumaTareas.textContent = tareas.length;
    sumaRealizadas.textContent = tareas.filter(tarea => tarea.completado).length;
}

//Añadir tarea
btnAgregar.addEventListener('click', () => {
    const descripcion = inputTarea.value.trim();

    if (descripcion !== '') {
        const nuevaTarea = {
            id: Date.now(),
            descripcion: descripcion,
            completado: false
        };

        tareas.push(nuevaTarea);
        inputTarea.value = ''; //Limpiar
        renderizarTareas();
    }
});

// Eliminar tarea
function eliminarTarea(id) {
    const indice = tareas.findIndex(tarea => tarea.id === id);
    if (indice !== -1) {
        tareas.splice(indice, 1);
        renderizarTareas();
    }
}

// Marcar tarea completada
function toggleCompletado(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completado = !tarea.completado; // Cambiar estado
        renderizarTareas();
    }
}

// Renderizar tareas iniciales
renderizarTareas();
