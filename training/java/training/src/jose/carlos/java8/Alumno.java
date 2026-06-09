package jose.carlos.java8;

import java.util.Arrays;

public class Alumno {

	//BEAN, POJO, MODELO, DTO
	//nombre, edad, notas, notamedia
	private String nombre;
	public Alumno(String nombre, int nota_media) {
		super();
		this.nombre = nombre;
		this.nota_media = nota_media;
	}


	private int edad;
	private int[] notas;
	private int nota_media;
	
	
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public int getEdad() {
		return edad;
	}
	public void setEdad(int edad) {
		this.edad = edad;
	}
	public int[] getNotas() {
		return notas;
	}
	public void setNotas(int[] notas) {
		this.notas = notas;
	}
	public int getNota_media() {
		return nota_media;
	}
	public void setNota_media(int nota_media) {
		this.nota_media = nota_media;
	}
	
	public Alumno(String nombre, int edad, int[] notas, int nota_media) {
		super();
		this.nombre = nombre;
		this.edad = edad;
		this.notas = notas;
		this.nota_media = nota_media;
	}
	
	public Alumno(String nombre, int edad, int nota_media) {
		super();
		this.nombre = nombre;
		this.edad = edad;
		this.nota_media = nota_media;
	}
	
	
	@Override
	public String toString() {
		return "Alumno [nombre=" + nombre + " nota_media= "+ nota_media + "]";
	}
	
	
	
}
