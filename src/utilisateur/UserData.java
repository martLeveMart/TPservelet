package utilisateur;

public class UserData {

	private String id;
	private String browser;
	private String continent;
	private String pays;
	private String OS;
	private String resolution;
	private String date;
	//TODO rajouter la date de conexion
	
	public String getId() {
		return id;	
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getBrowser() {
		return browser;	
	}
	
	public void setBrowser(String browser) {
		this.browser = browser;
	}
	
	public String getContinent() {
		return continent;	
	}
	
	public void setContinent(String continent) {
		this.continent = continent;
	}
	
	public String getPays() {
		return pays;	
	}
	
	public void setPays(String pays) {
		this.pays = pays;
	}
	
	public String getOS() {
		return OS;	
	}
	
	public void setOS(String OS) {
		this.OS = OS;
	}
	
	public String getResolution() {
		return resolution;	
	}
	
	public void setResolution(String resolution) {
		this.resolution = resolution;
	}
	
	public String getDate() {
		return date;	
	}
	
	public void setDate(String date) {
		this.date = date;
	}
}
