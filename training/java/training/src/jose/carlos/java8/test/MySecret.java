package jose.carlos.java8.test;


public class MySecret implements Secret {
	
	@Override
	public String magic(double d) {
		return "Poof";
	}
	
	public static void main(String[] args) {
		pruebaLlamada((e)->"Poof");
		//pruebaLlamada((e)-> {"Poof"});
		//pruebaLlamada((e)-> {String e ="";"Poof"});
		//pruebaLlamada((e)-> {String e ="";return "Poof";});
		//pruebaLlamada((e)-> {String e ="";return "Poof"});
		pruebaLlamada((e)-> {String f ="";return "Poof";});
		
		
	}
	
	private static void pruebaLlamada (Secret s)
	{
		System.out.println(s.magic(89));
	}
}
