# Velora | Premium Digital Invitations

**Invitations that Radiate Warmth.**

Velora is a sophisticated digital invitation platform designed to turn every event into a memorable experience. From elegant weddings to handcrafted scrapbook birthdays, Velora combines modern technology with high-end aesthetics to deliver stunning, animated invites.

**[🌐 Live Demo](https://velora-studio-nu.vercel.app/)**

---

## ✨ Key Features

- **🎨 Diverse Design Ecosystem**: Choose from a curated gallery of premium themes including:
    - **Exclusive Scrapbook**: Handcrafted birthday collages with dual photo uploads and hand-drawn elements.
    - **Black Tie Gala**: Ultra-premium gold and dark themes for formal events.
    - **Retro Neon**: Vibrant, high-energy designs for parties and tech events.
    - **Garden Party**: Organic, floral aesthetics for outdoor celebrations.
- **🖼️ High-Resolution Exports**: Download your custom cards in crisp, 2x resolution PNG format—perfect for instant sharing on WhatsApp, iMessage, or social media.
- **📅 Smart Mini-Calendar**: Every invitation features an interactive, beautifully styled calendar that dynamically highlights your specific event date.
- **⏳ Live Interactive Calendar**: A dedicated "Time Travel" calendar page allows users to navigate through time and visualize dates with smooth animations.
- **📱 Mobile-First Experience**: A fully responsive interface featuring a "Floating Island" navigation system, ensuring a premium feel on every device.
- **💎 Pixel-Perfect Rendering**: Precision-engineered layout engines ensure your downloads look exactly as they do in the browser.

## 🛠️ Performance Tech Stack

- **Core**: [React 19](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Using high-performance CSS variables)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Image Generation**: [html-to-image](https://github.com/bubkoo/html-to-image) & [dom-to-image-more](https://github.com/1904labs/dom-to-image-more)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State & Routing**: [React Router 7](https://reactrouter.com/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Kashif-Khokhar/Calender.git
    cd Calender
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Launch development environment:**
    ```bash
    npm run dev
    ```

4.  **Production build:**
    ```bash
    npm run build
    ```

## 📂 Project Architecture

- `src/pages/Editor.jsx`: The heart of the application, featuring multiple specialized layout engines (Scrapbook, Gala, Retro, etc.).
- `src/pages/LiveCalendar.jsx`: The interactive time-traveling calendar system.
- `src/pages/Templates.jsx`: A showcase of premium invitation designs.
- `src/components/Navbar.jsx`: The "Floating Island" navigation component.
- `src/index.css`: Global theme definitions and Tailwind v4 configuration.

## 📄 License

This project is licensed under the MIT License.

---
*Developed with ❤️ by [Kashif Ali Khokhar](https://www.linkedin.com/in/kashif-ali-khokhar)*
