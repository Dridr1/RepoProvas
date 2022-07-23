import prisma from "../src/database.js";

async function main() {

    await prisma.category.createMany({
        data: [{ name: "Projeto" }, { name: "Prática" }, { name: "Recuperação" }],
        skipDuplicates: true,
    });

    await prisma.teacher.createMany({
        data: [{ name: "Diego Pinho" }, { name: "Bruna Hamori" }, { name: "Pedrão" }, { name: "Ritinha" }],
        skipDuplicates: true,
    });

    await prisma.term.createMany({
        data: [{ number: 1 }, { number: 2 }, { number: 3 }, { number: 4 }, { number: 5 }, { number: 6 }],
        skipDuplicates: true,
    });

    await prisma.discipline.createMany({
        data: [
            { name: "HTML e CSS", termId: 1 },
            { name: "JavaScript", termId: 2 },
            { name: "React", termId: 3 },
            { name: "Humildade", termId: 1 },
            { name: "Planejamento", termId: 2 },
            { name: "Autoconfiança", termId: 3 }
        ],
        skipDuplicates: true,
    });

    await prisma.teacherDiscipline.createMany({
        data: [
            { disciplineId: 1, teacherId: 1 },
            { disciplineId: 2, teacherId: 1 },
            { disciplineId: 3, teacherId: 3 },
            { disciplineId: 4, teacherId: 2 },
            { disciplineId: 5, teacherId: 4 },
            { disciplineId: 6, teacherId: 2 }
        ],
        skipDuplicates: true,
    });

    await prisma.test.createMany({
        data: [
            {
                name: "2022. Prova HTML",
                pdfUrl: "https://google.com",
                categoryId: 1,
                teacherDisciplineId: 1,
            },
            {
                name: "2022. Prova CSS",
                pdfUrl: "https://google.com",
                categoryId: 1,
                teacherDisciplineId: 2,
            },
            {
                name: "2022. Prova JavaScript",
                pdfUrl: "https://google.com",
                categoryId: 1,
                teacherDisciplineId: 3,
            },
            {
                name: "2022. Prova People Skills",
                pdfUrl: "https://google.com",
                categoryId: 2,
                teacherDisciplineId: 1
            },
            {
                name: "2022. Prova Recuperação React",
                pdfUrl: "https://google.com",
                categoryId: 3,
                teacherDisciplineId: 1
            }
        ],
        skipDuplicates: true,
    });
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });