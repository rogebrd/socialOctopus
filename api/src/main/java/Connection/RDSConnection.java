package Connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class RDSConnection
		implements DatabaseConnection
{
	//Connection URL Variables
	private static final String CONNECTION_DRIVER = "mysql";
	private static final String CONNECTION_HOST_NAME = "";
	private static final String CONNECTION_PORT = "3306";
	private static final String CONNECTION_DB_NAME = "";

	//RDSConnection Variables
	private Connection connection;

	private String username;
	private String password;

	public RDSConnection(String username, String password)
	{
		this.username = username;
		this.password = password;
	}

	private Object query(String query)
	throws Exception
	{
		Object returnValue;

		Statement statement = connection.createStatement();
		boolean isSelect = statement.execute(query);

		if (isSelect)
		{
			returnValue = statement.getResultSet();
		} else
		{
			returnValue = statement.getUpdateCount();
		}

		return returnValue;
	}

	private String getConnectionURL()
	{
		return new StringBuilder()
				.append("jdbc:")
				.append(CONNECTION_DRIVER)
				.append("://")
				.append(CONNECTION_HOST_NAME)
				.append(":")
				.append(CONNECTION_PORT)
				.append("/")
				.append(CONNECTION_DB_NAME)
				.append("?user=")
				.append(username)
				.append("&password=")
				.append(password)
				.toString();
	}

	//----------DatabaseConnection METHODS----------

	public void connect()
	throws Exception
	{
		//load driver
		Class.forName("com.mysql.cj.jdbc.Driver");

		//connect to database
		connection = DriverManager.getConnection(getConnectionURL(), username, password);
	}

	public ResultSet SELECT(String query)
	throws Exception
	{
		return (ResultSet) query(query);
	}

	public int UPDATE(String query)
	throws Exception
	{
		return ((Integer) query(query)).intValue();
	}

	public int INSERT(String query)
	throws Exception
	{
		return ((Integer) query(query)).intValue();
	}

	public int DELETE(String query)
	throws Exception
	{
		return ((Integer) query(query)).intValue();
	}

	public void disconnect()
	throws Exception
	{
		connection.close();
	}
}
