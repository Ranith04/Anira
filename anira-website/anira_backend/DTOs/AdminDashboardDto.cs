using System;
using System.Collections.Generic;

namespace anira_backend.DTOs;

public class AdminDashboardDto
{
    public string TotalRevenue { get; set; } = string.Empty;
    public string ActiveOrders { get; set; } = string.Empty;
    public string TotalCustomers { get; set; } = string.Empty;
    public string ProductsSold { get; set; } = string.Empty;

    public RevenueChange TotalRevenueChange { get; set; } = new();
    public RevenueChange ActiveOrdersChange { get; set; } = new();
    public RevenueChange TotalCustomersChange { get; set; } = new();
    public RevenueChange ProductsSoldChange { get; set; } = new();

    public List<RecentOrderDto> RecentOrders { get; set; } = new();
}

public class RevenueChange
{
    public string Value { get; set; } = string.Empty;
    public string Trend { get; set; } = string.Empty; // "up" or "down"
}

public class RecentOrderDto
{
    public string Id { get; set; } = string.Empty;
    public string Customer { get; set; } = string.Empty;
    public string Date { get; set; } = string.Empty;
    public string Amount { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
}
