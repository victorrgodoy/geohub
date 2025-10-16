-- CreateTable
CREATE TABLE "Continent" (
    "con_id" SERIAL NOT NULL,
    "con_name" VARCHAR(100) NOT NULL,
    "con_description" TEXT NOT NULL,

    CONSTRAINT "Continent_pkey" PRIMARY KEY ("con_id")
);

-- CreateTable
CREATE TABLE "Country" (
    "cou_id" SERIAL NOT NULL,
    "cou_name" VARCHAR(100) NOT NULL,
    "cou_population" INTEGER NOT NULL,
    "cou_official_language" VARCHAR(35) NOT NULL,
    "cou_currency" VARCHAR(35) NOT NULL,
    "con_id" INTEGER NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("cou_id")
);

-- CreateTable
CREATE TABLE "City" (
    "cit_id" SERIAL NOT NULL,
    "cit_name" VARCHAR(100) NOT NULL,
    "cit_population" INTEGER NOT NULL,
    "cit_latitude" DECIMAL(9,6) NOT NULL,
    "cit_longitude" DECIMAL(9,6) NOT NULL,
    "cou_id" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("cit_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Continent_con_name_key" ON "Continent"("con_name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_cou_name_key" ON "Country"("cou_name");

-- CreateIndex
CREATE UNIQUE INDEX "City_cit_name_key" ON "City"("cit_name");

-- AddForeignKey
ALTER TABLE "Country" ADD CONSTRAINT "Country_con_id_fkey" FOREIGN KEY ("con_id") REFERENCES "Continent"("con_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_cou_id_fkey" FOREIGN KEY ("cou_id") REFERENCES "Country"("cou_id") ON DELETE CASCADE ON UPDATE CASCADE;
