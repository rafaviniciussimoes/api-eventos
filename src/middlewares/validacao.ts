import { body, ValidationChain } from "express-validator";

export function validarDados(): ValidationChain[] {
  return [
    body("nome")
      .isLength({ min: 3, max: 30 })
      .withMessage("O nome deve ter entre 3 e 30 caracteres"),

    body("email").isEmail().withMessage("Formato de email inválido"),

    body("senha")
      .isLength({ min: 8 })
      .withMessage("A senha de ter pelo menos 8 caracteres")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .withMessage(
        "A senha deve ter pelo menos uma letra maiúscula, uma letra minúscula e um número"
      ),

    body("role").equals("admin").withMessage('O papel de ser "admin"'),
  ];
}
