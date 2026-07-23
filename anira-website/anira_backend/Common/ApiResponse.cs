namespace anira_backend.Common;

public record ApiResponse<T>(bool Success, T? Data, string? Message, string[]? Errors)
{
    public static ApiResponse<T> Ok(T data, string? message = null) =>
        new(true, data, message, null);

    public static ApiResponse<T> Fail(string message, string[]? errors = null) =>
        new(false, default, message, errors);
}
