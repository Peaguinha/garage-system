const { Router } = require('express');
const ServicoController = require('../controllers/ServicoController');
// Middlewares de autenticação/autorização — a implementar pelo Integrante 1.
const { authenticate, authorize } = require('../middlewares/auth');

const router = Router();

router.use(authenticate);

router.post('/', authorize(['ADMIN', 'ATENDENTE']), ServicoController.criar);
router.get('/', ServicoController.listar);
router.get('/:id', ServicoController.buscarPorId);
router.put('/:id', authorize(['ADMIN', 'ATENDENTE']), ServicoController.atualizar);
router.delete('/:id', authorize(['ADMIN']), ServicoController.remover);

module.exports = router;
