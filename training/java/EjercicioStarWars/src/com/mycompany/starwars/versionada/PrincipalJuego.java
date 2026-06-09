package com.mycompany.starwars.versionada;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.List;
import java.util.Locale;
import java.util.Scanner;

import com.mycompany.starwars.versionada.model.Nivel;
import com.mycompany.starwars.versionada.model.Pruebas;
import com.mycompany.starwars.versionada.util.TextosConstantes;

public class PrincipalJuego {

	private static int num_niveles;
	private static int nivel_actual;
	private static List<Nivel> niveles;

	public static void main(String[] args) throws IOException {

		niveles = iniciarJuego();
		boolean nivel_superado = false;
		Nivel nivel_actual = null;

		do {
			nivel_actual = niveles.get(PrincipalJuego.nivel_actual);
			System.out.println(nivel_actual.texto());
			nivel_superado = nivel_actual.prueba().prueba();
			PrincipalJuego.nivel_actual++;

		} while ((nivel_superado) && (PrincipalJuego.nivel_actual < num_niveles));

		if (nivel_superado) {
			mostrarVictoria();
		} else {
			mostrarDerrota();
		}
		finalJuego();

		guardarResultado();
	}

	private static List<Nivel> iniciarJuego() {
		List<Nivel> lista_niveles = null;

		Nivel nivel1 = new Nivel(TextosConstantes.TEXTO_NIVEL1, Pruebas.prueba1);
		Nivel nivel2 = new Nivel(TextosConstantes.TEXTO_NIVEL2, Pruebas.prueba2);
		Nivel nivel3 = new Nivel(TextosConstantes.TEXTO_NIVEL3, Pruebas.prueba3);
		Nivel nivel4 = new Nivel(TextosConstantes.TEXTO_NIVEL4, Pruebas.prueba4);
		Nivel nivel5 = new Nivel(TextosConstantes.TEXTO_NIVEL5, Pruebas.prueba5);

		lista_niveles = List.of(nivel1, nivel2, nivel3, nivel4, nivel5);

		PrincipalJuego.num_niveles = lista_niveles.size();
		PrincipalJuego.nivel_actual = 0;

		System.out.println(TextosConstantes.TEXTO_INICIO);
		new Scanner(System.in).nextLine();

		return lista_niveles;

	}

	private static void mostrarVictoria() {
		System.out.println(TextosConstantes.TEXTO_VICTORIA);
	}

	private static void mostrarDerrota() {
		System.out.println(TextosConstantes.TEXTO_DERROTA);
	}

	private static void finalJuego() {
		System.out.println(TextosConstantes.TEXTO_FIN_JUEGO);
	}

	private static void guardarResultado() throws IOException {
		BufferedWriter bw = new BufferedWriter(new FileWriter(new File("./src/historico.txt"), true));
		
		try (bw) {
			//obtenemos fecha
			ZonedDateTime zdt = ZonedDateTime.of(LocalDateTime.now(), ZoneId.of("Europe/Madrid"));
			DateTimeFormatter dateTimeFormatterZonaL = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.LONG);
			Locale aLocale = new Locale.Builder().setLanguage("es").build();
			
			String fecha = dateTimeFormatterZonaL.withLocale(aLocale).format(zdt);
			String registro = "NIVEL ALCANZADO " + nivel_actual + " " + fecha+"\n";
			bw.write(registro);
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
