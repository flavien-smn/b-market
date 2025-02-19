"use client"

import { Button } from "@/components/ui/button"
import { Order } from "@/types/order"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye } from "lucide-react"
import { DataTable } from "../table/dataTable"
import { Badge } from "../ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface OrderTableProps {
  data: Order[]
  onEdit: (Order: Order) => void
  onDelete: (Order: Order) => void
}

export function OrderTable({ data, onEdit, onDelete }: OrderTableProps) {
  const router = useRouter();

  const handleRowClick = (order: Order) => {
    router.push(`/admin/order/${order.id}`);
  };

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: 'id',
      header: 'Order ID',
    },
    {
      accessorKey: 'user',
      header: 'Client',
      cell: ({ row }) => row.original.user.name,
      filterFn: (row, id, value) => {
        return row.original.user.name.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-4"
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge
            variant={
              status === 'pending'
                ? 'secondary'
                : status === 'awaiting_payment'
                  ? 'info'
                  : status === 'completed'
                    ? 'success'
                    : status === 'cancelled'
                      ? 'destructive'
                      : 'default'
            }
          >
            {status}
          </Badge>
        );
      },
      sortingFn: (rowA, rowB) => {
        const statusOrder = {
          'pending': 1,
          'awaiting_payment': 2,
          'completed': 3,
          'cancelled': 4
        };
        const statusA = rowA.original.status;
        const statusB = rowB.original.status;
        return statusOrder[statusA as keyof typeof statusOrder] - statusOrder[statusB as keyof typeof statusOrder];
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Link href={`/admin/order/${row.original.id}`}>
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )
      }
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      filterColumn="user"
      filterPlaceholder="Filtrer par client..."
      onRowClick={handleRowClick}
    />
  )

}