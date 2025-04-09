import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    // Creating sample users
    const alice = await prisma.user.create({
        data: {
            name: "Alice Johnson",
            email: "alice@blackrock.com",
            password: "password123", // During production: hash the password
            role: "ADMIN",
        },
    });

    const bob = await prisma.user.create({
        data: {
            name: "Bob Smith",
            email: "bob@hashicorp.com",
            password: "password123",
            role: "MANAGER",
        },
    });

    const charlie = await prisma.user.create({
        data: {
            name: "Charlie Lee",
            email: "charlie@google.com",
            password: "password123",
            role: "EMPLOYEE",
        },
    });

    // Creating Sample funds 

    const fund1 = await prisma.fund.create({
        data: {
            name: "BlackRock Capital Partners",
            budget: 500_000_000, // $500 Million
            managerId: alice.id,
        },
    });

    const fund2 = await prisma.fund.create({
        data: {
            name: "HashiCorp Growth Fund",
            budget: 750_000_000, // $750 Million
            managerId: bob.id,
        },
    });

    // Creating Sample cards

    const card1 = await prisma.card.create({
        data: {
            limit: 50_000,
            last4: "1234",
            user: { connect: { id: alice.id } },
        },
    });

    const card2 = await prisma.card.create({
        data: {
            limit: 75_000,
            last4: "5678",
            user: { connect: { id: bob.id } },
        },
    });

    // Creating Sample expenses

    await prisma.expense.createMany({
        data: [
            {
                amount: 1200.50,
                vendor: "American Express",
                category: "Travel",
                cardId: card1.id,
                userId: alice.id,
            },
            {
                amount: 850.00,
                vendor: "Gulfstream",
                category: "Travel",
                cardId: card2.id,
                userId: bob.id,
            },
            {
                amount: 300.00,
                vendor: "Costco Wholesale",
                cardId: card1.id,
                userId: alice.id,
            },
        ],
    });

    console.log("Seed data created");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });