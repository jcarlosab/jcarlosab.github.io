package jose.carlos.java8;

import java.util.ArrayList;
import java.util.List;

public class MainAlumnos {
	
	public static	void main(String[] args) {
		List<Alumno> lista_alumnos = new ArrayList<>();
		lista_alumnos.add(new Alumno("Jose", 20, 9));
		lista_alumnos.add(new Alumno("Ana", 25, 4));
		lista_alumnos.add(new Alumno("Paco", 23, 2));
		
		//imprimirAlumnos(lista_alumnos, new AlumnoExcelente());
		
		//boolean test (Alumno a);
		//Ahora los alumnos son xcelentes si tienen más de un 5
		// Funcion lambda funcion abstracta, sin nombre  = a funciones flecha js
		imprimirAlumnos(lista_alumnos, a -> a.getNota_media() >= 4);
		imprimirAlumnos(lista_alumnos, (Alumno a) -> a.getNota_media() >= 4);
		imprimirAlumnos(lista_alumnos, (Alumno a) -> {
			return a.getNota_media() >= 4;
		});
		
		lista_alumnos.sort(new ComparadorAlumnos());
		System.out.println("Lista " + lista_alumnos);
		
		lista_alumnos.sort((a1,a2) -> a1.getEdad()-a2.getEdad());
	}

	private static void imprimirAlumnos(List<Alumno> lAlumnos, CompruebaAlumno compruebaAlumno) {
		// TODO Auto-generated method stub
		for (Alumno a:lAlumnos)
		{
			if (compruebaAlumno.test(a) ) 
			{
				System.out.println("Alumnos " + a);
			}
		}
	}
	
	

}
