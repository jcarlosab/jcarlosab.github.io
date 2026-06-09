# curso_java

NOTA: Usar git en eclipse, es necesario generar un token como contraseña (Necesario para hacer commits desde eclipse)
GENERAR_TOKEN_GIT: Settigns > Developer settigns > Personal access tokens > Tokens (classic)


JEP : Documento con una propuesta de mejora, identificada por un código.
    - no sustituyen el JCP, se requieren aprobaciones de la JCP para que las JEP se conviertan en JSR
JCP : Grupo que estudia y refina un JEP, creando un JSR
JSR: Documento de solicitudes de inclusión de cambios o mejoras en el lenguaje.

Bean, pojo, modelo, dto: tipos de objetos de java

##package jose.carlos.java8
Interfaz funcional:  Una interfaz funcional define “objetos” que no guardan valores como los objetos tradicionales sino que sirven para guardar “funciones”. 
    - Para que sea interfaz funcional (FI) debe constar de un solo metodo abstracto "sin cuerpo" (puede haber más de default y static,sobreescritos object)
    - Se puede comprobar si una interfaz es funcional añadiendo "@FunctionalInterface"

Lambda (funciones anónimas): Se usarian para ejecutar funciones sin declararlas en una clase
    - Si el cuerpo de la expresion lambada tiene más de una instrucción, uso llaves para delimitar su alcance en ese caso, si la funcion devuevel algo debo usar return

Streams: Tuberia que da un flujo de datos, no se puede usar dos veces. Necesario una operacion terminal para ejecutarlo. Se pueden usar varias operaciones intermetdias
    - Un flujo/chorro donde van los datos. 
    - Se compone de funciones intermedias y una unica de cierre. 
    - No se puede reutilizar un stream cerrado
    
Optional: Envuelve un resultado, se usa para minimizar los nullpointer. Se usa para comprobar si exiten valores.
    
Collectors: Permite transformar un stream en una colección
	- Ejemplos en el MainFechas.java

Fechas: Ejemplos en el MainFechas.java

##package jose.carlos.java9
TryConRecursosMejorado:

##package jose.carlos.java11
HttpClient:

##package jose.carlos.java14
NuevoSwitch: Algunas posibles ventajas de usar expresiones switch son:
	- Pueden simplificar el código al evitar el uso de break, return o throw en cada caso13.
	- Pueden admitir múltiples etiquetas de caso para un mismo bloque de código12.
	- Pueden usar la palabra clave yield para devolver el valor de la expresión switch12.
	- Pueden usar el operador flecha (->) para indicar el valor a devolver para cada caso
	- Ejemplo:
	String day = "MONDAY";
	int numLetters = switch (day) {
	    case "MONDAY", "FRIDAY", "SUNDAY" -> 6;
	    case "TUESDAY" -> 7;
	    case "THURSDAY", "SATURDAY" -> 8;
	    case "WEDNESDAY" -> 9;
	    default -> throw new IllegalStateException("Invalid day: " + day);
	};


##package jose.carlos.java15
TextBlocks: Los text blocks son una nueva forma de representar cadenas de texto en Java que pueden abarcar varias líneas y evitar la necesidad de escapar caracteres.
private static String titulo = """
			SALUDOS A LOS MEJORES
			QUE SON TODOS
			DE AQUÍ :)
			""";
			
##package jose.carlos.java16
Records(registros): Son como una clase bean, pero con restricciones
    - Se crean por defecto:
        - Los atributos son finales (el propio registro también)
        - No puede hacer set por ser final los atributos
        - Metodos de acceso solo los get
        - Metodo toString
        - Metodo equals
        - Metodo hashCode
        - Constructor "largo"  con todos los atributos como parámetros
        - Los métodos dados, los puedo sobreescibir
    - No heredan ni pueden heredar
    - Puedo add nuevos métodos (siempre que no modifiquen el estado)

##package jose.carlos.java17
Sealed class: Mecanismo para limitar la herencia de clases e interfazces
    - Las subclases autorizadas están acotadas explícitamente 
    - Las clases que entran en esta relación deben estar en el mismo paquete o en el mismo módulo (si estamos usando un proyecto modular)
    - Cuando una subclase hyereda de una sellada, tiene que indicarlos con extends. 
	- Además, debe usar uno de los siguientes adjetivos/palabras reservadas
		- sealed -> algunas subclases podrán heredar
		- non-sealed -> todas las subclases podrán heredar
		- final -> ninguna classe puede heredar
