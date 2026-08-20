# 🏥 Tammeni - نظام إدارة وحجز المواعيد الطبية المتكامل
## Doctor Appointment & Healthcare Management System

![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Angular](https://img.shields.io/badge/Angular-16.2.0-DD0031.svg?logo=angular)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933.svg?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-000000.svg?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg?logo=mongodb)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 📖 نظرة عامة عن المشروع (Overview)

**Tammeni** هو نظام ويب متقدم ومتكامل لإدارة العيادات وحجز المواعيد الطبية والاستشارات الصحية. يربط النظام بين المرضى والأطباء في بيئة رقمية سهلة الاستخدام تدعم اللغة العربية والإنجليزية وتوفر تجربة تفاعلية سلسة بنظام التصميم العصري (Material 3) والوضع الداكن والفاتح، بالإضافة إلى مساعد ذكي بالذكاء الاصطناعي (AI Medical Chatbot).

---

## ✨ المميزات الرئيسية (Key Features)

### 👨‍⚕️ بوابة الطبيب (Doctor Portal)
- **لوحة تحكم تفاعلية:** إحصائيات فورية للمواعيد اليومية، الحالات المكتملة، والإيرادات.
- **جدول التوفر الأسبوعي:** مرونة تامة في تحديد فترات وساعات العمل المتكررة مع إمكانية إضافة أكثر من فترة في نفس اليوم.
- **إدارة الاستثناءات والإجازات:** حظر أوقات محددة لحالات الطوارئ أو الإجازات الرسمية بسهولة.
- **إدارة الحجوزات والسجلات الطبية:** قبول/إلغاء المواعيد وكتابة الروشتات الإلكترونية والتقارير الطبية.

### 🧑‍💼 بوابة المريض (Patient Portal)
- **دليل واستكشاف الأطباء:** فلترة سريعة حسب 7 تخصصات رئيسية (باطنة، أطفال، قلب، جراحة، عيون، نساء وتوليد، عظام) وترتيب تفاعلي حسب (التقييم، سنوات الخبرة، سعر الكشف، والاسم).
- **حجز المواعيد فوري:** اختيار التاريخ وتوليد فترات المواعيد المتاحة تلقائياً.
- **سجل المواعيد والروشتات:** تتبع حالة الكشوفات السابقة والقادمة وتحميل الوصفات الطبية.
- **الملف الصحي:** تحديث البيانات الشخصية والتاريخ الطبي.

### 🛡️ الأمان والتحكم بالصلاحيات (Security & RBAC)
- مصادقة وحماية متطورة عبر **JWT Tokens** و **Bcrypt**.
- حماية الصفحات والمسارات عبر `AuthGuard` و `RoleGuard`.
- صفحات مخصصة للخطأ: `404 Not Found` و `403 Unauthorized`.
- تحقق صارم من البيانات المدخلة في صفحة التسجيل (رقم الهاتف المصري 11 رقم، كلمات المرور المعقدة).

### 🎨 الواجهة وتجربة المستخدم (UI/UX)
- دعم كامل للغة العربية والإنجليزية (RTL / LTR) وخطوط **Cairo** و **Inter**.
- دعم الوضعين: **الوضع الفاتح (Light Mode)** و**الوضع الداكن الطبي الفاخر (Dark Mode)**.
- دعم **تطبيق الويب التقدمي (PWA)** للتثبيت والعمل على مختلف الأجهزة وشاشات الهواتف.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

### Frontend
- **Framework:** Angular 16 (Standalone & Feature Modules)
- **Routing & Guards:** Angular Router with RoleGuard & AuthGuard
- **Styling:** CSS3 Custom Properties (Design System & Theming)
- **Typography & Icons:** Cairo, Inter & Google Material Symbols
- **State & Observables:** RxJS & BehaviorSubjects

### Backend
- **Runtime:** Node.js & Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **AI Integration:** NVIDIA NIM API (Llama 3.1 70B Instruct)

---

## 📁 هيكل المشروع (Project Structure)

```bash
pharmahub/
├── backend/
│   ├── config/          # إعدادات قاعدة البيانات والـ AI
│   ├── controllers/     # منطق معالجة الطلبات (Auth, Doctor, Patient, Appointments...)
│   ├── middlewares/     # وسائط التحقق من الـ Token والصلاحيات
│   ├── models/          # نماذج MongoDB (User, Doctor, Patient, Appointment, WeeklyAvailability...)
│   ├── routes/          # نقاط النهاية (API Endpoints)
│   ├── seeds/           # سكربتات البذر التلقائي (doctorSeed.js)
│   └── index.js         # نقطة انطلاق السيرفر
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/         # Guards, Interceptors, Services (Auth, Theme, Language...)
│   │   │   ├── features/     # الوحدات الوظيفية (Auth, Dashboard, Profiles, Schedule, Appointments, Settings, NotFound, Unauthorized)
│   │   │   └── shared/       # المكونات المشتركة (Navbar, Chatbot, Cards...)
│   │   ├── assets/           # الصور وملفات الترجمة (i18n)
│   │   ├── styles.css        # المتغيرات والأنماط العامة والثيمات
│   │   └── manifest.webmanifest # إعدادات تطبيق PWA
│   └── angular.json
└── README.md
```

---

## 🚀 خطوات التثبيت والتشغيل (Getting Started)

### متطلبات التشغيل:
- **Node.js** (v18 أو أحدث)
- **npm** (v9 أو أحدث)
- **MongoDB Database** (محلي أو حساب MongoDB Atlas)

---

### 1. إعداد وتشغيل الـ Backend

```bash
# الانتقال لمجلد الـ backend
cd backend

# تثبيت الحزم
npm install

# إعداد ملف البيئة .env
# تأكد من وجود المتغيرات:
# MONGO_URI="your_mongodb_connection_string"
# JWT_SECRET="your_jwt_secret_key"
# PORT=8080

# (اختياري) إضافة بيانات 20 دكتور للتجربة
node seeds/doctorSeed.js

# تشغيل السيرفر
npm start
# أو للتطوير:
npm run dev
```

---

### 2. إعداد وتشغيل الـ Frontend

```bash
# الانتقال لمجلد الـ frontend
cd frontend

# تثبيت الحزم
npm install

# تشغيل خادم التطوير
npx ng serve
```

افتح المتصفح وتوجه إلى: `http://localhost:4200`

---

## 📡 أهم نقاط النهاية (API Endpoints)

| المسار (Endpoint) | الطريقة | الوصف | الصلاحية |
|------------------|--------|-------|----------|
| `/api/auth/register` | `POST` | تسجيل حساب جديد (طبيب / مريض) | عام |
| `/api/auth/login` | `POST` | تسجيل الدخول واستلام الـ Token | عام |
| `/api/doctors` | `GET` | استرجاع قائمة الأطباء مع التصفية | عام |
| `/api/doctors/profile` | `GET / PUT` | عرض وتحديث بيانات الطبيب | دكتور |
| `/api/patients/profile` | `GET / PUT` | عرض وتحديث بيانات المريض | مريض |
| `/api/availability` | `GET / POST / DELETE` | إدارة المواعيد الأسبوعية | دكتور |
| `/api/appointments` | `GET / POST / PUT` | إدارة وحجز المواعيد | مسجل |

---

## 👥 فريق العمل (Team Members)

| الاسم | الدور / المسؤولية | حساب GitHub |
|------|-------------------|------------|
| **فريق تطوير Tammeni** | Full-Stack Development | [@Tammeni-Team](https://github.com/) |

---

## 📄 الترخيص (License)

هذا المشروع مرخص بموجب رخصة [MIT License](LICENSE).
