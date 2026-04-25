-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    telefone VARCHAR(20) UNIQUE NOT NULL,
    saldo_mensal_atual DECIMAL(10,2) DEFAULT 0,
    meta_economia_diaria DECIMAL(10,2) DEFAULT 0,
    gastos_diarios_acumulados DECIMAL(10,2) DEFAULT 0,
    data_ultimo_gasto DATE DEFAULT CURRENT_DATE,
    entradas_mensais DECIMAL(10,2) DEFAULT 0,
    saidas_fixas_mensais DECIMAL(10,2) DEFAULT 0,
    saidas_variaveis_mensais DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de transações
CREATE TABLE IF NOT EXISTS transacoes (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    tipo VARCHAR(10) CHECK (tipo IN ('entrada', 'saida')),
    valor DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(50),
    descricao TEXT,
    data_transacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserção dos dados iniciais do usuário (Rodrigo/Jennifer)
-- Considerando o telefone como um identificador único, vamos inserir um registro inicial.
-- Como não temos o telefone real, usaremos um placeholder 'USUARIO_FINANCEIRO'.
INSERT INTO usuarios (telefone, entradas_mensais, saidas_fixas_mensais, saldo_mensal_atual)
VALUES ('USUARIO_FINANCEIRO', 9080.00, 11480.00, -2400.00)
ON CONFLICT (telefone) DO UPDATE 
SET entradas_mensais = EXCLUDED.entradas_mensais,
    saidas_fixas_mensais = EXCLUDED.saidas_fixas_mensais,
    saldo_mensal_atual = EXCLUDED.saldo_mensal_atual;
