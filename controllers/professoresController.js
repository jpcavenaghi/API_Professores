const express = require('express')
    router = express.Router()

const service = require('../services/professoresService')

// http://localhost:3000/api/professores/
router.get('/', async (req, res) => {
    try {
        const professores = await service.getAllProfessores()
        res.send(professores)
    } catch (error) {
        console.error("Erro ao listar os dados dos professores:", error);
        res.status(500).json("Ocorreu um erro ao listar os dados dos professores");
    }
})

// http://localhost:3000/api/professores/001
router.get('/:matricula', async (req, res) => {
    try {
        const professor = await service.getProfessorByMatricula(req.params.matricula)
        if (professor.length == 0)
            res.status(404).json("Não ha registro na matricula: "+req.params.matricula)
        else
            res.send(professor)
    } catch (error) {
        console.error("Erro ao listar os dados do professor por matricula:", error);
        res.status(500).json("Ocorreu um erro ao listar os dados do professor por matricula");
    }
})

// http://localhost:3000/api/professores/
//{
    //"nome": "marcius",
    //"matricula": "004",
    //"data_de_nascimento": "2005-06-06"
 //}
router.post('/', async (req, res) => {
    try {
        const professorAdd = await service.addProfessor(req.body.nome, req.body.matricula, req.body.data_de_nascimento);
        if (professorAdd) {
            res.status(201).send('Professor inserido com sucesso!');
        } else {
            res.status(404).json("Algo está errado!");
        }
    } catch (error) {
        console.error("Erro ao inserir professor:", error);
        res.status(500).json("Ocorreu um erro ao inserir o professor");
    }
})

// http://localhost:3000/api/professores/004
router.patch('/:matricula', async (req, res) => {
    try {
        const { nome } = req.body;
        const { data_de_nascimento } = req.body;
        const { matricula } = req.params;
        
        const professorUpdated = await service.editProfessorByMatricula(nome, matricula, data_de_nascimento);

        if (professorUpdated) {
            res.send("Professor alterado com sucesso!!");
        } else {
            res.status(404).json("Não há registro na matrícula: " + matricula);
        }
    } catch (error) {
        console.error("Erro ao atualizar professor:", error);
        res.status(500).json("Ocorreu um erro ao atualizar o professor");
    }
})

// http://localhost:3000/api/professores/004
router.delete('/:matricula', async (req, res) => {
    try{
        const affectedRows = await service.deleteProfessor(req.params.matricula)
        if (affectedRows == 0)
            res.status(404).json("Não ha registro na matricula: "+req.params.matricula)
        else
            res.send("Professor excluido com sucesso!")
    } catch (error) {
        console.error("Erro ao deletar professor:", error);
            res.status(500).json("Ocorreu um erro ao deletar o professor");
    }
})

module.exports = router;