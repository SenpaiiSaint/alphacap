import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  // Create firms
  const firms = await Promise.all([
    prisma.firm.create({
      data: {
        name: 'Blackstone',
        aum: 950000000000, // $950B
        users: {
          create: [
            {
              email: 'john.smith@blackstone.com',
              name: 'John Smith',
              role: 'CFO',
            },
            {
              email: 'sarah.johnson@blackstone.com',
              name: 'Sarah Johnson',
              role: 'PARTNER',
            },
            {
              email: 'michael.brown@blackstone.com',
              name: 'Michael Brown',
              role: 'VP',
            },
          ],
        },
        funds: {
          create: [
            {
              name: 'Blackstone Real Estate Partners X',
              committedCapital: 1000000000, // $1B
              deployedCapital: 750000000, // $750M
              startDate: new Date('2022-01-01'),
              endDate: new Date('2027-12-31'),
              status: 'ACTIVE',
              spvs: {
                create: [
                  {
                    name: 'BREP X - Hotel Portfolio',
                    budget: 200000000, // $200M
                    allocated: 150000000, // $150M
                    startDate: new Date('2022-01-01'),
                    endDate: new Date('2027-12-31'),
                    status: 'ACTIVE',
                  },
                  {
                    name: 'BREP X - Office Portfolio',
                    budget: 200000000, // $200M
                    allocated: 100000000, // $100M
                    startDate: new Date('2022-01-01'),
                    endDate: new Date('2027-12-31'),
                    status: 'ACTIVE',
                  },
                ],
              },
            },
          ],
        },
        policies: {
          create: [
            {
              name: 'High-Value Transaction Approval',
              description: 'Require CFO approval for transactions over $75,000',
              type: 'AMOUNT',
              condition: 'amount > 75000',
              action: 'REQUIRE_APPROVAL',
              status: 'ACTIVE',
            },
            {
              name: 'Travel Category Limit',
              description: 'Limit travel expenses to 10% of deal budget',
              type: 'CATEGORY',
              condition: 'category = "TRAVEL" AND amount > (budget * 0.1)',
              action: 'BLOCK_TRANSACTION',
              status: 'ACTIVE',
            },
          ],
        },
      },
    }),
    prisma.firm.create({
      data: {
        name: 'KKR',
        aum: 285000000000, // $285B
        users: {
          create: [
            {
              email: 'david.wilson@kkr.com',
              name: 'David Wilson',
              role: 'CFO',
            },
            {
              email: 'emma.davis@kkr.com',
              name: 'Emma Davis',
              role: 'PARTNER',
            },
          ],
        },
        funds: {
          create: [
            {
              name: 'KKR North America Fund XIII',
              committedCapital: 1000000000, // $1B
              deployedCapital: 600000000, // $600M
              startDate: new Date('2022-01-01'),
              endDate: new Date('2027-12-31'),
              status: 'ACTIVE',
              spvs: {
                create: [
                  {
                    name: 'KKR XIII - Tech Portfolio',
                    budget: 200000000, // $200M
                    allocated: 120000000, // $120M
                    startDate: new Date('2022-01-01'),
                    endDate: new Date('2027-12-31'),
                    status: 'ACTIVE',
                  },
                ],
              },
            },
          ],
        },
      },
    }),
    prisma.firm.create({
      data: {
        name: 'Carlyle',
        aum: 280000000000, // $280B
        users: {
          create: [
            {
              email: 'robert.miller@carlyle.com',
              name: 'Robert Miller',
              role: 'CFO',
            },
            {
              email: 'lisa.thompson@carlyle.com',
              name: 'Lisa Thompson',
              role: 'PARTNER',
            },
          ],
        },
        funds: {
          create: [
            {
              name: 'Carlyle Global Credit Fund V',
              committedCapital: 1000000000, // $1B
              deployedCapital: 500000000, // $500M
              startDate: new Date('2022-01-01'),
              endDate: new Date('2027-12-31'),
              status: 'ACTIVE',
              spvs: {
                create: [
                  {
                    name: 'CGC V - Infrastructure Debt',
                    budget: 200000000, // $200M
                    allocated: 100000000, // $100M
                    startDate: new Date('2022-01-01'),
                    endDate: new Date('2027-12-31'),
                    status: 'ACTIVE',
                  },
                ],
              },
            },
          ],
        },
      },
    }),
  ]);

  // Create sample expenses
  const expenses = [];
  const categories = ['TRAVEL', 'ENTERTAINMENT', 'OFFICE', 'TECHNOLOGY', 'CONSULTING', 'LEGAL'];
  const merchants = ['Marriott', 'Deloitte', 'Microsoft', 'Amazon', 'Uber', 'American Airlines'];
  const locations = ['New York', 'London', 'Hong Kong', 'San Francisco', 'Boston'];

  for (let i = 0; i < 1000; i++) {
    const amount = Math.floor(Math.random() * 450000) + 50000; // $50K - $500K
    const category = categories[Math.floor(Math.random() * categories.length)];
    const merchant = merchants[Math.floor(Math.random() * merchants.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const date = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const status = Math.random() > 0.1 ? 'APPROVED' : 'FLAGGED';

    expenses.push({
      amount,
      description: `${merchant} - ${category.toLowerCase()} expense`,
      category,
      status,
      date,
      merchant,
      location,
      userId: firms[0].users[Math.floor(Math.random() * firms[0].users.length)].id,
      fundId: firms[0].funds[0].id,
      spvId: firms[0].funds[0].spvs[Math.floor(Math.random() * firms[0].funds[0].spvs.length)].id,
    });
  }

  await prisma.expense.createMany({
    data: expenses,
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });