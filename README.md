# 📝 ToDoList Test Project

This is a simple **To-Do List Web Application** built with React and TypeScript. The app allows users to create, edit, delete, and toggle tasks's status to done and not done. It also integrates with a mock API (jsonplaceholder) to demonstrate data fetching, error handling, and loading states.

## 🚀 Features

- ✅ Add / Edit / Delete ToDo items
- 🔁 Toggle between **Done / Not Done**
- 🌀 Show **loading** and **error** states during data fetching
- 🌐 Fetch initial tasks from `JSONPlaceholder` API
- 📦 Manage state with **Context API**
- 💅 Styled with **TailwindCSS**

## 🛠️ Tech Stack

- **React** with **TypeScript**
- **Context API** for global state management
- **TailwindCSS** for styling
- **Fetch API** for calling mock data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/todos)

## 🧑‍💻 How to Run This Project

### 1. Clone the repository
git clone https://github.com/Natnicha24/ToDoList-Test.git
cd ToDoList-Test

### 2. Install dependencies
npm install

### 3. Start the development server
npm run dev

## 🌐Reason Behind Implement Choices

### 1. Context Api
-ใช้ context เพื่อลดการส่งต่อแบบ local state รวม function ที่ต้องใช้ในหลายไฟล์ไว้ที่เดียวและใช้ได้ทั่วทั้งโปรเจค

### 2. TailwindCSS
-เลือก TailwindCSS เพื่อจัดการ style ได้ง่าย ไม่ต้องเขียน external css ทำให้ง่ายเสร็จไวขึ้น

### 3. Fetch API + JSONPlaceholder
-ใช้ fetch ดึงข้อมูลจาก JSONPlaceholder เพื่อเชื่อม API จริงและจัดการกับ loading และ error

### 4. การแสดง Loading / Error
-ใช้ useEffect + try/catch เพื่อจัดการ error และ loading
