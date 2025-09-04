# 🏋️‍♂️ Gym Membership App

A **full-stack web application** to manage gym memberships, bookings, and user interactions.  
This project builds upon my earlier [Gym Membership Backend](https://github.com/Pad96pages/gym-membership-backend) project.  

👉 First, I implemented the backend APIs and database integration.  
👉 Then, I expanded it into a **complete full-stack app** with frontend + backend + database.  

---

## 🚀 Features
- 📌 User registration & login
- 📅 Book and manage gym sessions
- 📊 View membership details
- 📧 Contact form with email notifications
- 🗄️ Data stored securely in **MongoDB Atlas**
- ✅ Form validation with **Zod**

---

## 🛠️ Tech Stack
- **Frontend:** Next.js (TypeScript), Tailwind CSS, ShadCN UI
- **Backend:** Next.js API Routes
- **Database:** MongoDB Atlas
- **Validation:** Zod
- **Email:** Nodemailer (via Gmail/SMTP)

## 📂 Project Structure
```
gym-membership/
├── app/
│   ├── api/           # API routes (booking, contact, etc.)
│   ├── components/    # Reusable UI components
│   ├── booking/       # Booking form page
│   ├── contact/       # Contact form page
│   └── ...
├── utils/             # DB connection, mailer, validation
├── models/            # MongoDB models (Booking, Contact)
├── .env.local         # Environment variables
├── package.json
└── README.md
```

### 1️⃣ Clone the repo
```
git clone https://github.com/Pad96pages/gym-membership.git
cd gym-membership
````

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Set up environment variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 4️⃣ Run the development server

```
npm run dev
```

Now open [http://localhost:3000](http://localhost:3000) 

---

## 🖼️ Screenshots

<img width="1919" height="904" alt="image" src="https://github.com/user-attachments/assets/f68c7ad4-0e1a-40f5-9912-772198487b05" />
<img width="1918" height="901" alt="image" src="https://github.com/user-attachments/assets/fe006126-da40-4fd1-87f7-42811f6cbaee" />
<img width="1919" height="899" alt="image" src="https://github.com/user-attachments/assets/2b53573f-b543-4472-94b8-1e71a8f8bd05" />
<img width="1916" height="899" alt="image" src="https://github.com/user-attachments/assets/1de456a9-462f-42e9-8325-c21362a2f587" />
<img width="1919" height="899" alt="image" src="https://github.com/user-attachments/assets/69890c52-be06-46d2-adab-804c04544e55" />
<img width="1919" height="892" alt="image" src="https://github.com/user-attachments/assets/04657aa2-2069-4654-b17d-42c0a1bfc6d5" />


---

## 🏗️ Project Evolution

* **Phase 1:** [Gym Membership Backend](https://github.com/Pad96pages/gym-membership-backend)
  Implemented core APIs, MongoDB integration, and backend logic.
* **Phase 2:** Gym Membership Full-Stack App (this repo)
  Built the complete user interface, connected frontend to backend, and deployed features end-to-end.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to improve.
Have a great time!
