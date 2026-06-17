# Hospital Management Microservices Platform

**Hospital Management System** , este o aplicatie bazata pe o arhitectura moderna de microservicii containerizate. 
Proiectul este dezvoltat conform principiilor **Domain-Driven Design (DDD)**, ofera un nivel ridicat de izolare, scalabilitate si independenta a componentelor.


## Arhitectura Sistemului

Sistemul este compus din 5 niveluri principale:
1.  **Nivelul Client (Frontend)**: Interfata cu care interactioneaza utilizatorii (Pacienti, Doctori, Administratori).
2.  **API Gateway**: Punctul unic de acces in sistem care ruteaza cererile HTTP catre microserviciile backend corespunzatoare.
3.  **Microservicii Backend**: 8 module complet independente care comunica intre ele prin protocoale REST API.
4.  **Nivelul de Date**: Fiecare microserviciu dispune de propria baza de date separata (izolare completa).
5.  **Infrastructura de Executie**: Intregul ecosistem este containerizat folosind Docker si orchestrat prin Docker Compose.

---

## Stack Tehnologic (Java Ecosystem)

* **Framework Principal**: Java 17+ / 21 cu **Spring Boot** (Spring Web, Spring Data, Spring Security)
* **Securitate**: JSON Web Tokens (JWT) & Spring Security
* **Mesagerie (Optional)**: RabbitMQ (pentru Notification Service)
* **Containere & Orchestrare**: Docker & Docker Compose
* **Baze de date**: PostgreSQL, MySQL, MongoDB

---

## Descrierea Microserviciilor

| Microserviciu | Responsabilitate / Functionalitate | Tehnologii | Baza de date / Structura | Endpoints Principale |
| :--- | :--- | :--- | :--- | :--- |
| **Auth Service** | Autentificare, inregistrare si control acces pe baze de roluri (*Admin, Doctor, Pacient*). | Spring Boot, Spring Security, JWT | **PostgreSQL**<br>Tabel: `users` (`id`, `email`, `password`, `role`) | `POST /auth/register`<br>`POST /auth/login` |
| **Patient Service** | Operatii CRUD pentru gestionarea datelor pacientilor. | Spring Boot | **MySQL**<br>Tabel: `patients` (`id`, `name`, `age`, `gender`) | `GET /patients/{id}`<br>`POST /patients`<br>`PUT /patients/{id}`<br>`DELETE /patients/{id}` |
| **Doctor Service** | Gestionarea informatiilor despre medici si specializarile acestora. | Spring Boot | **PostgreSQL**<br>Tabel: `doctors` (`id`, `name`, `specialization`) | `GET /doctors`<br>`POST /doctors`<br>`GET /doctors/{id}` |
| **Appointment Service** | Gestionarea programarilor medicale stabilite intre pacienti si medici. | Spring Boot | **MongoDB**<br>Colectie: `appointments` (`id`, `patientId`, `doctorId`, `date`, `status`) | `POST /appointments`<br>`GET /appointments/patient/{id}` |
| **Medical Records Service** | Gestionarea fiselor medicale (diagnostice si tratamente prescrise). | Spring Boot | **MongoDB**<br>Colectie: `medical_records` (`patientId`, `diagnosis`, `treatment`) | `POST /records`<br>`GET /records/patient/{id}` |
| **Billing Service** | Generarea facturilor si evidenta platilor asociate consultatiilor medicale. | Spring Boot | **MySQL**<br>Tabel: `invoices` (`id`, `patientId`, `amount`, `status`) | `POST /billing/invoice`<br>`GET /billing/patient/{id}` |
| **Notification Service** | Trimiterea automata de notificari (email/log intern) la evenimente (ex: programare noua). | Spring Boot, RabbitMQ | **MySQL**<br>Tabel: `notifications` (`id`, `message`, `status`) | `POST /notifications` |
| **Analytics Service** | Furnizeaza statistici simple (numar total pacienti, statistici programari). | Spring Boot | Fara DB dedicata (Date agregate/citite din alte servicii) | `GET /analytics/patients`<br>`GET /analytics/appointments` |

---

## Ghid de Rulare si Instalare

Sistemul este pregatit pentru a fi rulat atat local, cat si in medii Cloud (IaaS - masini virtuale tip EC2) folosind **Docker Compose**.

### Cerinte preliminare
* Java 17 sau mai nou instalat local (pentru dezvoltare)
* Maven
* Docker si Docker Compose

### Pasi pentru pornirea proiectului

1. **Clonati depozitul:**

   git clone <url-repository-proiect>
   cd hospital-management-platform

2.**Compilati microserviciile** (generarea fisierelor .jar):
Rulati scriptul de build in radacina proiectului unde se afla modulele:
   
   mvn clean package -DskipTests

   
3.**Lansarea intregului ecosistem in Docker**:
Folositi Docker Compose pentru a porni cele 8 microservicii, bazele de date (PostgreSQL, MySQL, MongoDB) si API Gateway-ul:

   docker-compose up --build

4.**Verificarea starii sistemului**:
Toate serviciile vor comunica intern in reteaua Docker prin REST API. 
Puteti accesa functionalitatile aplicatiei prin punctul unic de acces expus de API Gateway (de exemplu, http://localhost:8080/).
