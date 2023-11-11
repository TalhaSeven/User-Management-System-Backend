# User Management System

This system is designed to manage users and their associated addresses, which include details like country, city, district, and town. It's built using Node.js with Express, and leverages TypeORM for database operations.

## Features

- CRUD operations for users, addresses, countries, cities, districts, and towns.
- Search functionality for users and towns.
- Ability to associate users with addresses, and addresses with geographical entities like countries, cities, etc.
- File read operations to populate address data.


## API Endpoints

The system provides a range of API endpoints:

### User Endpoints

- `GET /users`: Fetch all users.
- `GET /users/search`: Search users by first and last name.
- `GET /users/:id`: Fetch a single user by ID.
- `POST /users`: Create a new user.
- `PUT /users/:id`: Update a user.
- `DELETE /users/:id`: Delete a user.

### Address Endpoints

- `GET /address`: Fetch all addresses.
- `POST /address`: Create a new address.
- `PUT /address/:id`: Update an address.
- `GET /address/:id`: Get a single address.
- `GET /address/user/:userId`: Get the address for a specific user.

### Country, City, District, and Town Endpoints

Each of these entities (Country, City, District, Town) has similar endpoints for CRUD operations and fetching associated users.

### Search Endpoints

- `GET /search`: General search across towns, districts, cities, and countries.

### File Read Endpoint

- `GET /file-read`: Read and process data from a file.

## Entities

The system includes several entities, each with specific attributes and relationships:

- `User`: With attributes like `firstName`, `lastName`, `age`, and relationships to `Phone`, `Email`, and `Address`.
- `Address`: Including details like `addressLine`, `street`, `post_code`, and relations to `User`, `Country`, `City`, `District`, `Town`.
- `Country`, `City`, `District`, `Town`: Geographical entities with their specific attributes and relationships.


---


# Kullanıcı Yönetim Sistemi

Bu sistem, kullanıcıları ve ilişkili adreslerini (ülke, şehir, ilçe ve kasaba gibi detaylar içeren) yönetmek için tasarlanmıştır. Node.js ve Express kullanılarak yapılmış olup, veritabanı işlemleri için TypeORM'den yararlanmaktadır.

## Özellikler

- Kullanıcılar, adresler, ülkeler, şehirler, ilçeler ve kasabalar için CRUD işlemleri.
- Kullanıcılar ve kasabalar için arama işlevi.
- Kullanıcıları adreslerle ve adresleri ülkeler, şehirler vb. coğrafi varlıklarla ilişkilendirme yeteneği.
- Adres verilerini doldurmak için dosya okuma işlemleri.


## API Endpoints

Sistem, bir dizi API uç noktası sağlar:

### Kullanıcı Uç Noktaları

- `GET /users`: Tüm kullanıcıları getir.
- `GET /users/search`: İsim ve soyisimle kullanıcı ara.
- `GET /users/:id`: ID'ye göre tek bir kullanıcı getir.
- `POST /users`: Yeni bir kullanıcı oluştur.
- `PUT /users/:id`: Bir kullanıcıyı güncelle.
- `DELETE /users/:id`: Bir kullanıcıyı sil.

### Adres Uç Noktaları

- `GET /address`: Tüm adresleri getir.
- `POST /address`: Yeni bir adres oluştur.
- `PUT /address/:id`: Bir adresi güncelle.
- `GET /address/:id`: Tek bir adres getir.
- `GET /address/user/:userId`: Belirli bir kullanıcının adresini getir.

### Ülke, Şehir, İlçe ve Kasaba Uç Noktaları

Bu varlıkların her biri (Ülke, Şehir, İlçe, Kasaba), CRUD işlemleri ve ilişkili kullanıcıları getirmek için benzer uç noktalara sahiptir.

### Arama Uç Noktaları

- `GET /search`: Kasabalar, ilçeler, şehirler ve ülkeler arasında genel arama yap.

### Dosya Okuma Uç Noktası

- `GET /file-read`: Bir dosyadan veri oku ve işle.

## Varlıklar

Sistem, belirli nitelikleri ve ilişkileri olan birkaç varlık içerir:

- `User`: `firstName`, `lastName`, `age` gibi nitelikler ve `Phone`, `Email`, `Address` ile ilişkiler içerir.
- `Address`: `addressLine`, `street`, `post_code` gibi detaylar ve `User`, `Country`, `City`, `District`, `Town` ile ilişkiler içerir.
- `Country`, `City`, `District`, `Town`: Kendilerine özgü nitelikler ve ilişkiler içeren coğrafi varlıklar.

---