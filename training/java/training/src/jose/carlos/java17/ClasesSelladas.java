package jose.carlos.java17;

import javax.crypto.SealedObject;

public class ClasesSelladas {

	/**
	 * @author jcanton
	 * 
	 * Sealed class: Mecanismo para limitar la herencia de clases e interfazces
	 * Las subclases autorizadas están acotadas explícitamente 
	 *
	 * Las clases que entran en esta relación deben estar en el mismo paquete 
	 * o en el mismo módulo (si estamos usando un proyecto modular)
	 */
	public sealed class Persona permits Alumno, Profesor {
		// TODO Auto-generated method stub

	}
	
	/** 
	 * @author jcanton
	 * Cuando una subclase hyereda de una sellada, tiene que indicarlos con extends. 
	 * Además, debe usar uno de los siguientes adjetivos/palabras reservadas
	 * 		- sealed -> algunas subclases podrán heredar
	 * 		- non-sealed -> todas las subclases podrán heredar
	 * 		- final -> ninguna classe puede heradar
	 */

	
	public final class Profesor extends Persona {
		
	}
	
	public sealed class Alumno extends Persona permits AlumnoExcelente {
		
	}
	
	public non-sealed class AlumnoExcelente extends Alumno {
		
	}

}
