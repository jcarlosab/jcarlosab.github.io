package jose.carlos.java8;

import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class MainCollectors {
	
	public static void main(String[] args) {
		List<Alumno> list;
		list = Stream.generate(()-> new Alumno("ALEX", new Random().nextInt(10))).limit(10).toList();
		//System.out.println("Lista alumnos generada = " + list);
		
		Map<Boolean, List<Alumno>> mapa_aprobados_suspenso =
		list.stream().collect(Collectors.partitioningBy(alumno-> alumno.getNota_media()>=5));
		
		System.out.println(mapa_aprobados_suspenso);
		
		//TODO Alumnos agrupados por su nota <Integer, List<Alumno>>
		Map<Integer, List<Alumno>> alumnosAgrupacionNota = list.stream()
	        .collect(Collectors.groupingBy(Alumno::getNota_media));
		    System.out.println(" Alumnos agrupados por su nota :" + alumnosAgrupacionNota + "\n");
		//TODO mapa de alunos agrupados por cantidad de esa nota <Integer, Integer> (peJ 1, hay 2 alumnos, con 5, hay 5 alumnos)
	    Map<Integer, Integer> alumnosCantidadAgrupadosNota = list.stream()
            .collect(Collectors.groupingBy(Alumno::getNota_media,
            Collectors.collectingAndThen(Collectors.counting(), Long::intValue)));
	    System.out.println(" Cantidad de alumnos agrupados por su nota :" + alumnosCantidadAgrupadosNota + "\n");
		//TODO mapa de alunos agrupados por cantidad de aprobados y suspensos <Boolean, Integer>
	    Map<Boolean, Integer> suspensosAprobados = list.stream().collect(Collectors.partitioningBy(alumno -> alumno.getNota_media() >= 5,
    		Collectors.collectingAndThen(Collectors.counting(), Long::intValue)));
        System.out.println(" Cantidad de alumnos suspensos y aprobados :" + suspensosAprobados + "\n");//TODO Alumnos agrupados por su nota <Integer, List<Alumno>>
	}

}
