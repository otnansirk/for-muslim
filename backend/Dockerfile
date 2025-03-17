# --- STAGE 1: Build the Go app ---
FROM golang:1.24 AS builder

# Set working directory
WORKDIR /app

# Copy go.mod and go.sum
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy all source code (Tanpa git clone!)
COPY . .

# Build the Go application
RUN go build -o build .

# --- STAGE 2: Create a lightweight final image ---
FROM alpine:latest

WORKDIR /root/

# Copy the built binary from the builder stage
COPY --from=builder /app/build .

EXPOSE 1323

CMD ["./build"]
