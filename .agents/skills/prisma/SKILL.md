---
name: prisma
description: กฎและขั้นตอนการจัดการฐานข้อมูลด้วย Prisma ในโปรเจกต์
---

# กฎการใช้ Prisma

เมื่อปรับเปลี่ยนโครงสร้างฐานข้อมูล (Database Schema)

- ให้ใช้คำสั่ง `npx prisma db push` เท่านั้น
- **ห้าม** ใช้คำสั่ง `npx prisma migrate dev`
- ให้ใช้คำสั่ง `npx prisma generate` เสมอ
