package com.mycompany.starwars.versionada.util;

public class CalculosUtil {

	public static int sumatorio(int numero1, int numero2) {
		int suma = numero1;

		for (int i = numero1; i < numero2; i++) {
			numero1++;
			suma = suma + numero1;
		}
		return suma;
	}

	// Crear el metodo que nos calcule productorio
	public static int productorio(int numero1, int numero2) {
		int productorio = numero1;

		for (int i = numero1; i < numero2; i++) {
			numero1++;
			productorio = productorio * numero1;
		}
		return productorio;
	}

	// Crear el metodo que nos calcule numero factorial
	public static int numeroFactorial(int num) {

		int factorial = num;

		for (int i = (num - 1); i > 1; i--) {
			factorial = factorial * i;
		}

		return factorial;
	}

	// Crear el metodo que calcule si un numero es primo o no
	public static int esNumeroPrimo(int numero) {

		int divisor = 2;

		while (divisor <= numero / 2) {
			if (numero % divisor == 0) {
				// si no es primo nos vuelve 0
				return 0;
			}
			divisor++;
		}
		// si es primo nos vuelve 1
		return 1;
	}
}
