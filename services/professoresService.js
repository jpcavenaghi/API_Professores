const db = require('../db')

module.exports.getAllProfessores = async () => {
    try {
        const [professores] = await db.query("SELECT * FROM professores")
        return professores;
    } catch (error) {
        console.error("Erro ao listar os professores por matricula no banco de dados:", error);
        throw error;
    }
}

module.exports.getProfessorByMatricula = async (matricula) => {
    try {
        const [professor] = await db.query("SELECT * FROM professores WHERE matricula = ?",
        [matricula])
        return professor;
    } catch (error) {
        console.error("Erro ao listar o professor por matricula no banco de dados:", error);
        throw error;
    }
}

module.exports.addProfessor = async (nome, matricula, data_de_nascimento) => {
    try {
        const [professor] = await db.query("INSERT INTO professores (nome, matricula, data_de_nascimento) VALUES (?, ?, ?)", 
        [nome, matricula, data_de_nascimento]);
        return professor;
    } catch (error) {
        console.error("Erro ao inserir o professor no banco de dados:", error);
        throw error;
    }
}

module.exports.editProfessorByMatricula = async (nome, matricula, data_de_nascimento) => {
    try {
        if (nome !== undefined && data_de_nascimento === undefined) {
            const [professorup] = await db.query("UPDATE professores SET nome = ?  WHERE matricula = ?", 
            [nome, matricula]);
            return professorup;
        } else if (nome === undefined && data_de_nascimento !== undefined) {
            const [professorup] = await db.query("UPDATE professores SET data_de_nascimento = ? WHERE matricula = ?", 
            [data_de_nascimento, matricula]);
            return professorup;
        } else if (nome !== undefined && data_de_nascimento !== undefined) {
            const [professorup] = await db.query("UPDATE professores SET nome = ?, data_de_nascimento = ? WHERE matricula = ?" , 
            [nome, data_de_nascimento, matricula]);
            return professorup;
        }
    } catch (error) {
        console.error("Erro ao atualizar o professor no banco de dados:", error);
        throw error;
    }
};

module.exports.deleteProfessor = async (matricula) => {
    try {
        const [{affectedRows}] = await db.query("DELETE FROM professores WHERE matricula = ?",
        [matricula])
        return affectedRows;
    } catch (error){
        console.error("Erro ao deletar o professor no banco de dados:", error);
        throw error;
    }
}