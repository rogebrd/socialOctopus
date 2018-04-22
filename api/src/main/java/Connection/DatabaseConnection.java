package Connection;

import java.sql.ResultSet;

public interface DatabaseConnection
{

	/**
	 * Connected to the database
	 * @throws Exception
	 */
	public void connect()
	throws Exception;

	/**
	 * Gets ResultSet from SELECT Query
	 * @param query SQL String
	 * @return ResultSet as query results
	 * @throws Exception
	 */
	public ResultSet SELECT(String query)
	throws Exception;

	/**
	 * Gets ResultSet from UPDATE Query
	 * @param query SQL String
	 * @return ResultSet as query results
	 * @throws Exception
	 */
	public int UPDATE(String query)
	throws Exception;

	/**
	 * Gets ResultSet from INSERT Query
	 * @param query SQL String
	 * @return ResultSet as query results
	 * @throws Exception
	 */
	public int INSERT(String query)
	throws Exception;

	/**
	 * Gets ResultSet from DELETE Query
	 * @param query SQL String
	 * @return ResultSet as query results
	 * @throws Exception
	 */
	public int DELETE(String query)
	throws Exception;

	/**
	 * Disconnects from database
	 * @throws Exception
	 */
	public void disconnect()
	throws Exception;
}
