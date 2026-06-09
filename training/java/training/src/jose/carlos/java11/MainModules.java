package jose.carlos.java11;

import java.util.Comparator;
import java.util.Set;

public class MainModules {
	
	public static void main(String[] args) {
		Set<Module> modulos = ModuleLayer.boot().modules();
		modulos.stream().sorted(Comparator.comparing(Module::getName)).forEach(
				modulo-> System.out.println(modulo.getName()));
		//TODO usar el API del módulo con modulo.getDescriptor().requires(); 	modulo.getDescriptor().exports();
	}

}
