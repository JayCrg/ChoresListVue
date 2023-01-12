const {createApp} = Vue

createApp({
    data() {
        return {
            tareas: [
            {texto:"kjgk",fecha:"2022-12-07T11:07:27.001Z",prioridad:1,hecho:true,id:10},
            {texto:"Hacer trabajo js/css",fecha:"2022-12-07T09:31:33.185Z",prioridad:2,hecho:false,id:9}  
        ],
        campoFiltro: '',
        nuevaNota: '',
        idMaximo: 0,
        prioridad: 0
        }
    },
    methods: {
        getFechaHaceXTiempo(tarea) {
            let diferencia = new Date() - new Date(tarea.fecha);
            let segundos = Math.floor(diferencia / 1000);
            let minutos = Math.floor(segundos / 60);
            let horas = Math.floor(minutos / 60);
            let dias = Math.floor(horas / 24);
            let meses = Math.floor(dias / 30);
            let anios = Math.floor(meses / 12);
            if (anios > 0) {
                return anios + " años";
            } else if (meses > 0) {
                return meses + " meses";
            } else if (dias > 0) {
                return dias + " dias";
            } else if (horas > 0) {
                return horas + " horas";
            } else if (minutos > 0) {
                return minutos + " minutos";
            } else if (segundos > 0) {
                return segundos + " segundos";
            } else {
                return "ahora";
            }
        },
        cambiarPrioridad(prioridad, id){
            if(prioridad=='low'){
                for(tarea of this.tareas){
                    if(tarea.id == id)
                    tarea.prioridad = 1
                }
            }
            else if(prioridad=='mid'){
                for(tarea of this.tareas){
                    if(tarea.id == id)
                    tarea.prioridad = 2
                }
            }
            else if(prioridad=='high'){
                for(tarea of this.tareas){
                    if(tarea.id == id)
                    tarea.prioridad = 3
                }
            }
            this.actualizarLocalStorage();
        },
        insertar(){
            nuevoObjeto = {
                texto: this.nuevaNota,
                fecha: new Date(),
                prioridad: 3,
                hecho: false,
                id: this.idMaximo + 1
            };
            this.tareas.push(nuevoObjeto);
            this.nuevaNota = ''
            this.actualizarLocalStorage();
        },
        obtenerNuevoId(){
            let max=0, aux=0;
            for(tarea of this.tareas){
                aux = tarea.id
                if(max < aux)
                    max = aux
            }
            return max
        },
        cambiarMarcado(id){
            for(tarea of this.tareas){
                if(tarea.id == id)
                tarea.hecho = !tarea.hecho
            }
            this.actualizarLocalStorage();
        },
        borrarCompletadas(){
            this.tareas = this.tareas.filter(tarea => !tarea.hecho)
            this.actualizarLocalStorage();
        },
        borrarTarea(id){
            for (let i = 0; i < this.tareas.length; i++) {
                if (this.tareas[i].id == id)
                    this.tareas.splice(i, 1);
            }
            this.actualizarLocalStorage();
        },
        actualizarLocalStorage(){
            localStorage.setItem('tareas', JSON.stringify(this.tareas))
        }
    },
    computed:
    {
        tareasPendientes(){
            return this.tareas.filter((tar)=>tar.hecho == false).length //si le quitamos el length tenemos un array para trabajar como queramos
        },
        tareasTotales(){
            return this.tareas.length
        },
        entradasFiltradas(){
            myArrayFilt = this.tareas.filter((ent) => ent.texto.toLowerCase().includes(this.campoFiltro.toLowerCase()))
            porTarea = myArrayFilt.sort((a, b) => {
                return b.prioridad - a.prioridad;
            })
            if(this.prioridad == 0)
                return porTarea
            else
                return porTarea.filter((ent) => ent.prioridad == this.prioridad)
        },
    },
    mounted(){
        this.idMaximo = this.obtenerNuevoId()
        if(localStorage.getItem('tareas') != null){
            this.tareas = JSON.parse(localStorage.getItem('tareas'))
        }
    }
}
).mount('#app')