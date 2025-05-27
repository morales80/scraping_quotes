# scraping_quotes

Este proyecto realiza un **web scraping** al sitio [https://quotes.toscrape.com](https://quotes.toscrape.com) para extraer los datos, y las etiquetas asociadas. Luego guarda todos los resultados en tres formatos:

- `quotes.json`
- `quotes.csv`
- `quotes.xlsx`

--- 

## Instalación

1. **Clona este repositorio:**
```
git clone https://github.com/morales80/scraping_quotes.git
cd scraping_quotes
```

2. **instalar las dependencias del proyecto:**
``` con ese comando se instalaran los modulos de el proyecto y ya se podra ejecutar.
npm i 
```
3. **ejecutar el proyecto desde la consola bash:**
```` con ese comando se podra ejhecutar el proyecto dentro de la consola y podra crear los archivos CSV, JSON, XLSX de forma automatica.
npm run start 
````

**Dependencias utilizadas**
request-promise — para hacer peticiones HTTP.

**cheerio** — para parsear y navegar por el HTML.

**json2csv** — para convertir a formato CSV.

**xlsx** — para generar archivos de Excel.

**fs** — (nativo) para trabajar con archivos.

**AUTORES**
Lesly Morales (@Leslyhub21)
Gerardo Morales (@morales80)


