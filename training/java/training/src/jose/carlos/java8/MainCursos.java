package jose.carlos.java8;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.*;
import jose.carlos.java8.Curso;

public class MainCursos {
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		List<Curso> listaCursos = new ArrayList<>();
		listaCursos.add(new Curso("JAVA 18", 20.5f, 22, 3));
		listaCursos.add(new Curso("ANGULAR", 35.5f, 65, 83));
		listaCursos.add(new Curso("SPRING", 120.5f, 36, 23));
		listaCursos.add(new Curso("KAFKA", 250.5f, 18, 33));
		listaCursos.add(new Curso("MAGNOLIA", 18.5f, 15, 54));
		
		//TODO INTENTAR HACERLOS EN UN SOLO STREAM (CADA UNO)

		// Obtener la cantidad de cursos con duración mayor a 5 horas
		System.out.println("1 " + listaCursos.stream().filter(c -> c.getDuracion()>5).count());
		
		// Obtener la cantidad de cursos con duración menor a 2 horas
		System.out.println("2 " + listaCursos.stream().filter(c -> c.getDuracion()<2).count());
		
		// Listar el título de aquellos cursos con más de 50 videos
		listaCursos.stream().filter(c -> (c.getVideos()>50)).forEach(e -> System.out.println("3 " + e.getTitulo()));
		//listaCursos.stream().filter(c -> (c.getVideos()>50)).map(c -> c.getTitulo()).forEach(null);
		
		// Mostrar el titulo de los 3 cursos con mayor duración
		listaCursos.stream().limit(3).forEachOrdered(c -> System.out.println("4 " + c.getTitulo()));
		
		// Mostrar la duración total de los cursos
		System.out.println("5 " + listaCursos.stream().map(c -> c.getDuracion()).mapToDouble(i -> i.doubleValue()).sum());
		
		// Obtener el curso con mayor duración
		//listaCursos.stream().filter(c -> c.getDuracion() > )
		
		// Crear una lista de string con los titulos de todos los cursos
		List<String> listaTitulos = new ArrayList<>();
		listaCursos.stream().forEach(l -> listaTitulos.add(l.getTitulo()));
		System.out.println("6 " + listaTitulos);
		System.out.println("Lista de cursos: " + listaCursos.stream().map(Curso::getTitulo).toList());
		
		// Mostrar todos aquellos cursos cuya duración supere el promedio de duración en horas del conjunto
		System.out.println("7 ");
		System.out.println("Cursos cuya duración supere el promedio: " +listaCursos.stream().filter(curso -> curso.getDuracion() > listaCursos.stream().mapToDouble(Curso::getDuracion).average().getAsDouble()).map(Curso::getTitulo).toList());
		
		// Mostrar la duración de los cursos con menos de 500 alumnos
		listaCursos.stream().filter(c -> (c.getAlumnos()<500)).forEach(e -> System.out.println("8 " + e.getDuracion()));
		System.out.println("Duracion de los cursos con menos de 500 alumnos: " +listaCursos.stream().filter(curso -> curso.getAlumnos() < 500).map(Curso::getDuracion).toList());
	}
	
}
