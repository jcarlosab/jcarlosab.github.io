package jose.carlos.java8.test;

import java.util.function.Function;

public class TestFunction {
	
	public static void main(String[] args) {
		
		Function<Integer, Integer> s = a->a+4;
		Function<Integer, Integer> t = a->a*3;
		Function<Integer, Integer> c = s.compose(t);//1º llamamos a t y aplicamos ese resultado a s
		//Function<Integer, Integer> c = t.compose(s);//15
		System.out.println(c.apply(1));
	}

}

/**
 * Qué devuelve este código
 * 
 * a) 7 !!!! Solución
 * b) 15
 * c) No compila por los tipos de las expresiones lambda
 * d) No compila por la llamada a compose
 * e) No compila por otra razónn
 * 
 * */