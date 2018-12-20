package utilisateur;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class UserDataDAO {

	private Connection connect;
	
	public UserDataDAO() throws ClassNotFoundException, SQLException {
	
		Class.forName("com.mysql.jdbc.Driver");
		connect = DriverManager
		.getConnection("jdbc:mysql://localhost:3306/test?user=root&password=azert");
		
	}
		
	public List<UserData> getInfos() throws SQLException{
			Statement st = connect.createStatement();
			ResultSet rs = st.executeQuery("SELECT * FROM user");
			List<UserData> result = new ArrayList();
			
			while (rs.next()) {
				UserData t = new UserData();
				t.setId(rs.getString("id"));
				t.setBrowser(rs.getString("Browser"));
				t.setContinent(rs.getString("Continent"));
				t.setPays(rs.getString("Pays"));
				t.setOS(rs.getString("OS"));
				t.setResolution(rs.getString("Resolution"));
				t.setDate(rs.getString("Date"));
				result.add(t);
			}
			
			return result;
	}

	public void setInfos(UserData user) throws SQLException{
		Statement st = connect.createStatement();
		String requete = "INSERT INTO `user`(`Continent`, `Pays`, `Browser`, `Resolution`, `OS`, `Date`) VALUES ('" + user.getContinent() + "','" + user.getPays() + "','" + user.getBrowser() + "','" + user.getResolution() + "','" + user.getOS() + "','" + user.getDate() + "')";
		int rs = st.executeUpdate(requete);
	}
	
	public void close() throws SQLException {
		connect.close();
	}

}