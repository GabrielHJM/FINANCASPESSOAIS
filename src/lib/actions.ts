"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { TransactionType, AccountType } from "./types";


export async function createAccount(data: {
  name: string;
  balance: number;
  type: AccountType;
  bankId?: string;
  userId: string;
}) {
  try {
    const account = await prisma.account.create({
      data: {
        name: data.name,
        balance: data.balance,
        type: data.type,
        bankId: data.bankId,
        userId: data.userId,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/accounts");
    return { success: true, account };
  } catch (error) {
    console.error("Error creating account:", error);
    return { success: false, error: "Failed to create account" };
  }
}

export async function createTransaction(data: {
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  accountId?: string;
  cardId?: string;
}) {
  try {
    // Basic validation
    if (!data.accountId && !data.cardId) {
      return { success: false, error: "Account or Card is required" };
    }

    const transaction = await prisma.transaction.create({
      data: {
        description: data.description,
        amount: data.amount,
        type: data.type,
        category: data.category,
        accountId: data.accountId,
        cardId: data.cardId,
      },
    });

    // Update account balance if applicable
    if (data.accountId) {
      const adjustment = data.type === TransactionType.INCOME ? data.amount : -data.amount;
      await prisma.account.update({
        where: { id: data.accountId },
        data: { balance: { increment: adjustment } },
      });
    }

    // Update card used amount if applicable
    if (data.cardId) {
      await prisma.card.update({
        where: { id: data.cardId },
        data: { used: { increment: data.amount } },
      });
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/transactions");
    return { success: true, transaction };
  } catch (error) {
    console.error("Error creating transaction:", error);
    return { success: false, error: "Failed to create transaction" };
  }
}

export async function createCard(data: {
  name: string;
  limit: number;
  userId: string;
}) {
  try {
    const card = await prisma.card.create({
      data: {
        name: data.name,
        limit: data.limit,
        userId: data.userId,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/cards");
    return { success: true, card };
  } catch (error) {
    console.error("Error creating card:", error);
    return { success: false, error: "Failed to create card" };
  }
}

export async function getDashboardStats(userId: string) {
  try {
    const [accounts, transactions] = await Promise.all([
      prisma.account.findMany({ 
        where: { userId },
        include: { bank: true }
      }),
      prisma.transaction.findMany({ 
        where: { 
          OR: [
            { account: { userId } },
            { card: { userId } }
          ]
        } 
      }),
    ]);

    const totalBalance = accounts.reduce((acc: number, curr: any) => acc + curr.balance, 0);
    
    // Monthly income/expense
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const monthlyIncome = transactions
      .filter((t: any) => t.type === TransactionType.INCOME && t.date >= startOfMonth && t.date <= endOfMonth)
      .reduce((acc: number, curr: any) => acc + curr.amount, 0);

    const monthlyExpense = transactions
      .filter((t: any) => t.type === TransactionType.EXPENSE && t.date >= startOfMonth && t.date <= endOfMonth)
      .reduce((acc: number, curr: any) => acc + curr.amount, 0);


    return { 
      success: true, 
      stats: { totalBalance, monthlyIncome, monthlyExpense },
      accounts
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return { success: false, error: "Failed to fetch dashboard stats" };
  }
}

export async function getLatestTransactions(userId: string, limit = 10) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          { account: { userId } },
          { card: { userId } }
        ]
      },
      orderBy: { date: "desc" },
      take: limit,
      include: {
        account: { include: { bank: true } },
        card: true
      }
    });

    return { success: true, transactions };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { success: false, error: "Failed to fetch transactions" };
  }
}

export async function getChartData(userId: string) {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          { account: { userId } },
          { card: { userId } }
        ],
        date: { gte: sevenDaysAgo }
      },
      orderBy: { date: "asc" }
    });

    // Group by date for the last 7 days
    const chartData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split("T")[0];
      
      const dayTransactions = transactions.filter((t: any) => t.date.toISOString().split("T")[0] === dateStr);
      const income = dayTransactions.filter((t: any) => t.type === TransactionType.INCOME).reduce((acc: number, t: any) => acc + t.amount, 0);
      const expense = dayTransactions.filter((t: any) => t.type === TransactionType.EXPENSE).reduce((acc: number, t: any) => acc + t.amount, 0);

      chartData.push({

        name: new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(date),
        income,
        expense,
        timestamp: dateStr
      });
    }

    return { success: true, chartData };
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return { success: false, error: "Failed to fetch chart data" };
  }
}

