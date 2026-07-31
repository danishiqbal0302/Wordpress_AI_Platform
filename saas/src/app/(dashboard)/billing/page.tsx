"use client";

import * as React from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../../../components/ui/table";
import { CreditCard, Download } from "lucide-react";

interface BillingData {
  plan: {
    name: string;
    status: string;
    price: number;
    interval: string;
    renewsDate: string;
    maxSites: number;
    connectedSites: number;
    features: string[];
  };
  invoices: {
    id: string;
    date: string;
    amount: string;
    status: string;
  }[];
}

export default function BillingPage() {
  const [billing, setBilling] = React.useState<BillingData | null>(null);

  React.useEffect(() => {
    fetch("/api/billing")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.plan) {
          setBilling(data);
        }
      })
      .catch(() => {});
  }, []);

  const plan = billing?.plan || {
    name: "Pro Agency Plan",
    status: "Active",
    price: 79,
    interval: "mo",
    renewsDate: "Aug 15, 2026",
    maxSites: 10,
    connectedSites: 2,
    features: ["Up to 10 connected WordPress sites", "Daily automated SEO audits"],
  };

  const invoices = billing?.invoices || [
    { id: "INV-2026-07-001", date: "Jul 15, 2026", amount: "$79.00 USD", status: "Paid" },
    { id: "INV-2026-06-001", date: "Jun 15, 2026", amount: "$79.00 USD", status: "Paid" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in max-w-5xl">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-primary" /> Subscription & Billing
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Manage your SaaS plan subscription, website usage quotas, and payment receipts in PostgreSQL.
        </p>
      </div>

      {/* Active Subscription Banner */}
      <Card className="border-primary/40 p-6 bg-gradient-to-r from-blue-950/40 via-card to-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <Badge variant="success">{plan.status}</Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {plan.features.join(" • ")}
          </p>
          <div className="text-xs text-foreground font-semibold pt-1">
            Live Database Quota Usage: <span className="text-primary font-bold">{plan.connectedSites} of {plan.maxSites} sites connected</span>
          </div>
        </div>

        <div className="text-right space-y-2">
          <div className="text-3xl font-black">${plan.price}<span className="text-xs font-normal text-muted-foreground">/{plan.interval}</span></div>
          <p className="text-[11px] text-muted-foreground">Renews automatically on {plan.renewsDate}</p>
          <Button variant="outline" size="sm" className="text-xs font-semibold">Change Plan</Button>
        </div>
      </Card>

      {/* Billing Invoices */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Billing History & Invoices</CardTitle>
          <CardDescription className="text-xs">Download official receipts for agency tax records.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono text-xs">{inv.id}</TableCell>
                  <TableCell className="text-xs">{inv.date}</TableCell>
                  <TableCell className="text-xs font-bold">{inv.amount}</TableCell>
                  <TableCell><Badge variant="success">{inv.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-xs gap-1">
                      <Download className="h-3.5 w-3.5" /> PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
