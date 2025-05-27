# 💧 SMARTEN – Smart Water Management Frontend

**SMARTEN** is an intelligent, real-time **water monitoring and control system** that helps households and organizations track water usage, detect leakages, control valves, and manage billing through a modern web interface. This repository contains the **frontend** of the SMARTEN system built with **React**, **Tailwind CSS**, and integrates seamlessly with the SMARTEN backend and hardware components.

## 📌 Key Features

- 📊 **Dashboard** – Real-time visualization of water flow, pressure, and usage
- 📦 **Device Management** – Manage connected sensors and smart valves
- 🧠 **Leakage Detection Alerts** – Receive notifications on abnormal usage
- 📱 **Smart Controls** – Remotely shut off or open water valves
- 💰 **Billing View** – View water usage cost and payment history
- 🔐 **Authentication** – Secure login and role-based access (`Admin`, `User`)
- 📡 **Realtime Updates** – Powered by WebSocket or polling integration

---

## 🛠️ Tech Stack

| Technology         | Purpose                        |
|--------------------|---------------------------------|
| React.js           | Frontend UI framework          |
| Tailwind CSS       | Utility-first CSS framework    |
| Axios              | API calls                      |
| React Router DOM   | Client-side routing            |
| Chart.js / Recharts| Data visualization             |
| WebSocket / MQTT   | Real-time data streaming       |
| JWT Auth           | Secure session management      |

---

## 🧩 Project Structure

smarten-frontend/
│
├── public/ # Static files
├── src/
│ ├── assets/ # Images, logos
│ ├── components/ # Reusable components (Navbar, Sidebar, Cards)
│ ├── pages/ # Page views (Dashboard, Billing, Devices)
│ ├── services/ # API services
│ ├── context/ # Auth and global state
│ ├── hooks/ # Custom React hooks
│ ├── App.js # Main App entry
│ └── main.jsx # Root ReactDOM render
│
├── .env # Environment variables
├── tailwind.config.js
├── package.json
└── README.md

yaml
Copy
Edit

---

## ⚙️ Getting Started

### ✅ Prerequisites

- Node.js >= 16
- npm or yarn
- Backend URL and credentials

---

### 📦 Install Dependencies

```bash
npm install
# or
yarn install
🧪 Configure Environment
Create a .env file at the root:

env
Copy
Edit
VITE_BACKEND_URL=http://localhost:8080
VITE_SOCKET_URL=ws://localhost:8080/ws
VITE_MAPBOX_API_KEY=your_mapbox_token
🏃 Run the App
bash
Copy
Edit
npm run dev
# or
yarn dev
The app will be running at: http://localhost:5173

🔐 Authentication
JWT token is stored in localStorage

Role-based navigation (admin/user)

Protects sensitive routes via route guards

📡 API Integration
API calls are handled using Axios via services/api.js:

js
Copy
Edit
axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
})
📈 Sample Features
🔧 Water Control
js
Copy
Edit
POST /api/devices/{id}/shutdown
POST /api/devices/{id}/open
📊 Usage Graph
js
Copy
Edit
GET /api/usage/realtime
GET /api/usage/daily
📥 Billing
js
Copy
Edit
GET /api/billing/history
POST /api/payments
🧪 Testing
Frontend tests using React Testing Library and Vitest (if configured):

bash
Copy
Edit
npm run test
🧱 Build for Production
bash
Copy
Edit
npm run build
Output is generated in the dist/ folder.

💡 Future Enhancements
📲 Mobile responsive PWA version

📬 SMS/Push notifications

📍 GIS-based leakage heatmaps

🧾 Invoice PDF export

👤 Admin analytics dashboard

🤝 Contributing
Fork the project

Create a new branch (git checkout -b feature/feature-name)

Commit your changes (git commit -m 'Add feature')

Push to your branch (git push origin feature-name)

Open a Pull Request

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

👨‍💻 Author
Mucyo Ivan
📧 mucyoivan25@gmail.com
🌍 GitHub | LinkedIn
