using System.Collections.Generic;

namespace anira_backend.Common;

public record PagedResult<T>(IReadOnlyList<T> Items, int Page, int PageSize, int TotalCount)
{
    public int TotalPages => (int)System.Math.Ceiling((double)TotalCount / PageSize);
}
