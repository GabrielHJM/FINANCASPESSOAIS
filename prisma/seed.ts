import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding banks...");
  
  const banks = [
    { name: "Nubank", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Logo_Nubank.svg", primaryColor: "#820ad1" },
    { name: "Inter", logo: "https://logodownload.org/wp-content/uploads/2018/03/banco-inter-logo.png", primaryColor: "#ff7a00" },
    { name: "Bradesco", logo: "https://logodownload.org/wp-content/uploads/2014/05/bradesco-logo-1.png", primaryColor: "#cc092f" },
    { name: "Itaú", logo: "https://logodownload.org/wp-content/uploads/2014/05/itau-logo-0.png", primaryColor: "#ec7000" },
    { name: "Caixa", logo: "https://logodownload.org/wp-content/uploads/2014/02/caixa-logo-1.png", primaryColor: "#005ca9" },
    { name: "PicPay", logo: "https://logodownload.org/wp-content/uploads/2018/10/picpay-logo.png", primaryColor: "#21c25e" }
  ];

  for (const bank of banks) {
    await prisma.bank.upsert({
      where: { name: bank.name },
      update: bank,
      create: bank,
    });
  }

  console.log("Seed finished!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
