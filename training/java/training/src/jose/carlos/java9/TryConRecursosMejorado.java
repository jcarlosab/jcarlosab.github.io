package jose.carlos.java9;

import java.io.BufferedReader;
import java.io.FileReader;

public class TryConRecursosMejorado {

	public static void main(String[] args) {
		BufferedReader bf = null;
		try {
			bf = new BufferedReader(new FileReader("./README.md"));
			String linea = bf.readLine();
			System.out.println(linea);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				bf.close();
			} catch (Exception e) {
				// TODO: handle exception
			}
		}
		
		//Try con recursos JAVA 7
		try (BufferedReader bfr = new BufferedReader(new FileReader("./README.md"));) {
			String linea = bf.readLine();
			System.out.println(linea);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//Try con recursos JAVA 9
		/*BufferedReader bfr9 = new BufferedReader(new FileReader("./README.md"));
		try (bfr9) {
			String linea = bf.readLine();
			System.out.println(linea);
		} catch (Exception e) {
			e.printStackTrace();
		}*/

	}

}
