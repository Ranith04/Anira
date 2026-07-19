using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Npgsql;

namespace feora_backend.Common;

public class DbConnectionFactory(NpgsqlDataSource dataSource)
{
    public async Task<IDbConnection> CreateConnectionAsync(CancellationToken cancellationToken = default)
    {
        return await dataSource.OpenConnectionAsync(cancellationToken);
    }
}
