# CRUD w/ Express

## CRUD

aka BREAD (Browse, Read, Edit, Add, Delete)

### **C**reate

#### Create Form - `GET /resource/new`

Show a form to collect information to create the resource

#### Create Resource - `POST /resource`

Takes in data (usually form data or JSON) and creates the resource in the server

### **R**ead

#### Index - `GET /resource`

List all of the given resource

#### Show - `GET /resource/:id`

Displays one of a resource

### **U**pdate

#### Edit Form - `GET /resource/:id/edit`

Displays a form prefilled with the given resources data

#### Edit Resource - `PUT /resource/:id`

> N.B. Sometimes you'll also see `PATCH /resource/:id` instead here

Updates the given resource with the data provided (Form or JSON data)

### **D**elete

#### Delete Resource - `DELETE /resource/:id`

Deletes a resource from the server
