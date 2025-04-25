# RETO INDRA - RIMAC

### 🚀 Características

- Arquitectura Hexagonal con TypeScript.
- Integración con Base de Datos: DynamoDB.
- Validación y manejo de errores con DTOs.
- Documentación de API con Swagger/OpenAPI.

### 🚀 Instalación

Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

Instalar dependencias:

```bash
npm install
```


Ejecutar la aplicación:

```bash
npm run start:dev
```

### 🌐 Depliegue API

Visite esta URL para visualizar el despliegue de la aplicación

```
https://2rf6ksetrh.execute-api.us-east-1.amazonaws.com/production/docs
```

Para iniciar la prueba dejo un ejemplo para crear un Appointment `https://2rf6ksetrh.execute-api.us-east-1.amazonaws.com/production/api/appointments/CreateAppointment`

```json
{
  "insuredId": "00001",
  "scheduleId": 1,
  "scheduleDetail": {
    "centerId": 1,
    "specialityId": 1,
    "medicId": 1,
    "date": "2025-04-25"
  },
  "countryISO": "PE"
}
```
