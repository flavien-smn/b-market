import { OrderTable } from "@/components/admin/orderAdmin/orderTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrderStore } from "@/store/useOrderStore";
import { StatsResponse } from "@/types/stats";
import { Clock, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


interface StatsTableProps {
    stats: StatsResponse | null,
    handleRefresh: () => Promise<void>
}


export function OrderTableStats({ stats }: StatsTableProps) {
    const { orders, fetchOrders, init , isLoading } = useOrderStore()
    const router = useRouter()
    
    useEffect(() => {
        init();
    }, [init]);

    return (
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Commandes récentes</CardTitle>
                    <CardDescription>{stats?.ordersByStatus.find((o) => o.status === "PENDING")?.count || 0} commandes en attente</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push("/admin/orders")}>
                    Toutes les voirs
                </Button>
            </CardHeader>

            <CardContent>

                <OrderTable
                    data={orders}
                    onEdit={() => { }}
                    onDelete={() => { }}
                />

            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
                <div className="text-sm text-muted-foreground">
                    Mise à jour <Clock className="h-3 w-3 inline mr-1" /> il y a quelques minutes
                </div>
                <Button variant="ghost" size="sm" onClick={fetchOrders}>
                    <RefreshCw className="h-4 w-4 mr-2" /> Actualiser
                </Button>
            </CardFooter>
        </Card>

    )
}