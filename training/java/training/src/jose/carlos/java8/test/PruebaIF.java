package jose.carlos.java8.test;

import java.util.function.BinaryOperator;
import java.util.function.Consumer;

public class PruebaIF {
	
	public void method ()
	{
		x ((var x) -> {}, (var x, var y) -> false);
	}
	
	public void x (Consumer<String> x, BinaryOperator<Boolean> y) 
	{}

}

/**
 * Marque las correctas:
 * a) No compila porque una de las variables se llama x
 * b) No compila porque una de las variables se llama y
 * c) No compila por otra razon
 * d) Compila y la x es del mismo tipo en cada lambda
 * e) Compila y la x es de distinto tipo en cada lamda !!!SOLUCIÓN
 */