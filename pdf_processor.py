import sys
import os
try:
    from pypdf import PdfReader
except ImportError:
    print("A biblioteca 'pypdf' não está instalada. Instalando agora...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf"])
    from pypdf import PdfReader

def extract_text_from_pdf(pdf_path):
    """Extrai o texto de um arquivo PDF."""
    if not os.path.exists(pdf_path):
        print(f"Erro: O arquivo '{pdf_path}' não foi encontrado.")
        return None

    try:
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"Erro ao processar o PDF: {e}")
        return None

def save_text_to_file(text, output_path):
    """Salva o texto extraído em um arquivo .txt."""
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Texto extraído com sucesso e salvo em: {output_path}")
    except Exception as e:
        print(f"Erro ao salvar o arquivo de texto: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python3 pdf_processor.py <caminho_do_pdf>")
        sys.exit(1)

    pdf_file = sys.argv[1]
    # Define o nome do arquivo de saída baseado no nome do PDF
    base_name = os.path.splitext(os.path.basename(pdf_file))[0]
    output_file = os.path.join(os.path.dirname(pdf_file), f"{base_name}_extracted.txt")

    extracted_text = extract_text_from_pdf(pdf_file)
    if extracted_text:
        save_text_to_file(extracted_text, output_file)
        # Opcional: imprimir os primeiros 500 caracteres para verificação
        print("\n--- Início do texto extraído (primeiros 500 caracteres) ---")
        print(extracted_text[:500])
        print("--- Fim da prévia ---\n")
