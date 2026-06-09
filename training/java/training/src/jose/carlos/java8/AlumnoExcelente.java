package jose.carlos.java8;

public class AlumnoExcelente implements CompruebaAlumno {

	@Override
	public boolean test(Alumno a) {
		// un alumno es excelente si nota media es mayor a 8
		boolean bdev = false;
			bdev = a.getNota_media() >= 8;
		return bdev;
	}
	
	

}
