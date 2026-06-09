package jose.carlos.java16;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

public class NuevoInstanceOf {
	
	//MEJORA https://openjdk.org/jeps/394
	public static void main(String[] args) {
		
		Object nombre = "VALE";
		//si es un string, quiero saber su longuitud
		if (nombre instanceof String s){
			s.length();
		}
		
		List<String> lista_palabras = List.of("hola", "agur", "bona tarda", "ciao");
		if (lista_palabras instanceof ArrayList) {
			System.out.println("La lista es un Arrray");
			// aquí puedo castear
			ArrayList<String> array_palabras = (ArrayList<String>) lista_palabras;
			array_palabras.toArray();
		} else if (lista_palabras instanceof LinkedList<String>) {
			System.out.println("La lista es un LinkedList");
			//LA NOVEDAD DEL INSTACEOF ES QUE SI CONCUERDA se puede hacer el casting automático
			//añadiendo un objeto a continuación del tipo
		} else if (lista_palabras instanceof Collection collection) {
			System.out.println("La lista es un Collection");
			//Collection collection = (Collection) lista_palabras;
			System.out.println(collection.size());
		}
	}

}
