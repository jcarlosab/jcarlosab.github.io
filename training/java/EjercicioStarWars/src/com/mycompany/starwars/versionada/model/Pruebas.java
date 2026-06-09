package com.mycompany.starwars.versionada.model;

import java.util.Scanner;

import com.mycompany.starwars.versionada.util.CalculosUtil;

public class Pruebas {

	
	static Scanner scan = new Scanner(System.in);

	public static Prueba prueba1 = () -> {

		boolean superada = false;
		
			int S1 = (int) (Math.random() * 10 + 1);
			int S2 = (int) (Math.random() * (30 - 20 + 1) + 20);
	
			System.out.println("El número del sistema es: " + S1);
			System.out.println("El número del sector es: " + S2 + "\n");
	
			int resultado = CalculosUtil.sumatorio(S1, S2);
			System.out.println(resultado);
	
			System.out.println("¿Qué debe introducir?\n");
			int respuestaNivel1 = scan.nextInt();
	
			// Para tener espacio entre la respuesta y el texto despues
			System.out.println("");

			superada = respuestaNivel1 == resultado; 
		return superada;
	};
	
	public static Prueba prueba2 = () -> {

		boolean superada = false;
		
			//Crear y calcular primer número entero aleatorio entre 1 y 7
	        int i1 = (int)(Math.random()*7+1);
	        //Crear y calcular segundo número entero aleatorio entre 8 y 12
	        int i2 = (int)(Math.random()*(12-8+1)+8);
        
	        //Escribir el primer numero aleatorio y segundo por pantalla
			System.out.println("El número del agente es: " + i1);
			System.out.println("El número de la nave es: " + i2 + "\n");
        
	        //Usar el metodo productorio para obtener el resultado
	        int resultado = CalculosUtil.productorio(i1,i2);
	        System.out.println(resultado);
			
	        // Pedir al usuario que introduzca su respuesta
	        System.out.println("¿Cuál es el código?\n");
        
	        // Leer la respuesta introducida por el usuario
	        int respuestaNivel2 = scan.nextInt();
        
	        System.out.println("");
        
	        //Comparar 2 variables para que el metodo vuelva true o false
            superada = respuestaNivel2 == resultado;
            
		return superada;
	};
	
	public static Prueba prueba3 = () -> {

		boolean superada = false;
		
			//Crear y calcular número entero aleatorio entre 50 y 100
			int in = (int)(Math.random()*(100-50+1)+50);
				
			//Escribir el numero aleatorio por pantalla
			System.out.println("Numero de niveles es: " + in + "\n");
				
		     //Crear el numero nuevo y usamos el metodo que nos demueste numero factrorial y lo dividimos entre 10
			int resultado = CalculosUtil.numeroFactorial(in/10);
			System.out.println(resultado);
				
			//Preguenta al jugador sobre el resultado por pantalla
			System.out.println("¿Cual es el nivel correcto?\n");
				
			int respuestaNivel3 = scan.nextInt();
			
			superada = respuestaNivel3 == resultado;
			
		return superada;
	};
	
	public static Prueba prueba4 = () -> {

		boolean superada = false;
		
			 //Crear y calcular número entero aleatorio entre 10 y 100
	        int i1 = (int)(Math.random()*(100-10+1)+10);
	        
	        //Escribir el numero aleatorio por pantalla
	        System.out.println("El número es: " + i1 + "\n");
	        
	        //Crear el numero nuevo y usar el metodo que revise si es el numero es primo o no
	        int resultado = CalculosUtil.esNumeroPrimo(i1);
	        System.out.println(resultado);
	        
	        //Preguenta al jugador sobre el resultado por pantalla
	        System.out.println("Si es primo introduce un 1, si no lo es introduce un 0.\n");
	        
	        // Leer la respuesta introducida por el usuario
	        int respuestaNivel4 = scan.nextInt();
	        
	        System.out.println("");
	        superada = (respuestaNivel4==resultado);
	        
		return superada;
	};
	
	public static Prueba prueba5 = () -> {

		boolean superada = false;
		
			
	
			 //Crear y calcular 2 números  enteros aleatorios entre 5 y 10
	        int im = (int)(Math.random()*(10-5+1)+5);		
	        int is = (int)(Math.random()*(10-5+1)+5);
	        
	        //Escribir los numeros aleatorios por pantalla
	        System.out.println("El numero M es: " + im);
	        System.out.println("El numero S es: " + is + "\n");
	    
	        //Usar el metodo numeroFactorial para obtener factoril primer y segundo numeros
	        int factorial1 = CalculosUtil.numeroFactorial(im);
	        int factorial2 = CalculosUtil.numeroFactorial(is);
	           
	        //Sumar 2 numeros para obtener el resultado
	        int resultado = factorial1 + factorial2;
	        System.out.println(resultado);
	        
	        //Preguenta al jugador sobre el resultado por pantalla
	        System.out.println("¿Qué valor debe introducir?");
	    
	        // Leer la respuesta introducida por el usuario
	        int respuestaNivel5 = scan.nextInt();
	        
	        System.out.println("");
	        superada = respuestaNivel5 == resultado;
	    
		return superada;
	};


}
