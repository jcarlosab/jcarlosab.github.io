package com.mycompany.starwars;

import java.util.Scanner;

/**
 * El juego Star Wars
 * @author gatal
 */

//TODO HACED UNA VERSIÓN ALTERNATIVA A LA DADA, QUE FUNCIONE IGUAL, SOLO QUE AÑADA ESTO
//AL FUNCIONAMIENTO DEL JUEGO, ADD LO SIGUIENTE
//CUANDO EL USUARIO ACABE (YA GANE O PIERDA)
//HAY QUE ESCRIBIR EN UN FICHERO DE TEXTO, EL NIVEL AL QUE HA LLEGADO Y LA FECHA CON LA HORA

//aplicando el máximo de NOVEDADES VISTAS (al menos 3)
//DIAGRAMA DE CLASES/paquetes-- CUANTAS CLASES HACÉIS

public class PROG04Practica {
    
    //Crear un objeto para poder leer del teclado, poner static para poder usar
    //Scanner en todos metodos de clase
    static Scanner scan = new Scanner(System.in);
    
    public static void main(String[] args) {
           
        //Escribir sobre el inicio del juego por pantalla
        System.out.println("=== STAR WARS CÓDIGOS SECRETOS ===");
        System.out.println("Hace mucho tiempo, en una galaxia muy, muy lejana... La Princesa");         
        System.out.println("Leia, Luke Skywalker, Han Solo, Chewbacca, C3PO y R2D2 viajan en");       
        System.out.println("una nave imperial robada en una misión secreta para infiltrarse en otra");         
        System.out.println( "estrella de la muerte que el imperio está construyendo para destruirla.");
        System.out.println("(Presiona Intro para continuar)");
        
       scan.nextLine();
       
       //Comprobar si el usuario ha superado nivel
       //si metodo vuelve true jugador sigue si no pierda
       if (nivel1()) {
           if(nivel2()){
               if(nivel3()){
                   if(nivel4()){
                       if (nivel5()){
                           ganarJuego();
                           finJuego();
                       } else {
                           perdidaJuego();
                           finJuego();
                       }
                   } else {
                       perdidaJuego();
                       finJuego();
                   }
               } else {
                   perdidaJuego();
                   finJuego();
               }
           } else {
               perdidaJuego();
               finJuego();
           }
       } else {
           perdidaJuego();
           finJuego();
       }    
    }
    
    
    //Este metodo contiene la prueba del nivel 1 del juego
    //Vuelve true si el jugador la supera, false en caso contrario
    public static boolean nivel1(){
                     
        //Escribir la explicación del nivel 1 por pantalla
        System.out.println("Los problemas empiezan cuando deben realizar un salto hiperespacial");
        System.out.println("hasta al sistema S1 en el sector S2, pero el sistema de navegación está");
        System.out.println("estropeado y el computador tiene problemas para calcular parte de las");
        System.out.println("coordenadas de salto.");
        System.out.println("Chewbacca, piloto experto, se da cuenta que falta el cuarto número de la serie.");
        System.out.println("Recuerda de sus tiempos en la academia de pilotos que para calcularlo");
	System.out.println("hay que calcular el sumatorio entre el nº del sistema y el nº del sector");
        System.out.println("(ambos inclusive).\n");
					
					
	// Crear y calcular primer número entero aleatorio entre 1 y 10
	int S1 = (int) (Math.random() * 10 + 1);
	// Crear y calcular segundo número entero aleatorio entre 20 y 30
	int S2 = (int) (Math.random() * (30 - 20 + 1) + 20);
        
        //Escribir el primer numero aleatorio y segundo por pantalla
	System.out.println("El número del sistema es: " + S1);
	System.out.println("El número del sector es: " + S2 + "\n");
        
        //Usar el metodo sumatorio para obtener el resultado
        int resultado = sumatorio(S1,S2);
        
        // Pedir al usuario que introduzca su respuesta
        System.out.println("¿Qué debe introducir?\n");
        
        // Leer la respuesta introducida por el usuario
        int respuestaNivel1 = scan.nextInt();
        
        //Para tener espacio entre la respuesta y el texto despues
        System.out.println("");
        
        //Comparar 2 variables para que el metodo vuelva true o false
        return respuestaNivel1 == resultado;
                
    }
    
    
    //Este metodo contiene la prueba del nive2 1 del juego
    //Vuelve true si el jugador la supera, false en caso contrario
    public static boolean nivel2() {
             
        //Escribir la explicación del nivel 2 por pantalla
        System.out.println("Gracias a Chewbacca consiguen llegar al sistema correcto y ven a");
        System.out.println("lejos la estrella de la muerte. Como van en una nave imperial robada se");
        System.out.println("aproximan lentamente con la intención de pasar desapercibidos.");
        System.out.println("De repente suena el comunicador. “Aquí agente de espaciopuerto P1");
	System.out.println("contactando con nave imperial P2. No están destinados en este sector.");
        System.out.println("¿Qué hacen aquí?”. Han Solo coge el comunicador e improvisa.");
        System.out.println("“Eh... tenemos un fallo en el... eh... condensador de fluzo... Solicitamos");
        System.out.println("permiso para atracar y reparar la nave”. El agente, que no se anda con");
        System.out.println("tonterías, responde “Proporcione código de acceso o abriremos fuego”.");
        System.out.println("Han Solo ojea rápidamente el manual del piloto que estaba en la");
        System.out.println("guantera y da con la página correcta. El código es el productorio entre");
        System.out.println("el nº del agente y el nº de la nave (ambos inclusive).\n");
        
        //Crear y calcular primer número entero aleatorio entre 1 y 7
        int P1 = (int)(Math.random()*7+1);
        //Crear y calcular segundo número entero aleatorio entre 8 y 12
        int P2 = (int)(Math.random()*(12-8+1)+8);
        
        //Escribir el primer numero aleatorio y segundo por pantalla
	System.out.println("El número del agente es: " + P1);
	System.out.println("El número de la nave es: " + P2 + "\n");
        
        //Usar el metodo productorio para obtener el resultado
        int resultado = productorio(P1,P2);
			
        // Pedir al usuario que introduzca su respuesta
	System.out.println("¿Cuál es el código?\n");
        
        // Leer la respuesta introducida por el usuario
        int respuestaNivel2 = scan.nextInt();
        
        System.out.println("");
        
        //Comparar 2 variables para que el metodo vuelva true o false
        return respuestaNivel2 == resultado;				
    }
    
    
    //Este metodo contiene la prueba del nivel 3 del juego
    //Vuelve true si el jugador la supera, false en caso contrario
    public static boolean nivel3(){
        
        // Escribir la explicación del nivel 3 por pantalla
	System.out.println("Han Solo proporciona el código correcto. Atracan en la estrella de la");
	System.out.println("muerte, se equipan con trajes de soldados imperiales que encuentran");
	System.out.println("en la nave para pasar desapercibidos y bajan. Ahora deben averiguar");
	System.out.println("en qué nivel de los N existentes se encuentra el reactor principal. Se");
	System.out.println("dirigen al primer panel computerizado que encuentran y la Princesa");
	System.out.println("Leia intenta acceder a los planos de la nave pero necesita introducir");
	System.out.println("una clave de acceso. Entonces recuerda la información que le");
	System.out.println("proporcionó Lando Calrissian “La clave de acceso a los planos de la");
	System.out.println("nave es el factorial de N/10 (redondeando N hacia abajo), donde N es el nº de niveles”.\n");
	
        //Crear y calcular número entero aleatorio entre 50 y 100
	int N = (int)(Math.random()*(100-50+1)+50);
		
	//Escribir el numero aleatorio por pantalla
	System.out.println("Numero de niveles es: " + N + "\n");
		
        //Crear el numero nuevo y usamos el metodo que nos demueste numero factrorial y lo dividimos entre 10
	int resultado = numeroFactorial(N/10);
		
	//Preguenta al jugador sobre el resultado por pantalla
	System.out.println("¿Cual es el nivel correcto?\n");
		
        // Leer la respuesta introducida por el usuario
	int respuestaNivel3 = scan.nextInt();
        
        System.out.println("");
	
        //Comparar 2 variables para que el metodo vuelva true o false
	return respuestaNivel3 == resultado;		
    }
    
    
    //Este metodo contiene la prueba del nivel 4 del juego
    //Vuelve true si el jugador la supera, false en caso contrario
    public static boolean nivel4 (){
        
        // Escribir la explicación del nivel 3 por pantalla    
        System.out.println("Gracias a la inteligencia de Leia llegan al nivel correcto y encuentran la");
        System.out.println("puerta acorazada que da al reactor principal. R2D2 se conecta al panel");
        System.out.println("de acceso para intentar hackear el sistema y abrir la puerta. Para");
        System.out.println("desencriptar la clave necesita verificar si el número P es primo o no.\n");
           
        //Crear y calcular número entero aleatorio entre 10 y 100
        int P = (int)(Math.random()*(100-10+1)+10);
        
        //Escribir el numero aleatorio por pantalla
        System.out.println("El número es: " + P + "\n");
        
        //Crear el numero nuevo y usar el metodo que revise si es el numero es primo o no
        int resultado = esNumeroPrimo(P);
        
        //Preguenta al jugador sobre el resultado por pantalla
        System.out.println("Si es primo introduce un 1, si no lo es introduce un 0.\n");
        
        // Leer la respuesta introducida por el usuario
        int respuestaNivel4 = scan.nextInt();
        
        System.out.println("");
        
        //Comparar 2 variables para que el metodo vuelva true o false
        return respuestaNivel4 == resultado;       
    }
    
    
    //Este metodo contiene la prueba del nivel 4 del juego
    //Vuelve true si el jugador la supera, false en caso contrario
    public static boolean nivel5(){
    
        // Escribir la explicación del nivel 3 por pantalla
        System.out.println("la bomba, programe el temporizador y salir de allí corriendo. Necesita");
        System.out.println("Consiguen entrar al reactor. Ya solo queda que Luke Skywalker coloque");
        System.out.println("programarlo para que explote en exactamente M minutos y S segundos,");
        System.out.println("el tiempo suficiente para escapar antes de que explote pero sin que el");
        System.out.println("sistema de seguridad anti-explosivos detecte y");
        System.out.println("desactive la bomba. Pero el temporizador utiliza un reloj Zordgiano un");
        System.out.println("tanto peculiar. Para convertir los minutos y segundos al sistema");
        System.out.println("Zordgiano hay que sumar el factorial de M y el factorial de S.\n");
    
        //Crear y calcular 2 números  enteros aleatorios entre 5 y 10
        int M = (int)(Math.random()*(10-5+1)+5);		
        int S = (int)(Math.random()*(10-5+1)+5);
        
        //Escribir los numeros aleatorios por pantalla
        System.out.println("El numero M es: " + M);
        System.out.println("El numero S es: " + S + "\n");
    
        //Usar el metodo numeroFactorial para obtener factoril primer y segundo numeros
        int factorial1 = numeroFactorial(M);
        int factorial2 = numeroFactorial(S);
           
        //Sumar 2 numeros para obtener el resultado
        int resultado = factorial1 + factorial2;
        
        //Preguenta al jugador sobre el resultado por pantalla
        System.out.println("¿Qué valor debe introducir?");
    
        // Leer la respuesta introducida por el usuario
        int respuestaNivel5 = scan.nextInt();
        
        System.out.println("");
    
        //Comparar 2 variables para que el metodo vuelva true o false
        return resultado == respuestaNivel5;
    }
    
    
    
    //Crear metodo que muestra el mensaje por el juego no superado
    public static void perdidaJuego(){
        System.out.println("Ese no era el código correcto... La misión ha sido un fracaso... :( :( :(");
        System.out.println("\"Todavía no eres un Maestro Jedi de las Matemáticas. ¡Vuelve intentarlo!\n");				
    }
    
    //Crear metodo que muestra el mensaje que ganador ha ganado
    public static void ganarJuego(){
        System.out.println("Luke Skywalker introduce el tiempo correcto, activa el temporizador y");
        System.out.println("empiezan a sonar las alarmas. Salen de allí corriendo, no hay tiempo");
        System.out.println("que perder. La nave se convierte en un hervidero de soldados de arriba");
        System.out.println("a abajo y entre el caos que les rodea consiguen llegar a la nave y salir");
        System.out.println("de allí a toda prisa. A medida que se alejan observan por la ventana la");
        System.out.println("imagen de la colosal estrella de la muerte explotando en");
        System.out.println("el silencio del espacio, desapareciendo para siempre junto a los restos");
        System.out.println("del malvado imperio.");
        System.out.println("¡Has salvado la galaxia gracias a la Fuerza Jedi de las matemáticas!");
        System.out.println("Enhorabuena ;D \n");
    }
        
    //Crear metodo para que muestra el despedido del juego
    public static void finJuego () {
	System.out.println("Gracias por jugar :D");
    }
    
    //Crear el metodo que nos calcule el sumatorio
    public static int sumatorio(int numero1, int numero2){
        int suma = numero1;
        
        for (int i = numero1; i < numero2; i++){
            numero1++;
            suma = suma + numero1;
        }
        return suma;
    }
    
    //Crear el metodo que nos calcule productorio
    public static int productorio(int numero1, int numero2){
        int productorio = numero1;
		
	for (int i = numero1; i<numero2; i++) {
            numero1++;
            productorio = productorio*numero1;
	}
        return productorio;
    }
    
    //Crear el metodo que nos calcule numero factorial
    public static int numeroFactorial (int num) {
		
	int factorial = num;
		
	for (int i = (num-1); i > 1; i--) {
            factorial = factorial * i;
	}
        
	return factorial;
    } 
    
    //Crear el metodo que calcule si un numero es primo o no
    public static int esNumeroPrimo(int numero){
        
        int divisor = 2;
        
        while (divisor <= numero / 2) {
            if(numero % divisor == 0) {
                //si no es primo nos vuelve 0
                return 0;
            }  
            divisor ++;
        }
        // si es primo nos vuelve 1
        return 1;
    }
}
