export const swaggerDocument = {
  "openapi": "3.0.0",
  "info": {
    "title": "RoomSync Pro - Admin API Documentation",
    "version": "1.0.0",
    "description": "API documentation for the Meeting Room Scheduling System (Admin Console). Connects to SQLite/PostgreSQL database using CQRS pattern."
  },
  "servers": [
    {
      "url": "http://localhost:5000",
      "description": "Local Development Server"
    }
  ],
  "paths": {
    "/api/admin/dashboard": {
      "get": {
        "summary": "Get admin dashboard statistics",
        "description": "Returns dashboard counts, room status table rows, utilization charts, usage trends, and recent logs.",
        "tags": ["Dashboard"],
        "responses": {
          "200": {
            "description": "Dashboard stats retrieved successfully"
          },
          "500": {
            "description": "Internal server error"
          }
        }
      }
    },
    "/api/admin/rooms": {
      "get": {
        "summary": "Get list of rooms",
        "tags": ["Rooms"],
        "parameters": [
          {
            "name": "type",
            "in": "query",
            "schema": { "type": "string" },
            "description": "Filter by room type (e.g. ห้องประชุมใหญ่)"
          },
          {
            "name": "status",
            "in": "query",
            "schema": { "type": "string" },
            "description": "Filter by status (available | maintenance | inactive)"
          }
        ],
        "responses": {
          "200": {
            "description": "Rooms list retrieved successfully"
          }
        }
      },
      "post": {
        "summary": "Create new room",
        "tags": ["Rooms"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["name", "floor", "capacity", "type", "amenities", "status"],
                "properties": {
                  "name": { "type": "string" },
                  "floor": { "type": "integer" },
                  "capacity": { "type": "integer" },
                  "type": { "type": "string" },
                  "description": { "type": "string" },
                  "amenities": {
                    "type": "array",
                    "items": { "type": "string" }
                  },
                  "status": { "type": "string", "enum": ["available", "maintenance", "inactive"] },
                  "image": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Room created successfully"
          },
          "400": {
            "description": "Invalid input data"
          }
        }
      }
    },
    "/api/admin/rooms/{id}": {
      "get": {
        "summary": "Get single room details",
        "tags": ["Rooms"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "200": {
            "description": "Room details retrieved successfully"
          },
          "404": {
            "description": "Room not found"
          }
        }
      },
      "put": {
        "summary": "Update room details",
        "tags": ["Rooms"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" },
                  "floor": { "type": "integer" },
                  "capacity": { "type": "integer" },
                  "type": { "type": "string" },
                  "description": { "type": "string" },
                  "amenities": {
                    "type": "array",
                    "items": { "type": "string" }
                  },
                  "status": { "type": "string", "enum": ["available", "maintenance", "inactive"] },
                  "image": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Room updated successfully"
          },
          "400": {
            "description": "Invalid data input"
          }
        }
      },
      "delete": {
        "summary": "Delete room",
        "tags": ["Rooms"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "200": {
            "description": "Room deleted successfully"
          }
        }
      }
    },
    "/api/admin/bookings": {
      "get": {
        "summary": "Get list of bookings",
        "tags": ["Bookings"],
        "parameters": [
          {
            "name": "status",
            "in": "query",
            "schema": { "type": "string" },
            "description": "Filter by booking status (confirmed | pending | cancelled)"
          },
          {
            "name": "search",
            "in": "query",
            "schema": { "type": "string" },
            "description": "Search keyword for organizer, title or room name"
          }
        ],
        "responses": {
          "200": {
            "description": "Bookings list retrieved successfully"
          }
        }
      },
      "post": {
        "summary": "Create new booking",
        "description": "Books a room. Automatically executes collision check to verify that the timeslot is not already reserved.",
        "tags": ["Bookings"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["roomId", "organizer", "date", "timeStart", "timeEnd", "participants", "status"],
                "properties": {
                  "roomId": { "type": "string" },
                  "organizer": { "type": "string" },
                  "title": { "type": "string" },
                  "date": { "type": "string", "description": "Format: YYYY-MM-DD" },
                  "timeStart": { "type": "string", "description": "Format: HH:MM" },
                  "timeEnd": { "type": "string", "description": "Format: HH:MM" },
                  "participants": { "type": "integer" },
                  "status": { "type": "string", "enum": ["confirmed", "pending", "cancelled"] }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Booking created successfully"
          },
          "400": {
            "description": "Collision conflict or invalid inputs"
          }
        }
      }
    },
    "/api/admin/bookings/summary": {
      "get": {
        "summary": "Get bookings schedule summary (Calendar events)",
        "description": "Retrieves all bookings formatted with start/end strings and state colors directly compatible with FullCalendar events.",
        "tags": ["Bookings"],
        "responses": {
          "200": {
            "description": "Schedules summary retrieved successfully"
          }
        }
      }
    },
    "/api/admin/bookings/{id}": {
      "get": {
        "summary": "Get single booking detail",
        "tags": ["Bookings"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "200": {
            "description": "Booking retrieved successfully"
          },
          "404": {
            "description": "Booking not found"
          }
        }
      },
      "put": {
        "summary": "Update booking details",
        "tags": ["Bookings"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "roomId": { "type": "string" },
                  "organizer": { "type": "string" },
                  "title": { "type": "string" },
                  "date": { "type": "string" },
                  "timeStart": { "type": "string" },
                  "timeEnd": { "type": "string" },
                  "participants": { "type": "integer" },
                  "status": { "type": "string", "enum": ["confirmed", "pending", "cancelled"] }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Booking updated successfully"
          },
          "400": {
            "description": "Collision conflict or invalid input"
          }
        }
      },
      "delete": {
        "summary": "Delete booking",
        "tags": ["Bookings"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "200": {
            "description": "Booking deleted successfully"
          }
        }
      }
    }
  }
};
