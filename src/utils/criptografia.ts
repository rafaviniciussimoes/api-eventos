import bcrypt from "bcrypt";
import { randomInt } from "node:crypto";

export async function criptografarSenha(senha: string): Promise<string> {
  const saltSenha = randomInt(10, 16);
  const senhaCriptografada = await bcrypt.hash(senha, saltSenha);
  return senhaCriptografada;
}
