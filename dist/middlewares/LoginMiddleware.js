"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autenticar = void 0;
require("dotenv/config");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const Erros_1 = require("../Erros");
class Autenticar {
    autenticar(req, res, next) {
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                throw new Erros_1.UnauthorizedError("Não autenticado");
            }
            const token = authorization.split(" ")[1];
            jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
            next();
        }
        catch (erro) {
            if (erro instanceof Erros_1.BadRequestError ||
                erro instanceof Erros_1.ForbbidenError ||
                erro instanceof Erros_1.UnauthorizedError) {
                res.status(erro.statusCode).json({ mensagem: erro.message });
            }
            if (erro instanceof jsonwebtoken_1.TokenExpiredError) {
                res.status(403).json({ mensagem: "Permissão negada" });
            }
        }
    }
}
exports.Autenticar = Autenticar;
