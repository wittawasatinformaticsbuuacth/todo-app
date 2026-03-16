# Todo App - Full CI/CD Pipeline Demo

แอปพลิเคชัน Todo API ที่เรียบง่ายเพื่อการเรียนรู้เกี่ยวกับ Git, Build Automation, CI/CD Pipeline, และ Deployment

## เริ่มต้นอย่างรวดเร็ว

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/todo-app.git
cd todo-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Local Server

```bash
npm run dev
```

เซิร์ฟเวอร์จะรันที่ `http://localhost:3000`

### 4. Test API

```bash
# Get all todos
curl http://localhost:3000/api/todos

# Create todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Node.js"}'

# Delete todo
curl -X DELETE http://localhost:3000/api/todos/1

# Health check
curl http://localhost:3000/health
```

---

## สคริปต์ที่มีให้ใช้งาน

### การพัฒนา

```bash
npm run dev          # รันพร้อม nodemon (auto-reload)
npm start            # รันเซิร์ฟเวอร์ผลิตภาพ
```

### การตรวจสอบคุณภาพ

```bash
npm run lint         # ตรวจสอบสไตล์โค้ด
npm run lint:fix     # แก้ไขสไตล์โค้ดโดยอัตโนมัติ

npm test             # รันการทดสอบ API (Jest + Supertest)
npm test -- --watch # รันการทดสอบในโหมดแบบสอง

npm run test:e2e     # รันการทดสอบ E2E (Playwright)
npm run test:e2e:ui  # รันพร้อมแดชบอร์ด UI
npx playwright show-report  # ดูรายงานการทดสอบ
```

### การสร้าง

```bash
npm run build        # สร้างสำหรับผลิตภาพ
```

---

## โครงสร้างของโปรเจกต์

```
todo-app/
├── public/
│   ├── index.html              # Web page
│   ├── style.css               # Styling
│   └── app.js                  # Frontend JavaScript
├── tests/
│   └── e2e/
│       └── todo.spec.js        # E2E tests (Playwright)
├── __tests__/
│   └── todo.test.js            # API tests (Supertest)
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions pipeline
├── .env.example                # Example environment variables
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── jest.config.js              # Jest configuration
├── playwright.config.js        # Playwright configuration
├── package.json                # Dependencies and scripts
├── index.js                    # Main application
└── README.md                   # This file
```

---

## จุดปลายทาง API

### GET /api/todos

ดึงข้อมูลงานทั้งหมด

```bash
curl http://localhost:3000/api/todos
```

**Response:**

```json
[
  { "id": 1, "title": "Learn Git", "completed": false },
  { "id": 2, "title": "Learn CI/CD", "completed": false }
]
```

### GET /api/todos/:id

ดึงข้อมูลงานเดียว

```bash
curl http://localhost:3000/api/todos/1
```

### POST /api/todos

สร้างงานใหม่

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"New Todo"}'
```

### PUT /api/todos/:id

อัปเดตงาน

```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

### DELETE /api/todos/:id

ลบงาน

```bash
curl -X DELETE http://localhost:3000/api/todos/1
```

### GET /health

ตรวจสอบสถานะ

```bash
curl http://localhost:3000/health
```

---

## กระบวนการพัฒนา

### 1. สร้างสาขาฟีเจอร์

```bash
git checkout -b feature/your-feature
```

### 2. ทำการเปลี่ยนแปลงและทดสอบในเครื่อง

```bash
npm run dev      # ทดสอบเซิร์ฟเวอร์
npm run lint     # ตรวจสอบสไตล์โค้ด
npm test         # รันการทดสอบ
```

### 3. ยืนยันการเปลี่ยนแปลงและอัปโหลด

```bash
git add .
git commit -m "feat: describe your feature"
git push origin feature/your-feature
```

### 4. สร้างคำขออลสูงสุด

- ไปที่ที่เก็บ GitHub
- คลิก "New Pull Request"
- กรอกข้อมูล PR description ให้ครบถ้วน

### 5. รอการตรวจสอบไปป์ไลน์ CI

- GitHub Actions จะทำการตรวจสอบโค้ด, ทดสอบ, สร้าง โดยอัตโนมัติ
- รอให้การตรวจสอบทั้งหมดผ่าน

### 6. รวมและปรับใช้

- อนุมัติคำขอ
- รวมไปยังสาขา main
- ปรับใช้ไปยังผลิตภาพโดยอัตโนมัติ

---

## การตั้งค่า

### ไฟล์ .env

สร้างไฟล์ `.env` จากไฟล์ `.env.example`:

```bash
cp .env.example .env
```

ตัวอย่าง:

```
PORT=3000
NODE_ENV=development
```

### กฎ ESLint

ดูไฟล์ `.eslintrc.json` สำหรับกฎสไตล์โค้ด:

- การเยื้อง: 2 ช่องว่าง
- เครื่องหมายคำพูด: เครื่องหมายอัญประลักษ์เดี่ยว
- เซมิโคลอน: ต้องใช้เสมอ

### การตั้งค่า Jest

ดูไฟล์ `jest.config.js` สำหรับการตั้งค่าการทดสอบ

---

## การทดสอบ

รันการทดสอบทั้งหมด:

```bash
npm test
```

รันพร้อมการวัดความครอบคลุม:

```bash
npm test -- --coverage
```

---

## � Deployment

### Option 1: Deploy to Railway ⭐ (Recommended)

Railway เป็นแพลตฟอร์มที่ง่ายสำหรับ deploy Node.js apps

**ข้อดี:**

- ฟรี (5GB/month)
- Auto-deploy จาก GitHub
- Database support (PostgreSQL, MySQL)
- ง่ายสุดในการใช้งาน

**ขั้นตอน:**

1. **ตรวจสอบ Repository ใน GitHub**

   ```bash
   git push origin main
   ```

2. **ไปที่ railway.app**

   - ไปที่ https://railway.app
   - Sign up ด้วย GitHub account

3. **Install Railway CLI**

   ```bash
   npm install -g @railway/cli
   ```

4. **Login & Deploy**

   ```bash
   railway login
   cd path/to/todo-app
   railway init
   railway up
   ```

5. **ตรวจสอบ Logs**

   ```bash
   railway logs
   ```

6. **ดู Project URL**
   - ไปที่ Railway Dashboard
   - หา Service ของคุณ
   - คลิก "View Logs" เพื่อหา URL

---

### ตัวเลือกที่ 2: ปรับใช้ไป Render.com

**ข้อดี:**

- ฟรี (500 ชั่วโมงต่อเดือน)
- ปรับใช้อัตโนมัติจาก GitHub
- PostgreSQL รวมอยู่
- คอนโซล Web

**ขั้นตอน:**

1. **ไปที่ render.com**

   - https://render.com
   - สมัครสมาชิกตามบัญชี GitHub

2. **สร้างบริการ Web**

   - คลิก "New" → "Web Service"
   - เลือกที่เก็บ GitHub (todo-app)
   - ให้สิทธิ์การเข้าถึง

3. **ตั้งค่าบริการ**

   ```
   Name: todo-app
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **ตั้งค่าตัวแปรสภาพแวดล้อม** (หากมี)

   - คลิก "Environment"
   - เพิ่ม `PORT=3000`
   - เพิ่ม `NODE_ENV=production`

5. **ปรับใช้**

   - คลิก "Create Web Service"
   - รอสำหรับการสร้างและปรับใช้
   - จะได้รับ URL: `https://todo-app.onrender.com`

6. **ปรับใช้อัตโนมัติเมื่อมีการพุช**
   - Render จะปรับใช้โดยอัตโนมัติทุกครั้งที่พุชไปยัง main

---

### ตัวเลือกที่ 3: ปรับใช้ไป Vercel

Vercel ดีถ้าคุณเปลี่ยนไป Next.js ในอนาคต

**ข้อดี:**

- ฟรี
- ฟังก์ชัน Serverless
- การปรับใช้อย่างรวดเร็ว
- เครือข่ายขอบ

**ขั้นตอน:**

1. **ไปที่ vercel.com**

   - https://vercel.com
   - สมัครสมาชิกตามบัญชี GitHub

2. **นำเข้าโปรเจกต์**

   - คลิก "New Project"
   - นำเข้าที่เก็บ GitHub
   - เลือก todo-app

3. **ตั้งค่าการตั้งค่าการสร้าง**

   ```
   Framework: Other
   Build Command: npm run build
   Start Command: npm start
   ```

4. **ตั้งค่าสภาพแวดล้อม**

   - คลิก "Environment Variables"
   - เพิ่มตัวแปรที่ต้องใช้

5. **ปรับใช้**
   - คลิก "Deploy"
   - รอให้การสร้างเสร็จสิ้น
   - จะได้รับ URL: `https://todo-app.vercel.app`

---

### การเปรียบเทียบแพลตฟอร์ม

| ฟีเจอร์                 | Railway       | Render                | Vercel                  |
| ----------------------- | ------------- | --------------------- | ----------------------- |
| **ราคา**                | ฟรี 5GB/เดือน | ฟรี 500 ชั่วโมง/เดือน | ฟรี                     |
| **ความยากในการตั้งค่า** | ง่ายสุด       | ปานกลาง               | ปานกลาง                 |
| **ฐานข้อมูล**           | มีในตัว       | มีในตัว               | แยกต่างหาก              |
| **ปรับใช้อัตโนมัติ**    | ได้           | ได้                   | ได้                     |
| **รองรับ Node.js**      | ดีมาก         | ดีมาก                 | จำกัด                   |
| **แนะนำ**               | ดีที่สุด      | ดี                    | สำหรับ Next.js เท่านั้น |

---

## �🔍 Troubleshooting

### Port already in use

```bash
# Change PORT in .env
PORT=3001
```

### Dependencies not installed

```bash
npm install
```

### Lint errors

```bash
npm run lint:fix
```

### Tests failing

```bash
npm test -- --verbose
```
