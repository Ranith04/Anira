using System;

namespace feora_backend.Entities;

public enum UserRole { Customer, Staff, Admin }

public class User
{
    public Guid Id { get; set; }
    public required string Email { get; set; }
    public string? Phone { get; set; }
    public string? PasswordHash { get; set; }
    public required string FullName { get; set; }
    public UserRole Role { get; set; }
    public bool IsEmailVerified { get; set; }
    public bool IsActive { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset UpdatedAt { get; set; }
}
