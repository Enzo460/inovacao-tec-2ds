# ==========================================================
# Programa para Calcular a Média de 4 Números
# ==========================================================

print("--- Calculadora de Média (4 números) ---")

# 1. Solicitar os 4 números via input e 2. Converter os valores para float
# Utilizamos float() para permitir números decimais.
num1 = float(input("Digite o primeiro número: "))
num2 = float(input("Digite o segundo número: "))
num3 = float(input("Digite o terceiro número: "))
num4 = float(input("Digite o quarto número: "))

# 3. Calcular a média
# Soma os quatro números e divide pela quantidade (4)
soma = num1 + num2 + num3 + num4
media = soma / 4

# 4. Exibir o resultado com duas casas decimais
# Utilizamos uma f-string com :.2f para formatar para 2 casas decimais
print(f"\nA média dos números fornecidos é: {media:.2f}")
