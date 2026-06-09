package jose.carlos.java16;

import java.util.ArrayList;
import java.util.List;

public class NuevosRegistros {
	
	/**
	 * Los registros son como una clase bean, pero con restricciones. Donde:
	 * 
	 * Se crean por defecto:
	 * 		- los atributos son finales ( y el propio registro tb )
	 * 		- NO PUEDO HACER SET (por ser final los atributos)
	 * 		- métodos de acceso (sólo los get)
	 * 		- toString
	 *      - equals
	 *      - hashCode
	 *      - constructor "largo"  con todos los atributos como parámetros
	 *      - los métodos dados, los puedo sobreescibir
	 * 
	 * De los records ni heredan ni se puede heredar
	 * Puedo add nuevos métodos (siempre que no modiquen el estado)
	 */

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		List<Alumno> listaAlumnos = new ArrayList<>();
		listaAlumnos.add(new Alumno("Luisa", 39, 9));
		listaAlumnos.add(new Alumno("Pepe", 22, 3));
		listaAlumnos.add(new Alumno("Pepe", 22, 3));
		listaAlumnos.add(new Alumno("Jon", 36, 6));
		listaAlumnos.add(new Alumno("Vale", 52, 1));
		listaAlumnos.add(new Alumno("Luis", 37));
		
		for (Alumno a : listaAlumnos) {
			System.out.println("Nombre: " + a.nombre());
			System.out.println("Edad: " + a.edad());
			System.out.println("Nota: " + a.nota());
			System.out.println(a.toString());
		}
		
		boolean sonIguales = listaAlumnos.get(0).equals(listaAlumnos.get(1));
		System.out.println("Son iguales? " + sonIguales);
		
	}

}
