package jose.carlos.java11;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class HttpClientApiChuckNorris {

	private static final String API_CHUCK = "https://api.chucknorris.io/jokes/random";
	
	private static HttpClient httpClient = HttpClient.newBuilder()
										.version(HttpClient.Version.HTTP_2)
										.connectTimeout(Duration.ofSeconds(10))
										.build();
	
	public static void main(String[] args) throws InterruptedException, ExecutionException {
		
		HttpRequest request = HttpRequest.newBuilder().GET().uri(URI.create(API_CHUCK)).build();
		
		CompletableFuture<HttpResponse<String>> respuesta =  httpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString());
		
		System.out.println("ya se ha llamado al servidor");	
		String frase_chuck = respuesta.thenApply(resutaldo -> {
			System.out.println("HA vuelto del servidor");
			String cuerpo = resutaldo.body();
			System.out.println("CUERPO = "+cuerpo);
			return cuerpo;
		}).get();
	
		System.out.println("Frase = "+frase_chuck);

	}

}