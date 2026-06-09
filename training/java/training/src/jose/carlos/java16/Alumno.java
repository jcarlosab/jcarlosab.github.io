package jose.carlos.java16;

public record Alumno(String nombre, int edad, int nota) {
	
	boolean esAlumnoAprobado () {
		//this.nota = 6; //PROHIBIDO! no me deja modifcar el estado del objeto/ningún atributo
		return this.nota >= 5;
	}
	
	@Override //Metodo sobreescrito
	public int edad() {
		//this.edad = this.edad+20;;//no see puede
		return this.edad + 20;
	}
	
	@Override
	public boolean equals (Object alumno) {
		return false;
	}
	
	//constrcutor COMPACTO : opcional
	public Alumno {
		//si el alumno tiene una nota != 5, le asignamos un 5
		if (nota!=5) { //aquí, nota es el parámetro no el atributo
			nota = 5;
		}
		//antes de invocar al constructor, puedo hacer comprobaciones
		//antes de acabar, se invoca al constructor completo de forma autómatica
	}
	
	//PUEDO sobrecargar el constructor, pero la primera líena debe invocar a uno
	//de los constructores existentes : opcional
	public Alumno (String nombre, int edad) {
		this (nombre, edad, 0);//estamos llamando al compacto
	}
}
