package jose.carlos.java8;

import java.util.Arrays;
import java.util.OptionalInt;
import java.util.stream.IntStream;

public class EstadisticosArrayEnteros {
	
	public static void main(String[] args) {
		
		int [] array_enteros = { 42, 1, 2, 3, 4, 5, 8, 19};
		
		//TODO: vamos a sacar los datos estadísticos de máximo, mínimo y media de este array
		//de 2 formas
		 	//clásica
			//java 8-9 streams
		System.out.println(clasicMax(array_enteros));
		System.out.println(clasicMinimo(array_enteros));
		System.out.println(clasicMedia(array_enteros));
		
		// 1 obtener un arry de stream
		/*IntStream intStream = Arrays.stream(array_enteros);
		intStream.forEach(n -> System.out.println(n));
		OptionalInt omax = intStream.max();
		if (omax.isPresent()) {
			System.out.println(omax);
		}*/
		
		Arrays.stream(array_enteros).peek(i->System.out.println(i)).min();
		
	}
	
	private static int clasicMax (int [] array_enteros)
	{
		int max = array_enteros[0];
			for (int i : array_enteros)
			{
				if (i>max) {
					max = i;
				}
			}
		return max;
	}
	
	private static int clasicMinimo (int [] array_enteros)
	{
		int min = array_enteros[0];
		
			for (int i : array_enteros)
			{
				if (i<min) {
					min = i;
				}
			}
		return min;
	}
	
	private static float clasicMedia (int [] array_enteros)
	{
		float media = 0;
		float suma = 0;
			for (int i : array_enteros)
			{
				suma += i;
			}
			media = suma / array_enteros.length;
		return media;
	}
	
	
}

