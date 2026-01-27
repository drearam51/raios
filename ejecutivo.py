from fpdf import FPDF

# --- CONFIGURACIÓN DE DATOS ---
PROJECT_TITLE = "Optimización de Eficiencia Operativa - Raios"
PROJECT_OVERVIEW = (
    "La plataforma Raios busca solucionar ineficiencias operativas actuales mediante "
    "la automatización y gestión optimizada de nómina. El objetivo principal es "
    "mitigar riesgos operativos y reducir la carga manual de coordinación."
)
# Datos Financieros (Extraídos de tu imagen)
AHORRO_ANUAL = 23400000  # $23,400,000 COP
AHORRO_MENSUAL = 1950000 # $1.95 M
INVERSION_PROYECTO = 38000000 # <-- ¡AJUSTA ESTE VALOR CON EL COSTO REAL DEL PROYECTO!

# Cálculo del ROI: ((Ganancia - Inversión) / Inversión) * 100
try:
    ROI_PERCENT = ((AHORRO_ANUAL - INVERSION_PROYECTO) / INVERSION_PROYECTO) * 100
except ZeroDivisionError:
    ROI_PERCENT = 0

# Colores (Aproximados al diseño original)
COLOR_HEADER_BG = (0, 51, 102)     # Azul oscuro
COLOR_HEADER_TXT = (255, 255, 255) # Blanco
COLOR_ACCENT_BG = (220, 235, 250)  # Azul muy claro para fondos de secciones
COLOR_SUBTITLE = (0, 51, 102)      # Azul oscuro para subtítulos

class ExecutiveReport(FPDF):
    def header(self):
        # Fondo Azul Oscuro Superior
        self.set_fill_color(*COLOR_HEADER_BG)
        self.rect(0, 0, 216, 40, 'F') # Ancho carta aprox 216mm
        
        # Título Principal
        self.set_text_color(*COLOR_HEADER_TXT)
        self.set_font('Arial', 'B', 24)
        self.set_xy(10, 10)
        self.multi_cell(140, 10, "Resumen Ejecutivo de un\nInforme de Proyecto", 0, 'L')
        
        # Simulación de Logo (Círculo blanco)
        self.set_fill_color(255, 255, 255)
        self.ellipse(170, 5, 30, 30, 'F')
        self.set_text_color(0, 0, 0)
        self.set_font('Arial', 'B', 12)
        self.text(178, 22, "Raios")

        self.ln(15)

    def section_title(self, title):
        self.set_font('Arial', 'B', 12)
        self.set_text_color(*COLOR_SUBTITLE)
        self.cell(0, 10, title.upper(), 0, 1, 'L')
        self.line(10, self.get_y(), 200, self.get_y()) # Línea separadora
        self.ln(2)

    def draw_financial_table(self):
        # Tabla personalizada basada en tu imagen adjunta
        self.set_fill_color(245, 245, 245)
        self.set_font('Arial', 'B', 9)
        
        # Encabezados
        col_widths = [60, 40, 50]
        headers = ["ROL OPERATIVO", "HORAS/SEM", "AHORRO COP"]
        
        for width, header in zip(col_widths, headers):
            self.cell(width, 8, header, 0, 0, 'C', True)
        self.ln()
        
        # Datos (Filas)
        self.set_font('Arial', '', 9)
        rows = [
            ("2 Coord. (A)", "3 h /u", "$390,000"),
            ("3 Coord. (B)", "8 h /u", "$1,560,000")
        ]
        
        for row in rows:
            self.cell(col_widths[0], 8, row[0], 0, 0, 'L')
            self.cell(col_widths[1], 8, row[1], 0, 0, 'C')
            self.cell(col_widths[2], 8, row[2], 0, 1, 'R')
            
        # Total Mes (Fondo verde claro simulado)
        self.set_fill_color(235, 250, 235) 
        self.set_font('Arial', 'B', 9)
        self.set_text_color(0, 100, 0) # Verde oscuro texto
        self.cell(col_widths[0], 10, "TOTAL MES", 0, 0, 'L', True)
        self.cell(col_widths[1], 10, "30 h", 0, 0, 'C', True)
        self.cell(col_widths[2], 10, "$1.95 M", 0, 1, 'R', True)
        
        # Proyección Anual
        self.set_text_color(*COLOR_SUBTITLE)
        self.ln(2)
        self.set_font('Arial', 'B', 12)
        self.cell(100, 10, "PROYECCIÓN ANUAL", 0, 0, 'L')
        self.cell(50, 10, "$23,400,000 COP", 0, 1, 'R')

def create_pdf():
    pdf = ExecutiveReport('P', 'mm', 'Letter')
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)

    # --- 1. Header Info Bar ---
    pdf.set_fill_color(*COLOR_ACCENT_BG)
    pdf.rect(0, 40, 216, 15, 'F')
    pdf.set_xy(10, 42)
    pdf.set_font('Arial', '', 9)
    pdf.set_text_color(0, 0, 0)
    pdf.cell(100, 6, f"Project Title: {PROJECT_TITLE}", 0, 0)
    pdf.cell(0, 6, "Email: contacto@raios.com", 0, 1, 'R')

    pdf.ln(10)

    # --- 2. Project Overview ---
    pdf.section_title("Project Overview")
    pdf.set_font('Arial', '', 10)
    pdf.multi_cell(0, 5, PROJECT_OVERVIEW)
    pdf.ln(5)

    # --- 3. Project Details (Tabla simple) ---
    pdf.section_title("Project Details")
    pdf.set_font('Arial', '', 9)
    details = [
        ("Project Name", "Implementación Raios"),
        ("Project Sponsor", "Comité Directivo"),
        ("Project Manager", "Líder de Proyecto"),
        ("Completed by", "15/12/2025")
    ]
    for label, value in details:
        pdf.cell(40, 6, label, 0, 0, 'L')
        pdf.cell(60, 6, value, 0, 0, 'L')
        pdf.ln()
    pdf.ln(5)

    # --- 4. Financial Overview (ROI) ---
    # Usaremos un rectángulo grande para destacar el ROI como pide el usuario
    pdf.section_title("Financial Overview of the Project")
    pdf.ln(2)
    
    # Caja para ROI
    pdf.set_fill_color(240, 248, 255)
    pdf.rect(10, pdf.get_y(), 190, 30, 'F')
    
    pdf.set_xy(15, pdf.get_y() + 5)
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(90, 10, "ROI Calculado (Estimado):", 0, 1)
    
    pdf.set_font('Arial', 'B', 24)
    pdf.set_text_color(0, 128, 0) # Verde para dinero
    roi_text = f"{ROI_PERCENT:.1f}%"
    pdf.cell(90, 15, roi_text, 0, 0)
    
    pdf.set_font('Arial', '', 10)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 15, f"(Basado en Ahorro Anual: ${AHORRO_ANUAL:,.0f} COP)", 0, 1)
    
    pdf.ln(15)

    # --- 5. Project Deliverable Timeline ---
    pdf.section_title("Project Deliverable Timeline")
    pdf.set_font('Arial', '', 9)
    pdf.set_text_color(0,0,0)
    timeline_steps = [
        "Fase 1: Diagnóstico y Configuración (Mes 1)",
        "Fase 2: Implementación Piloto (Mes 2)",
        "Fase 3: Despliegue Total y Capacitación (Mes 3)"
    ]
    for step in timeline_steps:
        pdf.cell(5, 5, "-", 0, 0)
        pdf.cell(0, 5, step, 0, 1)
    pdf.ln(10)

    # --- 6. KEY RISKS REPLACEMENT -> FINANCIAL EFFICIENCY ---
    # Aquí reemplazamos la sección de riesgos con la tabla de ahorros de tu imagen
    pdf.section_title("ANALYSIS: COST SAVINGS & EFFICIENCY")
    pdf.set_font('Arial', 'I', 10)
    pdf.cell(0, 8, "Mitigación de riesgo operativo mediante eficiencia en nómina:", 0, 1)
    pdf.ln(2)
    
    pdf.draw_financial_table()

    # Guardar PDF
    output_filename = "Informe_Ejecutivo_Raios.pdf"
    pdf.output(output_filename)
    print(f"PDF generado exitosamente: {output_filename}")

if __name__ == '__main__':
    create_pdf()