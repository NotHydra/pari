# <span style="color: FF9933">PA</span>RI (<span style="color: FF9933">PApaya</span> Ripeness Identification)

<p style="text-align: justify">
    <b><span style="color: FF9933">PA</span>RI</b> is a system designed to classify the ripeness of <b><span style="color: FF9933">papaya</span></b> (Carica papaya) using ultra-high frequency electromagnetic waves. The system employs Radio Signal Strength Indicator (RSSI) technology to measure the interaction of electromagnetic waves with the fruit. By analyzing the RSSI values, <b><span style="color: FF9933">PA</span>RI</b> accurately determines the ripeness stage of the papaya in a non-invasive manner.
</p>

> <p style="text-align: justify"><b><span style="color: FF9933">PA</span>RI</b> is actively being developed as a Minimum Viable Product (MVP) for the "Gemastik 2024 XVII Smart Device, Embedded System & IoT" competition by <b>Balai Pengembangan Talenta Indonesia (BPTI)</b>, <b>Pusat Prestasi Nasional (Puspresnas)</b> & <b>Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi (Kemendikbudristek)</b> and is not an application for production purposes.

</p>

## Tech Stack

![Raspberry Pi](https://img.shields.io/badge/-RaspberryPi-C51A4A?style=for-the-badge&logo=Raspberry-Pi)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)
![Bulma](https://img.shields.io/badge/bulma-00D0B1?style=for-the-badge&logo=bulma&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Folder Structure

```bash
diagram # Designs on how the system is developed
src
├── script # Raspbbery Pi 3 runner script using Python
├── server # RESTful API & WebSocket server using NestJS, Prisma & PostgreSQL
└── website # Web-Based dashboard page using NextJS
```

<br>
<br>
<br>

# Server Setup

### 1. Navigate To Server Directory

```bash
$ cd src/server
```

### 2. Install Dependencies

```bash
$ yarn install
```

### 3. Environment Variables Setup

```bash
$ cp .env.example .env
```

### 4. Prisma Setup

```bash
$ yarn run prisma:generate
$ yarn run prisma:seed
```

### 5. Running The Project

### development

```bash
$ yarn run start:dev
```

### Production

```bash
$ yarn run build
$ yarn run start:prod
```
