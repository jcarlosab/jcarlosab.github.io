package jose.carlos.java8;

@FunctionalInterface
//Interfaz funcional solo puede tener un metodo sin cuerpo (No puede de tener más de un metodo abstrato)
public interface CompruebaAlumno {
	boolean test (Alumno a);
	
	default boolean test2(Alumno a) {
		return false;
	}
	
	//boolean equals
}
