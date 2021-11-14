export class Computadora {

    constructor(
        public nombre: string,
        public apellidos: string,
        public departamento: string,
        public sexo: string,
        public inventario: number,
        public marcaChasis: string,
        public marcaFuente: string,
        public marcaPlaca: string,
        public modeloPlaca: string,
        public micro: string,
        public microFrecuencia: number,
        public socket: number,
        public memoriaNumero: string,
        public memoriaTipo: string,
        public memoriaMarca: string,
        public memoriaCapacidad: string,
        public memoriaFrecuencia: string,
        public fuenteSerie: string,
        public fuenteMarca: string,
        public fuenteCapacidad: number,
        public discoNumero: string,
        public discoTipo: string,
        public discoMarca: string,
        public discoCapacidad: string,
        public sello?: number,
        public serieChasis?: number,
        public sistema?: string,
        public cdTipo?: string,
        public cdLector?: string,
        public mouseMarca?: string,
        public mouseTipo?: string,
        public tecladoMarca?: string,
        public tecladoSerie?: string,
        public tecladoTipo?: string,
        public bocinaMarca?: string,
        public bocinaSerie?: string,
        public bocinaAlimentacion?: string,
        public _id?: string
    ) {}
}