package jose.carlos.java8.test;

public class InterfacesFuncionales {
	
	@FunctionalInterface
	public interface Transport {
		public int go();
		@Override
		public boolean equals (Object o);//NO CUENTA PORQUE ES UNA SOBREESCRITURA DE OBJECT
	}
	
	
	public abstract class Car {
		public abstract Object arranca (int duracion);
	}
	
	@FunctionalInterface
	public interface Train extends Transport {}

	
	public interface Locomotive extends Train {
		public int getSpeed();
	}	

	@FunctionalInterface
	public interface Spaceship extends Transport {
		default int maxPasajeros() { return 10;}
	}
	
	@FunctionalInterface
	public interface Boat {
		@Override
		int hashCode();//ESTE NO CUENTA 
		int hashCode(String input);//ABSTRACTO, SÓLO 1, luego IF
	}
	
	public InterfacesFuncionales() {
		this.hashCode();
	}
}