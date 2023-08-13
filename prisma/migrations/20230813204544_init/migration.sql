-- CreateTable
CREATE TABLE "Chore" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastCompletedAt" TIMESTAMP(3) NOT NULL,
    "intervalDays" INTEGER NOT NULL,

    CONSTRAINT "Chore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChoreCompletions" (
    "id" TEXT NOT NULL,
    "choreId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL,
    "completedBy" TEXT NOT NULL,

    CONSTRAINT "ChoreCompletions_pkey" PRIMARY KEY ("id")
);
