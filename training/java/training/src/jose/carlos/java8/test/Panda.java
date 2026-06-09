package jose.carlos.java8.test;

import java.util.function.Predicate;

public class Panda {

	int age;

	public static void main(String[] args) {
		Panda p1 = new Panda();
		p1.age = 1;
		check(p1, p -> p.age < 5);

	}

	private static void check(Panda panda, Predicate<Panda> p) {
		String resultado = p.test(panda) ? "match" : "no match";
		System.out.println(resultado);
	}

}

/**
 * OPCIONES 
 * 
 * a) match !!!! SOLUCIÓN
 * b) not match
 * c) error compilación en linea 12
 * d) error compilación en linea 16
 * e) error compilación en linea 18
 * f) lanza una RuntimeException*/
