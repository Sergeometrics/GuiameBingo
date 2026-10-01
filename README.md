# Bingo de Multiplicación

Una aplicación web interactiva para enseñar tablas de multiplicación de forma divertida y dinámica. Diseñada para docentes y estudiantes en contextos de educación en el hogar (homeschool).

## ✨ Características

- **Panel del Maestro**: Interfaz para el instructor que genera y muestra problemas de multiplicación de forma aleatoria
- **Generador de Cartones**: Crea cartones de bingo imprimibles y únicos para cada estudiante
- **Sin Repeticiones**: Cada cartón tiene números únicos por columna
- **Optimizado para Imprimir**: Diseño print-friendly para 2 cartones por página (tamaño carta)
- **Interfaz Limpia**: Diseño moderno y accesible con componentes Radix UI y Tailwind CSS

## 🎮 Cómo Funciona

### Modo Maestro
1. Presiona "Comenzar Juego" para iniciar
2. El sistema genera un problema de multiplicación (ej: 3 × 7 = ?)
3. Los estudiantes buscan el resultado en sus cartones
4. El panel lateral muestra un tablero de seguimiento con los números ya llamados

### Modo Estudiante
1. Genera nuevos cartones con el botón "Generar Cartones"
2. Imprime los cartones (2 por página)
3. Marca los números según los llama el maestro

## 🛠️ Tecnologías

- **React 19** - Interfaz de usuario
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilos
- **Vite** - Build tool
- **Radix UI** - Componentes accesibles
- **React Router** - Navegación

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/shrg/GuiameBingo.git
cd GuiameBingo

# Instalar dependencias
npm install
# o con pnpm
pnpm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build
```

## 📝 Licencia

MIT

---

**Guíame Homeschool** - Herramientas educativas interactivas
