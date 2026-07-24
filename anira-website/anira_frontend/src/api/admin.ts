import { useQuery } from '@tanstack/react-query';
import { fetchApi } from './client';

export const adminKeys = {
  all: ['admin'] as const,
  dashboard: () => [...adminKeys.all, 'dashboard'] as const,
  orders: () => [...adminKeys.all, 'orders'] as const,
  customers: () => [...adminKeys.all, 'customers'] as const,
};

export interface RevenueChange {
  value: string;
  trend: 'up' | 'down';
}

export interface RecentOrder {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: string;
}

export interface AdminDashboardStats {
  totalRevenue: string;
  activeOrders: string;
  totalCustomers: string;
  productsSold: string;
  totalRevenueChange: RevenueChange;
  activeOrdersChange: RevenueChange;
  totalCustomersChange: RevenueChange;
  productsSoldChange: RevenueChange;
  recentOrders: RecentOrder[];
}

export interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  date: string;
  amount: string;
  items: number;
  status: string;
  payment: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: string;
  lastActive: string;
}

export function useAdminDashboard() {
  return useQuery({
    queryKey: adminKeys.dashboard(),
    queryFn: () => fetchApi<AdminDashboardStats>('/admin/dashboard'),
  });
}

export function useAdminOrders() {
  return useQuery({
    queryKey: adminKeys.orders(),
    queryFn: () => fetchApi<AdminOrder[]>('/admin/orders'),
  });
}

export function useAdminCustomers() {
  return useQuery({
    queryKey: adminKeys.customers(),
    queryFn: () => fetchApi<AdminCustomer[]>('/admin/customers'),
  });
}
