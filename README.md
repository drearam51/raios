# RAIOS - TreeGrid Editable

Un componente TreeGrid (tabla jerárquica) con funcionalidad de edición de celdas y organización, construido con React.

## Características

- ✅ **Estructura Jerárquica**: Nodos expandibles/colapsables en múltiples niveles
- ✅ **Celdas Editables**: Click en cualquier celda para editar su contenido
- ✅ **Ordenamiento**: Click en los encabezados de columna para ordenar
- ✅ **Agregar Items**: Botón para agregar nuevos items a cualquier categoría
- ✅ **Edición de Nombres**: Click en el nombre de cualquier nodo para editarlo
- ✅ **Interfaz Moderna**: Diseño limpio y responsivo

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`

## Construcción

```bash
npm run build
```

## Uso

El componente TreeGrid muestra una estructura de árbol donde cada nodo puede tener:
- Hijos (subcategorías o items)
- Datos en formato de tabla (celdas editables)

### Funcionalidades:

1. **Expandir/Colapsar**: Click en el ícono ▶ para expandir o colapsar nodos
2. **Editar Celdas**: Click en cualquier celda de datos para editarla
3. **Editar Nombres**: Click en el nombre de un nodo para editarlo
4. **Ordenar**: Click en los encabezados de columna para ordenar
5. **Agregar Items**: Click en el botón "+" junto a un nodo para agregar un item hijo

## Tecnologías

- React 18
- Vite
- CSS puro (sin dependencias adicionales)
