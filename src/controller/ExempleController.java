package controller;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import utilisateur.UserData;
import utilisateur.UserDataDAO;

import java.io.IOException;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;

@Path ("/Exemple")
public class ExempleController {
	
	@POST
	@Path ("/Bonjour9")
	@Consumes ("application/json")
	@Produces ("application/json")
	public List<UserData> direBonjour7(UserData info) throws IOException {
		List<UserData> infos;
		
		try {
			UserDataDAO utilisateur = new UserDataDAO();
			utilisateur.setInfos(info);
			infos = utilisateur.getInfos();
			utilisateur.close();
			
		} catch (Exception e) {
			throw new IOException("Probleme de connexion à la base");
		} 
		return infos;
	}
}
