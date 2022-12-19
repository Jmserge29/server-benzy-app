//Imports models
import Role from "../Models/Role.js";
import Materia from '../Models/Materia.js'
import Assignation from "../Models/Assignation.js";

//Exporting fuctions creatings setup
export const createRoles = async()=>{
    try {
        const count = await Role.estimatedDocumentCount()
        if(count>0) return;

        // Creating roles the users
        const values = await Promise.all([
            new Role({ property: "user"}).save(),
            new Role({ property: "moderator"}).save(),
            new Role({ property: "admin"}).save()
        ])
        console.log(values)
    } catch (error) {
        console.log(error)
    }
}
const ListData =[
    {id: "Competencias Comunicativas I", enlace: "https://image.shutterstock.com/image-photo/newspapers-computer-magazines-open-laptop-600w-1399839347.jpg"},
    {id: "Introduccion a Ingeniería De Sistemas", enlace: "https://image.shutterstock.com/image-illustration/hitech-3d-rendering-some-digita-600w-691233466.jpg"},
    {id: "Cálculo I", enlace: "https://image.shutterstock.com/image-vector/math-educational-vector-seamless-pattern-600w-795328972.jpg"},
    {id: "Algoritmia Y Programación I", enlace: "https://image.shutterstock.com/image-illustration/hitech-3d-rendering-some-digita-600w-691233466.jpg"},
    {id: "Exigencia de Idioma I", enlace: "https://image.shutterstock.com/image-illustration/global-communication-business-concept-translate-600w-321469727.jpg"},
    // 2do Semestre
    {id: "Competencias Comunicativas II", enlace: "https://image.shutterstock.com/image-photo/newspapers-computer-magazines-open-laptop-600w-1399839347.jpg"},
    {id: "Electiva en Historia", enlace: "https://image.shutterstock.com/image-photo/image-tangram-puzzle-blocks-people-600w-1149593039.jpg"},
    {id: "Algoritmia Y Programación II", enlace: "https://image.shutterstock.com/image-illustration/hitech-3d-rendering-some-digita-600w-691233466.jpg"},
    {id: "Cálculo II", enlace: "https://image.shutterstock.com/image-vector/math-educational-vector-seamless-pattern-600w-795328972.jpg"},
    {id: "Física Mecánica", enlace: "https://image.shutterstock.com/image-photo/mathematical-physical-formulas-against-background-600w-2010979148.jpg"},
    {id: "Exigencia de Idioma II", enlace: "https://image.shutterstock.com/image-illustration/global-communication-business-concept-translate-600w-321469727.jpg"},
    // 3er Semestre
    {id: "Estructura De Datos I", enlace: "https://image.shutterstock.com/image-illustration/server-room-3d-illustration-node-600w-1024337068.jpg"},
    {id: "Programación Enfocada Objeto (POO)", enlace: "https://image.shutterstock.com/image-illustration/hitech-3d-rendering-some-digita-600w-691233466.jpg"},
    {id: "Electiva Humanidades", enlace: "https://image.shutterstock.com/image-photo/image-tangram-puzzle-blocks-people-600w-1149593039.jpg"},
    {id: "Física Calor Ondas", enlace: "https://image.shutterstock.com/image-photo/mathematical-physical-formulas-against-background-600w-2010979148.jpg"},
    {id: "Cálculo III", enlace: "https://image.shutterstock.com/image-vector/math-educational-vector-seamless-pattern-600w-795328972.jpg"},
    {id: "Exigencia de Idioma III", enlace: "https://image.shutterstock.com/image-illustration/global-communication-business-concept-translate-600w-321469727.jpg"},
    // 4to Semestre
    {id: "Estructura De Datos II", enlace: "https://image.shutterstock.com/image-illustration/server-room-3d-illustration-node-600w-1024337068.jpg"},
    {id: "Ecuaciones Diferenciales", enlace: "https://image.shutterstock.com/image-vector/math-educational-vector-seamless-pattern-600w-795328972.jpg"},
    {id: "Electiva Ciencias de la Vida", enlace: "https://image.shutterstock.com/image-photo/image-tangram-puzzle-blocks-people-600w-1149593039.jpg"},
    {id: "Matemáticas Discretas", enlace: "https://image.shutterstock.com/image-vector/math-educational-vector-seamless-pattern-600w-795328972.jpg"},
    {id: "Física Electricidad", enlace: "https://image.shutterstock.com/image-photo/mathematical-physical-formulas-against-background-600w-2010979148.jpg"},
    {id: "Exigencia de Idioma IV", enlace: "https://image.shutterstock.com/image-illustration/global-communication-business-concept-translate-600w-321469727.jpg"},
    // 5to Semestre
    {id: "Algoritmo y Complejidad", enlace: "https://image.shutterstock.com/image-illustration/hitech-3d-rendering-some-digita-600w-691233466.jpg"},
    {id: "Estructuras Discretas", enlace: "https://image.shutterstock.com/image-illustration/server-room-3d-illustration-node-600w-1024337068.jpg"},
    {id: "Análisis de Datos en Ing. I", enlace: "https://image.shutterstock.com/image-illustration/server-room-3d-illustration-node-600w-1024337068.jpg"},
    {id: "Diseño Digital", enlace: "https://image.shutterstock.com/image-vector/deconstructed-postmodern-inspired-artwork-vector-600w-1816795676.jpg"},
    {id: "Electiva en Ciencias Básicas", enlace: "https://image.shutterstock.com/image-photo/image-tangram-puzzle-blocks-people-600w-1149593039.jpg"},
    {id: "Examen Comprehensiva I", enlace: "https://metropolisa.com/wp-content/uploads/2017/06/mp-proyectos-educativo-uninorte-2.jpg"},
    {id: "Exigencia de Idioma V", enlace: "https://image.shutterstock.com/image-illustration/global-communication-business-concept-translate-600w-321469727.jpg"},
    // 6to Semestre
    {id: "Bases De Datos", enlace: "https://image.shutterstock.com/image-illustration/server-room-3d-illustration-node-600w-1024337068.jpg"},
    {id: "Redes de Computación", enlace: "https://image.shutterstock.com/image-photo/smart-city-communication-network-concept-600w-1923558464.jpg"},
    {id: "Soluc. Comput. Problemas en Ingeniería", enlace: "https://image.shutterstock.com/image-illustration/hitech-3d-rendering-some-digita-600w-691233466.jpg"},
    {id: "Estructura del Computador I", enlace: "https://image.shutterstock.com/image-illustration/closeup-view-modern-gpu-card-600w-1720101667.jpg"},
    {id: "Electiva Básica Disciplinar", enlace: "https://image.shutterstock.com/image-photo/image-tangram-puzzle-blocks-people-600w-1149593039.jpg"},
    {id: "Exigencia de Idioma VI", enlace: "https://image.shutterstock.com/image-illustration/global-communication-business-concept-translate-600w-321469727.jpg"},
    // 7mo Semestre
    {id: "Diseño de Software I", enlace: "https://i.pinimg.com/564x/65/69/b8/6569b84671e254fb3531076d4fdcb84b.jpg"},
    {id: "Optimización", enlace: "https://image.shutterstock.com/image-illustration/closeup-view-modern-gpu-card-600w-1720101667.jpg"},
    {id: "Sistemas Operacionales", enlace: "https://i.pinimg.com/564x/fc/5a/ec/fc5aec446b85f5fd919e99cca2ca8939.jpg"},
    {id: "Estructura del Computador II", enlace: "https://image.shutterstock.com/image-illustration/closeup-view-modern-gpu-card-600w-1720101667.jpg"},
    {id: "Electiva en Ética", enlace: "https://img.freepik.com/vector-gratis/ilustracion-concepto-etica-empresarial_114360-8737.jpg?w=2000"},
    {id: "Exigencia de Idioma VII", enlace: "https://image.shutterstock.com/image-illustration/global-communication-business-concept-translate-600w-321469727.jpg"},
    // 8vo Semestre
    {id: "Compiladores", enlace: "https://i.pinimg.com/564x/fc/5a/ec/fc5aec446b85f5fd919e99cca2ca8939.jpg"},
    {id: "Diseño de Software II", enlace: "https://i.pinimg.com/564x/65/69/b8/6569b84671e254fb3531076d4fdcb84b.jpg"},
    {id: "Electiva en Innovación Desarrollo y Sociedad", enlace: "https://image.shutterstock.com/image-photo/image-tangram-puzzle-blocks-people-600w-1149593039.jpg"},
    {id: "Electiva en Redes", enlace: "https://image.shutterstock.com/image-photo/smart-city-communication-network-concept-600w-1923558464.jpg"},
    {id: "Electiva Profesional I", enlace: "https://image.shutterstock.com/image-photo/image-tangram-puzzle-blocks-people-600w-1149593039.jpg"},
    {id: "Electiva en Ciencias Sociales", enlace: "https://image.shutterstock.com/image-photo/image-tangram-puzzle-blocks-people-600w-1149593039.jpg"},
    {id: "Exigencia de Idioma VIII", enlace: "https://image.shutterstock.com/image-illustration/global-communication-business-concept-translate-600w-321469727.jpg"},
    // 9no Semestre
    {id: "Electiva en Filosofía", enlace: "https://image.shutterstock.com/image-photo/image-tangram-puzzle-blocks-people-600w-1149593039.jpg"},
    {id: "Electiva en Ciencias de la Computación", enlace: "https://image.shutterstock.com/image-illustration/hitech-3d-rendering-some-digita-600w-691233466.jpg"},
    {id: "Electiva de Gestión Informática", enlace: "https://image.shutterstock.com/image-illustration/closeup-view-modern-gpu-card-600w-1720101667.jpg"},
    {id: "Electiva Profesional II", enlace: "https://image.shutterstock.com/image-photo/image-tangram-puzzle-blocks-people-600w-1149593039.jpg"},
    {id: "Examen Comprehensiva II", enlace: "https://metropolisa.com/wp-content/uploads/2017/06/mp-proyectos-educativo-uninorte-2.jpg"},
    {id: "Formación Complementaria Libre I", enlace: "https://image.shutterstock.com/image-illustration/thinking-ai-humanoid-robot-analyzing-600w-1936171492.jpg"},
    // 10mo Semestre
    {id: "Electiva Estudios Del Caribe", enlace: "https://image.shutterstock.com/image-photo/image-tangram-puzzle-blocks-people-600w-1149593039.jpg"},
    {id: "Electiva Profesional III", enlace: "https://image.shutterstock.com/image-photo/image-tangram-puzzle-blocks-people-600w-1149593039.jpg"},
    {id: "Proyecto Final", enlace: "https://metropolisa.com/wp-content/uploads/2017/06/mp-proyectos-educativo-uninorte-2.jpg"},
    {id: "Formación Complementaria Libre II", enlace: "https://image.shutterstock.com/image-illustration/thinking-ai-humanoid-robot-analyzing-600w-1936171492.jpg"},
    // Pensum Ingeniería de Sistemas UniLibre
    // 1er Semestre
    {id: "Introducción a Ingeniería", enlace: "https://image.shutterstock.com/image-illustration/hitech-3d-rendering-some-digita-600w-691233466.jpg"},
    {id: "Lenguaje y Comunicación", enlace: "https://image.shutterstock.com/image-photo/newspapers-computer-magazines-open-laptop-600w-1399839347.jpg"},
    {id: "Cátedra Unilibrista", enlace: "https://www.latinpymes.com/wp-content/uploads/2018/07/Universidad-Libre.jpg"},
    {id: "Lógica y Algoritmos", enlace: "https://image.shutterstock.com/image-illustration/hitech-3d-rendering-some-digita-600w-691233466.jpg"},
    {id: "Cálculo Diferencial", enlace: "https://image.shutterstock.com/image-vector/math-educational-vector-seamless-pattern-600w-795328972.jpg"},
    {id: "Introducción a la Investigación", enlace: "https://image.shutterstock.com/image-photo/team-computer-engineers-lean-on-600w-1104131690.jpg"},
    {id: "Algebra y Trigonometría", enlace: "https://image.shutterstock.com/image-vector/math-educational-vector-seamless-pattern-600w-795328972.jpg"},
    {id: "Instituciones Colombianas", enlace: "https://image.shutterstock.com/image-photo/judges-gavel-on-library-background-600w-1723862410.jpg"},
    // 2do Semestre
    {id: "Inglés I", enlace: "https://image.shutterstock.com/image-illustration/global-communication-business-concept-translate-600w-321469727.jpg"},
    {id: "Aprendizaje Autónomo", enlace: "https://image.shutterstock.com/image-illustration/thinking-ai-humanoid-robot-analyzing-600w-1936171492.jpg"},
    {id: "Estructuras de Lenguajes", enlace: "https://image.shutterstock.com/image-illustration/hitech-3d-rendering-some-digita-600w-691233466.jpg"},
    {id: "Lógica Matemáticas", enlace: "https://image.shutterstock.com/image-vector/math-educational-vector-seamless-pattern-600w-795328972.jpg"},
    {id: "Metodología de la Investigación", enlace: "https://image.shutterstock.com/image-photo/team-computer-engineers-lean-on-600w-1104131690.jpg"},
    {id: "Cálculo Integral", enlace: "https://image.shutterstock.com/image-vector/math-educational-vector-seamless-pattern-600w-795328972.jpg"},
    // 3er Semestre
    {id: "Inglés II", enlace: "https://image.shutterstock.com/image-illustration/global-communication-business-concept-translate-600w-321469727.jpg"},
    {id: "Electricidad y Magnetismo", enlace: "https://image.shutterstock.com/image-photo/mathematical-physical-formulas-against-background-600w-2010979148.jpg"},
    {id: "Circuitos Digitales", enlace: "https://image.shutterstock.com/image-photo/smart-city-communication-network-concept-600w-1923558464.jpg"},
    {id: "Administración Empresarial", enlace: "https://image.shutterstock.com/image-photo/close-woman-hand-using-calculator-600w-566835985.jpg"},
    {id: "Cálculo Multivariado y Vectorial", enlace: "https://image.shutterstock.com/image-vector/math-educational-vector-seamless-pattern-600w-795328972.jpg"},
    // 4to Semestre
    {id: "Inglés III", enlace: "https://image.shutterstock.com/image-illustration/global-communication-business-concept-translate-600w-321469727.jpg"},
    {id: "Pensamiento Sistémico", enlace: "https://image.shutterstock.com/image-illustration/thinking-ai-humanoid-robot-analyzing-600w-1936171492.jpg"},
    {id: "Arquitectura de Computadores", enlace: "https://image.shutterstock.com/image-illustration/closeup-view-modern-gpu-card-600w-1720101667.jpg"},
    {id: "Investigación I", enlace: "https://image.shutterstock.com/image-photo/team-computer-engineers-lean-on-600w-1104131690.jpg"},
    {id: "Electiva de Formación Integral I", enlace: "https://image.shutterstock.com/image-photo/image-tangram-puzzle-blocks-people-600w-1149593039.jpg"},
    // 5to Semestre
    {id: "Inglés IV", enlace: "https://image.shutterstock.com/image-illustration/global-communication-business-concept-translate-600w-321469727.jpg"},
    {id: "Sistemas Operativos", enlace: "https://image.shutterstock.com/image-illustration/hitech-3d-rendering-some-digita-600w-691233466.jpg"},
    {id: "Física ÓPtica y Ondulatoria", enlace: "https://image.shutterstock.com/image-photo/mathematical-physical-formulas-against-background-600w-2010979148.jpg"},
    {id: "Programación II (Lógica)", enlace: "https://image.shutterstock.com/image-illustration/hitech-3d-rendering-some-digita-600w-691233466.jpg"},
    {id: "Electiva de Administración I", enlace: "https://image.shutterstock.com/image-photo/image-tangram-puzzle-blocks-people-600w-1149593039.jpg"},
    {id: "Ing. Softwware I (A & Diseño Sistemas)", enlace: "https://i.pinimg.com/564x/65/69/b8/6569b84671e254fb3531076d4fdcb84b.jpg"},
    // 6to Semestre
    {id: "Inglés V", enlace: "https://image.shutterstock.com/image-illustration/global-communication-business-concept-translate-600w-321469727.jpg"},
    {id: "Investigación II", enlace: "https://image.shutterstock.com/image-photo/team-computer-engineers-lean-on-600w-1104131690.jpg"},
    {id: "Inteligencia Artificial", enlace: "https://image.shutterstock.com/image-illustration/thinking-ai-humanoid-robot-analyzing-600w-1936171492.jpg"},
    {id: "Ing. Software II (Arq. De Soft)", enlace: "https://i.pinimg.com/564x/65/69/b8/6569b84671e254fb3531076d4fdcb84b.jpg"},
    {id: "Ingeniería Web", enlace: "https://i.pinimg.com/564x/1a/9c/39/1a9c3904e4a7bac215219ed9a3452332.jpg"},
    {id: "Métodos Numéricos", enlace: "https://image.shutterstock.com/image-vector/math-educational-vector-seamless-pattern-600w-795328972.jpg"},
    // 7to Semestre
    {id: "Estadística Descriptiva", enlace: "https://image.shutterstock.com/image-vector/math-educational-vector-seamless-pattern-600w-795328972.jpg"},
    {id: "Gestión Ambiental", enlace: "https://image.shutterstock.com/image-photo/environmental-technology-concept-sustainable-development-600w-1798672525.jpg"},
    {id: "Electiva de Administración II", enlace: "https://image.shutterstock.com/image-photo/image-tangram-puzzle-blocks-people-600w-1149593039.jpg"},
    {id: "Investigación III", enlace: "https://image.shutterstock.com/image-photo/team-computer-engineers-lean-on-600w-1104131690.jpg"},
    {id: "Ing. Software III (Aseg. Calidad Soft.)", enlace: "https://i.pinimg.com/564x/65/69/b8/6569b84671e254fb3531076d4fdcb84b.jpg"},
    // 8to Semestre
    {id: "Electiva Básica de Ingeniería I", enlace: "https://image.shutterstock.com/image-photo/image-tangram-puzzle-blocks-people-600w-1149593039.jpg"},
    {id: "Ingeniería Económica", enlace: "https://image.shutterstock.com/image-photo/graphs-representing-stock-market-crash-600w-1658501806.jpg"},
    {id: "Ing. Software IV (Métricas Software)", enlace: "https://i.pinimg.com/564x/65/69/b8/6569b84671e254fb3531076d4fdcb84b.jpg"},
    // 9to Semestre
    // Pensum Contaduría Pública UniAtlántico
    // 1 er Semestre
    {id: "Fundamentos de Microeconomía I", enlace: "https://image.shutterstock.com/image-photo/graphs-representing-stock-market-crash-600w-1658501806.jpg"},
    {id: "Constitución Política de Colombia", enlace: "https://image.shutterstock.com/image-photo/judges-gavel-on-library-background-600w-1723862410.jpg"},
    {id: "Ingles", enlace: "https://image.shutterstock.com/image-illustration/global-communication-business-concept-translate-600w-321469727.jpg"},
    {id: "Matemáticas Básicas", enlace: "https://image.shutterstock.com/image-vector/math-educational-vector-seamless-pattern-600w-795328972.jpg"},
    {id: "Producción De Textos", enlace: "https://image.shutterstock.com/image-illustration/global-communication-business-concept-translate-600w-321469727.jpg"},
    {id: "Deporte", enlace: "enlace 7 Lógica Algoritmica"},
    // 2do Semestre
    {id: "Fundamentos de Microeconomía II", enlace: "https://image.shutterstock.com/image-photo/graphs-representing-stock-market-crash-600w-1658501806.jpg"},
    {id: "Derecho Societario", enlace: "https://image.shutterstock.com/image-photo/judges-gavel-on-library-background-600w-1723862410.jpg"},
    {id: "Reconocimiento De Activos", enlace: "https://image.shutterstock.com/image-photo/close-woman-hand-using-calculator-600w-566835985.jpg"},
    {id: "Epistemología y Teoría Contable", enlace: "https://image.shutterstock.com/image-photo/close-woman-hand-using-calculator-600w-566835985.jpg"},
    {id: "Ética", enlace: "https://img.freepik.com/vector-gratis/ilustracion-concepto-etica-empresarial_114360-8737.jpg?w=2000"},
]

export const createMaterias = async()=>{
    try {
        const count = await Materia.estimatedDocumentCount()
        if(count>0) return;
        
        const values = await Promise.all([
            ListData.map(async(data)=>{
                new Materia({id: data.id, enlace: data.enlace}).save()
            })
        ])
        console.log('Se han creado las materias exitosamente!')

    } catch (error) {
        console.log(error)
    }
}

export const creatingAssignation = async()=>{
    try {
        const count = await Assignation.estimatedDocumentCount()
        if(count>0) return;

        // Creating assignations the users
        const values = await Promise.all([
            new Assignation({ name: "assignation #1", materias: "6382870084922a3f4e970b5b"}).save(),
            new Assignation({ name: "assignation #2", materias: "6382870084922a3f4e970b74"}).save(),
            new Assignation({ name: "assignation #3", materias: "6382870084922a3f4e970b75"}).save()
        ])
        console.log(values)
    } catch (error) {
        console.log(error)
    }
}